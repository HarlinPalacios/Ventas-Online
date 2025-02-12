import { hash } from "argon2"
import Categoria from "./cate.model.js"

//Buscar las Categorias
export const getCateById = async(req, res) => {
    try{
        const { uid } = req.params
        const categoria = await Categoria.findById(uid)

        if(!categoria){
            return res.status(400).json({
                success: false,
                messaje: "La categoria no existe",
                error: err.messaje
            })
        }

        return res.status(200).json({
            success: true,
            categoria
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoria",
            error: err.message
        })
    }
}

//Listar Las Categorias
export const getCates = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, cates ] = await Promise.all ([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            cates
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            mesage: "Error al listar las categorias",
            error: err.message
        })
    }

}

//Eliminar categoria 
export const deleteCate = async (req, res) => {
    try{
        const cateId = req.params.cateId

        const cate = await Categoria.findById(cateId)

        if(productos.lengt > 0) {
            const defaultCate = await Categoria.findOne({ name: 'cate-predeterminada'})

            await Productos.updateMany({
                cateId ,
                cateId: defaultCate.id 
        })
        }

        await cate.remove()

        return res.status(200).json({
            message: "Categoria eliminada correectamente"
        })

    }catch(error){
        return res.satus(500).json({
            message: "Error al eliminar la Categoria", error
        })
    }
}

//Actualizar categoria 
export const updateCate = async (req, res) => {
    const { id } = req.params
    const { catename, catedescription } = req.body

    try{
        const cate = await Categoria.findById(id)

    if(!cate) {
        return res.status(404).json({
            message: " Categoria no encontrada"
        })
    }

    cate.catename = catename.catenama || catename.catename
    cate.catedescription = catedescription || cate.catedescription

    await cate.save()

    return res.status(200).json ({
        message: "Categoria actualizada", cate
    })
    
    }catch(error) {
        console.error(error)
        return res,satatus(500).json({
            message: "Error al actualizar la categoria",
            error: err.mesage
        })
    }
}