import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row'
            }}
        >
            <ActivityIndicator
                size={50}
                color='blue'
            />

            <ActivityIndicator
                size={50}
                color='red'
            />

            <ActivityIndicator
                size={50}
                color='green'
            />
        </View>
    )
}
