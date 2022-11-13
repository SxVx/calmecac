module.exports = {
  project: {
      ios:{},
      android:{}
  },
  assets:['./src/core/assets/fonts/'],
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
}