import {Command} from '@oclif/command'
import {Inquirer} from '../../../lib/inquirer'
import {Files} from '../../../lib/files'

export default class Page extends Command {
  static description = 'generate page';

  static examples = [
    '$ nuxt-coreui-cli page',
  ];

  // static aliases = ['page:index', 'page:datatable'];

  // === example command ===============
  //
  // $ nuxt-coreui-cli page --force --file=./myfile
  //
  // === flag declaration ==============
  // static flags = {
  //   // can pass either --force or -f
  //   force: flags.boolean({char: 'f'}),
  //   file: flags.string(),
  // };

  // === example command ===============
  //
  // $ nuxt-coreui-cli page arg1 arg2
  //
  // === arguments declaration ==============
  // static args = [
  //   {name: 'arg1'},
  //   {name: 'arg2'},
  // ];

  async run() {
    // const {args, flags} = this.parse(Page)

    const data = await Inquirer.askGeneratePage()
    const dirPath = data.pageLocation
    const fullPath = `${dirPath}\\${data.pageName}.vue`

    if (Files.directoryExists(fullPath)) {
      const {agree} = await Inquirer.askContinueWhenExist(fullPath)
      if (!agree) this.exit()
      Files.deleteFile(fullPath)
    }

    // Files.copyFile('',fullPath);

    let addField = true
    const fields: { [key: string]: string} = {}

    while (addField) {
      const newField = await Inquirer.askField();
      fields[newField.fieldName] = newField.fieldType
      addField = newField.addMore
    }

    let content = ''
    for (const key in fields) {
      if (fields[key]) {
        content = `${content} ${key} : ${fields[key]} \n`
      }
    }

    try {
      if (!Files.directoryExists(dirPath)) Files.touchDir(dirPath)
      await Files.touchFile({filePath: fullPath, data: content})
    } catch (error) {
      this.exit()
    }
  }
}
