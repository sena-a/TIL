# 1. Today I Learned

# 예외 처리 (Exception / Error handling)

- 예외 처리란 간단히 말하자면 프로그램이 실행되는 동안 어떤 문제가 발생한 경우에 프로그램이 중단되지 않고 대처할 수 있도록 처리하는 것을 예외 처리(Exception Handling)라고 합니다.

- 코드적으로는, 프로그램 실행 중에 발생하여 일반적인 코드의 실행 흐름에 영향을 주는 오류들을 예외(Exception)라고 하는데, 예외 처리란 이와 같은 예기치 못한 예외가 발생했을 때 전체 코드를 중단시키지 않고 어느 시점에서부터 다시 원하는 코드로 실행 흐름을 복구할 수 있는 작업을 예외 처리라고 할 수 있습니다.

NOTE: 프로그래밍에서의 에러는 세가지로 나뉠 수 있는데, 이때 자바스크립트에서의 예외란 런타임 에러 혹은 사용자가 생성한 에러를 지칭합니다.

- 문법 에러 (syntax error / parsing error): 프로그래밍 언어의 문법에 맞지 않아 발생하는 에러.
  ```js
  console.log(; // 괄호 생략 오타 // 문법 에러
  ```
- 런타임 에러: 문법에 어긋나지는 않지만 실행 시 오류를 발생시키는 에러.
  ```js
  const a = variable;
  console.log(b); // ReferenceError: b is not defined
  ```
- 논리적 에러 (semantic error): 디버깅하기 넘나 어려운 에러. 문법에도 맞고, 실행 시 오류도 발생시키지 않지만 내가 원하는대로 동작해주지 않는 에러. 대부분 로직 작성이 잘못되어 발생하는 에러들입니다.

그럼 이제, 예외 처리를 어떻게 할 것인지 대해서 ARABOJA.

## `try-catch-finally` 구문

코드 실행 중에 에러가 발생하면, 코드의 실행이 중단되어 그 시점에 실행 중이었던 작업을 완료할 수 없게 됩니다. JavaScript는 이로부터 코드의 실행 흐름을 원상복구할 수 있는 기능을 제공하며, `try-catch-finally` 구문을 사용하면 에러가 나더라도 코드의 실행을 지속할 수 있습니다.

`try-catch`의 기본 생김새는 이렇게 생겼습니다.

```js
try {
  // ...
} catch (e) {
  // handling code
}
```

`try-catch` 구문의 실행 방식

1. try 블록 내부의 코드들을 실행합니다.
2. 에러가 발생하는 순간 아직 실행되지 않은 나머지 코드들을 무시한채 catch 블록으로 실행 흐름을 옮깁니다.
3. catch 블록으로 실행 흐름을 복구하여 그 속의 코드를 실행합니다.
   ![try catch](https://javascript.info/article/try-catch/try-catch-flow.png)

아래 예제를 보면 흐름을 알 수 있습니다.

```js
try {
  console.log("잘 실행됩니다."); // 1
  siots(); // 2: ReferenceError: siots is not defined // 에러 발생. 실행 흐름은 즉시 try 블록을 버리고 catch 블록으로 옮겨간다.
  console.log("버려짐");
} catch (e) {
  console.log("코드의 실행 흐름이 catch 블록으로 옮겨왔습니다."); // 3
}
```

이때, `catch`는 `try`블록에서 발생한 에러의 정보를 담고 있는 객체를 인수로 받아 사용할 수 있습니다.

```js
try {
  console.log("잘 실행됩니다.");
  siots();
  console.log("버려짐");
} catch (e) {
  console.log("코드의 실행 흐름이 catch 블록으로 옮겨왔습니다.");
  console.log(`발생한 에러의 이름: ${e.name} 내용: ${e.message}`);
}
```

이 객체가 어떻게 생겼길래 name이란 속성을 부를 수 있고 message 속성을 부를 수 있죠? 잠시 이 '에러 객체'를 간단히 짚고 가봅시다.
JavaScript에서는 여러 에러 종류가 있는데, 모든 에러는 객체로 존재합니다. 여기서는 에러 객체가 어떻게 생겼는지만 보도록 하겠습니다.

```js
// 콘솔창에서 이 코드를 실행해보세요
try {
  siots();
} catch (e) {
  console.dir(e); // 에러 객체가 찍힐 것입니다.
}
```

위 코드를 실행시켜 아래와 같은 객체를 만나볼 수 있습니다.

```js
{
  message: "siots is not defined"
  stack: "ReferenceError: siots is not defined at <anonymous>:2:3"
  __proto__: {
    constructor: ReferenceError()
    name: "ReferenceError"
    ...
  }
}
```

이 분이 에러 객체입니다. 다른 사항은 중요하지 않고 아래 사항만 기억하면 됩니다.

1. message : 에러 메세지
2. name : 에러 이름. 에러 객체의 프로토타입에 들어있다.
3. stack : 에러가 발생한 지점과 상세 에러 내용이 표시된다. 단, 크로스 브라우징 시 모든 브라우저를 만족할 수 없으므로 디버깅 용도로만 쓰인다고 한다.
4. constructor : 에러 이름과 같은 이름의 생성자가 들어있다.

이렇게 `catch` 구문이 `try` 구문에서 발생한 에러 객체를 인수로 받는다는 점을 이용해서, 발생한 에러의 타입별로 다른 코드를 작성할 수 있다고합니다.

```js
try {
  siots();
} catch (e) {
  switch (e.constructor) {
    case SyntaxError:
      console.log("안실행");
      break;
    case ReferenceError:
      console.log("실행");
      break;
    ...
  }
}
```

> [switch reference](http://speakingjs.com/es5/ch17.html#switch_constructor)
> 비슷한 동작을 하기 위해 rethrowing 기법을 사용할 수도 있다고 한다. [rethrowing](https://javascript.info/try-catch)

그럼 이제, 우리는 `try-catch` 구문 그 자체를 마스터 했습니다. 박수! 그렇다면 남은 `finally`는 정말 간단 명료한 구문이니 걱정하지 않아도 됩니다. `finally`는 `try-finally` 혹은 `try-catch-finally` 형태로 사용할 수 있는데, 이어진 `try` 블록이 어떤식으로든 끝이나면 `finally` 블록의 코드는 언제나, 항상, always 실행됩니다. 이때, `finally` 블록은 `try` 블록이 생을 어찌 마감했는지는 1도 신경쓰지 않습니다. 그냥 끝나면 무조건 한 번 실행됩니다.

```js
try {
  // 1-1. 정상적으로 모든 코드가 실행된 후 끝이 나든
  // 1-2. return, break, continue 와 같은 명령으로 인해 강제로 실행 흐름이 이동 되든
  // 1-3. 에러가 발생해서 실행 흐름이 정지되든
} finally {
  // 무조건 실행이 됩니다.
}
```

확인해보세요!

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

`try`가 꼭 예외 처리만을 위해 사용되는 건 아니기 때문에 `finally`는 `try-finally`로도 원하는 곳에서 사용할 수 있지만, `try-catch-finally` 구문으로 예외 처리시에도 사용할 수 있습니다. 이때, 실행흐름은 아래 두 가지로 나뉩니다.

- 에러가 안 났을 때: 1. `try` 2. `finally`
- 에러가 났을 때: 1. `try` 1-1. _에러 발생_ 2. `catch` 3. `finally`

```js
try {
  siots();
} catch (e) {
  console.log("실행");
} finally {
  console.log("얘도 실행");
}
```

예외 처리 기법으로 `try-catch-finally`는 이런 느낌입니다. `try`로 에러 발생 가능 코드에 보험을 들어놓아주고, 에러가 발생하면 `catch` 로 잡아주고, 상황을 정리해줄 코드를 `finally`에 작성해줌.

> NOTE : 익스플로러 7 및 이전 버전에서는 catch 절이 있어야만 finally를 실행하는 버그가 있습니다. 인터넷 익스플로러 구버전을 지원해야 한다면 빈 catch 절을 삽입하면 됩니다. (출처: 프론트엔드 개발자를 위한 자바스크립트 프로그래밍)

## 에러의 종류

- RangeError : 사용한 숫자가 범위를 벗어났을 때 발생. ex) `new Array(-1);`
- ReferenceError : 선언되지 않은 변수를 참조할 때 발생.
- SyntaxError : 문법에 오류가 있을 때 발생. ex) `3..1`
- TypeError : 예상 유형이 아닌 값을 사용했을 때 발생. ex) `undefined.foo;` `''.push(3);`
- URIError : encodeURI()나 decodeURI()에 잘못된 URI를 넘겼을 때 발생. (이 함수들은 매우 견고하게 작성되어있어서, 자바스크립트에서 이 에러가 발생되는 경우는 극히 드물다고 합니다.)
- EvalError : eval() 함수에 오류가 있을 때 발생하는 오류였으나 현재는 사용되지 않으며, SyntaxError로 발생한다고 함.

이 에러들은 위에서 보았듯 에러 객체를 가지고 있으며, constructor가 `에러이름()`인 프로토타입을 갖습니다. 즉, `에러이름()` 생성자 함수로 생성된 객체들인데, 이 프로토타입의 프로토타입은 Error() 생성자의 프로토타입입니다. 때문에 모든 에러 객체는 Error 객체를 상속합니다.

```js
try {
  siots();
} catch (e) {
  console.dir(e);
}

// 출력되는 에러 객체의 프로토타입의 프로토타입을 확인해보세요
```

[에러타입 reference](http://speakingjs.com/es5/ch14.html)
[나 이 에러 한 번은 만나봤다! JavaScript 에러 TOP 10](http://blog.meeta.io/10)

## `throw` 연산자와 에러 커스터마이징

지금까지 본 `try-catch` 구문은 런타임에러를 처리할 수 있는 구문이었습니다. 그럼 시맨틱 에러는 어떻게 처리해줘야 할까요? 예를 들어,

- 사용자의 이름을 받아 화면에 출력해주는 동작을 하고싶은데, 사용자의 이름이 빈 문자열이면 출력을 막고싶습니다. 하지만 사용자의 이름이 빈 문자열이더라도, 자바스크립트는 이를 에러로 보지 않습니다.

이렇게 에러가 아님에도 특정 조건일 때 에러를 발생 시키고 싶을 때 `throw` 연산자와 에러 커스터마이징이 사용됩니다. `throw`연산자는 에러 생성자와 함께 사용되며 에러를 발생시킵니다.

```js
throw new Error("원하는 에러 메세지를 지정할 수 있습니다");
throw new SyntaxError("문법이 이상하네요. 치과에 가보세요");
throw new ReferenceError("오타는 넘어가고 싶지만 브라우저가 싫다는군요.");
```

각 에러 타입의 생성자를 사용하여 인수로 원하는 메세지를 넣어주면, 해당 에러 메세지를 속성으로 가진 에러 객체가 생성되며, 그 즉시 에러가 발생합니다. 단, 인터넷 익스플로러는 Error() 생성자에 대해서만 커스텀 에러 메시지를 표시한다고합니다. 따라서 에러 메시지를 커스텀할 경우 Error()만 쓰는 것을 권장합니다.

```js
const even = parseInt(prompt("짝수를 입력하세요"));

if (even % 2 !== 0) {
  throw new Error("짝수가 아닙니다.");
}
```

이렇게 에러 메세지만 커스텀하여 에러를 발생시킬 수도 있지만 프로그래밍을 하다보면, 브라우저 에러와 명확히 구분된 에러를 만들어야할 때가 생깁니다. 이때 생성하는 것이 커스텀 에러입니다. 커스텀 에러를 쓰면 함수 실행이 왜 실패했는지 매우 중요한 단서를 제공할 수 있기 때문에 디버깅에 용이합니다. 브라우저는 개발자가 알고 있는 조건을 모르므로 불분명한 메시지 밖에는 줄 수 없습니다. 따라서 발생된 에러를 보고 어떤 이유로 코드가 오작동을 하는지 언제나 명확히 알 수 있게끔 해주는 것이 커스텀 에러입니다. 아래는 커스텀 에러를 만드는 과정입니다.

```js
function MyError() {
  this.name = "MyError";
  this.message = "원하는 에러 메시지";
}

MyError.prototype = new Error(); // 필수

// 앞서 모든 에러 객체는 Error 객체를 상속받는다고 했습니다. 따라서 커스텀 에러 역시 Error()객체를 상속받아야합니다.
```

> NOTE: 에러 객체 뿐만 아니라 다른 타입의 값을 `throw`한다고 해서 문법 상 틀리진 않지만, 에러를 발생시키기 위한 연산자이므로 에러 객체만 다룰 것을 권장합니다.

## 비동기식에서의 처리

비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 `try` 블록으로는 잡아낼 수 없으므로 조금 더 주의해서 사용해야합니다.

```js
try {
  setTimeout(() => {
    throw new Error("에러!");
  });
} catch (e) {
  console.error(e);
}

// 발생한 에러 객체가 출력되길 기대했지만 try블록은 이 에러를 잡아내지 못하고 에러 객체도 출력되지 않는다.
```

- 이를 이해하기 위해선 에러가 발생하는 순간 호출 스택의 동작 방법을 알아야합니다.

- JavaScript 엔진은 에러가 발생하는 순간 호출 스택을 현재 시점부터 되감아 보는 과정을 거쳐 try 블록을 만나면 코드의 실행 흐름을 원상복구시키는데, setTimeout에 넘겨진 콜백에서 에러가 발생한 순간에 호출 스택에는 `try`블록이 남아있지 않고, 호출 스택을 따라 올라가도 `try` 블록을 만나지 않기 때문에, 코드 실행 흐름이 `catch` 블록으로 옮겨지지 않습니다.

- 천천히 코드 실행을 짚어봅시다.

  1. `try` 블록 내부의 setTimeOut() 비동기 함수를 만나면, 그 속의 콜백은 브라우저에 실행해달라고 맡기고 코드는 계속 진행된다.
  2. 이때, 콜백은 작업큐에 들어가게 될거고, 호출 스택에서는 try블록이 다음 코드 실행 흐름에 따라 지워질 것이다.
  3. 콜백이 호출 스택에 들어갈 시점에서는 남은 코드 실행도 다 끝난 시점이기 때문에 `try`는 더이상 존재하지 않는다...
  4. 그래서 콜백에서 에러가 발생하면, 예외처리를 해주지 않은 것과 똑같이 동작한다. (실제로 예외처리를 해주지 않은게 된거다.)

- 따라서, 비동기식 코드에서 `try` 블록으로 예외처리를 해줄때는, 비동기 콜백 내부에 작성해주어야합니다.

```js
setTimeout(() => {
  try {
    throw new Error("에러!");
  } catch (e) {
    console.error(e);
  }
});
```

### Promise

Promise 객체는 세가지 상태를 가질 수 있습니다.

- pending - Promise 객체에 결과값이 채워지지 않은 상태
- fulfilled - Promise 객체에 결과값이 채워진 상태
- rejected - Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태

Promise 객체가 rejected 상태가 되면, 이 Promise에 대해서는 `then` 메소드에 첫 번째 인수로 넘겨준 resolve 콜백이 실행되지 않고, 두 번째 인수로 넘겨준 reject 콜백이 대신 실행됩니다. 그리고, 이 콜백에는 에러 객체(e)가 첫 번째 인수로 주어집니다.

```js
const p = new Promise(resolve => {
  const even = parseInt(prompt("짝수를 입력하세요")); // 5 입력시
  if (even % 2 !== 0) {
    throw new Error("짝수가 아닙니다."); // 프로미스 객체가 rejected 상태가 된다.
  } else {
    resolve(even);
  }
});

p.then(
  even => {
    return "짝수입니다."; // 첫 번째 콜백 실행되지 않음
  },
  e => {
    return e.message; // 두 번째 콜백으로 실행흐름이 옮겨간다. // 또한, 이 콜백에는 에러 객체가 첫 번째 인수로 주어진다.
  }
).then(alert); // e.message 알림
```

두 번째 인수를 주지 않으면 에러는 잡히지 않습니다.

```js
p.then(even => {
  return "짝수입니다.";
})
  .then(e => {
    return e.value;
  })
  .then(alert);

// then 메소드가 아무리 많아도, 에러는 잡히지 않는다..
// 두 번째 인수에 있는 콜백이 없쓰니까..
// 하염없이 기다린ㄷr...
```

두 번째 인수를 한 군데만 주게되면 두 번째 인수 콜백을 가지고 있는 then메소드의 '그' 두 번째 인수 콜백부터 실행흐름이 복구됩니다.

```js
p.then(even => {
  return "짝수입니다.";
})
  .then(() => {
    console.log("실행안됨"); // 두 번째 인수가 없으면 에러를 잡을 수 없다
  })
  .then(() => {
    console.log("실행안됨"); // 두 번째 인수가 없으면 에러를 잡을 수 없다
  })
  .then(
    () => {
      console.log("실행안됨");
    }, // 두 번째 인수가 있다!
    e => {
      return e.message; // 두 번째 콜백부터 실행흐름이 복구 되어서
    }
  )
  .then(alert); // 이 코드도 실행 된다.
```

주의, 에러객체(e) 는 실행 흐름 복구 시점이 되는 두 번째 인수인 콜백에서만 첫번째 인수로 받는 것이다.

```js
p.then(even => {
  return "짝수입니다.";
})
  .then(() => {
    console.log("실행안됨"); // 두 번째 인수가 없으면 에러를 잡을 수 없다
  })
  .then(
    () => {
      console.log("실행안됨"); // 두 번째 인수 있음
    },
    e => {
      return e.message; // 실행 흐름 복구, e는 에러 객체, 이 밑으로는 전부 정상적으로 실행 됨
    }
  )
  .then(
    () => {
      console.log("실행됨");
    },
    e => {
      return e.message; // 실행 흐름 복구 시점이 아니기 때문에 e는 에러객체가 아니며 undefined가 된다.
    }
  )
  .then(alert); // 이 코드도 실행 된다.
```

혹은, 두 번째 인수 콜백 대신 `catch` 메소드를 통해 에러 처리 콜백을 지정해줄 수도 있다.

```js
p.then(even => {
  return "짝수입니다.";
})
  .catch(e => {
    return e.message; // 에러 처리가 됨.
  })
  .then(alert);
```

단, catch 메소드는 앞에서 에러가 잡히면 아예 무시된다.

```js
p.then(
  even => {
    return "짝수입니다.";
  },
  e => {
    return e.message; // 두 번째 콜백으로 에러 처리 성공
  }
)
  .catch(() => {
    console.log("무시됩니다"); // 앞에서 에러가 처리됐기때문에 catch메소드는 실행되지 않는다
  })
  .then(alert); // 실행됨
```

만약, `then` 메소드의 연쇄 안에서 에러가 발생하면, 그 이후 처음 만나는 에러 처리 콜백으로 코드의 실행 흐름이 건너뜁니다.

```js
Promise.resolve()
  .then(() => {
    throw new Error("catch 메소드를 통해 예외 처리를 할 수 있습니다.");
  })
  .then(() => {
    console.log("이 코드는 실행되지 않습니다.");
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
    throw new Error("catch 메소드를 통해 예외 처리를 할 수 있습니다.");
  })
  .then(
    () => {
      console.log("이 코드는 실행되지 않습니다.");
    },
    e => {
      return "이코드가 실행됩니다"; // 에러 처리!
    }
  )
  .catch(e => {
    return e.message; // 앞에서 에러가 잡혔으니 이 메소드 실행 안됨
  })
  .then(console.log);
```

---

### 비동기 함수

Promise 객체의 예외 처리 방식은, 일반적인 동기식 예외 처리 방식과 다르게 콜백을 사용하고 있어서 코드를 복잡하게 만드는 원인이 됩니다. 비동기 함수 내부에서는 `await`를 통해, rejected 상태가 된 Promise 객체를 동기식 예외 처리 방식과 동일하게 `try...catch...finally` 구문으로 처리할 수 있습니다. rejected 상태인 프로미스를 await하면 에러가 발생하고 그 에러는 try, catch 블록으로 잡아낼 수 있습니다. 이는 비동기 함수는 비동기식 코드를 동기식 코드처럼 쓸 수 있는 장점 덕분에 가능한 것입니다.

```js
async function func() {
  try {
    const res = await fetch("https://nonexistent-domain.nowhere");
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 출력 결과: Failed to fetch
```

- 단, 프로미스 객체에 대해 await하지 않는 경우, 역시나 에러를 잡을 수 없습니다.

```js
async function func() {
  try {
    fetch("https://nonexistent-domain.nowhere");
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 아무것도 출력되지 않습니다.
```

혹은 앞서 보았던 것 처럼 then 메소드의 두번째 인수 혹은 catch 메소드로 해결합니다.

```js
async function func() {
  fetch("https://nonexistent-domain.nowhere").catch(e =>
    console.log(e.message)
  );
}
```

# 2. Today I Found Out

```
2018.11.13

tip: promise에도 finally 문법이 추가 될 예정이라고 한다.

2019.01.10

업데이트
```

# 3. reference

- https://helloworldjavascript.net/pages/290-exception.html
