import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Linking
} from 'react-native';
import Moment from "moment";
import WeatherNow from './WeatherNow'
import PlantPage from './PlantPage'

export default class GetWeatherData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tempScale: "F",
      weatherData: undefined,
      location: undefined,
      locationName: undefined,
      json: undefined
    }
  
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getWeatherApi = this.getWeatherApi.bind(this);
  }
  
  componentDidMount() {
    console.log(this.props);
    this.getWeatherApi();
  }

  async getWeatherApi() {
    const darkskyURL = "https://api.darksky.net/forecast";
    const skyKey = "17ff990ca95a126636600b7f689195d2";
    const GoogleKey = "&key=AIzaSyBHJ-SEHJAoY1PIB4mNTvaa9Nto_iHCc_g";
    const googURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    const latLon = this.props.latlon;
    
    try {
      // Get response from DarkSky
      let skyResponse = await fetch(darkskyURL + "/" + skyKey + "/" + latLon + "?units=auto");
      let skyResponseJson = await skyResponse.json();
      let tempScale = "C";
      if (skyResponseJson.flags.units == "us") {
        tempScale = "F";
      }

      // Get response from Google GeoCoder
      let googResponse = await fetch(googURL + latLon + GoogleKey );
      let googResponseJson = await googResponse.json();
      let name = googResponseJson.results[0].address_components[2].short_name + ", " + googResponseJson.results[0].address_components[4].short_name

      this.setState({
        isLoading: false,
        weatherData: skyResponseJson,
        tempScale: tempScale,
        location: skyResponseJson.latitude + "," + skyResponseJson.longitude,
        locationName: name,
        json: googResponseJson
      });
      console.log(googResponseJson);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let weatherData = this.state.weatherData;
    let tempScale = this.state.tempScale;
    let location = this.state.locationName;
    if (this.state.isLoading) {
      return (
        <Text>Loading ... </Text>
      );
    } else if (this.props.isMainPage){
      return (
        <View>
          <WeatherNow weatherData={weatherData} 
                      tempScale={tempScale} 
                      location={location}
          />
        </View>
      );
    } else {
        return (
         <PlantPage weatherData={weatherData}
                    tempScale={tempScale}
         />
        );
    }
  }
}