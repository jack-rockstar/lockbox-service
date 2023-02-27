import { USERS, writeDbFile } from '../utils/jsonUtils.js'
import { logError, logInfo, logSuccess } from '../utils/logs.js'
import { randomUUID } from 'node:crypto'

export const getUsers = (req, res) => {
  try {
    logInfo('API [getUsers]...')
    return res.status(200).json({ status: 200, message: 'correct operation', data: USERS })
  } catch (error) {
    logError('Error API [getUsers]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const getUserById = (req, res) => {
  try {
    const { id } = req.params
    const userFound = USERS.filter(user => user.id === Number(id))

    return userFound
      ? res.status(200).json({ status: 200, message: 'correct operation', data: userFound })
      : res.status(404).json({ status: 404, message: 'user not found', data: [] })
  } catch (error) {
    logError('Error API [getUserById]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const createUser = async (req, res) => {
  try {
    logInfo('API [createUser]...')
    const { name, lastName, correo } = req.body
    if (!name || !lastName || !correo) {
      logError('Incomplete data')
      return res.status(400).json({ status: 400, message: 'Incomplete data', data: [] })
    }
    const newUser = {
      name,
      lastName,
      correo
    }
    const user = await createUserDb(newUser)
    logSuccess(`User created ${JSON.stringify(user)}`)
    return res.status(200).json({ status: 200, message: 'correct operation', data: user })
  } catch (error) {
    logError('Error API [createUser]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const createUserDb = async (newUser) => {
  logInfo('>>> Creating user')
  newUser = { id: randomUUID(), ...newUser }
  const newUsers = [...USERS, newUser]
  await writeDbFile('users', newUsers)
  logInfo('>>> User created')
  return newUser
}
