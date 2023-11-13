package app.radzima;
import expo.modules.ReactActivityDelegateWrapper;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; 
import com.zoontek.rnbars.RNBars;
import android.view.Window;
import android.view.WindowManager;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.view.View;

 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
 import com.facebook.react.defaults.DefaultReactActivityDelegate;
 import com.proyecto26.inappbrowser.RNInAppBrowserModule;
public class MainActivity extends ReactActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        RNBootSplash.init(this, R.style.BootTheme);
        super.onCreate(null);
        RNBars.init(this, "dark-content");


    }

  @Override
  protected void onStart() {
    super.onStart();
    RNInAppBrowserModule.onStart(this);
  } 

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "greenTravel";
  }


  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()
        ));
  }
}
