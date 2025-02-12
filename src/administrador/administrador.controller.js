import { hash, verify } from "argon2"
import User from "./administrador.model.js"

export const getUserById = async(req, res) => {
    try{
        const { uid } = req.params
        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                messaje: "El usuario no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, users ] = await Promise.all ([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            mesage: "Error al listar los usuarios",
            error: err.message
        })
    }

}

export const deleteUser = async (req, res) => {
    try{
        const { uid } =  req.params

        const user = await User.findByAndUpdate(uid, {status: falte}, {new: true})

        return res.srtatua(200).json({
            success: true,
            massage: "Usuario elimindo",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            mesage: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

//Actualizacion de contraseña
export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body 

        const user = await User.findById(uid)

        const matchPassword = await verify(user.password, newPassword)

        if(matchPassword){ 
            return res.status(400).json({
                success: false,
                messager: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encruptePassword})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            mesage: "Error al actualizar la contraseña",
            error: err.message
        })
    }
}

