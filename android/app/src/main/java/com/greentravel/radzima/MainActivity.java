package com.greentravel.radzima;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; 
import android.view.Window;
import android.view.WindowManager;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
public class MainActivity extends ReactActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);    
        if (Build.VERSION.SDK_INT >= 19) {
          getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
        setWindowFlag(this, WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS, false);     
        getWindow().setStatusBarColor(Color.TRANSPARENT);
    }

  public static void setWindowFlag(Activity activity, final int bits, boolean on) {

    Window win = activity.getWindow();
    WindowManager.LayoutParams winParams = win.getAttributes();
    if (on) {
        winParams.flags |= bits;
    } else {
        winParams.flags &= ~bits;
    }
    win.setAttributes(winParams);
}

public static void setLightStatusBar(View view,Activity activity){


  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

      int flags = view.getSystemUiVisibility();
      flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
      view.setSystemUiVisibility(flags);
      activity.getWindow().setStatusBarColor(Color.WHITE); 
  }
}
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "greenTravel";
  }
}
