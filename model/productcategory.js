const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        name:{type:String, require:true},
        srno:{type:String, require: true},
        imagepath:{type:String}
    }
);
let Productcategory = mongoose.model("productategories", schema);
module.exports = Productcategory;