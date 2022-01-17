import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useCategories } from '../hooks/useCategories';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

const ProductScreen = ({ navigation, route }: Props) => {

    const { id, name = '' } = route.params;

    const { categories, isLoading } = useCategories();

    const [selectedLanguage, setSelectedLanguage] = useState();

    useEffect(() => {
        navigation.setOptions({
            title: (name) ? name : 'Nuevo producto'
        });
    }, [])

    if (isLoading) return <LoadingScreen />;

    return (
        <View style={styles.productContainer}>

            <ScrollView>
                <Text style={styles.textLabel}>Nombre del producto:</Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                />

                <Text style={styles.textLabel}>Categoría:</Text>

                <View
                    style={styles.textInput2}
                >
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }
                    >
                        {
                            categories.map(c => (
                                <Picker.Item
                                    label={c.nombre}
                                    value={c._id}
                                    key={c._id}
                                />
                            ))
                        }
                    </Picker>
                </View>

                <Button
                    title='Guardar'
                    // TODO: POR HACER METODO
                    onPress={() => { }}
                    color='#4361ee'
                />

                <View style={styles.buttonDirection}>
                    <Button
                        title='Cámara'
                        // TODO: POR HACER METODO
                        onPress={() => { }}
                        color='#4361ee'
                    />

                    <Button
                        title='Galería'
                        // TODO: POR HACER METODO
                        onPress={() => { }}
                        color='#4361ee'
                    />
                </View>

            </ScrollView>

            {/* Picker | Selector */}

        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    textLabel: {
        fontSize: 18
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 25,
        marginTop: 5,
        marginBottom: 15
    },
    textInput2: {
        borderWidth: 1,
        padding: 0,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        marginTop: 5,
        marginBottom: 15,
        justifyContent: 'center',
        height: 25
    },
    buttonDirection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,

    }
});

export default ProductScreen;