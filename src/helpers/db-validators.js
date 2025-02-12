import User  from "../administrador/administrador.model.js"

export const existeEmail = async(email = '') => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previoamente`)
    }
}

export const existeUsername = async(username = '') => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El email ${username} ya fue registrado previoamente`)
    }
}

export const userExists = async(uid = '') => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error(`El usuario no existe`)
    }
}