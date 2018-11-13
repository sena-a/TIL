# 1. Today I Learned

자바스크립트는 다른 클래스 기반 객체지향 프로그래밍 언어와 달리 프로토타입 기반 객체지향 언어라고 불린다. ES2015 이후로는 자바스크립트에 클래스가 추가되어 클래스를 많이 쓴다고 하지만, 클래스를 사용하는 것 역시 프로토타입을 이해하고 쓰는 것과 그냥 쓰는 것은 큰 차이가 있기때문에, 프로토타입을 이해하는 것은 아주아주 중요하다(고 한다). 중요한 만큼 처음 배웠을 때 이를 완전히 이해하기가 어려웠고, 알 것 같으면서 모르겠고, 용어들이 죄다 비슷해서 개념들이 서로 꼬여 그냥 쓸까.. 하는 마음을 자주 들게했지만, 그래도 무려 프로토타입 기반이라는 언어를 공부하면서 그 프로토타입을 모르고 넘어가는건 그냥 자바스크립트를 모르는 것과 같은게 아닌가? 싶어서 최대한 핵심을 이해하려고 노력했다. 여전히 프로토타입을 자유자재로 다루기에는 한참 모자란 상태이지만, 최대한 이해한 것을 바탕으로 정리 해보려고 한다.


## 프로토타입이란? 

prototype의 본 뜻은 원형, 원본이다. 이런 의미에서, 자바스크립트에서도 어떠한 객체가 만들어지기 위해 사용된 객체원형을 프로토타입이라고 부른다. 

이때, 스펙에서는 프로토타입을 이렇게 정의한다.
```
object that provides shared properties for other objects

> 다른 객체들에게 공유(할 수 있는) 속성을 제공하는 객체
```
이는, 자바스크립트의 모든 객체가 마치 객체 지향의 상속 개념과 같이 자신의 프로토타입의 프로퍼티 또는 메소드를 상속받아 사용할 수 있기 때문이다. 따라서 이 말을 다시 생각해보면 어떤 객체가 자신의 속성이 아닌 상위 객체의 속성을 공유해서 사용했다면, 이 상위 객체가 해당 객체의 프로토타입인 것이다. (혹은 프로토타입 체인에 존재하는 것일 수도 있지만 이는 좀 더 밑에서 설명한다.)


## 프로토타입이 지정되는 과정

prototype에 대해 스펙에서는 이렇게 명시가 되어있다. 
> When a constructor creates an object, that object implicitly references the constructor's prototype property for the purpose of resolving property references. Alternatively, a new object may be created with an explicitly specified prototype by using the Object.create built-in function.

명시된 내용으로 이렇게 정리할 수 있다.
- 생성자 함수로 객체를 생성했을 땐, 해당 객체의 프로토타입은 암묵적으로 해당 생성자 함수의 객체 원형이되고, 혹은 Object.create 함수를 통해 생성하는 객체의 프로토타입을 명시적으로 지정할 수 있다.

우선 Object.create 함수를 통해 객체의 프로토타입을 지정해보자.

```js
const A = {} // 객체리터럴로 객체 생성
const B = Object.create(A) // B 객체를 생성했으며 해당 객체의 프로토타입으로 A 객체를 지정했다.

console.log(B)
```

다음으로는 생성자함수로 객체를 생성해보자.

```js
function A(){};
const b = new A(); // b 객체의 프로토타입은 암묵적으로 생성자 A()함수의 객체 원형이 된다.

console.log(b)
```

- 브라우저의 개발자도구를 통해 두 코드를 실행시켜 B와 b 객체를 출력해보면 `__proto__` 와 `prototype` 이란 것을 볼 수 있는데, 이는 밑에서 설명한다.

- 이때, 두번째 예제에서 도대체 함수의 객체 원형이란게 무엇일까를 알기 위해서는 함수가 정의될 때 일어나는 일에 대해 알아봐야하기 때문에, 이를 먼저 알아보겠다.

## 함수가 정의 될 때 일어나는 일

자바스크립트에서는 함수를 생성하면 함수객체가 생성됨과 동시에 함수의 prototype object라는 새로운 객체가 함께 생성된다. 

<!-- 함수 객체 정의 됐을 때 두 객체 생성되는 그림 -->

이때, 이 Prototype Object는 자신을 원형으로 만들어질 다른 객체가 참조할 프로토타입이 된다. 즉, 해당 함수를 통해 만들어진 객체들이 프로토타입으로 삼을 객체원형은 바로 함수의 Prototype Object인 것이다.

여기서, 위에서 본 예제를 다시 보자.

```js
function A(){};
const b = new A(); // b 객체의 프로토타입은 암묵적으로 생성자 A()함수의 객체 원형이 된다.

console.log(b)
```
이때 b 객체의 프로토타입은 A 함수의 객체 원형이고, 그것이 바로 A함수를 정의할 때 함께 만들어진 A Prototype Object인 것이다. 

- 이 prototype object는 함수 생성시에만 생성되며 일반 객체가 생성될 때는 생성되지 않는다.


## prototype link와 prototype property

이제 객체가 가지는 `__proto__` 와 `prototype`이 무엇인지 알아보자.

### prototype link

- 자바스크립트의 모든 객체는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다. 이 프로퍼티는 자신의 프로토타입을 가리키는데, 이 속성을 prototype link라고 한다. 이때, 크롬 등의 브라우저에서는 이 숨겨진 연결 프로퍼티를 `__proto__`로 표현하는데, 결국 둘 다 prototype link이다.

- 이 속성은 모든! 객체에 있으며, 모든 함수 객체의 __proto__는 Function 함수 객체의 prototype object가 된다.

### prototype property

- 자바스크립트의 모든 함수! 객체는 prototype 이라는 프로퍼티를 갖게 되는데, 이 프로퍼티는 이 함수를 통해 생성될 객체의 프로토타입을 가리키게된다. 즉, 함수의 prototype object를 가리킨다.

## prototype object

- 함수의 프로토타입 객체에는 기본적으로 두가지 속성이 함께 들어있다. 

- Constructor : 자기 자신의 함수 객체를 가리킨다
- __proto__ : 항상 Object prototype object가 된다.(함수의 프로토타입 객체는 객체이다. 프로토타입 링크는 본인을 생성한 생성자함수의 프로토타입 객체를 가리킨다. prototype object 객체를 생성하는 생성자 함수는 Object()이다. 따라서, 프로토타입 객체 속의 프로토타입 링크는 항상 Object()의 프로토타입 객체를 가리킨다.)

## 프로토타입 체인

이제 프로토타입에 대해서 그리고 프로토타입 링크에 대해서 이해가 되었으면 프로토타입 체인은 간단하다. 

프로토타입을 통해 객체들은 서로 연관관계가 생기는데, 이렇게 본인의 프로토타입의 프로토타입의 프로토타입..과 같이 계속해서 연결되어있는 이 형태를 프로토타입 체인이라고 한다.

이 프로토타입 체인은 __proto__ 속성을 통한 연결을 뜻하는데, 이를 통해 하위 객체에서는 상위 객체들의 프로퍼티와 메소드를 사용할 수 있다. 이를 '상속(inheritance)'라고 한다. 

<!-- 속성을 불렀을 때 속성을 찾아 올라가는 과정 이미지 -->

단, 실제 상속의 의미 그대로 속성을 가지고 온다기보다는 스펙에 쓰여진 'shared property'가 조금 더 가깝다고 생각한다. 왜냐하면 상위 객체의 프로퍼티가 진짜 하위 객체에 복사되어 생기는 것이 아니라 상위 객체의 속성을 말그대로 공유하여 사용할 수 있는 것이기 때문이다.

- 프로토타입 체인은 눈에 명확히 보이지는 않지만, 객체의 속성에 접근할 때마다 탐색된다. 따라서 프로토타입 체인의 깊이가 너무 깊으면 속성의 읽기 속도에 영향을 미치므로 주의해야 한다.

어떤 객체가 다른 객체의 프로토타입 체인에 존재하는지 확인하기 위해 `Object.prototype.isPrototypeOf` 메소드를 사용할 수 있다.

### 프로토타입의 끝

프로토타입 체인을 따라가게되면 결국 마지막에는 Object()의 프로토타입 객체를 만나게 되는데, 이때 Object prototype object의 __proto__ 속성, 즉 프로토타입 링크에는 null이 참조되어있다. 

따라서, 프로토타입 체인에는 언젠가 끝이 있다는 의미이다.

이 null을 만나게 되면 프로토타입 체인을 확인하는 과정이 끝나게 된다.

## classical inheritance & prototypal inheritance 

프로토타입을 활용하여 코드를 재사용하는 방식에는 두가지 방식이 있다.
classical방식과 prototypal 방식이다.

- classical 방식은 new 연산자를 통해 생성한 객체를 사용하여 코드를 재사용하는 방법이다.

- prototypal 방식은 객체 리터럴 또는 Object.create()를 이용하여 객체를 생성하고 확장해가는 방식이다. 

- 두가지 방법중 JavaScript에서는 prototypal 방식을 더 선호한다. 

## 프로토타입 읽고 쓰기

- 프로토타입을 읽어오는 메소드 
    - `Object.getPrototypeOf`

- 프로토타입을 변경하는 메소드 
    - `Object.setPrototypeOf`
    - 단 객체가 생성된 이후에 프로토타입을 변경하는 작업은 굉장히 느리기 때문에 이 함수의 사용은 피하는 것이 좋다.

## 속성 가리기

어떤 객체에서 특정 속성에 접근을 하게되면 프로토타입 체인을 확인하는 중 가장 먼저 만나는 값이 불러와진다. 이러한 점에서, 한 프로토타입 체인에 속한 하위 객체와 상위 객체에 같은 이름의 속성이 존재할때, 제일하위객체.속성에 접근하게되면 하위 객체의 속성 값이 불려지고, 이렇게 프로토타입 체인의 상위에 있는 속성이 하위 속성에 의해 가려지는 현상을 속성 가리기(property shadowing)라고 한다.

# 2. Today I Found Out

```
2018.11.04

프로토타입.. 배운지 한달이 다 돼가도록 손을 못 대겠더니 드디어 정리했다.. 아직 다듬어야할게 남았다.. 
```

# 3. reference
- http://insanehong.kr/post/javascript-prototype/

- https://jongmin92.github.io/2017/03/14/JavaScript/understand-prototype/

- https://tc39.github.io/ecma262/#sec-terms-and-definitions-prototype

- classical & prototypal 
http://www.nextree.co.kr/p7323/

- prototypal 
https://www.youtube.com/watch?v=doXpW5AD60Q

- https://helloworldjavascript.net/pages/180-object.html

- https://poiemaweb.com/js-prototype

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain