class Cart {

    constructor({id, products}) {
        this.id = id ? id : 0;
        this.products = products ? products : [];
    }

    getCart = () => {
        return {
            id: this.id,
            products: this.products,
        }
    }

}

module.exports = Cart;