import { Router } from "express";
import { uploaderDocument } from "../config/multer.js"

const router = Router()

router.post("/:uid/documents", uploaderDocument, (req, res) => {
    res.json({status: req.file})
})

export default router