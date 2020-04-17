require('dotenv/config');
const database = require('../models')
const Product = database.Product

exports.findAll = async () => {
    const products = await Product.findAll();
    if (products)
        return products;
    return null;
}

exports.create = async (data) => {
    console.log("Creating : " + data)
    const product = await Product.create(data);
    if (product)
        return product;
    return null;
}
exports.update = async (data) => {
    var product = await Product.findByPk(data.id);
    if (!product) {
        return null;
    }
    product.name = data.name;
    product.price = data.price;
    product.discount = data.discount;
    product.type = data.type;
    product.value = data.value;
    await product.save();
    return product;
}

exports.findOne = async (id) => {
    const product = await Product.findByPk(id);
    if (product)
        return product;
    return null;
}

exports.findByName = async (name) => {
    const product = await Product.findOne({ where: { name } });
    if (product)
        return product;
    return null;
}

exports.delete = async (id) => {
    const product = await Product.findByPk(id);
    var result = false;
    if (product) {
        result = await product.destroy().then((result) => {
            return true;
        }).catch((err) => {
            return false;
        });

    }
    return { "Success": result }
}