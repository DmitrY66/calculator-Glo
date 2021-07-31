let money = 300;
let income = 'freilance';
let addExpenses = 'Интернет, Образование, Страховка';
let deposit = true;
let mission = 6000000;
let period = 12;
let budgetMonth = 66000;
let budgetDay = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

let arrAddExpenses = addExpenses.toLowerCase().split(', ');
console.log(arrAddExpenses);
console.log(budgetDay);
