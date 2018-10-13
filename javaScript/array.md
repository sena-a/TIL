# 1. Today I Learned

## 배열

- 배열은 객체의 일종이다. 

```js
typeof []; // object
```

- 하지만 내부적으로 특별하게 취급되어 일반적인 객체와는 조금 다른 특징을 갖고 있다.

- 가장 큰 차이점은, 배열에는 각 요소간에 순서가 있다는 점이다.

- 배열 안에 들어있는 값을 요소(element) 혹은 항목(item)이라고 한다.

- 배열은 `Array` 생성자의 인스턴스이며, 배열의 프로토타입으로  `Array.prototype` 객체가 지정되어 있다.

## 1. 배열의 생성

### 1-1. 배열 리터럴(array literal)

배열을 생성하는 가장 쉬운 방법이며, [대괄호]로 둘러주며 요소가 두 개 이상이면 (,)로 구분해준다.

```js
const empty = []; // 빈배열
const number = [1, 2, 3]; // 요소가 3개인 숫자 배열
cont
const mixed = [1, 'one', {obj: 1}, null] // 다른 데이터타입 배열
```

- 예시에서 볼 수 있듯, 배열의 요소는 각기 다른 데이터 타입이 와도 상관없다.

### 1-2. Array() 생성자

`Array()` 생성자는, 주어지는 인수의 개수에 따라 다른 방식으로 배열을 생성한다. 

- 인수가 1개인 경우
    - 인수는 배열의 길이 값이 된다. 즉, 인수 값 만큼의 길이를 갖는 빈 배열을 만들어 내며, 인수가 양의 정수가 아니라면 에러가 발생된다.

    ```js
    const a = new Array(3) // [<3 empty items>]

    a.length // 3
    ```

- 인수가 2개 이상인 경우
    - 해당 인수들을 요소로 갖는 배열을 생성한다.

    ```js
    const b = new Array(1, 2) // [1, 2]

    b.length // 2 
    ````

### 1-3. Array.of

이렇게 생성자의 동장 방식이 일관적이지 않아, ES2015에 `Array.of`정적메소드가 추가되었다. 

```js
const a = Array.of(1, 2, 3)

a // [1, 2, 3]
```

때문에, 생성자로 배열을 생성하는 것은 인수가 1개일 때의 방식으로만 사용하는 것이 좋다고한다.

## 2. 요소 읽기

객체에는 프로퍼티라는 이름-값 쌍이 있었는데 배열은 요소의 이름을 따로 지정해주지 않는다. 배열의 요소에 접근할 때에는 `인덱스(index)`를 사용한다.

- 배열의 요소에는 인덱스가 부여되는데, 첫번째 요소 = 인덱스 0 부터 시작해서 차례대로 부여된다.

```js
const arr = ['a', 'b', 'c']
```

1. 1번째 요소 = 'a' = 인덱스 0 
2. 2번째 요소 = 'b' = 인덱스 1
3. 3번째 요소 = 'c' = 인덱스 2

- n번째 요소의 인덱스는 n-1이라고 생각해도 된다.

- 이 인덱스를 사용하여 배열의 요소를 불러 올 수 있다. 

```js
const arr = ['a', 'b', 'c']

// 대문자 표기법을 사용합니다.
// 배열[인덱스번호]

arr[0] // 'a'
arr[1] // 'b'
arr[2] // 'c'
```

## 3. 요소의 수정과 추가

배열은 본래 객체이기 때문에, 객체와 마찬가지로 대괄호 표기법을 이용해서 요소를 수정할 수도 있고, 없던 요소를 추가할 수도 있다.

```js
const arr = ['a', 'b', 'c']

// 요소 수정

arr[0] = 1

console.log(arr) // [1, 'b', 'c']
```

- 요소를 추가할 때는 해당 요소를 추가하고 싶은 인덱스를 지정해주면 된다. 

```js
const arr = ['a', 'b']

arr[2] = 'd'

console.log(arr) // ['a', 'b', 'd']

arr[2] = 'c'

console.log(arr) // ['a', 'b', 'c', 'd']
```

- 배열의 길이는 최종 인덱스 위치를 기준으로 정해진다.

```js
const arr = ['a', 'b']

arr[4] = 'c'

console.log(arr) // ['a', 'b', empty, empty, 'c']

arr.length // 5
```

## 4. 원본 배열을 바꾸는 메소드

### 4-1. `fill`
한꺼번에 많은 요소를 같은 값으로 바꾸는 메소드

```js
// 기본 문법

// 채울 요소: a 채울 범위: 인덱스 x 부터 인덱스 y-1 까지
array.fill(a, x, y)

// 시작 인덱스부터 끝까지를 범위로 지정할때는 y를 생략해도 된다. 범위: 인덱스 x 부터 끝까지
array.fill(a, x)

// 범위 인수 생략 시 범위는 전체로 잡히고 모든 요소가 a로 채워진다.
array.fill(a)
```
```js
const arr = [1, 2, 3, 6, 5]

arr.fill(4, 3, 4) // [1, 2, 3, 4, 5]
// 범위 3~(4-1=3) 안의 요소를 4로 바꾼다

arr.fill(4, 3) // [1, 2, 3, 4, 4]
// 인덱스 3부터 끝까지의 요소를 전부 4로 바꾼다

arr.fill(4) // [4, 4, 4, 4, 4]
// 모든 요소를 4로 바꾼다
```
- `fill`의 범위는 실제 배열의 길이 안에서만 요소를 바꿀 수 있다. 

- 배열 길이보다 더 긴 값의 인덱스를 범위 인수로 지정하면 무시된다.

```js
const arr = [1, 2, 3, 4, 5]

arr.fill(4, 5, 7) // [1, 2, 3, 4, 5]
// 실제 배열에는 인덱스 4 까지 밖에 없으므로 무시된다.
```
- `Array` 생성자와 `fill` 메소드를 함께 사용하면, 큰 배열을 만들고 값을 채워넣는 일을 쉽게 할 수 있다.

```js
const arr = new Array(100); //[<100 empty items>]

arr.fill(5) // [5, 5, 5, 5, ...]
```

### 4-2. `push`, `pop`
배열의 끝에서부터 요소를 추가/제거하는 메소드

- 추가 : `push` 
- 제거 : `pop`

```js
// push 기본 문법

array.push(item); // 요소가 추가된 후 배열의 길이를 반환값으로 삼는다.

// ex
const arr = [1, 2, 3]

arr.push(4) // 4 = [1, 2, 3, 4].length

console.log(arr) // [1, 2, 3, 4]

// 인수로 여러개가 올 수 있다. 인수의 순서 그대로 추가 된다.
arr.push(4, 5) // 5 = [1, 2, 3, 4, 5].length
```
```js
// pop 기본 문법
array.pop(); // 제거하려고 꺼낸 마지막 요소 자체를 반환 값으로 삼는다.

// ex
const arr = [1, 2, 3]

arr.pop(); // 3 (마지막 요소 = 제거하는 요소)

console.log(arr) // [1, 2]

// pop() 속에 인수를 넣어도 무시된다. 한번에 마지막 요소 하나만 제거.
const arr = [1, 2, 3]

arr.pop(2) // 3 (인수 2 무시)

// 배열에 요소가 남아있지 않으면 undefined 를 반환한다.
```

### 4-3. `unshift`, `shift`
배열의 맨 앞에서부터 요소를 추가/제거하는 메소드

- `push` & `pop`과 전부 똑같으며, 맨 앞에서부터 추가/제거한다는 점만 다르다.
- 추가 : `unshift`
- 제거 : `shift`

```js
// unshift 기본 문법

array.unshift(item); // 요소가 추가된 후 배열의 길이를 반환값으로 삼는다.

// ex
const arr = [1, 2, 3]

arr.unshift(4) // 4 = [4, 1, 2, 3].length

console.log(arr) // [4, 1, 2, 3]

// 인수로 여러개가 올 수 있다. 인수의 순서 그대로 추가 된다.
arr.unshift(4, 5) // 5 = [4, 5, 1, 2, 3].length
```
```js
// shift 기본 문법
array.shift(); // 제거하려고 꺼낸 맨 앞의 요소 자체를 를 반환 값으로 삼는다.

// ex
const arr = [1, 2, 3]

arr.shift(); // 1 (맨 앞 요소 = 제거하는 요소)

console.log(arr) // [2, 3]

// pop() 속에 인수를 넣어도 무시된다. 한번에 마지막 요소 하나만 제거.
const arr = [1, 2, 3]

arr.shift(2) // 1 (인수 2 무시)

// 배열에 요소가 남아있지 않으면 undefined 를 반환한다.
```
### 4-4. `splice`
배열의 원하는 곳에 요소를 추가/제거하는 메소드.

```js
// 기본 문법

array.splice(x, y, items)
// 인덱스 x 부터 y개의 요소를 items로 체인지.
// 선택한 범위의 기존 요소를 가진 배열을 반환값으로 삼음
```
```js
// 요소 추가
const arr = [1, 2, 5, 6, 7]

arr.splice(2, 3, 3, 4, 5) // [5, 6, 7](인덱스 2부터 3개 요소 -> 5,6,7 을 가진 배열)
// 인덱스 2 부터 3개의 요소를 3, 4, 5로 체인지.
arr // [1, 2, 3, 4, 5]
// 꼭 같은 개수의 요소로 바꿔줄 필요는 없다

arr.splice(2, 3, 3) //[5, 6, 7]
// 인덱스 2부터 3개 요소를 3으로 체인지
arr // [1, 2, 3]
```

```js
// 요소 제거
// items 인수를 생략한다.
// 범위 안의 요소를 아무것도 없음과 체인지 = 제거
array.splice(x, y)
// 인덱스 x부터 y개 요소를 없음과 체인지
// 인덱스 x부터 y개 요소를 제거

// ex
const arr = [1, 2, 3]

arr.splice(2, 1) // [3]

arr // [1, 2]

// 해당 인덱스부터 끝까지를 범위로 삼고싶다면 갯수를 설정하는 인수도 없어도 된다.

array.splice(x)
// 인덱스 x부터 끝까지 요소를 제거
const arr = [1, 2, 3]

arr.splice(1) // [2, 3]

arr // [1] 
```

```js
// 바뀌는 요소 없이 기존 배열의 원하는 위치에 새로운 요소 추가하기
// 기본 문법
// 갯수 인수를 0으로 지정한다.
array.splice(x, 0, items) // [] (0개를 선택하였으니 선택된 요소 없이 빈배열이 반환된다)
// 인덱스 x의 바로 앞자리에 items가 추가된다.

// ex

const arr = [1, 4]

arr.splice(1, 0, 2, 3) // []

arr // [1, 2, 3, 4]
// 인덱스 1(두번째 요소) 앞자리에 items -> 2, 3이 추가됐다.
```

### 4-5. `reverse`
배열 순서를 뒤집는 메소드

```js
const arr = [1, 2, 3]

arr. reverse(); // [3, 2, 1](뒤집고 난 배열을 반환값으로 삼는다)

console.log(arr) // [3, 2, 1]
```

### 4-6. `sort`
원하는 기준으로 배열을 정렬하는 메소드

- `sort` 메소드의 인수에는 비교 함수를 반드시 넘겨주어야 한다. 결과값으로 `number타입` 값이 나오는 비교 함수여야 한다.

- 요소의 어떤 속성을 기준을 잡을지 먼저 정한 후, 해당 값을 비교하여 오름차순/내림차순으로 정렬하는 용도로 사용된다.

```js
// 기본 문법
array.sort((x, y) => 비교 함수); // 반환값 : 정렬된 배열

// x,y 에는 요소가 순서대로 들어온다.
array[0], array[1]
array[1], array[2]
...
```
- 개인적으로 이렇게 외웠다.

```js
// 결과 값 : 정렬 모습
음수 : 왼쪽 요소를 앞에 정렬
양수 : 오른쪽 요소를 앞에 정렬
0 : 순서대로 정렬
// 음왼양오
```
```js
// 오름차순 정렬
// 기본 비교 함수
a = 비교 기준 x
b = 비교 기준 y
array.sort(function(x,y){
    if(a < b){
        return -1 // 왼쪽을 앞에 정렬 -> a,b -> 큰 값이 뒤에 정렬됐다.
    }
    if(a > b){
        return 1 // 오른쪽을 앞에 정렬 b,a -> 큰값이 뒤에 정렬됐다.
    }
    return 0 // 순서대로 정렬 a, b 
})

// 숫자
array.sort((x, y) => x - y)
// 숫자는 결과값이 바로 숫자로 나오기 때문에 굳이 if문으로 결과값을 지정해주지 않아도 된다.
// 원리는 똑같다.

// 내림차순 정렬
// 기본 비교 함수
array.sort(function(x,y){
    if(a < b){
        return 1 // 오른쪽을 앞에 정렬 -> b, a -> 큰 값이 앞에 정렬됐다.
    }
    if(a > b){
        return -1 // 왼쪽을 앞에 정렬 -> a, b -> 큰 값이 앞에 정렬됐다.
    }
    return 0 // 순서대로 정렬 a, b
})

// 숫자
array.sort((x, y) => y - x)
```
- 기본 비교 함수의 `return`값에 -1, 1을 사용한건 그냥 기본이라서이다. 음수값 & 양수값으로 지정해준다면 어떤 값이 와도 상관 없다.

- `sort` 메소드에 비교함수를 인수로 주지 않으면, 요소는 전부! 문자열로 변환된 뒤, `유니코드 코드포인트`를 비교하여 `오름차순`으로 정렬 된다.

- 숫자 역시 암묵적으로 문자열로 변환하여 코드포인트로 비교하니 주의할 것.

- 이런 주의점 때문에 sort를 사용할 때는 비교 함수를 반드시 정의하는 것이 좋다.

```js
const arr = ['B', 'a', 'c', 'D']

arr.sort() // ['B', 'D', 'a', 'c']
// 비교함수를 인수값으로 지정하지 않았을 때
// 대문자가 소문자보다 유니코드포인트가 작으므로 유니코드포인트의 오름차순으로 정렬되었다.

// 이를 사전순으로 비교 하고 싶다면
// 문자열 사전순 비교 메소드인 .localeCompare를 사용한다. 
// 단, 이경우 오름차순 밖에 안된다.
arr.sort((x,y) => x.localeCompare(y)) //['a', 'B', 'c', 'D']

// 문자열 사전순 내림차순으로 정렬하고 싶다면 비교함수를 직접 정의한다.
arr.sort(function (x, y){
  if(x.toUpperCase() < y.toUpperCase()){
    return 1 // 오른쪽이 앞에 정렬 -> 큰 값이 앞에 정렬됨 -> 내림차순
  }
  if(x.toLocaleUpperCase() > y.toLocaleUpperCase()){
    return -1
  }
  return 0
}) // ['D', 'c', 'B', 'a']
```

### 4-7. `length`

배열의 길이를 확인하거나, 늘리고, 줄이는 메소드

- 확인하기
```js
const arr = []
arr.length // 0
```

- 늘리기
```js
const arr = []
arr.length = 5 // 원하는 길이 지정(원본배열 길이보다 커야함)

arr // [<5 empty items>]
```

- 줄이기

```js
const arr = [1, 2, 3, 4, 5] // length = 5
arr.length = 3

arr // [1, 2, 3] 해당 길이만큼 줄어들고 뒤에 있는 요소들은 버려진다. 
```

`length` 메소드로 배열의 길이를 늘리고 줄일 수는 있지만, 권장되는 방법이 아니다.

---

## 5. 새로운 값을 생성하는 메소드

- 아래의 메소드들은 새로운 값을 생성하고 원본 배열에 아무런 영향을 미치지 않는다. 

- 아래의 메소드들의 반환값은 모두 새 배열임을 잊지말자.

### 5-1. `slice`
배열의 원하는 부분을 잘라 새로운 값으로 생성할 수 있는 메소드

```js
// 기본 문법
array.slice(x, y);
// 인덱스 x 부터 y - 1 까지 영역을 자른다.
```
```js
const arr = [1, 2, 3, 4]

arr.slice(1, 3) // [2, 3](새로운 배열이 생성된 것)

console.log(arr) // [1, 2, 3, 4] (원본 배열 영향 없음)
```

- x(첫 번째 인수)의 기본값은 0, y(두 번째 인수)의 기본값은 배열의 길이(arr.length)이다.

- 이를 이용해서 원하는 지점부터 끝까지 자르거나, 원본 배열을 보존하기위해 원본 배열을 복사한 새 배열을 지정할 때 잘 쓰인다.

```js
// 원하는 지점부터 끝까지 자르기 - 두번째 인수 생략

const arr = [1, 2, 3, 4]

arr.slice(2) // [3, 4]
// 인덱스 2부터 끝까지 자르기

// 원리는 두 번째 인수의 기본값이 원배열의 길이기 때문에, 

arr.slice(2, 4) // [3,4]

// 와 같은 기능이 되기 때문이다.
```

```js
// 원본 배열 복사하기
const arr = [1, 2, 3]

const newArr = arr.slice() // arr.slice(0, 3)과 같음

console.log(newArr) // [1, 2, 3]
```
- 단, `slice`는 얕은 복사를 하므로 주의하자.

### 5-2. `map`
각 요소에 함수를 적용해서 그 반환값을 새로운 요소로 새로 지정하는 메소드

```js
array.map((item, index, array) => function)
```
- item : 순회하는 배열의 요소들이 차례대로 들어와서 함수에 사용되고, 함수가 반환한 값을 해당 순서의 요소로 삼는다.

- index : 해당 요소의 원본 배열에서의 인덱스

- array : 순회 중인 배열

- array 나 index 인수는 필요할 때가 아니면 보통 생략하는 경우가 많다.

```js
const arr = [1, 2, 3]

arr.map(item => item * 2) // [2, 4, 6]
```
```js
const arr = [1, 2, 3]

arr.map((item, index, array) => item * index) // [0, 2, 6]
```

### 5-3. `concat`
여러 배열을 병합할 수 있는 메소드

```js
array.concat([array1],[array2]) 
// [array items, array1 items, array3 items]
```
- 순서대로 병합된다.

```js
const arr = [1, 2]

arr.concat([5, 6], [3, 4]) // [1, 2, 5, 6, 3, 4]
```

### 5-4. `reduce`

모든 요소의 값을 종합해서 하나의 값으로 만드는 계산을 할 때 사용되는 메소드

```js
array.reduce((acc, item) => 함수, 초기값)
```
- acc : 누적값
- item : 원배열의 요소들이 하나씩 차례대로 들어와서 함수를 동작시킴
- 함수의 반환값이 누적값이 된다.
- 초기값 : 누적값의 초기값

```js
const arr = [1, 2, 3]

arr.reduce((acc, item) => acc + item, 0) // 6
```
위 코드의 실행 순서는 이렇다.
1. (acc, item)에 (acc 초기값, 첫번째 요소)이렇게 대입돼서 함수가 동작한다.
2. 함수의 결과값이 새로운 acc값(누적값)이 된다.
3. (새로운 acc, 두 번째 요소)로 다시 함수가 동작한다.
4. 2번 반복
5. 이렇게 마지막 요소까지 반복한 후, 더 이상
남은 요소가 없게되면, 최후의 누적값을 이 메소드의 최종 결과값으로 반환한다.

- 메소드의 초기값 인수를 지정하지 않으면, 첫 번째 인수가 초기값으로 지정되는데, 배열의 요소가 하나밖에 없거나, 빈배열이거나 등 실행되지 않을 상황들이 있기때문에 초기값은 항상 제공해주자.

- `reduce`메소드를 사용할 때는 우선 최종적으로 반환하고 싶은 값의 형태를 토대로 누적값의 초기값을 지정하는 것과, 이 누적값이 마지막 반환값이 될 것이라는 점을 기억하여 무엇을 어떻게 누적시킬지를 잘 생각하자.

- `reduce` 메소드 역시 기본적으로 item, acc 외의 인수를 지정할 수 있다. 

```js
array.reduce((acc, item, index, array)=> 함수, 초기값)
```

### 5-5. `filter`
원하는 조건에 부합하는 요소만 골라내어 새로운 배열을 생성하는 메소드

```js
array.filter(item => boolean 값을 반환하는 함수); [item을 넣어 실행된 함수의 반환값이 true인 요소들만 요소로 삼은 배열]
```
- `filter` 메소드에서 사용되는 함수는 boolean값을 반환하는 함수여야하며, 이처럼 진리값을 반환하는 함수를 `predicate`라고 한다.

```js
const arr = [1, 2, 3, 4, 5, 6]

arr.filter(item => item % 2 === 0) // [2, 4, 6]
```
- 차례대로 요소가 들어가 함수를 실행시켜서 함수의 값이 true면 해당 요소를 새로운 배열에 추가시키고, 아니면 추가하지 않는다.

- filter 역시 `item`, `index`, `array` 세 인수를 받는다

- `filter`를 함수로 생각하면 이런 식이다.

```js
function filter(arr, func) {
  return arr.reduce(function(acc, item) {
    if (func(item)) {
      acc.push(item)
    }
    return acc
  }, [])
}
```
### 5-6. `join`

배열의 요소들을 문자열로 반환하여, 구분자(seperator)를 이용해 하나의 문자열로 결합하여 반환하는 메소드

```js
array.join('구분자 문자열') // 'item1구분자item2구분자item3...'
```
- 구분자로 지정한 특정 문자열을 사이에끼어서 요소들을 결합시킨 문자열을 만들어낸다.

```js
const arr = [1, 2, 3]

arr.join(@) // '1@2@3'
```
- 구분자를 지정하지 않으면 `,` 문자가 구분자다.

```js
const arr = [1, 2, 3]

arr.join() // '1,2,3'
```

---

## 6. 배열 순회하기

배열의 각 요소를 차례대로 돌면서 요소에 대한 작업을 하는 것을 순회(traverse)라고 한다. 배열을 순회하는 방법으로 아래의 구문이 있다.

### 6-1. `for` 구문

배열의 길이만큼 루프를 돌면서, 인덱스를 통해 배열의 각 요소에 차례대로 접근하기. 

```js
for(let i = 0; i < array.length; i++){
   console.log(array[i]) 
}
```
- for 구문은  전통적으로 많이 쓰이던 방식이었으나 ES5에 `for...of`구문이 추가되면서 잘 쓰지 않게 되었다.

### 6-2. `forEach` 메소드

배열의 각 요소에 대해 함수를 호출할 수 있다.

```js
array.forEach(item => 각 요소에 대해 호출할 함수)

//ex

const arr = [1, 2, 3]

arr.forEach(item => console.log(item))
// 1 2 3 차례대로 출력
```

- 기본적으로 `item`, `index`, `array` 순서대로 인수로 사용할 수 있다.

### 6-3. `for...of` 구문

ES2015에 도입된 구문이고, ES2015에 같이 도입된 iterable을 순회하기 위해 사용할 수 있다. 

```js
for(let item of array){
    함수
}

// ex

const arr = [1, 2, 3]

for(let item of arr){
    console.log(item)
} // 1 2 3  출력
```

- 단순히 배열을 순회하기 위한 목적이라면 `for...of` 구문이 코드의 간결성 측면에서 유리하다. 

- 단, 배열을 순회하면서 배열의 인덱스가 필요한 경우에는 `for...of` 구문을 사용할 수 없고, 이 때는 `forEach` 메소드를 사용한다.

- 코드의 실행 속도가 정말로 중요한 부분에서는 `for` 구문이 더 유리하다. 

---

## 7. 다른 메소드들

### 7-1. 요소 찾기

1. 특정 요소의 배열 내 index 알아내기
    
    - `indexOf` : 왼쪽부터 검색하여 처음 만나는 해당 요소의 인덱스를 반환
    ```js
    const arr = ['a', 'b', 'c', 'b', 'a']

    arr.indexOf('a') // 0
    ```
    - `lastIndexOf`: 오른쪽부터 검색하여 처음 만나는 해당 요소의 인덱스를 반환
    ```js
    const arr = ['a', 'b', 'c', 'b', 'a']

    arr.lastIndexOf('a') // 4
    ```
    - 일치하는 요소가 없다면, 모두 `-1`을 반환한다.

    - 두 번째 인수로 시작 인덱스를 받고, 시작 인덱스부터 검사를 시작한다. 
    ```js
    const arr = ['a', 'b', 'c', 'b', 'a']

    arr.indexOf('a', 3) // 4 
    // 인덱스 3인 'b'요소부터 왼쪽으로 검사하여 'a'를 검색. 찾은 'a'의 배열 내 인덱스를 반환

    arr.lastIndexOf('a', 3) // 0
    // 인덱스 3인 'b'요소부터 오른쪽으로 검사
    ```

2. 특정 조건을 만족하는 요소 찾아내기.
   
    - `find`, `findIndex` 두 메소드 모두 predicate를 이용해 왼쪽부터 검사해서 처음 만나는 요소를 찾는다.

    - `find` : 요소 자체를 반환한다. 조건에 만족하는 요소가 없으면 `undefined`가 반환된다.

    ```js
    const arr = [1, 2, 3, 4]

    arr.find(item => item % 2 === 0) // 2 
    // 왼쪽부터 검사하여 처음 조건에 부합하는 요소를 만나면 더 검사하지 않고 바로 반환.

    arr.find(item => item % 5 === 0) //undefined 
    ```
    - `findIndex` : 요소의 인덱스를 반환한다. 조건에 만족하는 요소가 없으면 `-1`을 반환한다.
    ```js
    const arr = [1, 2, 3, 4]

    arr.find(item => item % 2 === 0) // 1
    // 요소 2의 인덱스인 1을 반환

    arr.find(item => item % 5 === 0) // -1
    ```
    - `forEach` 나 `filter`등과 마찬가지로 predicate에는 `item`, `index`, `array` 세 인수를 지정할 수 있다.

### 7-2. 배열이 특정 조건을 만족하는지 판별

모두 조건을 만족하는지를 나타내는 진리값을 반환한다.

1. `includes`
    - ES2016에서 도입된 `includes` 메소드는 배열이 특정 요소를 포함하고 있는지를 판별한다.

    - 왼쪽에서부터 검사한다.

    ```js
    array.includes(찾는요소, 시작인덱스)

    //ex

    const arr = ['a', 'b', 'c']
    
    arr.includes('a') // true

    arr.includes('a', 1) // false
    ```

2. `every`
    - predicate를 인수로 받아서, '모든 요소'가 조건은 만족하는지를 판별한다.

    ```js
    array.every(요소 => predicate)

    //ex

    const arr = ['aa', 'bbb', 'cccc']
    
    arr.every(item => item.length > 1) // true

    arr.every(item => item.length > 3) // false
    ```
3. `some`  
    - predicate를 인수로 받아서, 조건을 만족하는 요소가 하나라도 있는지 판별한다.

    ```js
    array.some(요소 => predicate)

    //ex

    const arr = ['aa', 'bbb', 'cccc']
    
    arr.some(item => item.length > 3) // true

    arr.some(item => item.length > 5) // false
    ```

- `some`과 `every` 메소드의 predicate 역시 item 뿐만아니라 index, array 인수가 넘겨진다.

### 7-3. 배열인지 아닌지 판별

`Array.isArray` 정적메소드를 사용하여 어떤 값이 배열인지 아닌지 판별할 수 있다.

```js
Array.isArray(판별할 값) // boolean타입 값 반환

// ex

Array.isArray([1, 2]) // true
Array.isArray({1, 2}) // false (object)
Array.isArray(1, 2) // flase (number type)
```

---

## 8. 문자열과 배열

- 문자열은 유사배열로 배열과 유사한 문법을 통해 다뤄질 수 있다.

- 단, 유사배열로 다뤄질 수 있을 뿐 실제 배열이 아니므로 착각하면 안된다.

---

## 9. 다차원 배열 (Multidimensional Array)

컴퓨터를 사용하다보면 표 형태의 자료를 많이 다루게 되는데, JavaScript에서는 표 형태의 자료를 간단히 나타내기 위해 배열을 요소로 갖는 배열을 사용할 수 있다.

```js
const table = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

- 이렇게 배열 속에 배열이 중첩되어 있는 자료구조를 다차원 배열이라고 한다. 

- 다차원 배열 속에 있는 요소를 다루기 위해서, 대문자 표기법을 연이어 사용할 수 있다. 

```js
table[x][y]
// x: 첫번째 깊이의 원하는 배열의 인덱스
// y: 선택한 배열 속의 요소의 인덱스

table[0][1]; // 2 
// 원 배열의 인덱스 0의 배열의 인덱스 1의 요소 
table[2][0]; // 7
```

# 2. Today I Found Out

```
2018.10.04

메소드가 너무 많아서 이해하면서 외우기도 힘든데
다 외워도 막상 코드에 응용하려고하면 내가 배운게 뭔가 싶다. 
언젠간 술술 나오길!
```

# 3. reference
- https://helloworldjavascript.net/pages/190-array.html

- sort 메소드 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
