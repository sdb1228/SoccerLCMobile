# react-native-SoccerLC
Before starting you will make sure you have ran an `npm install` as well as an `react-native link`, "but steven
what about rnpm" sorry kiddo but rnpm is dead so use react-native link.

If things have gone well then you should be able to run `npm run ios` and the emulator
will start up and you will see a beautiful app in front of your face.

If things didn't go well then you probably ran into 'can't find Soccerlc Scheme' blah blah blah

To fix this open up the xcode project (`open ios/Soccerlc.xcodeproj`) and click on
https://www.dropbox.com/s/q3x8knpm23ganiw/Screenshot%202016-10-21%2023.33.39.png?dl=0
which is the button in the top middle that will probably read "template" for you
scroll down and click "New Scheme".
From there in the target drop down scroll all the way to the bottom where you will
see a target named SoccerLC click on that click okay and you are ready to go
run `npm run ios` again and you should be off to the races

To run Android you can do it a couple of ways.  You can either start an android
 through `android avd` and then choose the emulator you would like to run
After you have started an emulator run `npm run android`
Or you can use genymotion (look it up I am too lazy to link) and start an
emulator from there and run it the same way `npm run android`

Genymotion is what I use but some people like slower stuff so your call

Good luck!
