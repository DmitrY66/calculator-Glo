'use strict';

let money;

let isNumber = function (n) {
  return isNaN(n) || n === '' || n === null;
};

function start() {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }
  while (isNumber(money));
}

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 6000000,
  period: 3,

  asking: function () {

    if (confirm('Есть ли у Вас дополнительный заработок?')) {

      let itemIncome;
      do {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      }
      while (!isNumber(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц Вы на этом имеете?', 10000);
      }
      while (isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses =
      prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'продукты, комуналка, бензин');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    let expenses = [];
    let amounts = [];
    for (let i = 0; i < 2; ++i) {
      do {
        expenses[i] = prompt('Введите обязательную статью расходов?');
      }
      while (!isNumber(expenses[i]));
      do {
        amounts[i] = prompt('Во сколько это обойдется?');
      }
      while (isNumber(amounts[i]));
      // console.log('статья расходов:', i + 1, amounts[i]);
      appData.expenses[expenses[i]] = +amounts[i];
    }

  },

  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  // сумма всех обязательных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  // накопления за месяц (доходы минус расходы)
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    return appData.budgetMonth;
  },

  // за какой период будет достигнута цель, зная результат месячного накопления
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log('У Вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      console.log('У Вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      console.log('У Вас низкий уровень дохода');
    } else if (appData.budgetDay === 0) {
      console.log('Ваш доход равен нулю, хватит бездельничать!');
    } else if (appData.budgetDay < 0) {
      console.log('Что-то пошло не так!');
    }
  },

  getInfoDeposit: function () {
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (isNumber(appData.moneyDeposit));
    }
  },

  calcSaveMoney: function () {
    return appData.budgetMonth * appData.period;
  }

};

// ====================================================================

// console.log('budget: ', appData.budget);

appData.asking();

appData.getBudget();

// console.log('Бюджет на месяц: (appData.budgetMonth): ', appData.budgetMonth);

// console.log('возможные расходы за рассчитываемый период: ', appData.addExpenses);
console.log(appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));

// console.log('expenses: ', appData.expenses);

console.log('сумма всех обязательных расходов (appData.expensesMonth): ', appData.expensesMonth);

appData.budgetDay = Math.floor(appData.budgetMonth / 30);
// console.log('Бюджет на день: (appData.budgetDay): ', appData.budgetDay);

if (Math.ceil(appData.getTargetMonth(appData.mission, appData.budgetMonth)) < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута через ' + Math.ceil(appData.getTargetMonth(appData.mission, appData.budgetMonth)) +
    ' месяцев(-а)');
}

appData.getStatusIncome();

appData.getInfoDeposit();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());


console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log(appData[key]);
}

let btnStart = document.getElementById('start');

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

let cbDepositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetDayValue = document.getElementsByClassName('budget_day-value');

let expensesMonthValue = document.getElementsByClassName('expenses_month-value');

let additionalIncomeValue = document.getElementsByClassName('additional_income-value');

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');

let incomePeriodValue = document.getElementsByClassName('income_period-value');

let targetMonthValue = document.getElementsByClassName('target_month-value');

let salaryAmount = document.querySelector('.salary-amount');

let incomeAmount = document.querySelector('.income-amount');

let expensesTitle = document.querySelector('.expenses-title');

let expensesAmount = document.querySelector('.expenses-amount');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

// ?============================?
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
// ?============================?

let targetAmount = document.querySelector('.target-amount');

let periodSelect = document.querySelector('.period-select');
