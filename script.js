'use strict';

let btnStart = document.getElementById('start');

let btnCancel = document.getElementById('cancel');

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

let incomeItems = document.querySelectorAll('.income-items');

let expensesTitle = document.querySelector('.expenses-title');

let expensesItems = document.querySelectorAll('.expenses-items');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let depositAmount = document.querySelector('.deposit-amount');

let depositPercent = document.querySelector('.deposit-percent');

let targetAmount = document.querySelector('.target-amount');

let periodSelect = document.querySelector('.period-select');

let periodAmount = document.querySelector('.period-amount');

let allInputs = document.querySelectorAll('input');


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

  // ползунок. динамич. изменение значения
  periodAccumulate: function () {
    periodAmount.textContent = periodSelect.value;
    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
    });
  },

  // запускаем при нажатии кнопки "расчитать"
  start: function () {
    if (salaryAmount.value === '') {
      salaryAmount.placeholder = 'Данное поле необходимо заполнить!';
    } else {
      salaryAmount.placeholder = 'Сумма';

      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getIncumeMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudgetMonth();
      this.getBudgetDay();

      this.showResult();

      this.changeButtonСalculate();
      this.inputBlocking();
    }
  },

  // вывод результатов в правую колонку
  showResult: function () {
    // дневной бюджет
    budgetMonthValue.value = this.budgetMonth;
    // расход за месяц
    budgetDayValue.value = this.budgetDay;
    // возможные доходы
    expensesMonthValue.value = this.expensesMonth;
    // возможные расходы
    additionalExpensesValue.value = this.addExpenses.join(', ');
    // возможные доходы
    additionalIncomeValue.value = this.addIncome.join(', ');
    // срок достижения цели в месяцах
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    // накопления за период
    incomePeriodValue.value = this.calcSaveMoney();
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
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
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
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    return this.budgetMonth;
  },

  // дневной бюджет
  getBudgetDay: function () {
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetDay;
  },

  // срок достижения цели в месяцах
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },

  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      console.log('У Вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      console.log('У Вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      console.log('У Вас низкий уровень дохода');
    } else if (this.budgetDay === 0) {
      console.log('Ваш доход равен нулю, хватит бездельничать!');
    } else if (this.budgetDay < 0) {
      console.log('Что-то пошло не так!');
    }
  },

  getInfoDeposit: function () {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (isNumber(this.moneyDeposit));
    }
  },

  // накопления за период
  calcSaveMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },

  // сброс значений
  reset: function () {

    let allInputs = document.querySelectorAll('input');
    let incomeItems = document.querySelectorAll('.income-items');
    let expensesItems = document.querySelectorAll('.expenses-items');

    allInputs.forEach(function (item) {
      item.value = '';
    });

    for (let i = 1; i < incomeItems.length; ++i) {
      incomeItems[i].remove();
      if (incomeItems.length === 3) {
        btnPlusIncomeAdd.style.display = 'block';
      }
    }

    for (let i = 1; i < expensesItems.length; ++i) {
      expensesItems[i].remove();
      if (expensesItems.length === 3) {
        btnPlusExpensesAdd.style.display = 'block';
      }
    }

    periodSelect.value = 1;
    periodAmount.textContent = 1;

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    // разблокируем поля слева
    allInputs.forEach(function (item) {
      item.removeAttribute("readonly");
    });
  },

  // блокировка полей ввода
  inputBlocking: function () {
    allInputs.forEach(function (item) {
      item.setAttribute("readonly", "readonly");
    });
  },

  // смена кнопки "расчитать"
  changeButtonСalculate: function () {
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
  },
  // смена кнопки "сбросить"
  changeButtonReset: function () {
    btnCancel.style.display = 'none';
    btnStart.style.display = 'block';
  },

};

// =========================================================

appData.periodAccumulate();

btnStart.addEventListener('click', appData.start.bind(appData));

btnCancel.addEventListener('click', function () {
  appData.changeButtonReset();
  appData.reset();
});

btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock.bind(appData));

btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock.bind(appData));


// appData.reset();
// appData.inputBlocking();
// appData.changeButton();

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
