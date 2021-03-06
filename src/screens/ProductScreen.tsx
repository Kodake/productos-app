import { Picker } from '@react-native-picker/picker';
import { Callback, CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ProductsContext } from '../context/ProductsContext';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '', name = '' } = route.params;

    const [tempUri, setTempUri] = useState<string>();

    const { categories, isLoading } = useCategories();
    const { loadProductById, addProduct, updateProduct, deleteProduct, uploadImage } = useContext(ProductsContext);
    // const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });

    useEffect(() => {
        navigation.setOptions({
            // title: (name) ? name : 'Nombre del producto'
            title: (nombre) ? nombre : 'Nombre del producto'
        });
    }, [nombre]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        if (id.length === 0) return;
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            nombre,
            img: product.img || ''
        })
    }

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            updateProduct(categoriaId, nombre, _id);
        } else {
            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await addProduct(tempCategoriaId, nombre);
            onChange(newProduct._id, '_id');
        }
    }

    // const onDeleteProduct = async () => {
    //     await deleteProduct(_id);
    //     navigation.navigate('ProductsScreen');
    // }

    const onDeleteProduct = async () => {
        Alert.alert('Eliminaci??n de producto', '??Desea eliminar el producto?',
            [{
                text: 'Ok', onPress: async () => {
                    setLoading(true);
                    await deleteProduct(_id);
                    setLoading(false);
                    navigation.navigate('ProductsScreen');
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
        Alert.alert('Eliminaci??n de producto', 'Producto eliminado correctamente',
            [{
                text: 'Ok', onPress: () => { }
            }]
        );
    }

    const takePhoto = () => {
        launchCamera({
            cameraType: 'back',
            mediaType: 'photo',
            quality: 0.5
        }, (resp: any) => {
            if (resp.didCancel) return;
            if (!resp.assets[0].uri) return;

            setTempUri(resp.assets[0].uri);
            uploadImage(resp, _id)
        });
    }

    const takePhotoFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp: any) => {
            if (resp.didCancel) return;
            if (!resp.assets[0].uri) return;

            setTempUri(resp.assets[0].uri);
            uploadImage(resp, _id)
        });
    }

    if (isLoading || loading) return <LoadingScreen />;

    return (
        <View style={styles.productContainer}>

            <ScrollView>
                <Text style={styles.textLabel}>Nombre del producto:</Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                <Text style={styles.textLabel}>Categor??a:</Text>

                <View
                    style={styles.textInput2}
                >
                    <Picker
                        selectedValue={categoriaId}
                        onValueChange={(value) => onChange(value, 'categoriaId')}
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
                    onPress={saveOrUpdate}
                    color='#4361ee'
                />

                {
                    _id.length > 0 && (
                        <View style={styles.buttonDirection}>
                            <Button
                                title='C??mara'
                                // TODO: POR HACER METODO
                                onPress={takePhoto}
                                color='#2a9d8f'
                            />

                            <Button
                                title='Galer??a'
                                // TODO: POR HACER METODO
                                onPress={takePhotoFromGallery}
                                color='#2a9d8f'
                            />

                            <Button
                                title="Eliminar"
                                onPress={onDeleteProduct}
                                color="#e63946"
                            />
                        </View>
                    )
                }

                {
                    (img.length > 0 && !tempUri) && (
                        <Image
                            style={styles.imageContainer}
                            source={{ uri: img }}
                        />
                    )
                }

                {/* Mostrar imagen temporal */}
                {
                    (tempUri) && (
                        <Image
                            style={styles.imageContainer}
                            source={{ uri: tempUri }}
                        />
                    )
                }

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
    },
    imageContainer: {
        width: '100%',
        height: 300,
        marginTop: 20
    }
});

export default ProductScreen;