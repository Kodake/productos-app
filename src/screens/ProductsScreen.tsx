import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts } = useContext(ProductsContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.65}
                    style={styles.addProduct}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                >
                    <Text style={styles.addProductText}>Agregar</Text>
                </TouchableOpacity>
            )
        })
    }, [])

    // TODO: PUll to refresh

    return (
        <View style={styles.productsContainer}>

            <FlatList
                data={products}
                keyExtractor={(p) => p._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.65}
                        onPress={() => navigation.navigate('ProductScreen', {
                            id: item._id,
                            name: item.nombre
                        })}
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    addProduct: {
        marginRight: 20
    },
    addProductText: {
        color: 'white',
        backgroundColor: '#4361ee',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5
    },
    productsContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    productName: {
        fontSize: 20
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    }
});

export default ProductsScreen;