# 1. Today I Learned


## 프론트엔드 개발

- 사용자의 입력에 따라 서버에 요청을 보낸 후 서버에서 응답이 오면 그 응답을 적용하여 원하는 디자인의 웹페이지를 출력할 수 있게끔 해주는 것.

---

## 쉘 (SHELL)

- 운영체제 기능을 사용할 수 있게 접점의 역할을 한다. 
    1. GUI(Graphical User Interface) 쉘로는 **탐색기**(Windows), **파인더**(macOS) 등이 있다.
    2. CLI(Command Line Interface) 쉘로는 **명령 프롬프트**, **Power Shell**, **Bash** 등이 있다.

---

## Bash 실행하기

- macOS - **Terminal**
- Windows - **Git Bash**

주의! Git Bash는 Git이라는 도구를 원활히 사용할 수 있도록 리눅스의 Bash 쉘 환경을 **흉내낸** 프로그램으로, 일부 기능의 사용에 제약이 있을 수 있습니다.

--- 

## 작업 디렉토리 (Working directory)

- 프로그램 실행 시 지정되는 디렉토리
- 프로그램이 다른 파일을 필요로 할 때, **작업 디렉터리를 기준**으로 파일에 접근할 수 있습니다.
- pwd - print working directory (현재 작업 디렉토리 표시)

---

## 경로 (Path)

- 파일 및 디렉토리의 위치를 나타내는 문자열 형식
- 트리 형태의 계층 구조를 이용해 위치를 표현
- Windows에서는 backslash(`\`) 문자를, 다른 운영체제에서는 slash(`/`) 문자를 이용해 위치 경로를 계층 구조로 표현

```
 /Users/user/Documents/a.txt
```

---

### 상대 경로

- **현재 작업 디렉토리를 기준점**으로 위치를 표현하는 방식
- 대개 아래의 기호로 시작함
  - `.` - 현재 작업 디렉토리를 나타냄
  - `..` - 현재 작업 디렉토리의 상위 디렉토리를 나타냄

---

### 절대 경로

- **현재 작업 디렉토리와 상관 없이** 위치를 표현
- 대개 아래의 기호로 시작함
  - `/` - 루트 디렉토리
  - `~` - 홈 디렉토리

```
경로 예시 

./src/index.js
: 현재 작업 디렉토리 속 src 폴더 속 index.js 파일의 경로

~/Downloads/a.xls 
: 홈 디렉토리 속 Downloads 폴더 속 a.xls 파일의 경로
```

---
## 작업 디렉토리 변경하기

- cd라는 명령어를 이용하여 작업 디렉토리 변경.
- cd : change directory 약자

```
cd a : a directory로 이동
cd . : 현재 작업 directory 추적
cd .. : 현재 위치를 기준으로 상위 directory로 이동
cd / : 최상위 루트 directory로 이동
cd ~ : 홈 directory로 이동
```

`&&` 기호는 여러 명령을 순서대로 실행하고 싶을 때 사용합니다.

```
cd .. && pwd : 상위 directory로 변경 후 현재 작업 directory 표시
```

---

## 파일 및 디렉터리 조작

- cp : 파일 복사하기
```
cp a.txt b.txt : a.txt라는 파일의 복사본을 b.txt라는 이름으로 만들기
```

- mv : 파일 이동하기
```
mv a.txt 경로/b.txt : a.txt라는 파일을 b.txt라는 이름으로 해당 경로 속으로 옮기기.
```

- touch : 빈 파일 생성하기
- mkdir : 디렉터리 생성하기
- rm : 파일 및 디렉터리 지우기
    - 디렉토리에 파일이 존재하는 경우 단순 rm 명령어로는 지울 수가 없다. 
    - rm -rf 명령으로 강제 지우기가 가능하지만 복구가 어려우므로 조심해서 사용.
- rmdir : 디렉터리 지우기

---

## 파일의 내용 표시

- cat : 파일의 전체 내용을 한꺼번에 표시
    - 스크롤 기능, 찾기 기능 없음.
- less : 파일의 전체 내용을 스크롤하며 보기
    - 스크롤 기능, 찾기 기능 있음.
- tail : 파일의 끝부분만 표시

---

## 텍스트 편집

- nano : 편집 가능. 편집 후 저장&이름 변경 등 조작할 수 있음.

- vim : 명령모드로 실행. `i` 키로 편집 모드로 변경 후 편집 가능.

# 2. Today I Found Out

```

```

# 3. reference

https://github.com/fds11/fds-introduction


