import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import loginStyles from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { };

const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);
    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ correo: email, password: password });
    }

    return (
        <>
            {/* Background */}
            <Background rotate='-70deg' />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={loginStyles.title}>Login</Text>

                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        // TODO: onchange, value
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        placeholder='Ingrese su password'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='white'
                        secureTextEntry={true}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        // TODO: onchange, value
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}
                    />

                    {/* Boton login */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.buttonSubmit}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear nueva cuenta */}
                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={loginStyles.buttonText}>New Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default LoginScreen;
