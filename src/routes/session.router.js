import {Router} from "express";
import passport from "passport";
import config from "../config/config.js";
import { passportCall } from "../utils.js";
import {changePassword, 
    sendRecoveryMail, 
    changeUserRole, 
    login, 
    current,
    logout
} from "../controllers/session.controlers.js";

const router = Router()

router.post("/forgotPassword", sendRecoveryMail);

router.get('/forgotPassword', (req, res) => {
    res.render('sessions/forgotPassword')
})

router.post("/forgotPassword/:uid/:token", changePassword);

router.get('/forgotPassword/:uid/:token', (req, res) => {
    const uid = req.params.uid
    const token = req.params.token
    res.render('sessions/changePassword', {uid: uid, token: token})
})

//Cambio de Rol
router.get("/changeUserRole", passportCall("jwt"), changeUserRole)

//Profile
router.get('/current', passportCall('jwt'), current)

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), async (req, res) => {
    res.redirect('/session/login')
})
router.get('/failregister', (req, res) => {
    req.logger.warning('Fail Strategy');
    res.send({error: "Failed"})
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login', {style: "/css/login.css"})
})

// API para login
router.post('/login', passport.authenticate('login', {failureRedirect: '/session/faillogin'}), login)

router.get('/faillogin', (req, res) => {
    req.logger.warning("Fail Login")
    res.send({error: "Fail Login"})
})

router.get('/profile', (req, res) => {
    res.json(req.session.user)
})

// Cerrar Session
router.get('/logout', logout)

//Para iniciar con GitHub
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/session/login'}), async (req, res) => {
        req.session.user = req.user
        res.redirect('/products')
    }
)

export default router