import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, required:true,ref:"User"},
    orderItems:[{
        name:{type:String,required:true},
        qty:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        product:{type:mongoose.Schema.Types.ObjectId,required:true, ref:"Product"}
    }],
    shippingAddress:{
        address:{type:String},
        city:{type:String},
        postalCode:{type:String},
        country:{type:String},
    },
    paymentMethod:{type:String,required:true},
    paymentResult:{ 
        id:{type:String} ,
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    totalAmount:{ type:Number , required:true,default:0.0},
    totalShipping:{ type:Number,required:true,default:0.0},
    totalGst:{ type:Number,required:true,default:0.0},
    totalDebtingAmount:{ type:Number,required:true,default:0.0},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type:Date},
    },{
        timestamps:true
})

const Order=mongoose.model("Order",orderSchema)
export default Order