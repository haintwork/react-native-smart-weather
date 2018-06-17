import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cityText = null;
    if (this.props.city) {
      cityText = (
        <Text style={styles.bigText}>
          {this.props.city}
        </Text>
      )
    }
    return (
      <View>
        {cityText}
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp}°F
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  mainText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  }
});
