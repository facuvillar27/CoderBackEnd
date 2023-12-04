import fs from "fs"
import { createFile, readFile, updateFile, deleteFile } from "./helper.js"

const FILE_NAME = "./products.json"

export default class ProductManager {
    constructor() {
        this.products = readFile(FILE_NAME)
    }

    async getProducts(product) {
        try {
            if (fs.existsSync(FILE_NAME)) {
                this.products = await readFile(FILE_NAME)
                return this.products
            }
            else {
                this.products = []
                return this.products
            }
        } catch (error) {
            console.log(`Error al obtener los productos: ${error.message}`)
        }
    }

    // async getProductById(id) {
    //     try {
    //         const products = await readFile(FILE_NAME)
    //         const product = products.find(p => p.id === id)
    
    //         if (!product) {
    //             throw new Error(`No se encontró un producto con ID ${id}`)
    //         }

    //         const existingProductIndex = products.findIndex(product => product.id === id)
    //         console.log(this.products[existingProductIndex])
    //         return products[existingProductIndex]
    //     } catch (error) {
    //         console.log(`Error al obtener el producto con ID ${id}: ${error.message}`)
    //         return null
    //     }
    // }

    // async addProduct(product) {
    //     try {
    //         // Cargar productos desde el archivo si aún no se han cargado
    //         const products = await readFile(FILE_NAME);
    
    //         // Verificar si ya existe un producto con el mismo código
    //         const productExists = products.some(existingProduct => existingProduct.code === product.code);
    
    //         if (productExists) {
    //             throw new Error(`Error: El producto con código ${product.code} ya existe.`);
    //         } else {
    //             const existingIds = new Set(products.map(product => product.id));
    //             let newId = 1;
    //             while (existingIds.has(newId)) {
    //                 newId++;
    //             }
    //             product.id = newId;
    //             products.push(product);
    //             createFile(JSON.stringify(products), FILE_NAME);
    //         }
    //     } catch (error) {
    //         console.log(`Error al agregar el producto: ${error.message}`)
    //     }
    // }

    // async updateProduct(id, updatedProduct) {
    //     try {
    //         const products = await readFile(FILE_NAME);
    //         const existingProductIndex = products.findIndex(product => product.id === id)
    
    //         if (existingProductIndex !== -1) {
    //             // Actualizar el producto existente con las nuevas propiedades
    //             products[existingProductIndex] = { ...products[existingProductIndex], ...updatedProduct };
    //             await updateFile(JSON.stringify(products), FILE_NAME);
    //         } else {
    //             throw new Error(`Error: No se encontró un producto con ID ${id}`)
    //         }
    //     } catch (error) {
    //         console.log(`Error al actualizar el producto: ${error.message}`)
    //     }
    // }

    // async deleteProduct(id) {
    //     try {
    //         const products = await readFile(FILE_NAME);
    //         const productIndex = products.findIndex(product => product.id === id)
    
    //         if (productIndex !== -1) {
    //             products.splice(productIndex, 1);
    //             await updateFile(JSON.stringify(products), FILE_NAME);
    //         } else {
    //             throw new Error(`Error: No se encontró un producto con ID ${id}`)
    //         }
    //     } catch (error) {
    //         console.log(`Error al eliminar el producto: ${error.message}`)
    //     }
    // }
}

export { ProductManager }