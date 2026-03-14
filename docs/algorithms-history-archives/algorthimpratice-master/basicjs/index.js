
// factory style
function createCircle(radius) {
    return { 
        radius, 
        draw: function() {
            console.log('draw');
        }
     }; 
}
const circle = createCircle(1);
// constructor function
function Circle (radius) {
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
console.log(Circle.call({}, 1));
// call example
var person = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName:"John",
    lastName: "Doe",
}
person.fullName.call(person1, "Oslo", "Norway");
// Circle.apply({}, [1,2,3]);
const another = new Circle(1);
another.draw();
// constructor property
let sdsds = {};
let asasas = new Object();

const Circle1 = new Function('radius', `
this.radius = radius;
this.draw = function() {
    console.log('circle');
}
`);
const constructorCircle = new Circle1(1);
constructorCircle.draw();

class Person {
    constructor(first, last, age, gender, interests) {
      this.name = {
        first,
        last
      };
      this.age = age;
      this.gender = gender;
      this.interests = interests;
    }
  
    greeting() {
      console.log(`Hi! I'm ${this.name.first}`);
    };
  
    farewell() {
      console.log(`${this.name.first} has left the building. Bye for now!`);
    };
  }
  let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
han.greeting();
// Hi! I'm Han

let leia = new Person('Leia', 'Organa', 19, 'female', ['Government']);
leia.farewell();
// Leia has left the building. Bye for now

class Teacher extends Person {
    constructor(first, last, age, gender, interests, subject, grade) {
      super(first, last, age, gender, interests);
  
      // subject and grade are specific to Teacher
      this.subject = subject;
      this.grade = grade;
    }
  }

  let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
snape.greeting(); // Hi! I'm Severus.
snape.farewell(); // Severus has left the building. Bye for now.
snape.age // 58
snape.subject; // Dark arts