#!/usr/bin/env bash

set -eo pipefail
ENV=$1
if [[ ! ${ENV} ]]
then
  ENV=dev
fi
echo "Environment: ${ENV}"
if [[ ( ${ENV} != "prod" && ${ENV} != "stg" && ${ENV} != "dev" ) ]]
then
  echo "Usage: $(basename "$0") [prod|stg|dev]"
  exit 1
fi
echo "Building environment ${ENV}"

PLATFORM=$2
if [[ ! ${PLATFORM} ]]
then
  PLATFORM=browser
fi
echo "Platform: ${PLATFORM}"
if [[ ( ${PLATFORM} != "browser" && ${PLATFORM} != "ios" && ${PLATFORM} != "android" ) ]]
then
  echo "Usage: $(basename "$0") [browser|ios|android]"
  exit 1
fi
echo "Building platform ${PLATFORM}"

export TARGET_ENV=${ENV}
export TARGET_PLATFORM=${PLATFORM}

echo "Is code push: ${CODE_PUSH}"
BUILD=$3

if [[ (${PLATFORM} == "ios") || (${PLATFORM} == "android") ]]
then
  echo "Build ${PLATFORM}"
  npm run build:clean
  npm run build:${ENV}
  if [ "${CODE_PUSH}" = false ]
  then
    if [[ -d platforms/${PLATFORM} ]]
    then
      npx cordova platform remove ${PLATFORM}
    fi
    npx cordova platform add ${PLATFORM}
    if [[ ${BUILD} == "release" ]]
    then
      ARTIFACTS_DIR=artifacts
      [[ -d ${ARTIFACTS_DIR} ]] || mkdir "${ARTIFACTS_DIR}"
      VERSION=$(cat config.xml | grep "<widget"  | sed 's/.*version="\([0-9.]*\).*/\1/')
      BUILD_NUMBER=$(cat config.xml | grep "<widget"  | sed 's/.*android-versionCode="\([0-9.]*\).*/\1/')
      BUILD_BASENAME=app/build/outputs/apk/${BUILD}/app-${BUILD}
      ARTIFACT_EXTENSION=apk
      if [[ ${PLATFORM} == "ios" ]]
      then
        ARTIFACT_EXTENSION=ipa
        BUILD_NUMBER=$(cat config.xml | grep "<widget"  | sed 's/.*ios-CFBundleVersion="\([0-9.]*\).*/\1/')
        BUILD_BASENAME="build/device/iSalon Booking"
      fi
      ARTIFACT_BASENAME=iSalon-${ENV}_${VERSION}-build.${BUILD_NUMBER}

      npx cordova build --release --device ${PLATFORM}

      ARTIFACT_PATH=${ARTIFACTS_DIR}/${ARTIFACT_BASENAME}.${ARTIFACT_EXTENSION}
      mv -f "platforms/${TARGET_PLATFORM}/${BUILD_BASENAME}.${ARTIFACT_EXTENSION}" "${ARTIFACT_PATH}"
      echo "Built ${TARGET_PLATFORM} app at ${ARTIFACT_PATH}"
      git checkout -f
    fi
  fi
else
  echo "Build ${PLATFORM}"
  npm run build:clean
  npm run build:${ENV}
fi
