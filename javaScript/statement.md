# 1. Today I Learned

## 제어 구문

javaScript에서는 특정 조건을 만족할 때에만 코드를 실행시키거나, 혹은 여러 번 실행시킬 수 있는 제어 구문을 제공한다.

---

### 1. 조건문(Conditional Statement)

우리가 실제로 사용하는 프로그램들은 수많은 '경우의 수'를 다루고 있다. 

- 사용자가 스프레드시트의 셀을 클릭했을 때, 만약 그것이 왼쪽 클릭이면 해당 셀을 선택하고, 왼쪽 더블이면 해당 셀을 편집 모드로 전환하고, 오른쪽 클릭이면 메뉴를 보여준다.

- 사용자가 더블 클릭한 물약이 만약 빨강 물약이면 HP를 채우고, 파랑 물약이면 MP를 채운다.

- 사용자가 전송 버튼을 클릭했을 때, 만약 입력 필드가 모두 채워져 있지 않으면 에러 메시지를 보여주고, 입력 필드가 모두 채워져 있으면 서버로 입력 필드의 내용을 전송한다.

이런 경우에 따라 프로그램의 동작이 달라야 할 때, 우리는 조건문을 토해 프로그램의 논리 구조를 표현할 수 있다.

#### 1-1. `if...else` 구문

- if구문은 조건에 따라 특정 영역의 코드를 실행시키거나 실행시키지 않을 수 있다.

```js
if (x > y) {
  console.log('괄호 안의 값이 `true`이면 이 영역의 코드가 실행됩니다.');
} else {
  console.log('괄호 안의 값이 `false`면 이 영역의 코드가 실행됩니다.');
}
```

- 딱 특정 조건에서만 동작을 실행시키고 나머지 조건에서는 아무런 동작도 하지 않고 싶을 때, 즉 else가 필요 없는 경우에는 else를 생략할 수 있다.

```js
  if (result === 6) {
    alert('당신은 운이 좋군요!');
  }

  // result === 6 이 false 일 때는 아무런 동작도 하지 않는다.
```

#### 1-2. `if...else` 구문의 중첩

- 두 가지의 경우 뿐만 아니라 그 이상의 경우의 수를 if 구문을 통해 표현하려면, `if...else`를 중첩시키면 된다.

```js
if (result === 5){
    alert('5')
} else{
  if(reulst > 5){
        alert('bigger than 5')
    }else{
        alert('smaller than 5')
    }
  }  
}

// 5인 경우, 5보다 큰 경우, 그 이외 경우
```

- 단, if문 속의 if문이 단순히 중첩된 경우라면, 바깥쪽 else의 중괄호를 생략할 수 있다.

```js
if (result === 5){
    alert('5')
} else if(reulst > 5){
        alert('bigger than 5')
} else{
        alert('smaller than 5')
} 
}
```

- if...else의 중첩에는 제한이 없으므로, 경우의 수가 많은 경우에는 if...else 구문을 아래와 같이 계속 이어나갈 수 있다.

```js
function translateColor(english) {
  if (english === 'red') {
    return '빨강색';
  } else if (english === 'blue') {
    return '파랑색';
  } else if (english === 'purple' || english === 'violet') {
    return '보라색';
  } else {
    return '일치하는 색깔이 없습니다.';
  }
}
```

#### 1-3. switch 구문

- if 구문에서 하나의 변수에 대해 많은 경우의 수가 있는 경우, `switch` 구문을 사용하면 코드를 조금 더 보기 좋게 만들 수 있다.

- 아래 예제는 바로 위의 코드 예제와 완전히 똑같이 동작한다.
```js
function translateColor(english) {
  let result;
  switch (english) {
    case 'red':
      result = '빨강색';
      break;
    case 'blue':
      result = '파랑색';
      break;
    case 'purple':
      result = '보라색';
      break;
    case 'violet':
      result = '보라색';
      break;
    default:
      result = '일치하는 색깔이 없습니다.';
  }
  return result;
}
```

- switch 구문은 `case`, `break`, `default`라는 키워드와 함께 사용된다. 

- switch 바로 뒤의 괄호의 값이 '코드 실행 여부를 판별할 기준이 되는 값'이고, 이 기준이 되는 값과 case 바로 뒤에 오는 값이 일치1하면 콜론(:) 뒤의 코드 영역이 실행된다.

- 일치하는 값이 없으면 default 코드 영역이 대신 실행된다.

    ```js
    function translateColor(english) {
    let result;
    switch (a) {
        case 'b':
            result = 'c';
            break;
        case 'd':
            result = 'e';
            break;
        default : 
            result = '일치하는 값이 없습니다.'
        }
    return result;
    }
    ```
    - `a = 기준이 되는 값`
    
    - b = a 면 코드 result = 'c' 가 실행된다. 실행된 후 바로 밑에 break로 밑에 코드가 실행되지 않고 바로 바깥 스코프로 실행 흐름이 넘어가서 return result가 된다.

    - b = a가 아니면 다음 케이스인 'd'가 a와 같은지 보러 간다. 즉, 마주친 케이스가 기준이 되는 값과 다르면 실행 흐름이 스위치 내부의 다음 case를 찾으러 내려간다. 

    - 다음 case, 그 다음 case를 보러갔는데 case가 끝날 때 까지 하나도 없으면 switch 내부 코드인 default까지 흐름이 내려와 default 뒤의 코드가 실행된다.

- 단, 주의할 점은, case 뒤쪽의 코드 영역 마지막에 break를 써주지 않으면, 해당 case가 실행될 때 바로 뒤의 case 코드 영역이 뒤이어 실행되게 된다. 

     ```js
    function translateColor(english) {
    let result;
    switch (a) {
        case 'b':
            result = 'c';
        case 'd':
            result = 'e';
            break;
        default : 
            result = '일치하는 값이 없습니다.'
        }
    return result;
    }
    ```

    - a = b 일 때, break의 부재로 다음 케이스인 case 'd'의 : 뒤쪽 코드, `result = 'e'; break;`를 바로 실행시키며 translateColor(b) 는 e를 반환한다.

    - 즉, break가 없으면 해당 case가 맞는데도 불구하고 break가 없어서 switch구문을 종료시키지 못하고, 실행흐름이 바로 밑 케이스의 : 뒤쪽의 코드로 넘어가 코드를 실행 시킨다.


- 이처럼 break를 써 주지 않으면 의도치 않은 동작을 할 수 있으니 주의. 다만 break의 이런 성질을 활용해서 코드를 짧게 쓸 수도 있다.

```js
function translateColor(english) {
  let result;
  switch (english) {
    case 'red':
      result = '빨강색';
      break;
    case 'blue':
      result = '파랑색';
      break;
    case 'purple':
    case 'violet':
      // 이 코드 영역은 english 변수의 값이 'purple'일 때와 'violet'일 때 모두 실행됩니다.
      result = '보라색';
      break;
    default:
      result = '일치하는 색깔이 없습니다.';
  }
  return result;
}
```
- 이처럼, 여러 값 대해서 같은 동작을 실행 시키고 싶을 때는 의도적으로 break를 사용하는 경우도 있다.

- `switch`는 `if...else`와 비슷한데 어느쪽이 더 쉬운 것이 아니라 때에 따라서 무얼 쓰느냐에 따라 읽기 쉬운 코드가 되니 상황에 맞게 쓰면 된다.

---

### 2. 반복문 (Looping Statement)

프로그래밍을 하다보면 유사한 작업을 여러 번 반복해서 해야할 경우가 있다.

- 스프레드시트의 A열에 있는 각 셀의 글자수를 구해서 B열에 집어넣는 작업을 첫 번째 행부터 1000 번째 행까지 반복

- 바둑의 승리자가 결정될 때까지 번갈아가며 턴을 반복

- 게시글에 달린 여러 개의 댓글을 보여주는 작업을 각 댓글에 대해 반복

위와 같은 작업을 하기 위해 JavaScript에서는 반복문(looping statement)을 사용한다. 반복문은 루프라고 불리기도 한다.

#### 2-1. `While` 구문

- `while` 구문은 특정 조건을 만족하는 한 코드를 반복해서 실행시킨다.

```js
let i = 0; //초기값

while (i < 5) {
    // 위 괄호의 값이 true인 동안에는 

    // 이 코드를 반복해서 실행시킨다.
    console.log(`이 코드는 ${i + 1}번 째 실행되고 있습니다.`);

    // 위 코드가 한번 실행 될 때마다 i값 갱신 
    i++;
}

// i = 5가 되면 루프가 종료되고 아래 코드로 실행흐름이 옮겨진다.
console.log('루프가 종료되었습니다.');
```
- 처음에 i의 값이 0이었다가, 코드가 실행됨에 따라 갱신에 의해 점차 증가하면서 결국 i < 5의 값이 false가 되면, while 구문은 더 이상 내부 코드를 실행시키지 않고 실행 흐름을 다음으로 넘긴다.

#### 2-2 `do...while` 구문

- `do...while` 구문은 `while` 구문과 사용법은 크게 다르지 않으나, **내부 코드를 무조건 한 번은 실행**시킨다는 차이점이 있다.

```js
do {
  console.log('do...while!');
} while (false); 

// 조건 자체가 false이므로 절대 `true`가 될 수 없지만, 루프는 1회 실행된다.
```
- 우선 do 다음 코드를 무조건 한번은 실행하고, 그 다음 while 뒤 괄호 안에오는 값이 true일 경우는 다시 반복 실행, false면 끝이 난다.

#### 2-3 `for` 구문

- 루프에는 초기값과 갱신에 대한 코드가 있는 경우가 많은데, 이런 경우에는 `for` 구문을 이용해서 코드를 조금 더 짧게 짤 수 있다. 아래 예제는 위 while 구문에 대한 예제와 완전히 똑같이 작동한다.

```js
// for (초기값 정의; 실행 조건; 갱신) { ... }
for (let i = 0; i < 5; i++) {
  console.log(`현재 i의 값: ${i}`);
}
console.log('루프가 종료되었습니다.');
```

- 실행 흐름은 먼저 i의 초기값 부터 내부의 코드를 차례대로 반복해서 실행한다. i = 0일 때 코드 실행, i = 1일 때 코드 실행, i = 2 일 때 코드 실행 식으로 진행하여 i의 조건이 끝날 때 까지 반복 실행 된다. 조건이 끝나거나 반환하게되면 포구문을 즉시 종료하고 밖의 코드로 실행 흐름이 옮겨진다.

- `for` 구문으로 정의된 루프는 항상 while 구문으로 바꿔쓸 수 있고, 많은 경우 반대로도 바꿀 수 있다. 다만, `초기값`을 정할 수 있고 갱신을 위한 코드가 짧은 경우에는 `for` 구문을, 그렇지 않은 경우에는 `while` 구문을 사용해야 코드가 깔끔해진다. 

---

### 3. `break` 와 `continue`

- 루프를 도중에 멈추거나, 남은 코드를 건너뛰어버리고 루프의 다음 번 차례로 넘어가야 할 필요가 있는 경우가 있는데, 이 때 사용되는 구문이 `break`와 `continue`이다.

- break
    -break를 만나면 루프는 즉시 그 시점에서 종료되고, 실행 흐름은 밖으로 빠져나오는데, break를 둘러싸고있는 가장 가까운 루프만 종료시키기 때문에 바로 위의 상위 코드로 나오게 된다.
    
    ```js
    alert('퀴즈를 시작합니다.');

    while (true) {
        const answer = prompt('빨강의 보색은 무엇일까요?');
        if (answer === '초록') {
            alert('정답입니다! 🎉');
            break; // 루프를 종료하고 다음 코드로 넘어감
        } else {
            alert('틀렸습니다! 다시 시도해보세요.');
        }
    }

    alert('퀴즈가 끝났습니다.'); // 루프 종료 후 실행되는 코드
    ```

- continue
    - continue를 만나면 그 시점에서의 루프 속의 다음 코드는 실행하지 않고 바로 건너뛰어 루프 처음으로 돌아온다. 이 때, 다음 번 차례부터 다시 시작된다.
    ```js
    for (let i = 1; i < 100; i++) {
        console.log(`현재 숫자는 ${i} 입니다.`);
        if (i % 7 !== 0) {
            continue; // 루프의 나머지 코드를 건너뜀
        }
        console.log(`${i}는 7의 배수입니다.`); // i % 7 === 0 일때만 실행될 코드
        }
    ```

---

### 4. `return` 과 `throw`

- `return` 과 `throw`는 continue 와 break가 루프의 나머지 코드를 건너뛰는 것과 유사하게 **함수**의 나머지 코드를 건너뛰고 함수를 즉시 종료시키는 결과를 낳는다.

- return
    - return을 만나게되면 그 즉시 함수 밖으로 나오게 된다.

    ```js
    function translateColor(english) {
    switch (english) {
        case 'red': return '빨강색';
        case 'blue': return '파랑색';
        case 'purple':
        case 'violet': return '보라색';
        default: return '일치하는 색깔이 없습니다.';
    }
    ```

- throw
    - thorw 구문은 코드의 실행을 중단시키고 에러를 발생시키는 동작을 한다. 단, return과 다르게 지금 실행되고 있는 많은 함수들을 종료시키는 효과를 발생시킬 수 있다. 

---

### 5. 블록(block) 구문

- 블록 구문(Block statement)는 구문들의 집합으로 중괄호로 그 범위를 정한다. 블록 구문은 일반적으로 함수, 객체리터럴, 흐름 제어 구문(control flow statement)에서 사용된다.

# 2. Today I Found Out

```
2018.10.01 
자주 쓰는 구문들이니만큼 더욱더 친해져야겠다.
```

# 3. reference
- https://helloworldjavascript.net/pages/175-control-statement.html

- block 구문 https://poiemaweb.com/js-control-flow
