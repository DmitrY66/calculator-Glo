'use strict';

let money = 300;
let income = 'freilance';
let addExpenses = 'Интернет, Образование, Страховка';
let deposit = true;
let mission = 6000000;
let period = 12;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

let arrAddExpenses = addExpenses.toLowerCase().split(', ');
console.log(arrAddExpenses);
console.log(budgetDay);

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');


let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

console.log('Цель будет достигнута через ' + Math.ceil(mission / budgetMonth) + ' месяцев(-а)');

budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log('У Вас высокий уровень дохода');
}
if (budgetDay < 1200 && budgetDay >= 600) {
  console.log('У Вас средний уровень дохода');
}
if (budgetDay < 600 && budgetDay > 0) {
  console.log('У Вас низкий уровень дохода');
}
if (budgetDay === 0) {
  console.log('Ваш доход равен нулю, хватит бездельничать!');
}
if (budgetDay < 0) {
  console.log('Что-то пошло не так!');
}
