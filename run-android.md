# Fix Android Could Not Build Error

If you've been getting the following error message:
Could not read path 'C:\...\justice_hub\android\app\build\intermediates\incremental\mergeDebugResources\merged.dir\values-af'.

Then the error can be fixed with a couple lines in the terminal.
Github issue report found [here](https://github.com/bamlab/generator-rn-toolbox/issues/116).

Execute the following commands
Make sure that you're in the justice_hub root directory

>> cd android && gradlew cl

If this doesn't work look into adding gradlew to your path so that it works in the command line
This will clean the gradle build of your android app, and will fix the missing file error message

>> cd .. && react-native run-android

All this does is navigate back to the root directory and then run your app.

This is all that it took for me to be able to successfully build the app after running into that error.