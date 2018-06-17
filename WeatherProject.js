import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Forecast from './src/components/Forecast';
import {
  WEATHER_API_URL,
  WEATHER_API_APP_ID_KEY,
  STORAGE_KEY
} from './src/constant/constant';
import LocationButton from './src/components/location-button/LocationButton';
import PhotoBackdrop from './src/components/photo-backdrop/PhotoBackdrop';

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: null
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(((value) => {
        if (value !== null) {
          this.setState({
            zip: value
          })
          this._getForecastForZip(value);
        }
      }))
      .catch((error) => console.log(`AsyncStorage error: ${error.message}`))
      .done();
  }

  _handleTextChange = (event) => {
    const zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  _getForecastForZip = (zip) => {
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log(`Save selection to disk: ${zip})`))
      .catch((error) => console.log(`AsyncStorage error: ${error.message}`))
      .done();
    this._getForecast(`${WEATHER_API_URL}zip=${zip},us&appid=${WEATHER_API_APP_ID_KEY}`);
  }

  _getForecastForCoords = (lat, lon) => {
    console.log(`lat: ${lat}, lon: ${lon}`);
    this._getForecast(`${WEATHER_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_APP_ID_KEY}`);
  }

  _getForecast = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            city: responseJSON.name,
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    let forecastComponent = null;
    if (this.state.forecast !== null) {
      forecastComponent = (
        <View style={styles.row}>
          <Forecast
            city={this.state.forecast.city}
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}
          ></Forecast>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <PhotoBackdrop></PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, styles.mainText]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}
                value={this.state.zip}
              ></TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords}></LocationButton>
          </View>
          {forecastComponent}
        </View>
      </View>
    );
  }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  zipContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    fontSize: baseFontSize,
    margin: 10,
    color: '#FFFFFF'
  },
});
