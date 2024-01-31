import { ProductManager } from "./ProductManager.js"

const test = async () => {
    const productManager = new ProductManager()

    const test1 = await productManager.getProducts()


    const productoPrueba = {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    }

    const test2 = await productManager.addProduct(productoPrueba)
    const test3 = await productManager.addProduct(productoPrueba)

    const test4 = await productManager.getProducts()

    const test5 = await productManager.getProductById(1)
    const test6 = await productManager.getProductById(2)

    const productoPruebaUpdated = {
        title: "producto prueba modificado",
        description: "Este es un producto prueba modificado",
        price: 300,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 30
    }

    const test7 = await productManager.updateProduct(1, productoPruebaUpdated)
    const test8 = await productManager.updateProduct(2, productoPruebaUpdated)
    const test9 = await productManager.getProducts()

    const test10 = await productManager.deleteProduct(2)
    const test11 = await productManager.deleteProduct(1)
    const test12 = await productManager.getProducts()
    
}

test()