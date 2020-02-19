import * as fs from 'fs'
const path = require('path')

export const Files = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },

  directoryExists: (filePath: string) => {
    return fs.existsSync(filePath)
  },

  touchDir: (filePath: string) => {
    fs.mkdirSync(filePath)
  },

  deleteFile: (filePath: string) => {
    fs.unlinkSync(filePath)
  },

  copyFile: (source:string, destination:string) => {
    fs.copyFileSync(source,destination)
  },

  touchFile: ({filePath, data}: { filePath: any, data?: any }) => {
    fs.writeFile(filePath, data || '----', {flag: 'wx'}, function (err) {
      if (err) throw err
    })
  },

  findAndReplace: async (filePath, replacement) => {
    await fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        throw err
      }
      var result = data.replace(/<!-- Content -->/g, `${replacement}`)

      fs.writeFileSync(filePath, result, 'utf8')
    })
  },
}
