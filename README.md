# Notwait

#### QR코드를 이용하여 웹을 통한 소통창구

<br/>

## 개발 인원 및 기간

- 개발기간 : 4주
- 개발 인원 : 프론트엔드 1인

<br/>

## 목적

<br/>

#### 코로나 시대에 많은 음식점의 폐업을 보았고, 안심을 위한 최소한의 접촉, 인건비의 절감을 통하여 부담 줄이기, 그럼에도 원활한 소통을 이루고자 만든 프로젝트

<br/>

## 적용 기술 및 구현 기능

<br/>

### 적용기술

- Html
- Css
- Vue.js
- Express.js
- Mongodb
- Aws Elastic Beanstalk

<br/>

### 구현 기능

- Express.js 와 Mongodb 연결
- Aws Elastic Beanstalk 로 서버배포
- Mongodb에 DB 셋팅 및 Aws Elastic Beanstalk 서버 연결
- Customer <-> Mongodb(Express.js) <-> Owner 실시간 동기화

<br/>

#### Owner

- Table
  - 주문
  - 주문 알림
  - 계산서 생성
  - 테이블 초기화
  - 테이블 추가
  - 호출 알림
- Talk
  - 실시간 소통
  - 메세지 알림
- Cooking state
  - 주문 상태 전달
- 설정
  - 메뉴 셋팅
  - QR코드 프린트

<br/>

#### Customer

- Menu
  - 메뉴목록 및 리뷰작성
  - 가격 계산
  - 장바구니 추가 및 제거
- Orderlist
  - 계산서 생성
- Talk
  - 실시간 소통
- Call
  - 호출
- Cooking state
  - 주문 상태 현황

<br/>

## 구조
<div> </div>
<div><center> Vue.js </center>  </div>
<div><center> ⇣ ⇡  </center>  </div>
<div><center> (axios) </center>  </div>
<div><center> ⇣ ⇡  </center>  </div>
<div><center> Express.js(Aws Elastic Beanstalk) </center>  </div>
<div><center> ⇣ ⇡ </center>  </div>
<div><center> Mongodb </center>  </div>
<div><center> watch 함수(변동사항 실시간 전송)</center>  </div>


<br/>

## 느낀점

<br/>

#### 결국 데이터를 보여주는 작업이지만, 이를 효율적으로 관리하기 위해서 생각할 부분이 꽤 많았다. 코드 한 줄에 고민하던 시간을 생각하면 정말 코드 한줄 한줄이 중요하고 소중하게 느껴진다.
