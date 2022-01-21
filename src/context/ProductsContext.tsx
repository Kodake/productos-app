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
    uploadImage: (data: any, id: string) => Promise<void>; // Change type then
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const resp = await productsApi.get<ProductsResponse>('/productos?limite=50');
        // setProducts([...products, ...resp.data.productos]);
        setProducts([...resp.data.productos]);
    }

    const addProduct = async (categoryId: string, productName: string):Promise<Producto> => {
        const resp = await productsApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([...products, resp.data]);
        return resp.data;
    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        try {
            const resp = await productsApi.put<Producto>(`/productos/${productId}`, {
                nombre: productName,
                categoria: categoryId
            });
            setProducts([...products.map(prod => prod._id === productId ? resp.data : prod)]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id: string) => {        
        const resp = await productsApi.delete<Producto>(`/productos/${id}`);      
        setProducts(products.filter(prod => prod._id !== resp.data._id));        
    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await productsApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    }

    // TODO: Change type then
    const uploadImage = async (data: ImagePickerResponse, productId: string) => {
        const fileToUpload = {
            uri: data.assets?.map(x => x.uri),
            type: data.assets?.map(x => x.type),
            name: data.assets?.map(x => x.fileName)
        }

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        try {
            const resp = await productsApi.put<Producto>(`/uploads/productos/${productId}`, formData);
            console.log(resp);
        } catch (error) {
            console.log(error);
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
            uploadImage
        }}>
            {children}
        </ProductsContext.Provider>
    )
}