import multer from "multer";
import __dirname from "../utils.js";
import { UserService } from "../repository/index.js";

function fileFilter(req, file, cb){

    if (!file.originalname.includes('.pdf') && !file.originalname.includes('.png')) return cb(null, false);
    
    if(file.originalname.includes('.pdf')){
        if (!file.originalname.includes('identificacion') && !file.originalname.includes('comprobante de domicilio') && !file.originalname.includes('comprobante de estado de cuenta')){
            return cb(null, false);
        }
    }
    if (file.originalname.includes('.png')) {
        if (!file.originalname.includes('profile')) {
            return cb(null, false);
        }
    }
    return cb(null, true);
}

const storageMulterProfiles = multer.diskStorage({
    destination: function(req, file, cb) {
        file.originalname = file.originalname.replace(/\s/g, "");
        cb(null, `files/profileImg/`)
    },
    filename: async function(req, file, cb) {
        const uid = req.user.user._id
        const docName = `${uid}-${file.originalname}`
        const reference = `profileImg/${docName}`
        const name = file.originalname.split(".")
        await UserService.addDocs(uid, name[0], reference)
        cb(null, docName)
    }
})

export const uploaderProfile = multer({storage: storageMulterProfiles, fileFilter}).single("imgProf")

const storageMulterDocuments = multer.diskStorage({
    destination: function(req, file, cb) {
        file.originalname = file.originalname.replace(/\s/g, "");
        cb(null, `files/documents/`)
    },
    filename: async function(req, file, cb) {
        const uid = req.user.user._id
        const docName = `${uid}-${file.originalname}`
        const reference = `documents/${docName}`
        const name = file.originalname.split(".")
        await UserService.addDocs(uid, name[0], reference)
        cb(null, docName)
    }
})

export const uploaderDocument = multer({storage: storageMulterDocuments, fileFilter}).any("file")

const storageMulterProducts = multer.diskStorage({
    destination: function(req, file, cb) {
        file.originalname = file.originalname.replace(/\s/g, "");
        cb(null, `files/productsImg/`)
    },
    filename: async function(req, file, cb) {
        const uid = req.user.user._id
        const docName = `${uid}-${file.originalname}`
        const reference = `productsImg/${docName}`
        const name = file.originalname.split(".")
        await UserService.addDocs(uid, name[0], reference)
        cb(null, docName)
    }
})

export const uploaderProduct = multer({storage: storageMulterProducts}).single("file")
