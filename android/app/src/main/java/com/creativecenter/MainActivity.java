package com.creativecenter;

import com.facebook.react.ReactActivity;
import com.burnweb.rnpermissions.RNPermissionsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CreativeCenter";
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      RNPermissionsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
