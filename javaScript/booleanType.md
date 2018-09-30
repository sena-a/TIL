# 1. Today I Learned

## boolean type

- boolean 타입에 해당하는 값은 `true`, `false` 두가지 밖에 없다.

- 이를 `진리값`이라 부른다.

- 프로그래밍에서 진리값은 어떤 조건이 참인지 거짓인지를 나타내기위해 사용한다.

### 1. 논리 연산자

```js
// 논리 부정 (logical NOT)

!true; // false
!false; // true
```

```js
// 논리합 (logical OR)

true || true; // true
true || false; // true
false || true; // true
false || false; // false
```

```js
// 논리곱 (logical AND)

true && true; // true
true && false; // false
false && true; // false
false && false; // false
```

```js
// 삼항 연산자 (ternary operator)

condition ? expr1 : expr2;

// condition이 true: expr1 값 반환
// condition이 false: expr2 값 반환.
```
- condition : true or false로 평가되는 표현식
- expr1 & expr2 : 값을 가진 모든 형식의 표현식

    ```js
    true ? 1 : 2; // 1
    false ? 1 : 2; // 2
    ```
- if문과 차이점
    - if문
        - if문은 `표현식이 아니기 때문에` 특정 결과값을 바로 반환할 수 없다.
        - 여러 명령을 통해 실행한다.
        - 특정 조건을 만족했을 때 `여러가지 명령`을 실행하고 싶은 경우 사용한다.

    - 삼항연산자
        - 특정 조건을 만족할 때 `특정 결과값을 바로 반환`하고 싶다면 사용!

#### 1-1. 연산자 우선 순위

- 한 구문에 여러 개의 연산자를 이어서 쓴 경우, 어떤 연산자는 먼저 계산되고 어떤 연산자는 나중에 계산된다. 
- 이는 연산자 우선순위(operator precedence)에 의해 결정된다.
- 논리합(||) 연산자와 논리곱(&&) 연산자 중에서는 논리곱 연산자의 우선 순위가 더 높기 때문에 기본적으로 && 연산자가 먼저 계산된다. 

```js
true || true && false; // true
true || false && false; // true

// 논리합을 먼저 계산하고 싶다면 괄호로 묶어주자! 

(true || true) && false; // false
(true || false) && false; // false
```

#### 1-2. 논리 연산의 여러가지 법칙

- a, b, c가 모두 boolean 타입의 값이라고 했을 때 항상 true인 법칙

```js
// 이중 부정
!!a === a;
// 계산 진행은 !a가 먼저 계산되고 그다음이 계산된 것이다.

// 교환 법칙
a || b === b || a;
a && b === b && a;

// 결합 법칙
(a || b) || c === a || (b || c);
(a && b) && c === a && (b && c);

// 분배 법칙
a || (b && c) === (a || b) && (a || c);
a && (b || c) === (a && b) || (a && c);

// 흡수 법칙
a && (a || b) === a;
a || (a && b) === a;

// 드 모르간의 법칙
!(a || b) === !a && !b;
!(a && b) === !a || !b;
```

- 그 밖의 법칙

```js
a || true === true;
a || false === a;
a && true === a;
a && false === false;

a || !a === true;
a && !a === false;
```

- 논리합 연산자(||) : 피연산자 중에 true가 하나라도 있으면 true가 나온다.
- 논리곱 연산자(&&) : 피연산자 중에 false가 하나라도 있으면 false가 나온다.

---

### 2. falsy & truthy

- javaScript에서는 다른 타입의 값을 boolean 타입이 아님에도 진리값처럼 취급할 수 있다. 

- boolean 타입이 와야할 곳에 다른 타입이 왔을 때, 진리값처럼 `취급`하는 것이지 절대 진리값이 아니다. 

- true로 취급되는 값 : `truthy`

- false로 취급되는 값 : `falsy`

```js
// falsy인 값

false

undefined

NaN

null

0

'' // 빈 문자열
```

- falsy인 값들을 제외한 모든 다른 타입의 값들은 truthy다.

```js
if (x) {
  console.log('이 코드는 실행됩니다.');
} else{
  console.log('이 코드는 실행되지 않습니다.');
}

// '이 코드는 실행됩니다.'
if (1) {
  console.log('이 코드는 실행됩니다.');
} else{
  console.log('이 코드는 실행되지 않습니다.');
}

// '이 코드는 실행되지 않습니다.'
if (0) {
  console.log('이 코드는 실행됩니다.');
} else{
  console.log('이 코드는 실행되지 않습니다.');
}
```

- 단, 이들은 진리값과 논리적으로 정확히 같지 않기때문에 truthy 와 falsy를 사용하여 if문이나 함수, 메소드를 만들때는 조심해야한다.
    - 예를 들어
    ```js
    const input = prompt("이름이 무엇이나굥?")
    alert(`안녕하세요, ${input}님!`)


    if (input.length>0){
    alert(`안녕하세요, ${input}님!`)
    } else {
    alert('이름을 입력해주세요.')
    }

    // 어차피 input이 빈 문자열이라면 falsy고, false로 인식되기 때문에, input의 길이를 조건으로 삼지 않아도 실행되는 기능은 같다.

    if (input){
    alert(`안녕하세요, ${input}님!`)
    } else {
    alert('이름을 입력해주세요.')
    }
    ```
    But,

    ```js
    // a라는 수를 입력받았는데 a가 0이면 '0입니다' 출력, 아니면 '0이 아닙니다'를 출력하고 싶을때

    if (a !== 0){
    console.log('0이 아닙니다.')
    }else {
    console.log('0입니다.')
    }

    // 여기서 어차피 a가 0이면 falsy고 0 이외의 숫자는 truthy니까 (!=== 0)을 지우자! 라고 생각해서 지웠을 때

    if (a){
    console.log('0이 아닙니다.')
    }else {
    console.log('0입니다.')
    }
    
    // 그런데 만약 입력받은 a가 숫자가 아니고 null값이거나, 빈 문자열이거나면
    // 그 값들도 '0입니다.'로 출력될 것.


    //결국 두 번째 구문은 첫 번째 구문이 아닌 이 구문과 의미가 같은 것이다.

    if (a !== 0 && a !== null && a !== '' && a !== false && a !== NaN){
    console.log('0이 아닙니다.')
    }else {
    console.log('0입니다.')
    }
    ```

#### 2-1. 다른 타입의 값을 진리값으로 변환하기

- 이중 부정
```js
!!'cat'; // true
```
먼저 `!'cat'`이 `!truthy`기 때문에 `false` 값으로 변환이 되고, 그다음 `!false`가 `true`가 되면서 결국 true 값으로 변환된다.

- Boolean 함수
```js
Boolean('cat'); // true
```

# 2. Today I Found Out

```
단순한 것 같아도 헷갈리기 쉬워서 기본 원리를 잘 익혀야 할 것 같다.
```

# 3. reference
- https://helloworldjavascript.net/pages/140-string.html