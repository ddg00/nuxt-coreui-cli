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
    const path = data.pageLocation
    const fullPath = `${path}\\${data.pageName}.vue`

    try {
      if (!Files.directoryExists(path)) Files.touchDir(path)
      await Files.touchFile({filePath: fullPath})
    } catch (error) {
      this.error(error)
    }
  }
}
