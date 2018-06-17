import React, { Component } from 'react';
import Button from '../button/Button';
import styles from './styles';

class LocationButton extends Component {

  constructor(props) {
    super(props);
    this.locationWatch = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => { alert(error.message) },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    )
  }

  _onPress = () => {
    this.props.onGetCoords(this.state.latitude, this.state.longitude);
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.locationWatch);
  }

  render() {
    return (
      <Button
        style={styles.locationButton}
        onPress={this._onPress}
        label="Use Current Location"
      ></Button>
    );
  }
}

export default LocationButton;
