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

	  //bodyText에서 키워드가 몇번 등장하는지를 알아본다. 그 결과를 myNum이라는 변수에 담는다.
	  var myNum = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|안내 권유 전화|텔레마케팅|정기결제|정기 결제|자동납부|이전|개인정보 국외 이전|이관|빈도|접속 빈도 파악|통계|3자|제3자 제공|고유식별|고유식별정보|민감정보/g).length;
	  //var myNum1 = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|텔레마케팅/g).length;
	  //var myNum2 = bodyText.match(/정기결제|자동납부/g).length;
	  //var myNum3 = bodyText.match(/이전|이관|빈도|통계|3자/g).length;
	  //var myNum4 = bodyText.match(/고유식별|고유식별정보|민감정보/g).length;



	  // id값이 result인 태그에 결과를 추가한다. 
	  document.querySelector('#result').innerText = bodyText;

	  document.querySelector('#test').innerText = "전체 단어 수 : " + bodyNum + ", 위험 키워드 수 : " + myNum;
   
   
	});