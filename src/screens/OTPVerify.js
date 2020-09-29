import React from 'react';
import {Text, TextInput, Button, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OTPVerify = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = React.useState(90);

  React.useEffect(() => {
    const setOTPTimer = () => {
      if (seconds > 0) {
        const id = setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);
        return () => {
          clearTimeout(id);
        };
      }
    };

    setOTPTimer();

    //verifyOTP();

    // const verifyOTP = code => {
    //   let phone_number = navigation.getParam('phoneNo');
    //   console.log(phone_number);
    //   fetch('https://api.ringcaptcha.com/1igu6onu8ite2aza8eda/verify', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: `code=${code}&phone=${phone_number}&api_key=d3fb699623fdde7ba6ee8d010893edfe02c01f3c`,
    //   })
    //     .then(res => {
    //       navigation.navigate('Dashboard', {
    //         username: this.props.navigation.getParam('username'),
    //       });
    //     })
    //     .catch(err => console.log(err));
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <View style={Styles.container}>
      <Text>Enter OTP sent to your mobile number</Text>
      <View style={Styles.textBoxContainer}>
        <TextInput style={Styles.textBox} />
        <TextInput style={Styles.textBox} />
        <TextInput style={Styles.textBox} />
        <TextInput style={Styles.textBox} />
      </View>
      <Text>Resend OTP in {seconds} secs</Text>

      <View style={Styles.button}>
        <Button
          title="Finish"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
  },

  textBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  textBox: {
    textAlign: 'center',
    width: '17%',
    height: 70,
    fontSize: 30,
    //backgroundColor: '#30c5b4',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    width: '50%',
    paddingTop: 10,
    borderRadius: 20,
  },
});

export default OTPVerify;
