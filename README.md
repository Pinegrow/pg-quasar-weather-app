# Weather App v2

This project is a rewrite of Danny Connell's "Quasar V1: Weather App for Mobile, Desktop & Web (Vue JS 2)" application he built for his [Udemy course](https://www.udemy.com/course/weather-app-vue-js-quasar) of the same name.

## Install the dependencies

```bash
npm install
```

## Web (SPA)

- To launch for development, run `npm run dev`
- To build for production, run `npm run build`

## Desktop

- To launch for development, run `npm run dev:electron`
- To build for production, run `npm run build:electron`

### For Windows build when running Mac

- To launch for development, run Windows in a virtual machine and run development process there
- To build for production, uncomment the `platform: 'win32'` line in `quasar.conf.js` and run `npm run build:electron`

## iOS (Mac only)

- To launch for development, install Xcode and run `npm run dev:ios`
- To build for production, run `npm run build:ios`

## Android

- To launch for development, install Android Studio, Android File Transfer, setup and launch Android Virtual Device, and run `npm run dev:android`
- To build for production, run `npm run build:android`

## Icons

- To regenerate icons & splash screens, run `npm run icons`
