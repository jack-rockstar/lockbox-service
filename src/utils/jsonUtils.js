import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), 'src/db')

export const readDbFile = async (dbName) => {
  const pathFile = `${DB_PATH}/${dbName}.json`
  return readFile(pathFile, 'utf-8').then(JSON.parse)
}

export const writeDbFile = async (dbName, data) => {
  const pathFile = `${DB_PATH}/${dbName}.json`
  return writeFile(pathFile, JSON.stringify(data, null, 2), 'utf-8')
}

export const USERS = await readDbFile('users')
export const ACCOUNTS = await readDbFile('accounts')
export const SAFE_BOX = await readDbFile('safeBox')
