const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const path = require("path")


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function getTeam() {
  const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'newEmployeePrompt',
        message: 'Do you want to add a new employee to your chart?',
        choices: ["Yes", "No"]
      }
    ])
    .then( async data => {
        if (data.newEmployeePrompt === "Yes") {
          await inquirer.prompt([
            {
              type: "list",
              name: 'employeeRole',
              message: "what is the employee's role?",
              choices: ["Manager", "Engineer", "Intern"]
            }
          ]).then(async data => {
            if (data.employeeRole === "Manager") {
              await inquirer.prompt([
                {
                  type: 'input',
                  name: 'ManagerName',
                  message: "what is the manager's name?",
                  validate: answer =>{
                    if(answer !==""){
                      return true;
                      
                    } else{
                      return "Please character can not be empty!!"
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'ManagerId',
                  message: "what is the manager's Id?",
                },
                {
                  type: 'input',
                  name: 'ManagerEmail',
                  message: "what is the manager's email address?",
                  validate: answer =>{
                    if(answer !==""){
                      return true;
                      
                    } else{
                      return "Please character can not be empty!!"
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'ManagerOfficeNumber',
                  message: "what is manager's office number?"
                }
              ]).then(data => {
                const manager = new Manager(
                  data.ManagerName,
                  data.ManagerId,
                  data.ManagerEmail,
                  data.ManagerOfficeNumber
                );
                employees.push(manager);
                addEmployee();
              })
              
            }
            else if (data.employeeRole === "Engineer") {
              await inquirer.prompt([
                {
                  type: 'input',
                  name: 'EngineerName',
                  message: "what is Engineer's name?",
                  validate: answer =>{
                    if(answer !==""){
                      return true;
                      
                    } else{
                      return "Please character can not be empty!!"
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'EngineerId',
                  message: "what is Engineer's Id?",
                },
                {
                  type: 'input',
                  name: 'EngineerEmail',
                  message: "what is engineer's email address?",
                  
                },
                {
                  type: 'input',
                  name: 'EngineerGithub',
                  message: "what is Engineer's Github Username?"
                }

              ]).then(data => {
                const engineer = new Engineer(
                  data.EngineerName,
                  data.EngineerId,
                  data.EngineerEmail,
                  data.EngineerGithub
                );
                employees.push(engineer);
                addEmployee();
              })
            }
            else if (data.employeeRole === "Intern") {
              await inquirer.prompt([
                {
                  type: 'input',
                  name: 'InternName',
                  message: "what is Intern's name?",
                  validate: answer =>{
                    if(answer !==""){
                      return true;
                      
                    } else{
                      return "Please character can not be empty!!"
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'InternId',
                  message: "what is intern's Id?",
                },
                {
                  type: 'input',
                  name: 'InternEmail',
                  message: "what is Intern's email address?",
                  
                },
                {
                  type: 'input',
                  name: 'InternSchool',
                  message: "what is Intern's school?",
                  validate: answer =>{
                    if(answer !==""){
                      return true;
                      
                    } else{
                      return "Please character can not be empty!!"
                    }
                  }
                }


              ]).then(data => {
                const intern = new Intern(
                  data.InternName,
                  data.InternId,
                  data.InternEmail,
                  data.InternSchool
                );
                employees.push(intern);
                addEmployee();
              })
            }

          })
         } else if (data.newEmployeePrompt === "No") {

               await makeTeam();
          }
      })
    }
  addEmployee();

};
 getTeam()
   
      
function makeTeam() {
  fs.writeFileSync(outputPath, render(employees), "utf-8")
  
      
      
};
    