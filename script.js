'use strict';

let money;
let income = 'freilance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 6000000;
let period = 12;
let budgetDay;

let arrAddExpenses = addExpenses.toLowerCase().split(', ');

function start() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (isNaN(parseFloat(money)));
}

start();

function showTypeOf(data) {
  console.log(typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
  let sum = 0;
  let expenses = [];
  let amounts = [];

  for (let i = 0; i < 2; ++i) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    do {
      amounts[i] = prompt('Во сколько это обойдется?');
      console.log('amounts[i]: ', amounts[i]);
    }
    while (isNaN(parseFloat(amounts[i])));
  }

  for (let j = 0; j < amounts.length; ++j) {
    sum += +amounts[j];
  }

  return sum;
}

// накопления за месяц (доходы минус расходы)
function getAccumulatedMonth(money, getExpensesMonth) {
  return (+money) - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth);
console.log('accumulatedMonth: ', accumulatedMonth);

// подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
}

console.log('Расходы за месяц: ' + getExpensesMonth());

console.log(arrAddExpenses);

if (Math.ceil(getTargetMonth(mission, accumulatedMonth)) < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + ' месяцев(-а)');
}

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
