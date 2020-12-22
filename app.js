const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
createTeam();
function createTeam(){
inquirer.prompt([{type:"input", name:"position", message:"What position do you need to make?"}])
.then(data=> {
    if (data.position === "manager"){
        createManager()
    } if (data.position === "intern"){
        createIntern()
    } else if (data.position === "engineer") {
        createEngineer();
    }
})
}

function createManager(){
inquirer.prompt([{type:"input",name:"name",message:"What is the name of your Manager"}, {type:"input", name:"id", message:"Type in your id"
},{type:"input", name:"email", message:"What is your email?"}, {type:"input", name:"officeNumber", message:"What is your office Number?"}]
).then((data)=>{ const manager =  new Manager(data.name, data.id, data.email, data.officeNumber) ;
    team.push(manager);
    console.log(manager);
    buildTeam();
    createTeam();
})
}

function createIntern(){
inquirer.prompt([{type:"input",name:"name",message:"What is the name of your Intern"}, {type:"input", name:"id", message:"Type in your id"
},{type:"input", name:"email", message:"What is your email?"}, {type:"input", name:"school", message:"What is your school?"}]
).then((data)=>{ const intern =  new Intern(data.name, data.id, data.email, data.school) ;
    team.push(intern);
    console.log(intern);
    buildTeam();
    createTeam();
})
}

function createEngineer(){
    inquirer.prompt([{type:"input",name:"name",message:"What is the name of your Engineer"}, {type:"input", name:"id", message:"Type in your id"
},{type:"input", name:"email", message:"What is your email?"}, {type:"input", name:"github", message:"What is your githubl?"}]
).then((data)=>{ const engineer =  new Engineer(data.name, data.id, data.email, data.github) ;
    team.push(engineer);
    console.log(engineer);
    buildTeam();
    createTeam();
})
}
function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
  }

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
