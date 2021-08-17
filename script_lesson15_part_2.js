'use strict';


class First {
  hello() {
    console.log('Привет я метод родителя!');
  }
}
const classFirst = new First();


class Second extends First {
  hello() {
    classFirst.hello();
    console.log('А я наследуемый метод!');
  }
}
const classSecond = new Second();

classSecond.hello();








