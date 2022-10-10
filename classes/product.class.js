class Product {

    constructor({id, name, description, code, price, stock, thumbnail}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.thumbnail = thumbnail;
    }

    getProduct = () => {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            code: this.code,
            price: this.price,
            stock: this.stock,
            thumbnail: this.thumbnail,
        }
    }

}

module.exports = Product;