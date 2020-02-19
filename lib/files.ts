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
    console.log("=======",filePath);
    fs.mkdirSync(filePath)
  },

  touchFile: ({filePath, data}: { filePath: any, data?: any }) => {
    fs.writeFile(filePath, data || '----', {flag: 'wx'}, function (err) {
      if (err) throw err
      console.log('saved')
    })
  },
}
