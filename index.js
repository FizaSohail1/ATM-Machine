#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 30000;
let mypin = 1234;
console.log(chalk.blue('Welcome to ATM machine...'));
console.log(chalk.yellow(`Your current account balance is ${myBalance}`));
let remainingBalance;
let password = await inquirer.prompt([
    {
        name: 'pin',
        type: 'number',
        message: ' Kindly enter you pin: ',
        mask: '*'
    },
]);
if (password.pin === mypin) {
    console.log(chalk.green('Authentication Successfull. ATM Functionalitiese are unlock'));
    let atmFunctionalitiese = await inquirer.prompt([
        {
            name: 'Operations',
            type: 'list',
            message: 'Kindly select an option',
            choices: ['Withdraw', 'Check Balance', 'Exit']
        }
    ]);
    if (atmFunctionalitiese.Operations === 'Withdraw') {
        let withdraw = await inquirer.prompt([{
                name: 'amount',
                type: 'list',
                message: 'Choose an amount or choose other amount',
                choices: [1000, 2000, 5000, 10000, 'Other']
            }]);
        if (withdraw.amount === 'Other') {
            let otherAmount = await inquirer.prompt([{
                    name: 'other',
                    type: 'number',
                    message: 'Enter your amount : '
                }]);
            if (otherAmount.other > myBalance) {
                console.log(chalk.red('Insufficiant Balance!'));
                console.log(chalk.green('Thank you for using ATM machine'));
            }
            else {
                remainingBalance = myBalance - otherAmount.other;
                console.log(chalk.yellow(`Your remaining balance is: ${remainingBalance}`));
            }
        }
        else {
            remainingBalance = myBalance - withdraw.amount;
            console.log(chalk.yellow(`Your remaining balance is: ${remainingBalance}`));
        }
    }
    else if (atmFunctionalitiese.Operations === 'Check Balance') {
        console.log(chalk.yellow(`Your current balance is 30000`));
    }
    else if (atmFunctionalitiese.Operations === 'Exit') {
        console.log(chalk.green('Thank you for using ATM machine'));
    }
    else {
        console.log(chalk.red('Please select an option'));
    }
}
else {
    console.log(chalk.red('Authentication failed! Kindly enter a valid pin'));
}
