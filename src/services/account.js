import { ACCOUNTS, writeDbFile } from '../utils/jsonUtils.js'
import { logError, logInfo, logSuccess } from '../utils/logs.js'
import { createUserDb } from './users.js'
import { randomUUID } from 'node:crypto'

export const getAccountByUserId = (req, res) => {
  try {
    logInfo('API [getAccountByUserId]...')
    const { id } = req.params
    const accountUser = ACCOUNTS.filter(account => account.user_id === id)
    if (!accountUser) {
      return res.status(404).json({ message: 'user not found' })
    }
    logSuccess('Account found')
    return res.status(200).json({ status: 200, message: 'correct operation', data: accountUser })
  } catch (error) {
    logError('Error API [getAccountByUserId]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const createAccount = async (req, res) => {
  try {
    logInfo('API [createAccount]...')
    const data = req.body

    const { user, ...newAccount } = data
    const userSuccess = await createUserDb(user)

    if (!userSuccess) {
      logError('user creation error')
      return res.status(400).json({ status: 400, message: 'user creation error' })
    }

    const accountSuccess = await createAccountDb({ user_id: userSuccess.id, ...newAccount })
    return res.status(200).json(accountSuccess)
  } catch (error) {
    logError('Error API [createAccount]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const createAccountDb = async (newAccount) => {
  logInfo('>>> Creating account')
  newAccount = { id: randomUUID(), ...newAccount }
  const newAccounts = [...ACCOUNTS, newAccount]
  await writeDbFile('accounts', newAccounts)
  logInfo('>>> Account created')
  return newAccount
}
