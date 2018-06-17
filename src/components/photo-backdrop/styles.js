import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  button: {
    alignItems: 'center',
    marginBottom: 20,
  }
});

export default styles;
