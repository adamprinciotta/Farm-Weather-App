import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Linking,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';

function getRainDays(weatherData){
    let rainDays = (weatherData.currently.precipProbability >= 0.5)? 1: 0;
    for(let i = 0; i <= 6; i++){
        if(weatherData.daily.data[i].precipProbability >= 0.5){
            rainDays++;
        }
    }
    return rainDays;
}

function getSuggestions(temperature, rainfall, plantdata) {
    let reccomendStatus = [[]];
    for(let i = 0; i <= plantdata.plants.length-1; i++){
        let currPlant = plantdata.plants[i];
        if(rainfall >= currPlant.minwater && rainfall <= currPlant.maxwater){
            if(temperature >= currPlant.minbesttemp && temperature <= currPlant.maxbesttemp){
                reccomendStatus.push([2, currPlant.name]);
            } else if(temperature >= currPlant.mintemp && temperature <= currPlant.maxtemp){
                reccomendStatus.push([1, currPlant.name]);
            } else {
                reccomendStatus.push([0, currPlant.name]);
            }
        } else {
            reccomendStatus.push([0, currPlant.name]);
        }
    }
    return reccomendStatus.sort().reverse();
}

function getRecommendText(recommendLevel) {
    let recommendText = "";
    switch (recommendLevel) {
        case 0:
            recommendText = "Not Recommended";
            break;
        case 1:
            recommendText = "Good Conditions";
            break
        case 2:
            recommendText = "Perfect Conditions!";
            break
        default:
            break;
    }
    return recommendText;
}
export default class PlantPage extends Component {
    state = {
        plantdata: require('./plants.json'),
        suggestions: null,
    };

    render() {
        let rainDays = getRainDays(this.props.weatherData);
        let suggestions = getSuggestions(this.props.weatherData.currently.temperature, rainDays, this.state.plantdata);
        return (
            <View style={{
                flex: 0,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#827459'
            }}>
                <View style={styles.tinyHorizontalPad}></View>
                <SuggestionList suggestions={suggestions} numberOfPlants={this.state.plantdata.plants.length}/>
            </View>
        )
    }
}

class MainHeader extends Component {
    render() {
        let recommendLevel = this.props.suggestions[0][0];
        let recommendText = getRecommendText(recommendLevel);
        let plantName = this.props.suggestions[0][1];
        const icon = IMAGES[plantName];

        return (
            <View style={{
                flex:0,
                flexDirection:"row",
                justifyContent: "space-around",
                alignItems:"center",
                height: Dimensions.get('window').height*7/30,
                width: Dimensions.get('window').width*95/100,
                backgroundColor:'#413735',
                borderRadius: 20,
            }}>
                <Image style={{
                            width: 124,
                            height: 124,
                        }}
                        source={icon}/>
                <View style={{}}>  
                    <Text style={styles.headerText}>{recommendText}</Text>
                    <Text style={styles.basicText}> {plantName} </Text>
                </View>
            </View>
        )
    }
}

class SuggestionList extends Component {
    render() {
        // Create array of consecutive numbers for iterating through suggestionbox components
        let priorityIndex = [];
        for (let ii = 0; ii < this.props.numberOfPlants; ii++) {priorityIndex[ii] = ii; }

        // Map this array to scrollview compontents and save to results
        let results = priorityIndex.map((priority) =>
            <>
                <SuggestionBox priority={priority} suggestions={this.props.suggestions}/>
                <View style={styles.tinyHorizontalPad}/>
            </>
        );

        return (
            <SafeAreaView style={{
                flex: 1,
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                justifyContent: "center",
                alignItems: "center",                
            }}>
                <ScrollView>
                    <View style={{
                        alignItems: "center"
                    }}>
                        <View style={styles.tinyHorizontalPad}/>
                        {results}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

class SuggestionBox extends Component {
    render() {
        let priority = this.props.priority;
        let recommendLevel = this.props.suggestions[priority][0];
        let recommendText = getRecommendText(recommendLevel);
        let plantName = this.props.suggestions[priority][1];
        let url = "https://www.gardeningknowhow.com/search?q=" + plantName;
        const icon = IMAGES[plantName];

        return (
            <View style={{
                flex:0,
                flexDirection:"row",
                justifyContent: "space-around",
                alignItems:"center",
                height: Dimensions.get('window').height*7/30,
                width: Dimensions.get('window').width*95/100,
                backgroundColor:'#cacaa1',
                borderRadius: 20,
            }}>
                <Image style={{
                            width: 100,
                            height: 100,
                        }}
                        source={icon}/>
                <View style={{}}>  
                    <Text style={styles.headerText}>{recommendText}</Text>
                    <Text style={styles.basicText}>{plantName} </Text>
                    <Text style={styles.basicURL} 
                         onPress={()=> Linking.openURL(url)}
                    > 
                    Learn how to plant!
                    </Text>
                </View>
            </View>
        )
    }
}

const IMAGES = {
    'mushrooms' : require('./icons/mushroom.png'),
    'spinach' : require('./icons/spinach.png'),
    'potato' : require('./icons/potato.png'),
    'eggplant' : require('./icons/eggplant.png'),
    'onion' : require('./icons/onion.png'),
    'sweet potato' : require('./icons/sweet-potato.png'),
    'lettuce' : require('./icons/lettuce.png'),
    'broccoli' : require('./icons/broccoli.png'),
    'peas' : require('./icons/peas.png'),
    'carrots' : require('./icons/carrot.png'),
    'bellpepper' : require('./icons/pepper.png'),
    'blueberry' : require('./icons/blueberry.png'),
    'strawberry' : require('./icons/strawberry.png'),
    'tomato' : require('./icons/tomato.png'),
    'cucumber' : require('./icons/cucumber.png'),
    'grape' : require('./icons/grapes.png'),
    'sunflower' : require('./icons/sunflower.png'),
    'rose' : require('./icons/rose.png'),
    'celery' : require('./icons/celery.png'),
    'turnip' : require('./icons/turnip.png'),
    'pumpkin' : require('./icons/pumpkin.png'),
    'cabbage' : require('./icons/cabbage.png'),
    'cauliflower' : require('./icons/cauliflower.png'),
    'leek' : require('./icons/leek.png'),
    'artichoke' : require('./icons/artichoke.png'),
    'corn' : require('./icons/corn.png'),
    'garlic' : require('./icons/garlic.png'),
    'ginger' : require('./icons/ginger.png'),
    'radish' : require('./icons/radish.png'),
}

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

    headerText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed'
    },

    basicText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed',
        textTransform: 'capitalize'
    },

    basicDarkText: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed',
        textTransform: 'capitalize'
    },

    basicURL: {
        color:'white',
        fontSize: 20,
        fontFamily: 'sans-serif-condensed',
        textDecorationLine: 'underline'
    },

    dataBox: {
        borderRadius:20,
        width: Dimensions.get('window').width*95/200,
        height: Dimensions.get('window').height*1/3,
        backgroundColor: 'white',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },

    precipText: {
        fontSize: 30,
        color: 'darkgreen'
    },

    precipDesc: {
        fontSize: 14,
        color: 'black',
        textAlignVertical:'center'
    },

    futureWeatherText: {
        
        fontFamily: 'sans-serif-condensed',
        fontSize: 20,
        color: 'darkblue',
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

    tinyHorizontalPad: {
        height: Dimensions.get('window').height*1/64
    },

    buttonPad: {
      height: Dimensions.get('window').height*1/6
    },

    smallVerticalPad: {
      width: Dimensions.get('window').width*1/32
    },

    contentContainer: {
        alignItems: "center",
        color: "red",
    }

});