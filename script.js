//컨텐트 페이지(웹 페이지)
//팝업 페이지(아이콘을 클릭했을 때 나오는 영역)


	//컨텐츠 페이지를 대상으로 코드를 실행해주세요. 
	chrome.tabs.executeScript({
	  code: 'document.querySelector("body").innerText'
	}, function (result) {
	  // 위의 코드가 실행된 후에 이 함수를 호출해주세요. 그 때 result에 담아주세요. 
   
	  //이 문서에서 body  태그 아래에 있는 모든 텍스를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
	  var bodyText = result[0];
	  //bodyText의 모든 단어를 추출하고, 그 단어의 숫자를 센다. 그 결과를 bodyNum이라는 변수에 담는다. 
	  var bodyNum = bodyText.split(' ').length;

	  // 각 단계별 키워드 개수를 담을 변수 초기화
	  var myNum1 = 0;
	  var myNum2 = 0;
	  var myNum3 = 0;
	  var myNum4 = 0;

	  //bodyText에서 키워드가 몇번 등장하는지를 알아본다. 그 결과를 myNum이라는 변수에 담는다.
	  var myNum = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|안내 권유 전화|텔레마케팅|정기결제|정기 결제|자동납부|이전|개인정보 국외 이전|이관|빈도|접속 빈도 파악|통계|3자|제3자 제공|고유식별|고유식별정보|민감정보/g).length;
	 
	  // 각 단계별 키워드가 있는지 검사하고 있으면 그 값으로 설정함
	  if(bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|텔레마케팅/g) != null)  myNum1 = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|텔레마케팅/g).length;
	  if(bodyText.match(/정기결제|자동납부/g) != null)	  myNum2 = bodyText.match(/정기결제|자동납부/g).length;
	  if(bodyText.match(/이전|이관|빈도|통계|3자/g) != null)  myNum3 = bodyText.match(/이전|이관|빈도|통계|3자/g).length;
	  if(bodyText.match(/고유식별|고유식별정보|민감정보/g) != null)  myNum4 = bodyText.match(/고유식별|고유식별정보|민감정보/g).length;

	  // 위험도 점수 계산
	  var score = ((myNum1 + myNum2*2 + myNum3*3 + MyNum4*4)/myNum) * 100

	  // id값이 result인 태그에 결과를 추가한다. 
	  document.querySelector('#result').innerText = bodyText;
	  document.querySelector('#test').innerText = "위험도 점수 : " + score;
   
   
	});