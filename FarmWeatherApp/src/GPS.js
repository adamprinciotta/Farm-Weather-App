// App.js

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, PushNotificationIOS } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import GetWeatherData from './GetWeather'
export default class GPSPos extends Component {
	state = {
        location: null,
        loading: true,
	};

    componentDidMount() {
        if(this.state.loading){
            Geolocation.getCurrentPosition( 
                info => {
                   this.setState({location: info, loading: false}) 
                }, error => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
        }
    }

	render() {
        if (!this.state.loading && this.props.isMainPage) {
            let latLonVal = this.state.location.coords.latitude + ',' + this.state.location.coords.longitude;
            return (
                <View style={styles.container}>
                    <GetWeatherData isMainPage={this.props.isMainPage}
                                    latlon={latLonVal}/>
                </View>
            );
        } else if (!this.state.loading && !this.props.isMainPage) {
            let latLonVal = this.state.location.coords.latitude + ',' + this.state.location.coords.longitude;
            return (                
                <View style={styles.container}>
                    <GetWeatherData isMainPage={this.props.isMainPage}
                                    latlon={latLonVal}/>
                </View>);
        } else {
            return (
                <View style={styles.container}>
                        <Text>Loading...</Text>
                </View>
            )
        }
	}
}

const styles = StyleSheet.create({
	container: {
        flexDirection: 'column',
		justifyContent: 'space-between',
        alignItems: 'center',
    },
    normalText: {
        fontSize: 30,
        fontFamily: "Roboto",
        color: 'white'
    }
})