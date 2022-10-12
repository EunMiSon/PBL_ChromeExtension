//컨텐트 페이지(웹 페이지)
//팝업 페이지(아이콘을 클릭했을 때 나오는 영역)


	//컨텐츠 페이지를 대상으로 코드를 실행해주세요. 
	chrome.tabs.executeScript({
		code: 'document.querySelector("body").innerText'
	  }, function (result) {
		// 위의 코드가 실행된 후에 이 함수를 호출해주세요. 그 때 result에 담아주세요. 
	 
		//이 문서에서 body  태그 아래에 있는 모든 텍스트를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
		var bodyText = result[0];
		//bodyText의 모든 단어를 추출하고, 그 단어의 숫자를 센다. 그 결과를 bodyNum이라는 변수에 담는다. 
		var bodyNum = bodyText.split(' ').length;
		//var text = bodyText.split(' ');
  
		var words4 = ['고유식별', '고유식별정보', '민감정보'];  // 필터링할 단어 배열
		var words3 = ['이전', '이관', '빈도', '통계', '3자'];
		var words2 = ['정기결제', '자동납부'];
		var words1 = ['이벤트', '광고', '마케팅', '홍보', '푸쉬', '푸시', '권유', '텔레마케팅'];
		var idx = "";  // 필터링할 단어의 시작 위치
		var start = 0;  // 단어가 들어있는 문장의 시작 위치 (그 문장의 앞 문장의 끝을 .으로 찾음)
		var end = 0;    // 단어가 들어있는 문장의 끝 위치 (역시 .으로 끝을 찾음)
		var text4 = "", text3 = "", text2 = "", text1 = "";  // 찾아낸 문장들
		var num = 1;
  
		for(var i = 0;i<words4.length;i++){
		  var indices = [];
		  text4 = text4 + "<<< " + words4[i] + " >>>" + "\n";
		  idx = bodyText.indexOf(words4[i]);
		  while ( idx != -1 ){
			  indices.push(idx);
			  idx = bodyText.indexOf(words4[i], idx+1);
		  }
			  
		  for(var j = 0; j < indices.length; j++){
			  start = bodyText.lastIndexOf(".", indices[j]);
			  end = bodyText.indexOf(".", start+1);
				  
			  text4 = text4 + num + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
			  num = num + 1;
		  }
		}
		for(var i = 0;i<words3.length;i++){
			var indices = [];
			text3 = text3 + "<<< " + words3[i] + " >>>" + "\n";
			idx = bodyText.indexOf(words3[i]);
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(words3[i], idx+1);
			}
				
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
					
				text3 = text3 + num + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				num = num + 1;
			}
		  }
		  for(var i = 0;i<words2.length;i++){
			var indices = [];
			text2 = text2 + "<<< " + words2[i] + " >>>" + "\n";
			idx = bodyText.indexOf(words2[i]);
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(words2[i], idx+1);
			}
				
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
					
				text2 = text2 + num + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				num = num + 1;
			}
		  }
		  for(var i = 0;i<words1.length;i++){
			var indices = [];
			text1 = text1 + "<<< " + words1[i] + " >>>" + "\n";
			idx = bodyText.indexOf(words1[i]);
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(words1[i], idx+1);
			}
				
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
					
				text1 = text1 + num + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				num = num + 1;
			}
		  }
		  
  
		var myNum1 = 0;
		var myNum2 = 0;
		var myNum3 = 0;
		var myNum4 = 0;
  
		//bodyText에서 키워드가 몇번 등장하는지를 알아본다. 그 결과를 myNum이라는 변수에 담는다.
		var myNum = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|안내 권유 전화|텔레마케팅|정기결제|정기 결제|자동납부|이전|개인정보 국외 이전|이관|빈도|접속 빈도 파악|통계|3자|제3자 제공|고유식별|고유식별정보|민감정보/g).length;
  
		if(bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|텔레마케팅/g) != null)  myNum1 = bodyText.match(/이벤트|광고|마케팅|홍보|푸쉬|푸시|권유|텔레마케팅/g).length;
		if(bodyText.match(/정기결제|자동납부/g) != null)	  myNum2 = bodyText.match(/정기결제|자동납부/g).length;
		if(bodyText.match(/이전|이관|빈도|통계|3자/g) != null)  myNum3 = bodyText.match(/이전|이관|빈도|통계|3자/g).length;
		if(bodyText.match(/고유식별|고유식별정보|민감정보/g) != null)  myNum4 = bodyText.match(/고유식별|고유식별정보|민감정보/g).length;
  
		// 위험도 점수 계산
		var score = ((myNum1*10 + myNum2*20 + myNum3*30 + myNum4*40)/bodyNum) * 100;
		score = Math.round((score + Number.EPSILON) * 100) / 100;
  
		// id값이 result인 태그에 결과를 추가한다. 
		document.querySelector('#cont4').innerText = text4 + "\n";
		document.querySelector('#cont3').innerText = text3 + "\n";
		document.querySelector('#cont2').innerText = text2 + "\n";
		document.querySelector('#cont1').innerText = text1 + "\n";
		//document.querySelector('#test').innerText = "전체 단어 수 : " + bodyNum + ", 위험 키워드1 수 : " + myNum1 + ", 위험 키워드2 수 : " + myNum2 + ", 위험 키워드3 수 : " + myNum3 + ", 위험 키워드4 수 : " + myNum4;
		document.querySelector('#circle').innerText = score;
	 
	 
	  });