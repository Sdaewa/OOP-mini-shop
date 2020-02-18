class Product {

    constructor(title, photo, price, desc) {
        this.title = title;
        this.photo = photo;
        this.price = price;
        this.description = desc
    }
};

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
};

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, cssClasess, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasess) {
            rootElement.className = cssClasess;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
};

class ShoppinCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.total.innerHTML = `<h2>Total amount: \$${this.totalAmount} </h2>`;
    };

    get totalAmount() {
        const sum = this.items.reduce((prevVal, curItem) => prevVal + curItem.price, 0);
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total amount: \$${0} </h2>
        <button>Order</button>
        `;
        this.total = cartEl.querySelector('h2');
    }
};

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId);
        this.product = product;
    }
    addToCart() {
        App.addProductToCart(this.product);
    };
    render() {
        const prodEl = this.createRootElement('lil', 'product-item');
        prodEl.innerHTML = `
            <div>
             <img src='${this.product.photo}' alt='${this.product.title}'>
             <div class='product-item__content'>
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>'Add to cart'</button>
             </div>
            </div>
            `;
        const addBtn = prodEl.querySelector('button');
        addBtn.addEventListener('click', this.addToCart.bind(this));
    }
};

class Productlist extends Component {
    products = [
        new Product('A pillow',
            'https://cdn.shopify.com/s/files/1/0088/8134/0478/products/Fine_Bedding_Junior_Washable_Pillow_Junior_1024x1024.jpg?v=1559914222',
            10,
            'white'),
        new Product('A carpet',
            'http://www.flooringvault.com/wp-content/uploads/2018/10/Carpet.jpg',
            20,
            'brown')
    ];
    constructor(renderHookId) {
        super(renderHookId);
    };
    render() {
        this.createRootElement('li', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        for (const prod of this.products) {
            const productItem = new ProductItem(prod, 'prod-list');
            productItem.render();
            // prodList.append(prodEl);
        }
    }
};

class Shop {
    render() {
        this.cart = new ShoppinCart('app');
        this.cart.render();
        const productlist = new Productlist('app');
        productlist.render();
    }
};

class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }
    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
};

App.init();
// const shop = new Shop();
// shop.render();
// const productlist = new Productlist();
// productlist.render();