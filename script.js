'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'freilance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 6000000;
let period = 12;
let budgetDay = money / 30;

let arrAddExpenses = addExpenses.toLowerCase().split(', ');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');


function showTypeOf(data) {
  console.log(typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// сумма обязательных расходов
function getExpensesMonth(amount1, amount2) {
  return (+amount1) + (+amount2);
}

// накопления за месяц (доходы минус расходы)
function getAccumulatedMonth(money, amount1, amount2) {
  return (+money) - ((+amount1) + (+amount2));
}

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);

// подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
}

console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));

console.log(arrAddExpenses);

console.log('Цель будет достигнута через ' + Math.ceil(mission / getExpensesMonth(amount1, amount2)) + ' месяцев(-а)');

budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

function getStatusIncome() {
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
}

getStatusIncome();


