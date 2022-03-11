This program is written in react-native-cli 2.0.1 and react-native 0.65.1

Method to test :
1. Test in browser with :https://appetize.io/app/3vd8451zknpf1d469gkdhqhcrw?device=pixel4&scale=75&orientation=portrait&osVersion=10.0
2. Run PokemonAPIv1 on android emulator
3. Setup react native cli and node, then run in directory : "npm install" -> "npx react-native run-android"

Attention :
* In order to reduce submission size, android and ios folder is removed from this project. To regenerate: Please run "npx react-native init project" and move the folders from the generated project to source code.

Test Flow:
1. Click purple button to start search.
2. After performing at least one search, "read data" button allow to read from cache.
3. "Clear data" button to clear cache.

Development Thoughts:
Since the purpose of this React Native project is to demonstrate my ability to build interface and design layouts, some of the more complicated tasks are skipped.
Same goes to structural design, must-have plugins like redux and react native navigation is omitted for simplicity.