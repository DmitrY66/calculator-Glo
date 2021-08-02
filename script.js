'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'freilance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
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
} else if (budgetDay < 1200 && budgetDay >= 600) {
  console.log('У Вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log('У Вас низкий уровень дохода');
} else if (budgetDay === 0) {
  console.log('Ваш доход равен нулю, хватит бездельничать!');
} else if (budgetDay < 0) {
  console.log('Что-то пошло не так!');
}
