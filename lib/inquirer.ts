import * as inquirer from "inquirer";

export const Inquirer = {
  askGeneratePage: async () => {
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
        message: 'enter a location for the page:',
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

    return inquirer.prompt(questions);
  },

  askField: async () => {
    const questions: inquirer.QuestionCollection = [
      {
        name: 'fieldName',
        type: 'input',
        message: 'enter a field name:',
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter a field name';
          }
        }
      },
      {
        name: 'fieldType',
        type: 'list',
        message: 'enter field type:',
        default: 'string',
        choices: ['string','number']
      },
      {
        name: 'addMore',
        type: 'confirm',
        message: 'do you want to add more :',
        default: false,
      },
    ];

    return inquirer.prompt(questions)
  },

  askContinueWhenExist: async(path: string) => {
    return inquirer.prompt({

      name: 'agree',
      type: 'confirm',
      message: `file exist ${path}, do you want to continue:`,
      default: false,

    })
  }
}

