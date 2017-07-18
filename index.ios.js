/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AppleHealthKit from 'react-native-apple-healthkit';

export default class HealthKit extends Component {

  constructor() {
    let options = {
      permissions: {
        read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
        write: ["Weight", "StepCount", "BodyMassIndex"]
      }
    };
    super();

    this.state = {
      weight: null,
      stepCount: null
    }
    AppleHealthKit.initHealthKit(options, (err, resp) => {
      console.log(resp);
    });

    AppleHealthKit.getLatestWeight(null, (err, weight) => {
      this.setState({weight: weight.value});
    });

    let d = new Date();
    let stepOptions = {
      date: d.toISOString()
    };

    AppleHealthKit.getStepCount(options, (err, steps) => {
    if(err){
        return false;
    }
    this.setState({stepCount: steps.value});
    // steps.value is the step count for day 'd'
});
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Your latest weight is: {this.state.weight} lbs
        </Text>
        <Text style={styles.instructions}>
          Your latest stepCount is: {this.state.stepCount} steps
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HealthKit', () => HealthKit);
