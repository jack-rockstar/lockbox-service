import { Router } from 'express'
import { createAccount, getAccountByUserId } from '../services/account.js'
import { createSafeBox, getSafesBox } from '../services/safeBox.js'
import { createUser, getUserById, getUsers } from '../services/users.js'

const routes = Router()

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Service working correctly' })
})

routes.get('/users', getUsers)
routes.get('/users/:id', getUserById)
routes.post('/user', createUser)

routes.get('/account/user/:id', getAccountByUserId)
routes.post('/account', createAccount)

routes.get('/safebox', getSafesBox)
routes.post('/safebox', createSafeBox)

export default routes
