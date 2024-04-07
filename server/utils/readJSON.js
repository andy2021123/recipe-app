import fs from 'node:fs'

export default function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8')) // TODO: add some error handling
}
