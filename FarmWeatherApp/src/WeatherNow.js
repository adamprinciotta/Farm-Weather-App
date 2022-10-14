import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Linking
} from 'react-native';
import Moment from "moment";

/* WeatherNow component gives an overall summary of today's weather
 * at a given location, with a small preview of the next day. All its
 * data comes from props. 
 * */
export default class WeatherNow extends Component {
  render() {
    return (
        <View>
          <View style={styles.smallHorizontalPad}/>
          <View style={{
             borderRadius: 20,
             backgroundColor: '#413735',
             height: Dimensions.get('window').height*4/15
          }}>
          <CurrentWeatherPanel
            loc={this.props.location}
            units={this.props.tempScale}
            time={this.props.weatherData.currently.time}
            summary={this.props.weatherData.currently.summary}
            icon={this.props.weatherData.currently.icon}
            temp={this.props.weatherData.currently.temperature}
          />
          </View>
          <View style={styles.smallHorizontalPad}/>
          <View style={{
              height: Dimensions.get('window').height*1/3
          }} >
          <DataBoxes
              precip={this.props.weatherData.currently.precipProbability}
              icon={this.props.weatherData.currently.icon}
              summary={this.props.weatherData.currently.summary}
              units={this.props.tempScale}
              data={this.props.weatherData.daily.data}/>
          </View>
          <View style={styles.buttonPad}/>
        </View>
    );
  }
};

class CurrentWeatherPanel extends Component {
  render() {

    let day = Moment.unix((this.props.time));
    let units = this.props.units;
    return (
        <View style={{
            flex: 1,
            justifyContent:'center',
            alignItems:'center',
        }}>
          <Text style={styles.titleText}> {this.props.loc} </Text>
          <Text style={styles.basicText}> {day.format('dddd, MMMM Do h:mm a')} </Text>

          <View style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center'
          }}>
              <Text style={styles.bigTemp}> {Math.round(this.props.temp)}&deg;{units} </Text>
          </View>
          <Text style={styles.linkText} 
                onPress={()=> Linking.openURL('https://darksky.net/poweredby/')}
          >Powered by DarkSky</Text>
        </View>
    )
  }
}

class DataBoxes extends Component {
  render() {
    return (
        <View>
          <View style={{
              flex:1,
              flexDirection: 'row',
          }}>
            <PrecipBox precip={this.props.precip}/>
            <View style={styles.smallVerticalPad}/>
            <WeatherDesc summary={this.props.summary}
                         icon={this.props.icon}/>
          </View>
        </View>
   )
  }
}

class PrecipBox extends Component {
  render() {
    const icon = IMAGES[getRaindropImage(this.props.precip)];
    return (
      <View style={styles.dataBox}>
        <Text style={styles.precipDesc}> Today's rain chance: </Text>
        <Image style={{
                        width: 80,
                        height: 80,
                    }}
                    source={icon}/>
        <Text style={styles.precipText}>{this.props.precip*100}%</Text>
      </View>
    )
  }
}

class WeatherDesc extends Component {
  render() {
    const icon = IMAGES[this.props.icon];
    return(
      <View style={styles.dataBox}>
        <Image style={{
                        width: 100,
                        height: 100,
                    }}
                    source={icon}/>
          <Text style={styles.descText}> {this.props.summary}</Text>
      </View>
    )
  }
}

function getRaindropImage(precipProbability) {
  precipProbability *= 100;
  precipProbability = Math.round((precipProbability) / 20) * 20;
  return precipProbability.toString() + "per";
}

const IMAGES = {
  '0per' : require('./icons/0perWater.png'),
  '20per' : require('./icons/20perWater.png'),
  '40per' : require('./icons/40perWater.png'),
  '60per' : require('./icons/60perWater.png'),
  '80per' : require('./icons/80perWater.png'),
  '100per' : require('./icons/100perWater.png'),
  'clear-day': require('./icons/day.png'),
  'clear-night': require('./icons/night.png'),
  'rain': require('./icons/rainy.png'),
  'snow': require('./icons/snow.png'),
  'sleet': require('./icons/sleet.png'),
  'wind': require('./icons/windy.png'),
  'fog': require('./icons/fog.png'),
  'cloudy': require('./icons/cloud.png'),
  'partly-cloudy-day': require('./icons/day-clouds.png'),
  'partly-cloudy-night': require('./icons/night-clouds.png'),
  'partly-cloudy-night': require('./icons/night-clouds.png'),
  
};

const styles = StyleSheet.create({
    bigTemp: {
        color: 'white',
        fontSize: 60,
        fontFamily: 'sans-serif-condensed'
    },

    titleText: {
        color: 'white',
        fontSize: 35,
        fontFamily: 'sans-serif-condensed'
    },

    basicText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed'
    },

    linkText: {
        color:'white',
        fontSize: 10,
        textDecorationLine: 'underline'
    },

    dataBox: {
        borderRadius:20,
        width: Dimensions.get('window').width*90/200,
        height: Dimensions.get('window').height*1/3,
        backgroundColor: '#cacaa1',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },

    precipText: {
        fontSize: 30,
        color: 'black'
    },

    descText: {
        fontSize: 20, 
    },

    precipDesc: {
        fontSize: 15,
        color: 'black',
        textAlignVertical:'center'
      
    },

    futureWeatherText: {
        
        fontFamily: 'sans-serif-condensed',
        fontSize: 20,
    },

    futureWeatherSmallBox: {
        width: Dimensions.get('window').width*7/16,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        borderRadius: 20,
        alignItems: 'center'
    },

    smallHorizontalPad: {
        height: Dimensions.get('window').height*1/32
    },

    buttonPad: {
      height: Dimensions.get('window').height*1/6
    },

    smallVerticalPad: {
      width: Dimensions.get('window').width*1/32
  }
});