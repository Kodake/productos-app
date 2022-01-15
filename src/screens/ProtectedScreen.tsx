import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

const ProtectedScreen = () => {

    const { user, token, logOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Protected Screen</Text>

            <Button
                title='logOut'
                color='#4361ee'
                onPress={logOut}
            />

            <Text>
                {JSON.stringify(user, null, 5)}
            </Text>

            <Text>
                {token}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }
})

export default ProtectedScreen;
