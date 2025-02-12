import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name connot exceed 25 charactes"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name connot exceed 25 charactes"]
    },
    username:{
        type: String,
        required: true,
        inique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePinture: {
        type: String,
    },
    phone:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    //timeStamps deja una marca de tiempo en en documento cuendo fue editado, cambio de contraseña.
    timeStamps: true
})

//Desestructurando el password y el id
userSchema.methods.toJSON = function(){
    const { password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default model("User", userSchema)