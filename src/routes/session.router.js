import { Router } from "express";
import passport from "passport";
import config from "../config/config.js";
import { UserService } from "../repository/index.js";
import { authorization, passportCall } from "../utils.js";

const router = Router()

//Profile
router.get('/current', passportCall('jwt'), authorization('user'), async (req, res)=>{
    const id = req.user.user._id
    const user = await UserService.getOneByID(id)
    res.render('sessions/profile', {user: user})
})

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login')
})
router.get('/failregister', (req, res) => {
    req.logger.warning('Fail Strategy');
    res.send({ error: "Failed" })
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login', {style: "/css/login.css"})
})

// API para login
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentiales" })
    }
    res.cookie(config.jwtCookieName, req.user.token).redirect('/products')
    
})
router.get('/faillogin', (req, res) => {
    req.logger.warning("Fail Login")
    res.send({error: "Fail Login"})
})

router.get('/profile', (req, res) => {
    res.json(req.session.user)
})

// Cerrar Session
router.get('/logout', (req, res) => {
    res.clearCookie(config.jwtCookieName).redirect('/session/login');
})

//Para iniciar con GitHub
router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email']}),
    async(req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/session/login'}),
    async(req, res) => {

        req.session.user = req.user
        res.redirect('/products')
    }
)



export default router