import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.widget.Toast;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import com.truecaller.android.sdk.ITrueCallback;
import com.truecaller.android.sdk.TrueButton;
import com.truecaller.android.sdk.TrueError;
import com.truecaller.android.sdk.TrueException;
import com.truecaller.android.sdk.TrueProfile;
import com.truecaller.android.sdk.TruecallerSDK;
import com.truecaller.android.sdk.TruecallerSdkScope;
import com.truecaller.android.sdk.clients.VerificationCallback;
import com.truecaller.android.sdk.clients.VerificationDataBundle;
import static java.lang.Integer.*;

public class TruecallerAuthModule extends ReactContextBaseJavaModule {
    private Promise promise = null;


    private final ITrueCallback sdkCallback = new ITrueCallback() {
        @Override
        public void onSuccessProfileShared(@NonNull final TrueProfile trueProfile) {
            if (promise != null) {
                WritableMap map = Arguments.createMap();

                map.putBoolean("successful", true);
                map.putString("firstName", trueProfile.firstName);
                map.putString("lastName", trueProfile.lastName);
                map.putString("phoneNumber", trueProfile.phoneNumber);
                map.putString("gender", trueProfile.gender);
                map.putString("street", trueProfile.street);
                map.putString("city", trueProfile.city);
                map.putString("zipcode", trueProfile.zipcode);
                map.putString("countryCode", trueProfile.countryCode);
                map.putString("facebookId", trueProfile.facebookId);
                map.putString("twitterId", trueProfile.twitterId);
                map.putString("email", trueProfile.email);
                map.putString("url", trueProfile.url);
                map.putString("avatarUrl", trueProfile.avatarUrl);
                map.putBoolean("isVerified", trueProfile.isTrueName);
                map.putBoolean("isAmbassador", trueProfile.isAmbassador);
                map.putString("companyName", trueProfile.companyName);
                map.putString("jobTitle", trueProfile.jobTitle);
                map.putString("payload", trueProfile.payload);
                map.putString("signature", trueProfile.signature);
                map.putString("signatureAlgorithm", trueProfile.signatureAlgorithm);
                map.putString("requestNonce", trueProfile.requestNonce);

                promise.resolve(map);
            }
        }

        @Override
        public void onFailureProfileShared(@NonNull final TrueError trueError) {
            Log.d("TruecallerAuthModule", Integer.toString(trueError.getErrorType()));
            if (promise != null) {
                String errorReason = null;
                switch (trueError.getErrorType()) {
                    case TrueError.ERROR_TYPE_INTERNAL:
                        errorReason = "ERROR_TYPE_INTERNAL";
                        break;
                    case TrueError.ERROR_TYPE_NETWORK:
                        errorReason = "ERROR_TYPE_NETWORK";
                        break;
                    case TrueError.ERROR_TYPE_USER_DENIED:
                        errorReason = "ERROR_TYPE_USER_DENIED";
                        break;
                    case TrueError.ERROR_TYPE_UNAUTHORIZED_PARTNER:
                        errorReason = "ERROR_TYPE_UNAUTHORIZED_PARTNER";
                        break;
                    case TrueError.ERROR_TYPE_UNAUTHORIZED_USER:
                        errorReason = "ERROR_TYPE_UNAUTHORIZED_USER";
                        break;
                    case TrueError.ERROR_TYPE_TRUECALLER_CLOSED_UNEXPECTEDLY:
                        errorReason = "ERROR_TYPE_TRUECALLER_CLOSED_UNEXPECTEDLY";
                        break;
                    case TrueError.ERROR_TYPE_TRUESDK_TOO_OLD:
                        errorReason = "ERROR_TYPE_TRUESDK_TOO_OLD";
                        break;
                    case TrueError.ERROR_TYPE_POSSIBLE_REQ_CODE_COLLISION:
                        errorReason = "ERROR_TYPE_POSSIBLE_REQ_CODE_COLLISION";
                        break;
                    case TrueError.ERROR_TYPE_RESPONSE_SIGNATURE_MISMATCH:
                        errorReason = "ERROR_TYPE_RESPONSE_SIGNATURE_MISSMATCH";
                        break;
                    case TrueError.ERROR_TYPE_REQUEST_NONCE_MISMATCH:
                        errorReason = "ERROR_TYPE_REQUEST_NONCE_MISSMATCH";
                        break;
                    case TrueError.ERROR_TYPE_INVALID_ACCOUNT_STATE:
                        errorReason = "ERROR_TYPE_INVALID_ACCOUNT_STATE";
                        break;
                    case TrueError.ERROR_TYPE_TC_NOT_INSTALLED:
                        errorReason = "ERROR_TYPE_TC_NOT_INSTALLED";
                        break;
                }

                WritableMap map = Arguments.createMap();
                map.putString("error", errorReason != null ? errorReason : "ERROR_TYPE_NULL");

                promise.resolve(map);
            }
        }

        @Override
        public void onVerificationRequired() {
            TruecallerSDK.getInstance().requestVerification("IN", PHONE_NUMBER_STRING, apiCallback);
        }
    };


    public TruecallerAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        TruecallerSdkScope trueScope = new TruecallerSdkScope.Builder(reactContext, sdkCallback)
                .consentMode(TruecallerSdkScope.CONSENT_MODE_POPUP )
                .consentTitleOption( TruecallerSdkScope.SDK_CONSENT_TITLE_VERIFY )
                .footerType( TruecallerSdkScope.FOOTER_TYPE_CONTINUE )
                .sdkOptions( TruecallerSdkScope.SDK_OPTION_WITH_OTP )
                .build();

        TruecallerSDK.init(trueScope);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "TruecallerAuth";
    }

    @ReactMethod
    public void showToast(Promise promise) {
        Toast.makeText(getReactApplicationContext(), "hello", Toast.LENGTH_LONG).show();
        promise.resolve(null);
    }

    @ReactMethod
    public void authenticate(Promise promise) {
        try {
            this.promise = promise;
            if (TruecallerSDK.getInstance() != null) {
                TruecallerSDK.getInstance().getUserProfile(getCurrentActivity());
            } else {
                WritableMap map = Arguments.createMap();
                map.putString("error", "ERROR_TYPE_NOT_SUPPORTED");
                this.promise.resolve(map);
            }
        } catch (Exception e) {
            this.promise.reject(e);
        }
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            super.onActivityResult(activity, requestCode, resultCode, intent);
            if (requestCode == 100) {
                TruecallerSDK.getInstance().onActivityResultObtained(activity, resultCode, intent);
            }
        }
    };
}