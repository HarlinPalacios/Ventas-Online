import { Router } from "express"
import { getCateByIdValidator, deleteCateValidator, updateCateValidator} from "../middlewares/cate-validator.js"
import { getCates, deleteCate, updateCate, getCateById } from "./cate.controller.js"

const router = Router()

router.get("/findCate/:uid", getCateByIdValidator, getCateById)

router.get("/", getCates)

router.delete("/deleteCate/:uid", deleteCateValidator, deleteCate)

router.patch("/updateCate/:uid", updateCateValidator, updateCate)

export default router