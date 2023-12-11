import React from 'react';
import {Text as RNText} from 'react-native';

import styles from "../styles";

const Text = ({style, size = 5, ...props}) => {
    return (
        <RNText style={{...styles.text, ...styles[`text${size}`], ...style}} {...props}/>
    );
};

export default Text;