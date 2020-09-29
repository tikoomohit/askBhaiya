/**
 * This exposes the native NativeJSBridge module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be NativeJSBridge.SHORT or
 *    NativeJSBridge.LONG
 */
import {NativeModules} from 'react-native';

//NativeModules.
//module.exports = NativeModules;

//NativeJSBridge.show('Awesome', NativeJSBridge.SHORT);
