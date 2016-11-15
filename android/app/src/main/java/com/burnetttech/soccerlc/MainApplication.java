package com.burnetttech.soccerlc;

import android.app.Application;
import android.os.Bundle;
import android.util.Log;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.smixx.fabric.FabricPackage;
import com.calendarevents.CalendarEventsPackage;
import cl.json.RNSharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;


import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
            new FabricPackage(),
            new CalendarEventsPackage(),
            new RNSharePackage(),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new RNAdMobPackage(),
            new ReactNativePushNotificationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
