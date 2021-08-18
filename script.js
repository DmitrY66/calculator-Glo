'use strict';

const btnStart = document.getElementById('start');

const btnCancel = document.getElementById('cancel');

const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

const cbDepositCheck = document.querySelector('#deposit-check');

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];

const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];

const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];

const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');

let incomeItems = document.querySelectorAll('.income-items');

const expensesTitle = document.querySelector('.expenses-title');

let expensesItems = document.querySelectorAll('.expenses-items');

const additionalExpensesItem = document.querySelector('.additional_expenses-item');

const depositAmount = document.querySelector('.deposit-amount');

const depositPercent = document.querySelector('.deposit-percent');

const targetAmount = document.querySelector('.target-amount');

const periodSelect = document.querySelector('.period-select');

const periodAmount = document.querySelector('.period-amount');

const allInputs = document.querySelectorAll('input');


// система
class AppData {
  constructor() {
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
  }

  // ползунок. динамич. изменение значения
  periodAccumulate() {
    periodAmount.textContent = periodSelect.value;
    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
    });
  }

  // запускаем при нажатии кнопки "расчитать"
  start() {
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
  }

  // вывод результатов в правую колонку
  showResult() {
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
    periodSelect.addEventListener('input', this.periodSaveMoney.bind(this));
  }

  // добавляем поля по клику на "+"
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
  }

  // добавляем поля по клику на "+"
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
  }

  // обязательные расходы
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  }

  // дополнительный доход
  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    }, this);
  }

  // возможные расходы
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  }

  // дополнительный доход
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  }

  // сумма всех обязательных расходов
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }

  // сумма всех дополнительных доходов
  getIncumeMonth() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    return this.incomeMonth;
  }

  // доход за месяц (доходы минус расходы)
  getBudgetMonth() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    return this.budgetMonth;
  }

  // дневной бюджет
  getBudgetDay() {
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetDay;
  }

  // срок достижения цели в месяцах
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
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
  }

  // проверка ввода на число
  isNumber(n) {
    return isNaN(n) || n === '' || n === null;
  }

  // депозит
  getInfoDeposit() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (this.isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (this.isNumber(this.moneyDeposit));
    }
  }

  // накопления за период
  calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  // динамическое изменение накоплений
  periodSaveMoney() {
    incomePeriodValue.value = this.calcSaveMoney();
  }

  // сброс значений
  reset() {

    const allInputs = document.querySelectorAll('input');
    const incomeItems = document.querySelectorAll('.income-items');
    const expensesItems = document.querySelectorAll('.expenses-items');

    allInputs.forEach((item) => {
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

    btnPlusIncomeAdd.disabled = false;
    btnPlusExpensesAdd.disabled = false;

    periodSelect.value = 1;
    periodAmount.textContent = 1;

    Object.assign(this, new this.constructor());

    // разблокируем поля слева
    allInputs.forEach((item) => {
      item.removeAttribute("readonly");
    });
  }

  // блокировка полей ввода
  inputBlocking() {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((item) => {
      item.setAttribute("readonly", "readonly");
    });
    btnPlusIncomeAdd.disabled = true;
    btnPlusExpensesAdd.disabled = true;
  }

  // смена кнопки "расчитать"
  changeButtonСalculate() {
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
  }

  // смена кнопки "сбросить"
  changeButtonReset() {
    btnCancel.style.display = 'none';
    btnStart.style.display = 'block';
  }

  // слушатели событий
  eventList() {

    this.periodAccumulate();

    btnStart.addEventListener('click', this.start.bind(this));

    btnCancel.addEventListener('click', this.changeButtonReset.bind(this));
    btnCancel.addEventListener('click', this.reset.bind(this));

    btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));

    btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
  }

}

const appData = new AppData();

appData.eventList();
