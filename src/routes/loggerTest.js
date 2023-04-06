import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    req.logger.debug('1 + 1 === 2 ????')
    req.logger.info('Se llamo a esta url')
    req.logger.warning('Dont worry, it is just a warning')
    req.logger.error('Se cayo el server 🥪 ')
    req.logger.fatal("Se pudrio todo!")
    res.send({message: 'Logger Test'})
})

export default router
