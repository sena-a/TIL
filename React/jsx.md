# 1. Today I Learned

# JSX란

```js
const element = <h1>Hello, world!</h1>;
```

이 문법은 HTML처럼 보이지만, HTML이 아니다. 이 문법은 JSX라고 부르며, 자바스크립트의 확장 문법이다. JSX는 템플릿 언어처럼 보일 수 있지만 오로지 자바스크립트를 기반으로 동작하고 있다.

JSX를 리액트와 함께 사용하면, UI가 실제로 어떻게 보일지 서술할 수 있다. React는 렌더링 로직이 다른 UI 로직과 본질적으로 결합되어있는데, 이벤트의 처리과정, 시간에 따른 상태 변화, 표시할 데이터가 어디로부터 오는지가 렌더링 로직과 결합되어있다고한다.

React는 마크업과 로직을 따로 분리하는 기술을 분리하는 방법 대신, 둘 다 포함하는 '컴포넌트'라는 단위를 이용하여 관심사를 분리한다.

React를 사용하기 위해 반드시 JSX를 사용해야하는 것은 아니다, JSX를 통해 UI 작업을 좀 더 시각적으로 할 수 있다는 장점이 있지만, JSX는 자바스크립트의 확장 문법이기 때문에 JSX로 할 수 있는 모든 일은 순수 자바스크립트와 리액트로도 할 수 있다.(다만 JSX는 그 작업을 좀 더 편하게 해주기 때문에 안 쓸 이유가 없다)

# JSX를 사용하기 위한 규칙

## 닫힌 태그

JSX에서는 태그가 꼭 닫혀있어야한다. 일반적으로 html에서 닫힘 태그가 필요없는 input 태그 등을 사용할 때도 JSX에서는 꼭 닫아줘야함으로 유의하자.

```js
class App extends Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
```

## 하나의 엘리먼트

리액트에서 반환하는 JSX요소는 무조건 가장 큰 하나의 엘리먼트가 하위 엘리먼트들을 감싸고 있는 형태여야한다.

```js
class App extends Component {
  render() {
    return (
      <div>Hello</div>
      <div>Bye</div>
    );
  }
}
// 형제 엘리먼트 두개를 한꺼번에 반환 하면 문법 에러가 난다.
```

```js
class App extends Component {
  render() {
    return (
      <div>
        <div>Hello</div>
        <div>Bye</div>
      </div>
    );
  }
}
// 가장 상위의 엘리먼트는 단 하나여야한다.
```

## 자바스크립트 표현식 사용하기

JSX 안에서 자바스크립트 표현식을 `{}` 속에서 작성하여 하나의 값으로 포함시킬 수 있다.

```js
const name = "sena";

function App() {
  return (
    <div className="App">
      <h1>{name}</h1>
    </div>
  );
}

// <h1>sena</h1> 로 구현될 것
```

{} - 자바스크립트 표현식 중괄호 속에는 모든 표현식이 올 수 있다.

## JSX 또한 표현식이다

컴파일이 끝나면, JSX 표현식이 순수 자바스크립트 함수로 호출이 되고, 결과적으로 JSX 또한 자바스크립트의 객체들로 평가된다.

이 말은, `if`문 혹은 `for`문 내에서도 JSX를 사용할 수 있으며, JSX를 변수에 할당하거나 매개변수로 전달하거나, 함수의 반환값으로도 사용될 수 있음을 의미한다.

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## 조건부 렌더링

JSX내부에서 조건부 렌더링을 할 때는 보통 삼항 연산자 혹은 AND(&&) 연산자를 사용한다.

```js
// 삼항연산자
class App extends Component {
  render() {
    return <div>{조건 ? <h1>true</h1> : <h1>false</h1>}</div>;
  }
}
// {} 속의 표현식의 값이 최종적으로 렌더링 됨
// 조건이 true면 <h1>true</h1>
// false면 <h1>false</h1>
```

AND연산자는 우리의 조건이 true일때만 보여주고, true인 경우만 무언가를 보여주고 조건이 충족되지 않을 땐(false)일 땐 아무것도 보여주고 싶지 않을 때 사용한다.

```js
// AND 연산자
class App extends Component {
  render() {
    return <div>{true && <h1>true</h1>}</div>;
  }
}
// && 연산자는 왼쪽 조건이 true 일때
//오른쪽 조건의 값이 전체 표현식의 값이 되는데
// 이로 인해 왼쪽 조건이 true일 시 오른쪽 조건이 렌더링된다.
```

물론 이런 성질을 활용해서 OR(||) 연산자를 이용할 수도 있다. 이 경우에는 조건이 충족되지 않았을때만 무언가를 보여주고 싶을 때 사용한다.

```js
// OR 연산자
class App extends Component {
  render() {
    return <div>{false || <h1>false</h1>}</div>;
  }
}
// || 연산자는 왼쪽 조건이 false 일때
// 오른쪽 조건의 값이 전체 표현식의 값이 되는데
// 이로 인해 왼쪽 조건이 false일 시 오른쪽 조건이 렌더링된다.
```

단순히 이런 조건부 표현식으로만 해결이 안되는, 예를 들어 if문등을 사용하여 복잡한 조건을 작성할 때는, 웬만하면 JSX 밖에서 로직을 작성한 후, 해당 로직을 JSX에서 활용하는 것이 좋지만, 꼭 JSX 내부에서 작성해야 한다면 IIFE(즉시 실행 함수 표현)을 사용해야한다.

```js
class App extends Component {
  render() {
    const value = 1;
    return (
      <div>
        {
          (function() {
            if (value === 1) return (<div>하나</div></div>);
            if (value === 2) return (<div>둘</div>);
            if (value === 3) return (<div>셋</div>);
          })()
        }
      </div>
    );
  }
}
```

## JSX 어트리뷰트 정의

어트리뷰트에서 따옴표를 사용하여 문자열 리터럴을 정의할 수 있다.
```js
const element = <div tabIndex="0"></div>;
```
어트리뷰트에 중괄호를 사용하면, 자바스크립트 표현식을 포함시킬 수 있습니다.
```js
const element = <img src={user.avatarUrl} />
```
```
<tip>
JSX는 '자바스크립트'의 확장문법이기 때문에, HTML 어트리뷰트 이름 대신 camelCase로 표기된 어트리뷰트 이름을 사용한다.

예를 들어, JSX에서 class 는 className 이 되며, tabindex 는 tabIndex 가 됩니다.
```

## JSX 인젝션 공격 예방

기본적으로 React DOM은 렌더링 되기 전에 JSX 내에 포함된 모든 값을 이스케이프하기 때문에, 어플리케이션에 명시적으로 작성되지 않은 내용을 절대 삽입할 수 없다. 모든 것은 렌더링 되기 전에 문자열로 변환된다. 이 덕분에 XSS (cross-site-scripting) 공격을 막을 수 있다고 한다.


## JSX 객체 표현

Babel은 JSX를 React.createElement() 호출로 컴파일한다.

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

위 두 예제는 결과적으로 동일하게 DOM에 렌더링 된다.

`React.createElement()` 는 버그 없는 코드를 작성하는 데 도움을 주는 몇 가지 체크를 하긴 하지만, 기본적으로는 아래와 같은 객체를 생성한다.

```js
const element = {
  type: 'h1', // 태그
  props: {
    className: 'greeting',
    children: 'Hello, world'
  } // 해당 요소가 가지고 있는 속성(props)
};
```
이 객체를 “React 요소”라고 부른다. 화면에서 보고자 하는 내용에 대한 설명 내지 서술로 생각할 수 있다. React는 이 객체를 읽어들이고 이를 사용하여 DOM을 만들어낸 뒤 최신 상태로 유지한다.


```
~tip~
ES6 및 JSX 코드가 모두 올바르게 표시되도록 선택한 편집기에 “Babel” 언어 설정 을 사용하는 것이 좋습니다. 
```


# 2. Today I Found Out

```
2018.11.12
친해지자 리액트
```

# 3. reference
- https://reactjs-org-ko.netlify.com/docs/introducing-jsx.html

- https://velopert.com/3626