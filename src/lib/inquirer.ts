import * as inquirer from "src/lib/inquirer";

export const Inquirer = {
  async askGeneratePage() {
    const questions: inquirer.QuestionCollection = [
      {
        name: 'pageName',
        type: 'input',
        message: 'enter a name for the page:',
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter a name for the page.';
          }
        }
      },
      {
        name: 'pageLocation',
        type: 'input',
        message: 'enter a name for the page:',
        default: 'page',
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter a location for the page.';
          }
        }
      },
    ];

    return await inquirer.prompt(questions);
  }
}

