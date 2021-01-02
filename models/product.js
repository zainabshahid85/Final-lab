var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    pId: Number,
    name: String,
    catagory: String,
    price: String,
    details: String,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;