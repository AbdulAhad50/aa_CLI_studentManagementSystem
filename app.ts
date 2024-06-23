#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


class Student{
    static counter = 1000;
    id:number;
    name:string;
    courses:string[];
    balance:number;

    constructor(name:string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }

    enrollCourse(course:string){
        this.courses.push(course)
    }

    viewBalance(){
        console.log(`Balance of ${chalk.red(this.name)} is: $${this.balance}\n`);
    }

    payFee(fees:number){
        this.balance -= fees;
        console.log(`$${fees} Fees Paid Successfully of ${this.name}`);
        console.log(`Remaining Balance: $${chalk.red(this.balance)}\n`);
        
    }

    showStatus(){
        console.log(`\nID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: $${this.balance}\n`);
    }
}

class studentManagement {
    student:Student[];

    constructor(){
        this.student = [];
    }

    addStudent(name:string){
        let Std = new Student(name)
        this.student.push(Std)
        console.log(`Student: ${name} added Successfully. Student Id: ${Std.id}\n`);
        
    }

    enrollStudent(studentID:number, course:string){
        let student = this.findStudent(studentID)
        if(student){
            student.enrollCourse(course);
            console.log(`${student.name}, successfully! enrolled in ${course}\n`);
            
        }
    }

    viewStudentBalance(studentID:number){
        let student = this.findStudent(studentID)
        if(student){
            student.viewBalance()
        }

        else{
            console.log(`\nStudent Not Found!, input valid id\n`);
        }
    }

    payStdFee(studentID:number, amount:number){
        let student = this.findStudent(studentID)

        if(student){
            student.payFee(amount)
        }

        else{
            console.log(`Student Not Found!, input valid id`);
        }
    }


    studentStatus(studentID:number){
        let student = this.findStudent(studentID)
        
        if(student){
            student.showStatus()
        }

        else{
            console.log(`Student Not Found!, input valid id`);
        }
    }

    findStudent(studentID:number){
        return this.student.find(std => std.id === studentID);
    }

}

//Main Function for run the Program

async function main() {
    console.log(`Welcome' Student Management System`);
    console.log("=".repeat(50));
    
   let manageStudent = new studentManagement();

   while(true){
     let choices = await inquirer.prompt([
        {
          name : "choice",
          type : "list",
          message : "Select Options",
          choices : [
            "Add Student",
            "Enroll Student",
            "View Student Balance",
            "Pay Fees",
            "Show Status",
            "Exit"
            ]
        }
    ]);

    switch(choices.choice){
        case  "Add Student":
        let nameInput = await inquirer.prompt({
            name : "name",
            type : "input",
            message : chalk.green.underline("Enter A Studetn Name:")
    });
        manageStudent.addStudent(nameInput.name)
        break;

        case "Enroll Student":
        let enrollInput = await inquirer.prompt([{
            name : "studentId",
            type : "number",
            message : chalk.green.underline("Enter Student ID:")
        },
        
        {
            name : "course",
            type : "input",
            message : chalk.green.underline("Enter a Course Name:")
        }
    
    ]);

        manageStudent.enrollStudent(enrollInput.studentId, enrollInput.course);
        break;

        case "View Student Balance":
        let balanceInput = await inquirer.prompt([
        {
            name : "studentId",
            type : "number",
            message : chalk.green.underline("Enter Student ID:")
        }
    ]);

        manageStudent.viewStudentBalance(balanceInput.studentId)
        break;
    
        case "Pay Fees":
        let feesInput = await inquirer.prompt([{
            name : "studentId",
            type : "number",
            message : chalk.green.underline("Enter Student ID:")
        },

        {
            name : "amount",
            type : "number",
            message : chalk.green.underline("Enter the Amount:")
        }
    ]);

        manageStudent.payStdFee(feesInput.studentId, feesInput.amount)
        break;
        
        case "Show Status":
        let statusInput = await inquirer.prompt([{
            name : "studentId",
            type : "number",
            message : chalk.green.underline("Enter Student ID:") 
        }
    ]);
        manageStudent.studentStatus(statusInput.studentId)
        break;

        case "Exit":
        console.log("Exiting...");
        process.exit();
    }
   
   }
}

main();