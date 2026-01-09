
// // babel.config.js
// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     // If you're truly using the "react-native-worklets" library,
//     // keep this plugin LAST and ensure the package is installed.
//     'react-native-worklets/plugin',

//     // If instead you're using Reanimated, use this (also LAST):
//     // 'react-native-reanimated/plugin',
//   ],
// };


// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // MUST be LAST
};
