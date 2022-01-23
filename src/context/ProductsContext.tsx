import React, { createContext, useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import productsApi from '../api/productsApi';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])


    const loadProducts = async () => {
        const resp = await productsApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...resp.data.productos]);
    }

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {

        const resp = await productsApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([...products, resp.data]);

        return resp.data;
    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        const resp = await productsApi.put<Producto>(`/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId
        });
        setProducts(products.map(prod => {
            return (prod._id === productId)
                ? resp.data
                : prod;
        }));
    }

    const deleteProduct = async (id: string) => {
        const resp = await productsApi.delete<Producto>(`/productos/${id}`);
        setProducts(products.filter(prod => prod._id !== resp.data._id));
    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await productsApi.get<Producto>(`productos/${id}`);
        return resp.data;
    };

    const uploadImage = async (data: any, id: string) => {

        console.log(data.assets[0]);

        const fileToUpload = {
            uri: data.assets[0].uri,
            type: data.assets[0].type,
            name: data.assets[0].fileName
        }

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        console.log(id);
        
        try {

            const resp = await productsApi.put(`/uploads/productos/${id}`, formData)
            console.log(resp);
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}