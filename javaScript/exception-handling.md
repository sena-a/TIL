# 1. Today I Learned

## 예외 처리(exception handling)

JavaScript에는 코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의 실행 흐름을 복구할 수 있는 기능이 내장되어 있다. 이런 기능을 예외 처리라고 한다.

- javaScript 코드에서 방생할 수 있는 에러에는 프로그래머 실수로 발생하는 에러도 있지만, 네트워크 에러 등 코드와 무관한 이유로 발생하는 에러도 있다.

- 기본적으로 예외처리를 해주지 않으면, 코드 실행 중 에러가 발생했을 때, 코드의 실행이 중단되어 그 시점에 실행 중이었던 작업을 완료할 수 없게 된다.다만, JavaScript는 이로부터 코드의 실행 흐름을 원상복구할 수 있는 기능을 제공한다.

- 이처럼 예기치 못한 에러가 발생했을 때 전체 코드를 중단시키지 않고 어느 시점에서부터 다시 원하는 코드로 실행 흐름을 복구할 수 있는 작업을 예외처리라고 할 수 있다.

### 동기식 코드에서의 예외 처리

1. `try...catch...finally` 구문을 사용하여 에러가 나더라도 코드의 실행을 지속할 수 있다.

```js
try {

// 에러 발생 예상 코드

} catch(e) {

// 에러 발생 예상 코드에서 실제 에러 발생시 실행 흐름을 복구하여 실행 흐름이 시작될 코드
// e -> 발생한 에러에 대한 정보를 담고 있는 객체

}
```

- 에러가 났을 때 원상복구를 시도할 코드를 `try` 블록 내부에 작성하면, 해당 블록의 코드에서 에러가 발생했을 때 코드의 실행 흐름이 아예 중단되는 것이 아닌 `catch` 블록으로 옮겨서 실행 흐름이 복구된다.

- 이 때, `catch` 블록 안에서는 발생한 에러에 대한 정보를 담고 있는 객체(위 코드의 e)를 활용할 수 있다.

```js
try {
  console.log('에러가 나기 직전까지의 코드는 잘 실행됩니다.');
  new Array(-1); // RangeError: Invalid array length
  // 에러 발생. 실행 흐름은 이 즉시 try 블록을 버리고 catch 블록으로 옮겨진다.
  console.log('에러가 난 이후의 코드는 실행되지 않습니다.');
} catch (e) {
  console.log('코드의 실행 흐름이 catch 블록으로 옮겨집니다.');
  alert(`다음과 같은 에러가 발생했습니다: ${e.name}: ${e.message}`);
}
```

repl에서 위 코드를 실행하면

```js
console.log('에러가 나기 직전까지의 코드는 잘 실행됩니다.');
console.log('코드의 실행 흐름이 catch 블록으로 옮겨집니다.');
alert(`다음과 같은 에러가 발생했습니다: ${e.name}: ${e.message}`);
```
위 순서대로 코드가 실행된다.

- `try` 블록 뒤에 `finally` 블록이 오면, `finally` 블록에 있는 코드는 `try`블록에서 에러가 발생하든 말든 무조건 실행된다. 

- 심지어 `try` 블록 내에서 코드 실행 흐름을 컨트롤하는 `return`, `break`, `continue`를 사용하여 코드의 실행 흐름이 즉시 이동될 때에서 `finally` 블록에 있는 코드는 무조건 실행된다.

```js
for (let i of [1, 2, 3]) {
  try {
    if (i === 3) {
      break;
    }
  } finally {
    console.log(`현재 i의 값: ${i}`);
  }
}
// 현재 i의 값: 1
// 현재 i의 값: 2 // 여기서 끝나지 않고 
// 현재 i의 값: 3 // 한 번 더 실행된 후 종료된다.
```

- 지금까지 배웠던 걸로 생각해보면 i가 3이 되면 break;가 실행되고, 루프는 즉시 종료해야할 것 같지만, finally는 무조건 실행되기 때문에 i가 3이 되면 finally의 코드가 한 번 실행되고 난 다음에야 루프가 종료된다.

- 이 세 블록은 다 같이도 사용 된다. 이때 코드의 실행 순서를 정리해보자.
    - 에러가 안 났을 때: 1. `try`  2. `finally`
    - 에러가 났을 때: 1. `try` 2. *에러 발생* 3. `catch` 4. `finally`

```js
try {
  console.log('try');
  new Array(-1); // RangeError: Invalid array length
} catch (e) {
  console.log('catch');
} finally {
  console.log('finally');
}

// try // 배열이 생성 안됨
// catch
// finally
```

- 보통 에러가 날 것 같은 코드를 try 블록으로 감싸고 에러가 났다면, 에러가 났다고 사용자에게 알려주는 코드를 catch 블록에다가 넣는 방식이다.

2. 직접 에러 발생시키기

`Error` 생성자와 `throw` 구문을 사용해서 프로그래머가 직접 에러를 발생시킬 수도 있다. 

```js
const even = parseInt(prompt('짝수를 입력하세요'));

if (even % 2 !== 0) {
  throw new Error('짝수가 아닙니다.');
}

// 입력 받은 '숫자' 값이 짝수가 아니면 에러를 발생시킨다.
```

- `throw` 뒤에 에러 생성자로 만든 에러 객체 (new Error())를 반환한다.

- 에러 생성자는 자바스크립트의 내장 생성자이다.

- 에러 객체가 아닌 값을 throw 하게되면 굳이 따지자면 문법 에러는 아니지만, error 객체만 throw하는게 규칙이다.

- 간혹 프로그램을 작성하면서 에러의 종류를 구분해야 하거나 에러 객체에 기능을 추가해야 할 필요가 있다. 이런 경우에는 `Error`를 상속받는 클래스를 만들어서, `throw` 구문에서 이 클래스를 대신 사용할 수 있다.

- 예를 들어 `Error`를 상속받는 `MyError` 클래스를 생성해서 `throw` 구문에서 이 클래스를 대신 사용하여 instance 에러를 만들었을 때, `catch` 블록 안에서 실행 흐름 복구를 위해 이 값을 활용할 수 있다.


```js
class MyError extends Error {
  constructor(value, ...params) {
    super(...params);
    this.value = value;
    this.name = 'MyError';
  }
}

try {
  const even = parseInt(prompt('짝수를 입력하세요')); // 3 입력 시
  if (even % 2 !== 0) { 
    throw new MyError(even, '짝수가 아닙니다.'); // 에러 발생
  }
} catch (e) { // new MyError(even, '짝수가 아닙니다.') 코드로 생성된 에러 객체 활용
  if (e instanceof MyError) {
    console.log(e.value); // MyError 인스턴스에 저장된 속성
    console.log(e.message); // Error에서 상속받아 인스턴스에 저장된 속성
  }
}

// 출력 결과
// 3
// 짝수가 아닙니다
```

---

### 비동기식 코드에서의 예외 처리

비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 `try` 블록으로는 잡아낼 수 없다.

```js
try {
  setTimeout(() => {
    throw new Error('에러!');
  });
} catch (e) {
  console.error(e);
}

// 발생한 에러 객체가 출력되길 기대했지만 try블록은 이 에러를 잡아내지 못하고 에러 객체도 출력되지 않는다.
```

- 이를 이해하기 위해선 에러가 발생하는 순간 호출 스택의 동작 방법을 알아야한다.

- JavaScript 엔진은 에러가 발생하는 순간 호출 스택을 현재 시점부터 되감아 보는 과정을 거쳐 try 블록을 만나면 코드의 실행 흐름을 원상복구시키는데, setTimeout에 넘겨진 콜백에서 에러가 발생한 순간에 호출 스택에는 `try`블록이 남아있지 않고, 호출 스택을 따라 올라가도 `try` 블록을 만나지 않기 때문에, 코드 실행 흐름이 `catch` 블록으로 옮겨지지 않기 때문이다.

- 천천히 코드 실행을 짚어보자.
    1. `try` 블록 내부의 setTimeOut() 비동기 함수를 만나면, 그 속의 콜백은 브라우저에 실행해달라고 맡기고 코드는 계속 진행된다.
    2. 이때, 콜백은 작업큐에 들어가게 될거고, 호출 스택에서는 try블록이 다음 코드 실행 흐름에 따라 지워질 것이다. 
    3. 콜백이 호출 스택에 들어갈 시점에서는 남은 코드 실행도 다 끝난 시점이기 때문에 `try`는 더이상 존재하지 않는다...
    4. 그래서 콜백에서 에러가 발생하면, 예외처리를 해주지 않은 것과 똑같이 동작한다. (실제로 예외처리를 해주지 않은게 된거다.)

- 따라서, 비동기식 코드에서 `try` 블록으로 예외처리를 해줄때는, 비동기 콜백 내부에 작성해주어야한다. 

```js
setTimeout(() => {
  try {
    throw new Error('에러!');
  } catch (e) {
    console.error(e);
  }
});
```

---

### Promise

Promise 객체는 세가지 상태를 가질 수 있다.
- pending - Promise 객체에 결과값이 채워지지 않은 상태
- fulfilled - Promise 객체에 결과값이 채워진 상태
- rejected - Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태

Promise 객체가 rejected 상태가 되면, 이 Promise에 대해서는 `then` 메소드에 첫 번째 인수로 넘겨준 콜백이 실행되지 않고, 두 번째 인수로 넘겨준 콜백이 대신 실행된다. 그리고, 이 콜백에는 에러 객체(e)가 첫 번째 인수로 주어진다.

```js
const p = new Promise(resolve => {
  const even = parseInt(prompt('짝수를 입력하세요')); // 5 입력시
  if (even % 2 !== 0) {
    throw new Error('짝수가 아닙니다.'); // 프로미스 객체가 rejected 상태가 된다.
  } else {
    resolve(even);
  }
});

p.then(even => {
  return '짝수입니다.'; // 첫 번째 콜백 실행되지 않음
}, e => {
  return e.message; // 두 번째 콜백으로 실행흐름이 옮겨간다. // 또한, 이 콜백에는 에러 객체가 첫 번째 인수로 주어진다.
}).then(alert); // e.message 알림
```
두 번째 인수를 주지 않으면 에러는 잡히지 않는다. 

```js
p.then(even => {
  return '짝수입니다.';
}).then(e => {
  return e.value;
}).then(alert);

// then 메소드가 아무리 많아도, 에러는 잡히지 않는다..
// 두 번째 인수에 있는 콜백이 없쓰니까..
```

두 번째 인수를 한 군데만 주게되면 두 번째 인수 콜백을 가지고 있는 then메소드의 '그' 두 번째 인수 콜백부터 실행흐름이 복구된다.

```js
p.then(even => {
  return '짝수입니다.';
}).then(() => {
  console.log('실행안됨'); // 두 번째 인수가 없으면 에러를 잡을 수 없다
}).then(() => {
  console.log('실행안됨'); // 두 번째 인수가 없으면 에러를 잡을 수 없다
}).then(() => {
  console.log('실행안됨');
} // 두 번째 인수가 있다! 
  , e => {
    return e.message // 두 번째 콜백부터 실행흐름이 복구 되어서 
  }).then(alert); // 이 코드도 실행 된다. 
```
주의, 에러객체(e) 는 실행 흐름 복구 시점이 되는 두 번째 인수인 콜백에서만 첫번째 인수로 받는 것이다.

```js
p.then(even => {
  return '짝수입니다.';
}).then(() => {
  console.log('실행안됨'); // 두 번째 인수가 없으면 에러를 잡을 수 없다
}).then(() => {
  console.log('실행안됨'); // 두 번째 인수 있음
},
  e => {
    return e.message // 실행 흐름 복구, e는 에러 객체, 이 밑으로는 전부 정상적으로 실행 됨
  }).then(() => {
    console.log('실행됨');
  }
    , e => {
      return e.message // 실행 흐름 복구 시점이 아니기 때문에 e는 에러객체가 아니며 undefined가 된다. 
    }).then(alert); // 이 코드도 실행 된다.
```

혹은, 두 번째 인수에 에러 처리 콜백을 지정하지 않고 `catch` 메소드를 통해 에러 처리 콜백을 지정해줄 수도 있다.

```js
p.then(even => {
  return '짝수입니다.';
}).catch(e => {
  return e.message; // 에러 처리가 됨.
}).then(alert);
```

단, catch 메소드는 앞에서 에러가 잡히면 아예 무시된다.

```js
p.then(even => {
  return '짝수입니다.';}
  , e => {return e.message // 두 번째 콜백으로 에러 처리 성공
}).catch(() => {
  console.log('무시됩니다'); // 앞에서 에러가 처리됐기때문에 catch메소드는 실행되지 않는다 
}).then(alert); // 실행됨 
```

만약, `then` 메소드의 연쇄 안에서 에러가 발생하면, 그 이후 처음 만나는 에러 처리 콜백으로 코드의 실행 흐름이 건너뛴다.

```js 
Promise.resolve()
  .then(() => {
    throw new Error('catch 메소드를 통해 예외 처리를 할 수 있습니다.');
  })
  .then(() => {
    console.log('이 코드는 실행되지 않습니다.');
  })
  .catch(e => {
    return e.message; // 에러 처리! 
  })
  .then(console.log);
```
혹은 

```js
Promise.resolve()
  .then(() => {
    throw new Error('catch 메소드를 통해 예외 처리를 할 수 있습니다.');
  })
  .then(() => {
    console.log('이 코드는 실행되지 않습니다.');}
    , e => {return '이코드가 실행됩니다' // 에러 처리!
  })
  .catch(e => {
    return e.message; // 앞에서 에러가 잡혔으니 이 메소드 실행 안됨
  })
  .then(console.log); 
```

---

### 비동기 함수

Promise 객체의 예외 처리 방식은, 일반적인 동기식 예외 처리 방식과 다르게 콜백을 사용하고 있어서 코드를 복잡하게 만드는 원인이 된다. 

비동기 함수 내부에서는 `await`를 통해, rejected 상태가 된 Promise 객체를 동기식 예외 처리 방식과 동일하게 `try...catch...finally` 구문으로 처리할 수 있습니다.
  - rejected 상태인 프로미스를 await하면 에러가 발생하고 그 에러는 try, catch 블록으로 잡아낼 수 있다. 
  
  - 비동기 함수는 비동기식 코드를 동기식 코드처럼 쓸 수 있는 장점이 있다!
  
  ```js
  async function func() {
    try {
      const res = await fetch('https://nonexistent-domain.nowhere');
    } catch (e) {
      console.log(e.message);
    }
  }

  func(); // 출력 결과: Failed to fetch
  ```
  - 단, 프로미스 객체에 대해 await하지 않는 경우, 에러를 잡을 수 없다. 즉, await한 경우에만 잡을 수 있습니당

  ```js
  async function func() {
    try {
      fetch('https://nonexistent-domain.nowhere');
    } catch (e) {
      console.log(e.message);
    }
  }

  func(); // 아무것도 출력되지 않습니다.
  ```

# 2. Today I Found Out

```
2018.11.13

tip: promise에도 finally 문법이 추가 될 예정이라고 한다.
```

# 3. reference

- https://helloworldjavascript.net/pages/290-exception.html