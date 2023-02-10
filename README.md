# iSalon

iSalon client web

## Install

```sh
npm install
```

## Build

```sh
npm run build:app stg|prod ios|android
```

## Run

```sh
npm run start
```

## Lint

```sh
npm run lint
```

## Test

```sh
npm run test
```

## Release App

Update new version and build version for new release in file `config.xml`

> <b>Note</b>
>
> <b>Only iOS</b>
> Before build new release, in file `app/containers/Authentication/Views/Entry.jsx`, please comment block code `sign in facebook button` below, because policy apple [read](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple).
> After update app to appstore, you should uncomment this block code and then using [codepush](#distribution-code-push) to update feature `sign in facebook`.

```js
<Grid item>
  <Typography
    variant="subtitle1"
    style={{ marginTop: 40 }}
    align="center"
    className={classes.text}
  >
    {isMobileOnly ? 'Hoặc sử dụng' : 'Bạn có thể đăng nhập qua'}
  </Typography>
</Grid>
<Grid item className={`${isMobileOnly && classes.centerText}`}>
  {isNative ? (
    <Button
      className={`${classes.btn} ${classes.btnFacebook}`}
      variant="outlined"
      onClick={handleLoginFacebookMobile}
    >
      <FaceBookIcon />
    </Button>
  ) : (
    <FacebookLogin
      textButton={isMobileOnly ? '' : ` Facebook`}
      cssClass={`${classes.btn} ${classes.btnFacebook}`}
      appId={process.env.FACEBOOK_APP_ID}
      disableMobileRedirect
      fields="name,email,picture"
      callback={handleLoginFacebook}
      icon={<FaceBookIcon />}
    />
  )}
</Grid>
```

### Build app

```sh
npm run build:app prod ios|android release
```

After script run successfully installation file for each platform in folder `artifacts`

## Distribution code push

Update code push production

### iOS

```sh
npm run build:codepush prod ios
npm run push:ios
```

### Android

```sh
npm run build:codepush prod android
npm run push:ios
```
