# 1. Today I Learned

## 1. null 과 undefined

- javaScript에는 '없음'을 나타내는 값이 두 개가 있는데, 이 것 이 `null`과 `undefined`이다.

- 두 값의 의미는 비슷하지만, 각각이 사용되는 목적과 장소가 다르다.

### 1-1. null

- null은 '객체가 없음'을 나타낸다.

- 때문에, typeof 연산을 해보면 object 값을 변환한다. 

```js
typeof null // 'object'
```

### 1-2. undefined

- 값이 대입되지 않은 변수 혹은 정의 되지않은 속성을 사용하려고 할 때 반환되는 값이다.

```js
let foo;
foo // undefined

const obj = {};
obj.prop; // undefined
```

### 1-3. null 과 undefined 차이점은? 

- 둘다 '없음'을 표현하는 값이란 의미는 동일하지만, 개발자의 입장에서 '없음'을 저장하기 위해 어느 것을 써야할지를 생각해보자.

- 만약 `undefined`를 쓴다고 가정해보자.

```js
let foo; // 값을 대입한 적 없음
let bar = undefined; // 값을 대입함

foo; // undefined
bar; // undefined (??)

let obj1 = {}; // 속성을 지정하지 않음
let obj2 = {prop: undefined}; // 속성을 지정함

obj1.prop; // undefined
obj2.prop; // undefined (??)
```
- 이처럼 내가 없음의 의미로 undefined를 지정해놨음에도 불구하고 정말로 저장해놓은 적이 없는 값도 undefined로 반환되기 때문에 내가 이 것을 '없음'이라고 명시하고 싶어서 저장했던 값인지, 아니면 저장해놓은 적이 없어서 '없음'이 나오고 있는 건지를 명확하게 판단하기가 너무 어렵다.

- 때문에, 프로그래머의 입장에서 명시적으로 부재를 나타내고 싶다면 항상 `null`을 사용하는 것이 좋다!

- 단, 객체를 사용할 때 어떤 속성의 부재를 나타내고 싶다면 null을 통해서 나타내는 것 보다는 그냥 그 속성을 아예 정의하지 않는 방식이 더 간편해서 널리 사용된다.

```js
// 이렇게 하는 경우는 많지 않습니다.
{
  name: 'abc',
  address: null
}

// 그냥 이렇게 하는 경우가 많습니다.
{
  name: 'abc'
}

// 어쨌든 이렇게 하지는 말아주세요.
{
  name: 'abc',
  address: undefined
}
```

---

## 2. Null Check

- null 혹은 undefined는 어떤 변수에도, 어떤 속성에도 들어있을 수 있기 때문에, 우리는 코드를 짤 때 값이 있는 경우와 없는 경우 (즉, null 혹은 undefiend인 경우)를 모두 고려해서 코드를 짜야할 필요가 있다.

- 어떤 값이 null 혹은 undefined인지 확인하는 작업을 null check라고 하며, 몇가지 방법이 있다.

```js
// 원초적인 방법

function printIfNotNull(input) {
  if (input !== null && input !== undefined) {
    console.log(input);
  }
}
```
```js
// 더욱 간단한 방법

// 아래 세 개의 식은 완전히 같은 의미입니다.

input !== null && input !== undefined;
input != null;
input != undefined;

// 아래 세 개의 식은 완전히 같은 의미입니다.

input === null || input === undefined;
input == null;
input == undefined;
```

- 본래 `==`(abstract equality comparison operator)는  `===`(strict equality comparison operator)이 값이 **정확히** 같을 때 true라는 결과값을 반환하는데 비해 그렇지 않을 때가 많아서 `===`를 사용하는 것을 권장하지만, null check를 할 때 만큼은 `==`를 쓰는 것이 편리하다. 

```js
null === undefined; // false
null == undefined;  // true
```
- 이렇듯, `==` 등호는 `null`과 `defined`를 같은 값으로 인식한다.

- 단, null과 undefined를 각각 피연산자로하면 무조건 true가 나오는데 하나라도 다른 값이 오면 항상 false가 나온다. 

```js
null == 'hello' // false

undefined == 1  // false
```

---

# 2. Today I Found Out

```
2018/10/01
```

# 3. reference
- https://helloworldjavascript.net/pages/160-null-undefined.html