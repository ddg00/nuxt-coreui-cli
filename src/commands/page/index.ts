import {Command} from '@oclif/command'
import {Inquirer} from '../../lib/inquirer'

export default class Page extends Command {
  static description = 'generate page';

  static examples = [
    '$ nuxt-coreui-cli page',
  ];

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

    const data = await Inquirer.askGeneratePage();
    this.log(`data: ${data.pageLocation}`);
  }
}
