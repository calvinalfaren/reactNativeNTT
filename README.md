# reactNativeNTT

1. https://angular.io/guide/setup-local
    1. clone this project
    2. open this project in visual studio code or other IDE
    3. open termial and enter this code 'yarn install'
    4. after yarn install finished enter this code 'npx react-native run-android' or 'npx react-native run-ios'
    5. if success react native will wun in android emultor or device
   
2. Compile android react native
------------------------------------
-> react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
-> cd android
-> ./gradlew assembleRelease -x bundleReleaseJsAndAssets
