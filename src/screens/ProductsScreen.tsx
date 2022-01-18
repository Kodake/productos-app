import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Alert } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts, deleteProduct } = useContext(ProductsContext);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
    }, []);

    const pullToRefresh = async () => {
        setIsRefreshing(true);
        await loadProducts();
        setIsRefreshing(false);
    }

    const onDeleteProduct = async (id: string) => {
        Alert.alert('Eliminación de producto', '¿Desea eliminar el producto?',
            [{
                text: 'Ok', onPress: async () => {
                    setIsLoading(true);
                    await deleteProduct(id);
                    setIsLoading(false);
                    onSuccessDelete();
                }
            },
            {
                text: 'Cancel',
                onPress: () => { }
            }]
        );
    }

    const onSuccessDelete = () => {
        Alert.alert('Eliminación de producto', 'Producto eliminado correctamente',
            [{
                text: 'Ok', onPress: () => { }
            }]
        );
    }

    // TODO: PUll to refresh

    if (isLoading) return <LoadingScreen />;

    return (
        <View style={styles.productsContainer}>
            <FlatList
                data={products}
                keyExtractor={(p) => p._id}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.65}
                            onPress={() => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre
                            })}
                            onLongPress={onDeleteProduct.bind(null, item._id)}
                        >
                            <Text style={styles.productName}>{item.nombre}</Text>
                        </TouchableOpacity>
                    </>
                )}

                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}

                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={pullToRefresh}
                    />
                }
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