import express from "express"
import { ProductManager } from "./ProductManager.js"

const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const productManager = new ProductManager()


app.get("/products", async (req,res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()
        const productsLimited = limit ? products.slice(0, parseInt(limit, 10)) : products;
        res.json({products: productsLimited})
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" })
    }
})

app.get("/products/:pid", async (req,res) => {
    try {
        let pid = req.params.pid
        const products = await productManager.getProducts()
        let product = products.find(p => p.id == pid)
    
        if(!product) {
            return res.status(404).json({error: "Producto no encontrado"})
        }
        res.json({ product })
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto"})
    }
})

app.listen(PORT, () => {
    console.log(`¡Servidor escuchando en el puerto ${PORT}!`)
})