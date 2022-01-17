import React from 'react';
import { View } from 'react-native';

interface Props {
    rotate: string;
}

const Background = ({ rotate }: Props) => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#4361ee',
                top: -425,
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: rotate }
                ]
            }}
        />
    )
}

export default Background;