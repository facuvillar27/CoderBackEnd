class ProductManager {
    constructor(products) {
        this.products = []
        this.nextId = 1
    }

    addProduct (product) {
        if(!this.isProductValid(product)) {
            console.log("Error: El producto no es válido")
            return
        }
        if (this.isCodeDuplicate(product.code)) {
            console.log("Error: El código del producto ya está siendo utilizado")
            return
        }

        product.id = this.nextId++
        this.products.push(product)
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        const product = this.products.find((p) => p.id === id)
        if(product) {
            return product
        } else {
            console.log("Error: Producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code)
    }
}

// Creo instancia de productManager //

const productManager = new ProductManager()

// Obtengo array vacio //

const test1 = productManager.getProducts()
console.log(test1)

// Agrego producto //

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})

// Obtengo los productos //

const test2 = productManager.getProducts()

console.log(test2)

// Agrego el mismo producto //

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})

// Obtengo un producto inexistente //

const test3 = productManager.getProductsById(2)

// Obtengo un producto existente //

const test4 = productManager.getProductsById(1)

console.log(test4)