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
 import com.facebook.react.ReactRootView;
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
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
 
  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }
    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }

  
}
