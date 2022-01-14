import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../components/Background';
// import Background from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import loginStyles from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { };

const RegisterScreen = ({ navigation }: Props) => {

    const { email, password, nombre, onChange } = useForm({
        nombre: '',
        email: '',
        password: ''
    });

    const onRegister = () => {
        console.log({ email, password });
        Keyboard.dismiss();
    }

    return (
        <>
            {/* Background */}
            <Background rotate='0deg' />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={loginStyles.title}>Register</Text>

                    <Text style={loginStyles.label}>Nombre:</Text>
                    <TextInput
                        placeholder='Ingrese su nombre'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        // TODO: onchange, value
                        onChangeText={(value) => onChange(value, 'nombre')}
                        value={nombre}
                        onSubmitEditing={onRegister}
                        autoCapitalize='words'
                        autoCorrect={false}
                    />

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
                        onSubmitEditing={onRegister}
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
                        onSubmitEditing={onRegister}
                    />

                    {/* Boton login */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.buttonSubmit}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear nueva cuenta */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={loginStyles.loginReturn}
                    >
                        <Text style={loginStyles.buttonText}>Ir Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default RegisterScreen;
