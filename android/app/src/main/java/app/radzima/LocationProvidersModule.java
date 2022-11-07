package app.radzima; 

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.location.LocationManager;
import com.facebook.react.bridge.WritableMap;
import java.util.List;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import android.content.Context;

public class LocationProvidersModule extends ReactContextBaseJavaModule {
    LocationProvidersModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
    public String getName() {
    return "LocationProvidersModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getAvailableLocationProvidersSync() {
      LocationManager mLocationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
      WritableMap providersAvailability = Arguments.createMap();
      try {
        List<String> providers = mLocationManager.getProviders(false);
        for (String provider : providers) {
          providersAvailability.putBoolean(provider, mLocationManager.isProviderEnabled(provider));
        }
      } catch (Exception e) {
        System.err.println("Unable to get location providers. LocationManager was null");
      }
  
      return providersAvailability;
    }

    @ReactMethod
    public void getAvailableLocationProviders(Promise p) { p.resolve(getAvailableLocationProvidersSync()); }
}