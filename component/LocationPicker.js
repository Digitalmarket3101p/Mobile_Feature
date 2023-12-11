import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from "react-redux";
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';

import Text from "./Text";
import Button from "./Button";
import {setLoading} from "../actions";
import styles from "../styles";

const LocationPicker = ({onLocationSelect, navigate, route}) => {
    const dispatch = useDispatch();

    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (route?.params?.selectedLocation)
            setLocation({coords: route?.params?.selectedLocation});
        onLocationSelect({coords: route?.params?.selectedLocation});
    }, [route?.params?.selectedLocation]);

    const grantPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.', [{text: 'Okay!'}]);
            return false;
        }

        return true;
    };

    const getLocationHandler = async () => {
        const result = await grantPermission();
        if (!result)
            return;

        dispatch(setLoading(true));

        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            onLocationSelect(location);
        } catch (err) {
            Alert.alert('Something went wrong!', 'Something went wrong while getting your location.', [{text: 'Okay'}]);
        }

        dispatch(setLoading(false));
    };

    return (
        <View style={styles.picker}>
            <TouchableOpacity activeOpacity={0.6} style={styles.preview} onPress={() => navigate('MapScreen', {
                editable: true,
                lat: location?.coords?.latitude || -122.43,
                lon: location?.coords?.longitude || 37.78
            })}>
                {location ?
                    <Image source={{
                        uri: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-o+f00(${location.coords.longitude},${location.coords.latitude})/${location.coords.longitude},${location.coords.latitude},15,0,60/200x150?access_token=pk.eyJ1IjoiYXJpYW1hbiIsImEiOiJja2VpczA2dHYwbmYzMnpvNnFldng1a20zIn0.MthUVi2rI2gQpVKvKW3fSA`
                    }} style={styles.takenImage}/> :
                    <>
                        <Text>You haven't selected any location yet.</Text>
                        <Text>Click to pick on map.</Text>
                    </>
                }
            </TouchableOpacity>
            <Button color={1} title="Select Location Using GPS" onPress={getLocationHandler} style={{marginBottom: 10}}/>
            <Button color={1} title="Select Location Using Map" onPress={() => navigate('MapScreen')}/>
        </View>
    );
};

export default LocationPicker;