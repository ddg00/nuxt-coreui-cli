import {Command, flags} from '@oclif/command'
import {Inquirer} from '../../../lib/inquirer'
import {Files} from '../../../lib/files'
import {Request} from '../../../lib/http-req'

export default class Page extends Command {
  static description = 'generate page';

  static examples = [
    '$ nuxt-coreui-cli page:api --uri https://jsonplaceholder.typicode.com/users',
  ];

  static flags = {
    // can pass either --force or -f
    uri: flags.string(),
  };

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
    const {flags} = this.parse(Page)

    let uri = flags.uri
    const data = await Inquirer.askGeneratePage()
    const dirPath = data.pageLocation
    const fullPath = `${dirPath}\\${data.pageName}.vue`

    if (Files.directoryExists(fullPath)) {
      const {agree} = await Inquirer.askContinueWhenExist(fullPath)
      if (!agree) this.exit()
      Files.deleteFile(fullPath)
    }

    Files.copyFile('component/blank.vue', fullPath)

    let keys: string[]
    let selectKey: string

    if (!uri) {
      const askURI = await Inquirer.askURI()
      uri = askURI.uri
    }

    const response = await Request.get(uri)
    if (!Array.isArray(response.data)) {
      const keyselected = await Inquirer.selectDataArray(Object.keys(response.data))
      selectKey = keyselected.key
    }

    if (selectKey) keys = Object.keys(response.data[selectKey][0])
    else keys = Object.keys(response.data[0])

    const fields: string[] = []
    keys.forEach((item) => fields.push({name: item}))
    const selected = await Inquirer.selectKeys(fields)

    try {
      await Files.findAndReplace(fullPath, selected.keys)
    } catch (error) {
      this.error(error)
    }

    this.exit()
  }
}
