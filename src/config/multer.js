import multer from "multer";
import __dirname from "../utils.js";

const storageMulterProfiles = multer.diskStorage({
    destination: function(req, file, cb) {
        const uid = req.user.user._id
        cb(null, `${__dirname}/images/profiles`)
    },
    filename: function(req, file, cb) {
        cb(null, `${uid}.png`)
    }
})

export const uploaderProfile = multer({storageMulterProfiles})

const storageMulterDocuments = multer.diskStorage({
    destination: function(req, file, cb) {
        const uid = req.user.user._id
        cb(null, `${__dirname}/documents/${uid}`)
        console.log("funca")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
        console.log("funca")
    }
})

export const uploaderDocument = multer({storageMulterDocuments}).any

const storageMulterProducts = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/images/products`)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploaderProduct = multer({storageMulterProducts})
