import { Schema, model } from "mongoose";

const cateSchema = Schema({
    catename:{
        type: String,
        required: [true, "El nombre de la categoria es requerido"],
        maxLength: [25, "No exederce más de 25 caracteres"]
    },
    catedescription:{
        type: String,
        required: [true, "La descripción de la categoria es requerida"],
        maxLength: [100, "No excederce más de 100 caracteres"]
    },
    status:{
        type: Boolean,
        default: true
    }
})

cateSchema.methods.toJSON = function(){
    const { _id, ...cate } = this.toObject()
    cate.uid = _id
    return cate
}

export default model("Categoria", cateSchema)