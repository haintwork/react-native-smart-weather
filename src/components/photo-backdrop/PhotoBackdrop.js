import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  ImagePickerIOS
} from 'react-native';
import styles from './styles';
import Button from '../button/Button';

class PhotoBackdrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photoSource: require('../../../assets/images/flower.jpg')
    };
  }

  _pickImage = () => {
    ImagePickerIOS.openSelectDialog(
      {},
      (data) => {
        this.setState({
          photoSource: { uri: data }
        });
      },
      () => {
        console.log('User canceled the action');
      });
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode='cover'
          source={this.state.photoSource}>
          <Button
            style={styles.button}
            label="Load Image"
            onPress={this._pickImage} />
        </ImageBackground>
      </View>
    );
  }
}

export default PhotoBackdrop;
