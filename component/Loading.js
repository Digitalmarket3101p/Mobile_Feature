import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import Colors from "../constants/Colors";
import styles from "../styles";

const Loading = ({message}) => {
    return (
        <View style={{...styles.screen, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary}/>
            <Text>{message || 'Loading...'}</Text>
        </View>
    );
};

export default Loading;