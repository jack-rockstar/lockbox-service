import { SAFE_BOX, USERS, writeDbFile } from '../utils/jsonUtils.js'
import { logError, logInfo } from '../utils/logs.js'
import { randomUUID } from 'node:crypto'

export const createSafeBox = async (req, res) => {
  try {
    logInfo('API [createSafeBox]...')
    const safeBox = req.body
    const userFound = USERS.filter(user => user.id === safeBox.user_id)

    if (!userFound) {
      return res.status(404).json({ status: 404, message: 'user not found', data: [] })
    }

    const safeBoxSuccess = await createSafeBoxDb(safeBox)

    return res.status(200).json({ status: 200, message: 'correct operation', data: safeBoxSuccess })
  } catch (error) {
    logError('Error API [createSafeBox]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const getSafesBox = async (req, res) => {
  try {
    logInfo('API [getSafesBox]...')
    return res.status(200).json({ status: 200, message: 'correct operation', data: SAFE_BOX })
  } catch (error) {
    logError('Error API [getSafesBox]')
    logError(error)
    return res.status(500).json({ status: 500, message: `Service error: ${error}` })
  }
}

export const createSafeBoxDb = async (newSafeBox) => {
  logInfo('>>> Creating safeBox')
  newSafeBox = { id: randomUUID(), ...newSafeBox }
  const newSafesBox = [...SAFE_BOX, newSafeBox]
  await writeDbFile('safeBox', newSafesBox)
  logInfo('>>> Safebox created')
  return newSafeBox
}
