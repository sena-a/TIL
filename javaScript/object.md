# 1. Today I Learned

## 객체 (Object)

### 1. 객체란?

- 객체는, 한꺼번에 여러 값을 담을 수 있는 통(container)과 같은 자료구조(data structure)이다.

- 자바스크립트는 객체 기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체이다. 원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다. 

- 객체는 이름-값 쌍으로 구성된 property의 집합이다. 

---

### 2. 속성(property)

- 객체의 속성은 이름-값 쌍으로 구성되며, 프로퍼티라고도 부른다.

- 속성의 이름이 중복되면 나중에 선언된 프로퍼티가 우선순위를 갖으며 이전에 선언된 프로퍼티를 덮어쓴다. 배열과는 달리 구성 요소들의 순서를 보장하지 않는다. 

- 객체 내부에서 속성들은 (,)로 구분한다.

#### 2-1. 프로퍼티 키(key)

- 프로퍼티 키는 프로퍼티의 이름이고, 속성 이름이라고도 부른다.

- 프로퍼티 키의 명명 규칙

    - 기본적으로 문자열로 작성한다.

    - 만약 식별자 규칙을 만족하는 이름들, 즉, 식별자를 프로퍼티 키로 사용할 때는 이름을 ''(따옴표)로 두르지 않아도 된다.

    - 만약 이름이 식별자 규칙을 만족하지 않는다면 ''(따옴표)는 무조건 둘러줘야한다.

    - 예외적으로 숫자는 암묵적으로 타입이 변환되어 문자열이 되어 따옴표를 생략할수도 있다.

    - 문자열 타입의 값으로 수렴될 수 있는 표현식도 가능하다.

    ```js
    // cat이라는 객체를 생성해보자

    const cat = {
        name: 'vely', // 속성 이름 - 'name', 속성 값 - 'sena'
        'now age': 7, // 속성 이름 - 'cat age', 속성 값 - 27
        };

    // cat age란 문자열은 공백을 포함했기 때문에 식별자 규칙을 만족하지 않음. 때문에 ''로 둘러준다.
    ```

#### 2-2. 프로퍼티 값(value)

- 프로퍼티 값으로는 모든 값이 올 수 있다. 즉, 어떠한 표현식(함수 등)이 온다고해도 상관이 없다.

- 프로퍼티 값으로 함수인 경우 이를 메소드라 한다. 

---

### 3. 객체 리터럴(object literal)

가장 일반적이고 간편한 객체 생성 방식이다.

- 중괄호{}를 사용하여 객체를 생성

- {} 1개 이상의 프로퍼티를 기술하면 해당 프로퍼티가 저장된 객체가 생성

- 아무것도 기술하지 않으면 빈 객체가 생성된다.

```js
// 빈 객체 생성
const dog = {}

console.log(typeof dog); //object

// 세 개의 속성이 저장된 객체 생성.
const cat = {
    name: 'vely', // 속성 이름 - 'name', 속성 값 - 'vely'
    age: 7,
    breed : 'russian-blue'
}

console.log(cat); // {name: 'vely', age: '7', breed:'russian-blue}
```

- 속성 값에는 어떠한 표현식도 올 수 있기때문에 당연히 변수를 사용할 수 도 있다.

```js
const name = 'vely';

const cat = {
    name: name, // 값은 여전히 'vely'이다.
    age: 7,
    breed : 'russian-blue'
}
```

- 이때, 프로퍼티 키로 사용된 이름과 값으로 사용된 변수의 이름이 같으면 단축 표기법을 쓸 수 있다.

```js
const name = 'vely';

const cat = {
    name, // name: name과 똑같다.
    age: 7,
    breed : 'russian-blue'
}
```

- 프로퍼티 키에는 문자열 타입의 값으로 수렴될 수 있는 표현식도 가능하다.
    
    - 이때 키를 문자열 값으로 수렴되는 표현식으로 지정해줄 때는 반드시 []로 표기해야한다.

    ```js
    const input = breed; // 문자열 값을 가지는 표현식인 변수

    const cat = {
        name: 'vely',
        age: 7,
        [input] : 'russian-blue' // breed: ... 와 똑같다.
    }
    ```
    - 속성의 이름은 변수의 이름이 되는 것이 아니고 변수에 저장된 문자열이 사용되는 것이다.

    - 코드를 작성하는 시점에서 만들어야할 속성의 이름을 알 수 없는(정해지지 않은) 상태일 때 주로 사용한다.

    - 예를 들면, 사용자가 입력한 문자를 속성의 이름으로 사용해야할 경우가 있다.

---

### 4. 객체 프로퍼티 접근

#### 4-1. 속성 접근자(property accessor)

- 객체의 프로퍼티에 접근하기 위해서는 속성 접근자를 이용할 수 있다.

- 속성 접근자에는 `점 표기법`과 `대괄호 표기법`이 있다.

- 점 표기법 (Dot notation)
    - 프로퍼티 이름이 식별자 규칙을 만족하는 식별자라면 점 표기법을 사용한다.

    - 객체.프로퍼티이름(식별자)

    ```js
    const input = 'breed';
    const cat = {
        name: 'vely',
        'now age': 7,
        [input] : 'russian-blue'
    };

    console.log(cat.name) // 'vely'! 값에 접근했다.
    ```
    
    - (.) 뒤에 오는 리터럴의 문자열 그대로 프로퍼티 이름으로 사용된다.

- 대괄호 표기법 (Bracket notation)
    - 프로퍼티 이름이 식별자 규칙을 만족하지 않는 문자열이라면 대괄호 표기법을 사용한다.

    ```js
    const input = 'breed';
    const cat = {
        name: 'vely',
        'now age': 7,
        [input] : 'russian-blue'
    };

    console.log(cat['now age']) // 7

    console.log(cat.'now age') // 문법 에러
    ```

    - []에 들어오는 것은 모두 문자열로 값이 수렴되는 표현식이다. 

    - 때문에, 변수로 지정해준 프로퍼티 이름은 [[input]]일 필요없이 [input]으로만해도 input = 'breed'라는 문자열 값을 가지고 있는 표현식이라 인식한다.

    ```js
    const input = 'breed';
    const cat = {
        name: 'vely',
        'now age': 7,
        [input] : 'russian-blue'
    };

    console.log(cat[input]) // 'russian-blue'
    ```

- 객체에 존재하지 않는 속성에 접근하면 `undefined`를 반환한다.

```js
const cat = {
    name: 'vely',
    'now age': 7,
};

console.log(cat.breed) // undefined
```

```
속성 접근자로 접근한 것은 속성의 값이다. 이렇게 접근했으면 속성의 이름을 다루는게 아니고 접근한 그 값을 다루는 것.
```

#### 4-2. 프로퍼티 다루기

##### 프로퍼티 값 갱신

- 객체에 있는 프로퍼티에 새로운 값을 할당하면 프로퍼티 값은 갱신된다.

- 객체 접근 = 새로운 값 

```js
const cat = {
    name: 'vely',
};
console.log(cat.name) // 'vely'

cat.name = 'love';

console.log(cat.name); // 'love'
```

##### 프로퍼티 생성

- 객체에 없는 프로퍼티를 생성

- 새로운 프로퍼티 키-값 쌍을 할당하면 새 프로퍼티를 객체에 추가할 수 있다.

- 객체.새 프로퍼티 키 = 해당 프로퍼티 값

```js
const cat = {
    name: 'vely',
};

cat.age = 7; 

console.log(cat) // { name: 'vely', age: 7 } 
```

##### 프로퍼티 삭제

- `delete` 연산자를 사용하여 객체의 프로퍼티를 삭제할 수 있다.

- 이때, 피연산자는 속성 접근자로 접근한 프로퍼티 키여야한다.

```js
const cat = {
    name: 'vely',
    age: 7,
    breed: 'russian-blue'
};

delete 'age';
console.log(cat.age) // 7 여전히 존재한다.

delete cat.age; // true
console.log(cat.age) //undefined 없는 프로퍼티가 되었다.
```

- delete 연산자를 사용한 문은 반환값을 boolean type으로 갖는 표현식이 된다.

```
아직 배우지 않았지만 프로퍼티의 삭제를 막는 기능도 있기 때문에, 그렇게 삭제가 막혀있는 경우에는 이 표현식의 값이 false가 된다고 한다.
```

##### 프로퍼티 존재 확인

- `in` 연산자를 사용하여 프로퍼티가 해당 객체에 존재하는지 확인할 수 있다.

- 프로퍼티 키 in 객체

- 이때 프로퍼티 키는 식별자 규칙과 상관없이 문자열 리터럴로 표시한다.

- 프로퍼티 키가 대괄호로 표시된 표현식이라면 문자열 리터럴로 표시하지 않는다.

```js
const input = 'breed';
const cat = {
    name: 'vely',
    age: 7,
    [input]: 'russian-blue'
};

'age' in cat // true
age in cat // false
input in cat // true
'input' in cat // false
'color' in cat // false
```

---

### 5. 메소드와 this

#### 5-1. 메소드(Method)

- 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드(method)라고 부른다.

- 즉, 어떤 객체의 속성으로 접근해서 사용하는 함수이다.

```js
const cat = {
    name: 'vely',
    age: 7,
    intro : function(){
        console.log(`Hi, My name is vely`)
    }
};
```

- intro의 값이 함수이므로, intro 메소드가 되었다.

```js
cat.intro(); // 메소드 호출
// Hi, My name is vely

cat.intro // [Function] // 값이 함수임을 나타낸다.
```

- 메소드 정의는 객체 리터럴 안에서 특별한 표기법을 사용할 수도 있다.

```js
const cat = {
    name: 'vely',
    age: 7,
    intro(){
        console.log(`Hi, My name is vely`)
    }
};

// : function 을 생략할 수 있다.
```

#### 5-2. this

- 속성 값으로 사용되는 함수를 다른 함수들과 달리 '메소드'라는 특별한 이름을 사용하는 이유는, 메소드가 다른 함수들과는 다르게 특별히 취급되기 때문이다.

- 가장 중요한 다른 점은, `this` 키워드를 사용할 수 있다는 점이다. 

- `this` 키워드를 사용하면, 메소드 호출 시에 해당 메소드를 갖고 있는 객체를 this로 삼을 수 있다.

- `this` 키워드는 ${} 안에 표기한다.

```js
const cat = {
    name: 'vely',
    age: 7,
    intro(){
        console.log(`Hi, My name is ${this.name}`)
    }
};

cat.intro() 
// `Hi, My name is cat.name`
// `Hi, My name is vely`
```

- function 키워드 함수로 만들어진 메소드 내부의 this는 호출되는 시점에 어떤 객체에 접근할지를 결정한다. 

- 화살표 함수는 정의 된 시점에 this의 객체가 바로 결정된다.

- 때문에, this는 평소에는 그냥 `this` 키워드이다가, 해당 메소드가 호출되면, 메소드를 호출한 객체를 this로 삼아 실행되는 것이다.

- 그래서, 다른 객체간의 재사용이 문제 없다.

```js
// function 키워드로 함수 생성
function intro() {
    console.log(`Hi, My name is ${this.name}`)
}

const cat = {
    name: 'vely',
    intro // intro: intro(){..} 와 똑같음
}

const dog = {
    name: 'lily',
    intro
}

cat.introduce(); // `Hi, My name is vely`
dog.introduce(); // `Hi, My name is lily`
```

- 호출되는 시점에서 this의 내용이 정의되는 것이기 때문에, cat객체가 호출할 때 this에 cat이, dog 객체가 호출할 때 this에 dog가 들어가면서 같은 함수를 재사용함에도 불구하고 메소드의 동작에는 문제 없다.

- 단, function 키워드를 통해 정의된 메소드 역시 항상 위와 같은 방식으로 `this`를 취급하는 것은 아니고, 특별한 방법을 통해 아예 this를 우리가 원하는 객체로 바꿔버릴 수도 있다. 
```
아직 배우지 않은 부분이라 이후 til에서 더 자세히 정리하도록 하자.
```

---

### 6. 생성자

- 객체를 생성하기 위해서는 객체 리터럴말고 생성자를 사용하는 방법도 있다. 

- `new` 키워드와 함께 사용하여 객체를 생성하는 함수를 가지고 생성자(constructor)라고 부른다.

#### 6-1. Object() 생성자 함수

- 자바스크립트에서는 객체를 생성하기 위한 생성자로 이미 정의되어있는 Object() 함수가 있다.

- new 연산자와 Object() 함수를 사용하면 빈 객체를 생성할 수 있다.

- 빈 객체 생성 후 프로퍼티 또는 메소드를 추가하여 객체를 완성하는 방식이다.

```js
const cat = new Object();

typeof cat // object!
console.log(cat) // {}!
// cat변수에 빈 객체를 생성하여 저장한 것.
```
- 프로퍼티 또는 메소드를 추가하여 객체를 완성

```js
cat.name = 'vely';
cat.age = 7;
cat.intro = function(){
    console.log(`Hi, My name is ${this.name}`)
    }

console.log(cat) // {name: 'vely', age: 7, intro: [function]}
```

- Object() 생성자 함수는 우선 빈 객체를 생성하고 이후에 프로퍼티를 추가하는 방식으로 단계가 덜 단순해서, 특별한 이유가 없다면 그다지 유용하지는 않다.

- 객체 리터럴 방식으로 생성된 객체는 결국 내장 함수인 Object() 생성자 함수로 객체를 생성하는 것을 단순화 시킨 축약법이므로, 자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 Object() 생성자 함수를 사용하여 객체를 생성한다는 것을 알아두자.


#### 6-2. 인스턴스(Instance)

- 생성자를 통해 생성된 객체는, 그 생성자의 인스턴스라고 한다.

```js
const cat = new Object();
```
- 이때, Object()(생성자)를 통해 생성된 객체 cat은, Object()의 인스턴스이다.

- `instanceof` 연산자를 사용하면 해당 객체가 특정 생성자의 인스턴스가 맞는지를 확일 할 수 있다.

```js
// 객체 instanceof 생성자

cat instanceof Object // true
```

- 객체리터럴은 결국 내부에서 Object()로 객체를 생성한다고 하였으므로, 객체 리터럴로 생성된 객체 역시 Object의 인스턴스이다. 

```js
const cat = {};

cat instanceof Object // true
```

#### 6-3. 생성자 함수 정의

- 객체 리터럴 방식이나 Object() 생성자 함수 방식으로 객체를 생성하는 것은 객체 하나를 생성할 때 마다 공통 프로퍼티를 갖는다하더라도 매번 일일이 지정해줘야하는 불편함이 있다.

    - 예를 들어 아래 예제를 보자

    ```js
    const animal1 = {
        name: 'vely',
        age: 7,
        type : 'cat',
        intro(){ 
            console.log(`Hi, My name is ${this.name}`)
        }
    }

    const animal2 = {
        name: 'love',
        age: 2,
        type : 'cat',
        intro(){ 
            console.log(`Hi, My name is ${this.name}`)
        }
    }
    ```
    - 프로퍼티 값만 다를 뿐 프로퍼티 이름은 전부 동일하며, 심지어 프로퍼티 자체가 동일한 부분도 있는 객체 두 개를 객체리터럴 혹은 Object() 생성자를 사용하게되면 일일이 모두 지정해줘야한다.

- 프로그래머가 직접 생성자 함수를 정의하여 사용하면 이런 구성이 동일한 객체 여러개를 간편하게 생성할 수 있다.

- 다음은 생성자 함수를 정의할 때 주의해야할 점이다.
    - 생성자 함수는 일반 함수와 헷갈리지 않게 이 함수가 생성자임을 알릴 수 있도록 대문자로 시작한다.

    - 생성자 함수에 쓰이는 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

    - 이때, 단순히 변수와 값을 지정한 경우, 객체가 생성될 떄 그 변수이름-값 쌍이 리터럴 그대로 프로퍼티가 된다

    - 만약 this를 사용했다면, 외부에서 받은 인수를 값으로 사용할 수 있다.

    - 생성자 함수 내에서 선언된 일반 변수는 함수 내부에서만 접근이 가능하다.

- 이제 생성자 함수를 정의해서 위에 예제의 객체 두 개를 더 간단히 만들어 보자. 

```js
// 생성자 함수 정의

function Animal(name, age){
    this.name = name
    this.age = age
    this.intro = function(){ console.log(`Hi, My name is ${this.name}`)
        }
    let type = 'cat'
    this.type = type
    }

// 객체 생성, 즉, Animal() 생성자의 인스턴스 생성

const animal1 = new Animal('vely', 7);
// Animal { name: 'vely', age: 7, intro: [Function], type: 'cat' }

const animal2 = new Animal('love', 2);
// Animal { name: 'love', age: 2, intro: [Function], type: 'cat' }
```

- 다른 프로퍼티 값은 인스턴스 생성시 받을 수 있게 함수에 매개변수를 지정하여 생성자 하나로 동일한 구성을 가진 두 개의 객체를 간단히 만들어 냈다.

- 먼저 정의 부분을 자세히 봐보자.

```js
function Animal(name, age){
    this.name = name // this는 생성하는 인스턴스로 정의 될 것이다.
    this.age = age
    // 값은 인스턴스에서 사용하는 인수가 될 것이다.
    this.intro = function(){ console.log(`Hi, My name is ${this.name}`)
        }
    let whatAnimal = 'cat' // 이 변수는 외부에서 접근이 불가하기 때문에 함수 내에서만 사용되는 값이다. 따라서, 인스턴스 역시 접근할 수 없으며, 인스턴스에는 포함되지 않는다.
    this.type = whatAnimal // 단, 함수 내에서 이 변수를 사용하면 변수에 할당된 값을 사용할 수 있다. 
    // 여기서 this.type은 점표기법을 썼으므로 type은 변수가 아닌 문자열 리터럴 그대로를 말한다. 변수의 값을 이름으로 지정하고 싶다면 배웠듯이 this[type]으로 하면 된다.
    }
```

- 인스턴스 생성을 보자

```js
const animal1 = new Animal('vely', 7);

// 이 코드는, 

const animal1 = new Animal('vely', 7){
    animal1.name = 'vely'
    animal1.age = 7
    animal1.intro = function(){ console.log(`Hi, My name is ${aniaml1.name}`)
    }
    let type = 'cat'
    animal1.type = type // animal1.type = 'cat'
}

// 이 되고, 

const animal1 = Animal {name: 'vely', age: 7, intro: [Function], type: 'cat'}

// 이렇게 객체가 된다.

// 여기서 {} 앞에는 생성자 이름이 오고, 이 생성자는 함수이다. 

typeof Animal // function

// 이 객체를 지정한 변수는 이제 객체이다.

typeof animal1 // object!

// 말했듯, 함수 내부에서 사용된 변수는 외부와 전혀 상관이없고, 인스턴스 또한 상관이 없다. 

console.log(animal.whatAnimal) // undefined

// 이 방식으로 두번째 객체도 간단히 만들어졌다.

const animal2 = new Animal('love', 2);
// Animal { name: 'love', age: 2, intro: [Function], type: 'cat' }
```

- 조금 복잡하지만, 생성자는 객체를 찍어내는 틀이라고도 생각할 수 있는데, 단순히 빈 객체를 찍어낼 틀이면 Object() 생성자를, 무언가 공통된 정보를 가지고 있는 객체를 찍어내고 싶다면 직접 정의한 생성자 함수를 사용하는 느낌이다.

- 생성자는 함수이다. typeof 생성자의 값은 function으로 반환된다.

- 자바스크립트에서는 생성자와 일반적인 함수를 구분짓는 차이점이 없어서, 정의한 함수를 생성자로 사용하면 생성자가 되고, 일반적인 함수로 사용하면 함수가 된다.

# 2. Today I Found Out

```
2018.10.02

화이팅
```

# 3. reference
- https://helloworldjavascript.net/pages/180-object.html

- https://poiemaweb.com/js-object#1-%EA%B0%9D%EC%B2%B4object%EB%9E%80