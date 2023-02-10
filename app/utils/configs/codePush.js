const sync = async () =>
  new Promise(resolve => {
    if (window.codePush) {
      window.codePush.sync(
        syncStatus => {
          switch (syncStatus) {
            case window.SyncStatus.CHECKING_FOR_UPDATE:
            case window.SyncStatus.DOWNLOADING_PACKAGE:
            case window.SyncStatus.INSTALLING_UPDATE: {
              return;
            }
            case window.SyncStatus.UP_TO_DATE: {
              window.codePush.getCurrentPackage(currentPackage => {
                if (currentPackage) {
                  window.CodePushVersion = currentPackage.label;
                }
              });
              break;
            }
            default:
          }
          resolve();
        },
        {
          deploymentKey: CodePushDeploymentKey,
          installMode: window.InstallMode.IMMEDIATE,
          ignoreFailedUpdates: false,
        },
        null,
        // eslint-disable-next-line no-console
        error => console.log(error.stack),
      );
    }
  });

export default { sync };
