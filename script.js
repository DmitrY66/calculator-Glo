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


// ползунок. динамич. изменение значения
periodAmount.textContent = periodSelect.value;
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});


// система
const AppData = function () {

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

};

// запускаем при нажатии кнопки "расчитать"
AppData.prototype.start = function () {
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
};

// вывод результатов в правую колонку
AppData.prototype.showResult = function () {
  const _this = this;
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
    incomePeriodValue.value = _this.calcSaveMoney();
  });
};

// добавляем поля по клику на "+"
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnPlusExpensesAdd.style.display = 'none';
  }
};

// добавляем поля по клику на "+"
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnPlusIncomeAdd.style.display = 'none';
  }
};

// обязательные расходы
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

// дополнительный доход
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
};

// возможные расходы
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

// дополнительный доход
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

// сумма всех обязательных расходов
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};

// сумма всех дополнительных доходов
AppData.prototype.getIncumeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
  return this.incomeMonth;
};

// доход за месяц (доходы минус расходы)
AppData.prototype.getBudgetMonth = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  return this.budgetMonth;
};

// дневной бюджет
AppData.prototype.getBudgetDay = function () {
  this.budgetDay = Math.floor(this.budgetMonth / 30);
  return this.budgetDay;
};

// срок достижения цели в месяцах
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getInfoDeposit = function () {
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
};

// накопления за период
AppData.prototype.calcSaveMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

// сброс значений
AppData.prototype.reset = function () {
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
};

// блокировка полей ввода
AppData.prototype.inputBlocking = function () {
  allInputs.forEach(function (item) {
    item.setAttribute("readonly", "readonly");
  });
};

// смена кнопки "расчитать"
AppData.prototype.changeButtonСalculate = function () {
  btnStart.style.display = 'none';
  btnCancel.style.display = 'block';
};

// смена кнопки "сбросить"
AppData.prototype.changeButtonReset = function () {
  btnCancel.style.display = 'none';
  btnStart.style.display = 'block';
};


// =========================================================


AppData.prototype.eventList = function () {
  const _this = this;
  btnStart.addEventListener('click', _this.start.bind(_this));

  btnCancel.addEventListener('click', function () {
    _this.changeButtonReset();
    _this.reset();
  });

  btnPlusExpensesAdd.addEventListener('click', _this.addExpensesBlock.bind(_this));

  btnPlusIncomeAdd.addEventListener('click', _this.addIncomeBlock.bind(_this));
};

const appData = new AppData();
console.log(appData);

appData.eventList();




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
