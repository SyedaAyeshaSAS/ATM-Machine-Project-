#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 5000;
let myPin = 1234;

console.log(chalk.bgBlue("\n\tWELCOME TO SYEDA AYESHA - ATM MACHINE"));
let pinAnswer = await inquirer.prompt([
    {
        name:"pin",
        type:"number",
        message: chalk.yellow ("Enter your PIN Code")
    }
])
if(pinAnswer.pin === myPin){
    console.log( chalk.greenBright("\nYour PIN Is Correct Login Sucessfully!\n"));
   // console.log(`Current Account Balance is ${myBalance}`);
    
    let OperationAnswer = await inquirer.prompt([
        {
            name:"Operation",
            type:"list",
            message:"Select An Operation:",
            choices:["Withdraw Amount","Check Balance"]
        }
    ])
    if(OperationAnswer.Operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name:"withdrawMethod",
                type:"list",
                message:"Select A Withdrawal Method:",
                choices:["Fast Cash","Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastcashAns = await inquirer.prompt([
                {
                    name:"FaastCash",
                    type:"list",
                    message:"Select Amount;",
                    choices:[1000,2000,3000,4000,5000,10000,20000]
                }
            ])
            if(fastcashAns.FaastCash > myBalance){
                console.log(chalk.red("\nInsufficient Balance\n"));
            }
            else{
                myBalance -=fastcashAns.FaastCash
                console.log(chalk.yellow (`${fastcashAns.FaastCash} Withdraw Successfully`));
                console.log(chalk.blue(` Your Remaining Balance is ${myBalance}`));
            }

        }
        else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let withdrawAmount = await inquirer.prompt([
                {
                    name:"withdrawAmount",
                    type:"number",
                    message:"Enter Amount To Withdraw"
                }
            ])
            if(withdrawAmount.withdrawAmount <= myBalance){
                myBalance = myBalance - withdrawAmount.withdrawAmount;
                console.log(chalk.yellow(`Your Withdrawal Amount is ${withdrawAmount.withdrawAmount}`));
                console.log(chalk.blue(`Current Account Balance is ${myBalance}`));
            }else{
                console.log(chalk.red ("Insufficient Funds"));
            }
        }
        
    }
    else if (OperationAnswer.Operation === "Check Balance"){
        console.log(chalk.blue(`Your Account Balance is ${myBalance}`));
    }
}
else {
    console.log(chalk.red("\nPIN Is Incorrect , Try Again!\n"));
}