'use strict';

let btnStart = document.getElementById('start');

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

let cbDepositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];

let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];

let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount');

// let incomeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');

let expensesTitle = document.querySelector('.expenses-title');

// let expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let depositAmount = document.querySelector('.deposit-amount');

let depositPercent = document.querySelector('.deposit-percent');

let targetAmount = document.querySelector('.target-amount');

let periodSelect = document.querySelector('.period-select');

let periodAmount = document.querySelector('.period-amount');


periodAmount.textContent = periodSelect.value;
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});

let isNumber = function (n) {
  return isNaN(n) || n === '' || n === null;
};

// система
let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  // запускаем при нажатии кнопки "расчитать"
  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncumeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudgetMonth();
    appData.getBudgetDay();

    appData.showResult();
  },

  // вывод результатов в правую колонку
  showResult: function () {
    // дневной бюджет
    budgetMonthValue.value = appData.budgetMonth;
    // расход за месяц
    budgetDayValue.value = appData.budgetDay;
    // возможные доходы
    expensesMonthValue.value = appData.expensesMonth;
    // возможные расходы
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    // возможные доходы
    additionalIncomeValue.value = appData.addIncome.join(', ');
    // срок достижения цели в месяцах
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    // накопления за период
    incomePeriodValue.value = appData.calcSaveMoney();
    // динамическое изменение накоплений за период
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcSaveMoney();
    });
  },

  // добавляем поля по клику на "+"
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
  },

  // добавляем поля по клику на "+"
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
  },

  // обязательные расходы
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  // дополнительный доход
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },

  // возможные расходы
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  // дополнительный доход
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  // сумма всех обязательных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  // сумма всех дополнительных доходов
  getIncumeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
    return appData.incomeMonth;
  },

  // доход за месяц (доходы минус расходы)
  getBudgetMonth: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    return appData.budgetMonth;
  },

  // дневной бюджет
  getBudgetDay: function () {
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return appData.budgetDay;
  },

  // срок достижения цели в месяцах
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
    return appData.budgetMonth * periodSelect.value;
  },

};

// =========================================================

if (salaryAmount.value === '') {
  btnStart.disabled = true;
} else {
  btnStart.addEventListener('click', appData.start);
}

btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);

btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);

// if (Math.ceil(appData.getTargetMonth(appData.mission, appData.budgetMonth)) < 0) {
//   console.log('Цель не будет достигнута');
// } else {
//   console.log('Цель будет достигнута через ' +
//     Math.ceil(appData.getTargetMonth(appData.mission, appData.budgetMonth)) +
//     ' месяцев(-а)');
// }

// appData.getStatusIncome();


// console.log("Наша программа включает в себя данные: ");
// for (let key in appData) {
//   console.log(appData[key]);
// }
