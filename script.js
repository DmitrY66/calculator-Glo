let money = 300;
let income = 'freilance';
let addExpenses = 'Интернет, Образование, Страховка';
let deposit = true;
let mission = 6000000;
let period = 12;
let budgetMonth = 66000;
let budgetDay = budgetMonth / 30;

alert('Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cumque ratione. Nisi temporibus');

console.log('Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cumque ratione. Nisi temporibus');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
addExpenses = addExpenses.toLowerCase().replace(/,/g, '').split(' ');
console.log(addExpenses);
console.log(budgetDay);
