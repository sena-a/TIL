# 1. Today I Learned

## 모듈(Module)

프론트엔드 프로젝트의 규모가 커짐에 따라, JavaScript 코드를 여러 파일과 폴더에 나누어 코드 별로 작성하고 서로가 서로를 불러와서 쓸 수 있도록 해주는 효율적인 시스템의 필요성이 절실해졌다고합니다. 이에 따라, ES2015에 모듈 시스템이 추가되었다.


다만, 모듈 문법은 이전까지의 JavaScript 파일의 동작 방식과는 다른 동작 방식을 가지고 있고, 구형 브라우저는 모듈을 지원하지 않는다는 문제가 있어서 아직은 브라우저에 내장되 모듈 기능을 사용하는 경우가 많지 않다고 한다. 대신 Webpack, Parcel 등의 모듈 번들러를 통해 변환 과정을 거친 뒤, 브라우저에는 일반적인 JavaScript 파일로서 불러오는 방법이 널리 사용되고 있는 추세라고 합니다.

```
~ tip ~
모듈이 추가되기 전에도 모듈 시스템은 존재하긴 했다
(기존 자바스크립트 함수들을 활용해서 사용하던 COMMON JS 혹은 UMD 같은) 
지금 모듈 시스템은 새롭게 추가된 정식 모듈 뭄법을 사용한다.
```

--- 

## 모듈이란? 

ES2015 모듈은 기본적으로 JavaScript 코드를 담고 있는 파일인데, 특수한 방식으로 사용되어야하는 등 일반적인 JavaScript 파일과는 다른 차이점을 가지고 있는 파일들을 모듈이라고 한다.

1. 특정 변환과정을 거치거나 type module로 물러와야하는 파일
2. import 혹은 export 구문을 사용할 수 있는 파일.
3. 별다른 처리를 해주지 않아도 엄격 모드(strict mode)로 동작하는 파일.

---

## 모듈 스코프

모듈 내에서 선언된 변수들은 모듈 내부의 가장 바깥 스코프에서 이름을 선언하더라도 전역 스코프/전역 변수에 저장되지 않고 모듈 스코프 내에서 선언되기 때문에 전역 변수가 오염될 걱정은 하지 않아도 된다.

- 모듈 스코프에 선언된 이름은 해당 모듈을 export 해주지 않는다면 해당 모듈 내부에서만 접근할 수 있다.

- 따라서, 여러 모듈의 가장 바깥쪽에서 같은 이름으로 변수, 함수, 클래스를 선언하더라도, 각각의 서로 다른 모듈 스코프에서 선언되기 때문에 이름의 충돌이 생길 일이 없으니 걱정하지 말자.


--- 

## export & import

### named export와 import

모듈 스코프에서 정의된 *이름*은 `export` 구문을 통해 다른 파일에서 사용할 수 있는데, 이를 *이름이 지정된 export*라는 뜻에서 `named export`라고 부른다

- 주의할 점! 값을 수출한것이 아닌 이름을 수출한 것이다.


```js
// variables.js 라는 모듈.

// 변수 선언
const foo = 'bar';
const spam = 'eggs';

// foo, spam라는 변수를 다른 파일에서 사용할 수 있도록 named export
// export { named export 해줄 변수 }

export { foo, spam };

```

위에서 `export` 된 이름을 다른 파일에서 사용하려면, 사용할 파일에서 `import`를 사용하여 가져와서 쓸 수 있다.

```js
// main.js

// variables 모듈에 선언된 이름을 사용하기 위해 import
// import { variables 모듈에서 export 해준 변수 } from './variables.js';

import { foo, spam } from './variables.js';

console.log(foo); // bar
console.log(spam); // eggs
```

단순히 값을 저장하고 있는 변수 뿐만 아니라, 함수나 클래스도 `export`를 통해 여러 모듈에서 재 사용할 수 있다.

```js
// functions.js

function add(x, y) {
  return x + y;
}

class Person {
  // ...
}

export { add, Person };


// main.js

import { add, Person } from './functions.js'
```

`import` 구문의 from 뒤 모듈이 라이브러리인 경우 경로를 지정해주지 않아도 되지만, 직접 생성해준 모듈일 경우 파일 경로를 지정해줘야한다.

```js
// 라이브러리

import axios from 'axios'

// 생성한 모듈

import ~ from '현재 파일을 기준으로 경로/모듈이름'
```

다른 모듈에 있는 이름을 사용하려면, 반드시 해당 모듈에서 *이름*을 `export`해줘야 한다. `export`로 수출해주지 않은 이름은 다른 모듈에서 아무리 `import`해도 의도대로 동작하지 않는다
 - 내가 쓰라고 준 적도 없는 걸 맘대로 갖다 쓸 수 없는 느낌.

모듈 시행 환경에 따라 에러가 날 수도 있고, 이름에 `undefined`가 들어있을 수도 있다.

```js
// variables.js

const foo = 'bar'

// variables 모듈에서 export 해주지 않음

// main.js
// 준 적 없는 이름을 import하고 있다
import { foo } from './variables.js';

console.log(foo); // 에러가 나거나, `undefined`가 출력됨
```

#### 선언과 동시에 export 하기

이름을 선언하는 구문 앞에 바로 `export`를 붙여주면, 선언과 `export`를 한꺼번에 할 수 있다.

```js
// common.js

export const foo = 'bar';

export const spam = 'eggs';

export function add(x, y) {
  return x + y;
}

export class Person {
  // ...
}

// main.js

import { foo, spam, add, Person } from './common.js'
```

### default export와 import

변수 이름들을 export하는 `named export`와 다르게 `export default` 구문은 모듈을 대표하는 하나의 값을 지정하고, 그 값을 다른 모듈에서 불러와서 사용할 수 있다.  

```js
// person.js

// export default + 모듈을 대표하는 하나의 값

export default class Person extends from React.Component 
// Person 클래스가 모듈을 대표하는 하나의 값이고 이를 default export 해주는 중
```
`default export`를 가져올 때는 `import` 구문에서 중괄호를 생략한다.

```js
//main.js

import Person from './person.js'
```
`export default` 뒤에는 임의의 표현식이 올 수 있다. 즉, 함수 표현식이나 클래스 표현식도 올 수 있고, 익명 함수 & 클래스도 얼마든지 가능하다.

```js
// add.js
// 익명 함수
export default function (x, y) {
  return x + y;
}
```

```js
// import할 때 이름을 마음대로 지정하여 가져왔음
import add from './add.js';
console.log(add(1, 2)); // 3
```


`import` 구문에서 `default export`와 `named export`를 동시에 가져올 수 있다.

```js
// default export는 중괄호 없이, named export는 중괄호와 함께

import React, { Component, Fragment } from 'react';
```

`default export`는 한 모듈에 존재한다면 하나만 존재하고 혹은 아예 없는 식으로 쓰이고, `named export`는 여러개 존재할 수 있다.


---

## 다른 이름으로 export & import 하기

각각 모듈에서는 같은 이름으로 변수를 선언해도 모듈 스코프 내에서 선언되기 때문에 충돌될 일은 없지만, 한 파일에서 각각 다른 모듈의 이름이 같은 변수를 export하면 import한 파일에서는 충돌이 일어날 수 있다. 이를 위해서 export 혹은 import하는 이름의 뒤에 `as`를 붙여서, 다른 이름을 대신 사용 할 수 있다.

- `export`할 때 혹은 `import` 할 때 둘 중 하나를 선택해서 지정해주면 된다.

```js
// export 할 때 지정

// variables.js
const foo = 'bar';

export { foo as FOO }; // FOO 라는 이름으로 export 됩니다.

// main.js
import FOO from './variables.js' // 가져올 때는 export한 이름으로 가져온다 

console.log(FOO) // bar
```

```js
// import 할 때 지정

// variables.js
const foo = 'bar';

export { foo }; // FOO 라는 이름으로 export 됩니다.

// main.js
import { foo as FOO } from './variables.js' 

console.log(FOO) // bar
```

---

## 모듈 사용 시 주의할 점

모듈 시스템의 문법에는 주의할 점이 있다. `import` 구문과 `export` 구문은 모듈 간 의존 관계를 나타내고 서로의 자원(?)을 가져다 쓸 통로일 뿐, 코드를 실행시키라는 명령이 아니라는 것이다.

- 하나의 모듈을 여러 다른 모듈에서 각각 불러와도, 모듈 내부의 코드는 단 한 번만 실행된다.

- `import` 구문과 `export` 구문은 모듈의 가장 바깥쪽 스코프에서만 사용할 수 있다. 

- ECMAScript 공식 명세에는 모듈을 불러오는 방법에 대한 내용이 포함되어있지 않고, 이와 관련된 내용을 전적으로 모듈 구현체에 맡겼습니다. 따라서, 모듈을 어떤 환경에서 실행하느냐에 따라서 구체적인 로딩 순서나 동작방식이 조금씩 달라질 수 있습니다.


# 2. Today I Found Out

```
2018.11.14

모듈이라는 것에 대해 매우 모호하고 막연한 개념으로 알고있었는데 정확한 개념을 알게되었다.
```

# 3. reference

- https://helloworldjavascript.net/pages/293-module.html