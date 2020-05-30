import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import * as Location from 'expo-location';

import Icon from 'react-native-vector-icons/FontAwesome5';

import api from './src/services/api';

export default class App extends Component {

  state = {
    weather: {
      name:        'Unknown',
      icon:        'unknown',
      description: '-',
      temp:        0,
      tempMin:     0,
      tempMax:     0,
      windSpeed:   0,
      windDeg:     0
    },
  }

  componentDidMount() {
    this.handleGetLocation();
  }

  handleGetLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission was denied' });
    }

    const location = await Location.getCurrentPositionAsync({});

    this.getWeatherByLocation(location);
  }

  getWeatherByLocation = async (location) => {
    const { data: { main, name, weather, wind } } = await api.get(
      `/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=82005d27a116c2880c8f0fcb866998a0`
    );

    this.setState({ 
      weather: { 
        name:        name,
        icon:        weather[0].icon,
        description: weather[0].description,
        temp:        main.temp,
        tempMin:     main.temp_min,
        tempMax:     main.temp_max,
        windSpeed:   wind.speed,
        windDeg:     wind.deg
      } 
    });
  }
  
  render() {
    const { name, icon, description, temp, tempMin, tempMax, windSpeed, windDeg } = this.state.weather;

    let customIcon = '';

    switch(icon) {
      case '01d':
        customIcon = require('./assets/icons/01d.png');
        break;
      case '01n':
        customIcon = require('./assets/icons/01n.png');
        break;
      case '02d':
        customIcon = require('./assets/icons/02d.png');
        break;
      case '02n':
        customIcon = require('./assets/icons/02n.png');
        break;
      case '03d':
        customIcon = require('./assets/icons/03d.png');
        break;
      case '03n':
        customIcon = require('./assets/icons/03n.png');
        break;
      case '04d':
        customIcon = require('./assets/icons/04d.png');
        break;
      case '04n':
        customIcon = require('./assets/icons/04n.png');
        break;
      case '09d':
        customIcon = require('./assets/icons/09d.png');
        break;
      case '09n':
        customIcon = require('./assets/icons/09n.png');
        break;
      case '10d':
        customIcon = require('./assets/icons/10d.png');
        break;
      case '10n':
        customIcon = require('./assets/icons/10n.png');
        break;
      case '11d':
        customIcon = require('./assets/icons/11d.png');
        break;
      case '11n':
        customIcon = require('./assets/icons/11n.png');
        break;
      case '13d':
        customIcon = require('./assets/icons/13d.png');
        break;
      case '13n':
        customIcon = require('./assets/icons/13n.png');
        break;
      case '50d':
        customIcon = require('./assets/icons/50d.png');
        break;
      case '50n':
        customIcon = require('./assets/icons/50n.png');
        break;
      default:
        customIcon = require('./assets/icons/unknown.png');
        break;
    }

    let customWindDeg = '';

    if (windDeg === 0) {
      customWindDeg = 'N';
    } else if (windDeg > 0 && windDeg < 45) {
      customWindDeg = 'NL';
    } else if (windDeg === 45) {
      customWindDeg = 'L';
    } else if (windDeg > 45 && windDeg < 90) {
      customWindDeg = 'SL';
    } else if (windDeg === 90) {
      customWindDeg = 'S';
    } else if (windDeg > 90 && windDeg < 135) {
      customWindDeg = 'SO';
    } else if (windDeg === 135) {
      customWindDeg = 'O';
    } else if (windDeg > 135 && windDeg < 360) {
      customWindDeg = 'NO';
    } else {
      customWindDeg = 'N';
    }

    return (  
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.weatherIcon}>
            <Image style={styles.weatherImage} source={customIcon} />
          </View>
          <View style={styles.temperature}>
            <Icon name='temperature-high' size={16} color='#9e9e9e' />
            <Text style={styles.minTemp}>{Math.floor(tempMin - 273)}&deg;</Text>
            <Text style={styles.divider}>/</Text>
            <Text style={styles.currentTemp}>{Math.floor(temp - 273)}&deg;</Text>
            <Text style={styles.divider}>/</Text>
            <Text style={styles.maxTemp}>{Math.floor(tempMax - 273)}&deg;</Text>
          </View>
          <View style={styles.wind}>
            <Icon name='wind' size={16} color='#9e9e9e' />
            <Text style={styles.windDescription}>{Math.floor(windSpeed * 1.15078)} mph, {customWindDeg} direction</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  cityName: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    color: '#212121',
  },
  description: {
    textTransform: 'uppercase',
    fontSize: 18,
    letterSpacing: -0.2,
    color: '#9e9e9e',
  },
  weatherIcon: {
    marginBottom: 80,
    alignItems: 'center',
  },
  weatherImage: {
    width: 200,
    height: 200,
  },
  temperature: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    color: '#9e9e9e',
  },
  minTemp: {
    fontSize: 18,
    color: '#9e9e9e',
    paddingLeft: 8,
    paddingRight: 8,
  },
  currentTemp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    paddingLeft: 8,
    paddingRight: 8,
  },
  maxTemp: {
    fontSize: 18,
    color: '#9e9e9e',
    paddingLeft: 8,
    paddingRight: 8,
  },
  wind: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  windDescription: {
    fontSize: 16,
    color: '#9e9e9e',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
