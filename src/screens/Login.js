import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartIcon from '../assets/CartIcon';
import {AuthContext} from '../utils/AuthContext';
//import NativeJSBridge from '../screens/NativeJSBridge';
//import {NativeModules} from 'react-native';

const verifyScreenName = 'OTPVerify';

const Login = () => {
  const navigation = useNavigation();
  const {TruecallerAuthModule} = NativeModules;
  //const {signIn} = React.useContext(AuthContext);

  const [phoneNo, setPhoneNo] = React.useState('');

  const handleSubmit = () => {
    if (phoneNo.trim().length < 10) {
      return;
    }
    navigation.navigate(verifyScreenName, {phoneNo: phoneNo});
  };

  const handleTrueCallerLogin = () => {
    //TruecallerAuthModule.authenticate();
  };

  return (
    <KeyboardAvoidingView style={Styles.Container}>
      <View style={Styles.TopContainer}>
        <Text style={Styles.Heading}>askBhaiya</Text>
        <CartIcon />
        <Text style={Styles.tagline}>We help your supply meet the demand</Text>
      </View>

      <View style={Styles.BottomContainer}>
        <Text style={Styles.labelText}>Enter your 10 digit mobile number</Text>
        <View style={Styles.InputContainer}>
          <TextInput
            style={Styles.MobileText}
            numeric
            value
            keyboardType={'numeric'}
            maxLength={10}
            autoFocus={false}
            onChangeText={(text) => setPhoneNo(text)}
          />

          <View>
            <TouchableOpacity disabled={phoneNo.trim().length !== 10}>
              <View
                style={[
                  Styles.SubmitButton,
                  {opacity: phoneNo.trim().length < 10 ? 0.6 : 1},
                ]}>
                <Text
                  style={Styles.ButtonTextStyle}
                  onPress={() => handleSubmit()}>
                  {' '}
                  Continue &#8594;
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            marginBottom: 5,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'red',
          }}>
          Or
        </Text>
        <TouchableOpacity>
          <View style={Styles.TrueCallerButton}>
            <Text
              style={Styles.ButtonTextStyle}
              onPress={() => handleTrueCallerLogin()}>
              Continue via Mobile Number
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={Styles.TncText}>
          By Continuing, I accept terms of Service
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ec4b6',
  },
  TopContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Open-sans',
    textAlign: 'center',
  },

  BottomContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  Heading: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    padding: 20,
  },
  labelText: {
    color: 'grey',
  },
  TncText: {
    color: 'dimgrey',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 11,
  },
  MobileText: {
    height: 40,
    width: 250,
    paddingLeft: 10,
    backgroundColor: '#f7ede2',
    fontSize: 18,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },

  SubmitButton: {
    marginTop: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ff7a05',
    borderRadius: 30,
  },

  TrueCallerButton: {
    marginTop: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4BAEF8',
    borderRadius: 30,
  },

  ButtonTextStyle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
