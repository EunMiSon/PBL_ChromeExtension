//컨텐트 페이지(웹 페이지)
//팝업 페이지(아이콘을 클릭했을 때 나오는 영역)


	//컨텐츠 페이지를 대상으로 코드를 실행해주세요. 
	chrome.tabs.executeScript({
		code: 'document.querySelector("body").innerText'
	  }, function (result) {
		// 위의 코드가 실행된 후에 이 함수를 호출해주세요. 그 때 result에 담아주세요. 
	 
		var regex = / /gi;

		//이 문서에서 body  태그 아래에 있는 모든 텍스트를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
		var bodyText = result[0]; // 위험도 단어 들어간 약관 출력용 띄어쓰기O 텍스트 -> 원본
		var bt_com = result[0].replace(regex, ''); // 완성도 단어 필터링용 띄어쓰기X 텍스트 -> 원본에서 띄어쓰기 제거
		
		/* 약관의 완성도(구체성) 평가 */
		// 첫항목의 단어가 없으면 == s1이 0이면 이용동의가 없는 것 -> O/X 하려고 s1~s5로 따로 나눔
		// 기본 0점으로 시작하여 단어가 없는게 아니면(있으면) 20점으로

		var s1 = 0;  // 1.개인정보 수집 이용 동의서 존재 여부 점수
		var s2 = 0;  // 2.개인정보의 처리 목적 여부 점수
		var s3 = 0;  // 3.개인벙보의 처리 및 보유 기간 여부 점수
		var s4 = 0;  // 4.처리하는 개인정보의 항목 여부 점수
		var s5 = 0;  // 5.주요 개인정보 처리 표시 여부 점수
		var r1 = 'O';
		var r2 = 'O';
		var r3 = 'O';
		var r4 = 'O';
		var r5 = 'O';

		if(bt_com.match(/개인정보수집및이용동의|개인정보수집이용동의|개인정보수집및이용에대한동의|개인정보수집및이용에관한동의|개인정보수집및이용에동의|개인정보수집및이용에대한안내|개인정보수집및이용에관한안내|개인정보수집이용안내|개인정보수집및이용안내|개인정보수집및서비스활용동의|개인정보수집및서비스활용안내/g) != null)
		{
			s1 = 20;
		}else{
			r1 = "X";
		}
		if(bt_com.match(/개인정보의수집이용목적|개인정보의수집목적및이용목적|개인정보수집목적|개인정보수집,이용목적|수집하는개인정보및이용목적|수집하는개인정보항목및이용목적|개인정보의수집및이용목적|개인정보의수집,이용목적|개인정보수집,이용항목및목적|수집하는개인정보항목,목적|수집한개인정보의이용/g) != null){
			s2 = 20;
		}else{
			r2 = "X";
		}
		if(bt_com.match(/개인정보보유및이용기간|개인정보의보유및이용기간|개인정보이용기간및파기|개인정보보유기간|개인정보이용기간|개인정보의이용기간및파기|보유및이용기간/g) != null){
			s3 = 20;
		}else{
			r3 = "X";
		}
		if(bt_com.match(/개인정보의수집항목|개인정보수집항목|수집하는개인정보의항목|수집항목|수집하는개인정보항목|회사가수집하는개인정보항목|회원가입시수집하는정보|수집하는개인정보의항목및수집방법|수집하는개인정보항목,목적|수집하는항목/g) != null){
			s4 = 20;
		}else{
			r4 = "X";
		}
		if(bt_com.match(/주민등록번호|여권번호|운전면허번호|외국인등록번호/g) == null){
			s5 = 20;  // 주민번호~ 항목들 없으면 20점
		}else{
			if(bt_com.match(/고유식별정보/g) != null) s5 = 20;  // 주민번호~ 항목 있는데 고유식별정보라는 표시가 없는게 아니면(있으면) 20점
			else r5 = "X";
		}

		var cscore = s1 + s2 + s3 + s4 + s5; // 완성도 점수

		/* 약관의 위험 단어 평가 */

		var keyLevel3 = ['주민등록번호', '여권번호', '여권 번호', '운전면허 번호', '운전면허번호', '외국인 등록번호', '외국인등록번호', '인종', '민족', '종교', '노동조합', '노동 조합', '유전',
					'정당', '정치', '성생활', '성 생활', '지문', '얼굴', '홍채', '망막', '정맥', '귓바퀴', '뇌파', '심전도', '유전정보', '유전 정보', '음성', '필적', '걸음걸이',
					'자판 입력', '자판입력', '신용정보', '신용 정보', '신용카드번호', '신용카드 번호', '계좌번호', '위치정보', '위치 정보', '개인위치정보', '개인위치 정보', '개인 위치 정보',
					'개인 위치정보', '건강상태', '건강 상태', '진료기록', '진료 기록'];
		var keyLevel2 = ['성별', '학력', '직업', ' 키', '몸무게', '혼인여부', '결혼여부', '혼인 여부', '결혼 여부', '결혼기념일', '결혼 기념일', '자녀 정보', '자녀정보', '취미', '관심분야',
					'관심 분야', '취향', '운전면허', '운전여부', '운전 여부'];
		var keyLevel1 = ['IP 주소', 'IP Address', 'MAC 주소', '사이트 방문 기록', '서비스 방문 기록', '서비스 이용기록', '접속 기록', '로그', '접속 로그', '쿠키', 'cookie', '기기정보',
					'단말기기정보', '단말기 정보', '단말기에 관한 정보', '브라우저', 'OS', '운영체제', '사원증 번호', '사원 번호', '검색어', '검색기록', '위탁', '수탁', '제 3자', '제 3자에게 제공',
					'국외이전', '국외 이전', '전화권유판매', '전화 권유 판매', '전화권유 판매', '전화상담', '전화 상담', '안내권유전화', '안내 권유 전화', '안내 권유전화', '안내권유 전화',
					'텔레마케팅', '마케팅', '마켓팅', '광고', '맞춤형 광고', '이벤트', '이벤트 참여', '이벤트 개인정보', '맞춤식 서비스', '맞춤형 서비스', '개인 특화 서비스', '맞춤 서비스',
					'제휴 서비스', '제휴사', '제휴회사'];

		var kl3Text = '';
		var kl2Text = '';
		var kl1Text = '';
		var idx = '';  // 필터링할 단어의 시작 위치
		var start = 0;  // 단어가 들어있는 문장의 시작 위치 (그 문장의 앞 문장의 끝을 .으로 찾음)
		var end = 0;    // 단어가 들어있는 문장의 끝 위치 (역시 .으로 끝을 찾음)
		var dscore = 0; // 위험 단어 점수
		

		for(var i = 0;i<keyLevel3.length;i++){
			var n = 1;
			var indices = [];
			idx = bodyText.indexOf(keyLevel3[i]);
			if( idx != -1 ){
				kl3Text = kl3Text + "✔️ " + keyLevel3[i] + "\n";
				dscore = dscore - 5;
			}
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(keyLevel3[i], idx+1);
			}
			  
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
				  
				kl3Text = kl3Text + n + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				n = n + 1;
			}
		}
		for(var i = 0;i<keyLevel2.length;i++){
			var n = 1;
			var indices = [];
			idx = bodyText.indexOf(keyLevel2[i]);
			if( idx != -1 ){
				kl2Text = kl2Text + "✔️ " + keyLevel2[i] + "\n";
				dscore = dscore - 3;
			}
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(keyLevel2[i], idx+1);
			}
			  
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
				  
				kl2Text = kl2Text + n + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				n = n + 1;
			}
		}
		for(var i = 0;i<keyLevel1.length;i++){
			var n = 1;
			var indices = [];
			idx = bodyText.indexOf(keyLevel1[i]);
			if( idx != -1 ){
				kl1Text = kl1Text + "✔️ " + keyLevel1[i] + "\n";
				dscore = dscore - 1;
			}
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(keyLevel1[i], idx+1);
			}
			  
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
				  
				kl1Text = kl1Text + n + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				n = n + 1;
			}
		}

		var score = cscore + dscore;
		
		if(score<=30) {
			document.getElementById("circle").style.borderColor = "#EB274C";
		}
		else if(score<=70) {
			document.getElementById("circle").style.borderColor = "#FFC041";
		}
		else {
			document.getElementById("circle").style.borderColor = "#4CD964";
		}

		// id값이 result인 태그에 결과를 추가한다. 
		document.querySelector('#circle').innerText = score;
		
		document.getElementById("table1").getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML = r1;
		document.getElementById("table1").getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML = r2;
		document.getElementById("table1").getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML = r3;
		document.getElementById("table1").getElementsByTagName("tr")[3].getElementsByTagName("td")[1].innerHTML = r4;
		document.getElementById("table1").getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML = r5;

		document.querySelector('#cont4').innerText = kl3Text + "\n" + kl2Text + "\n" + kl1Text + "\n";

		document.addEventListener("DOMContentLoaded", function(){
			var btn = document.getElementById("btn");
			btn.addEventListener("click", function(){
				window.open('next.html');
			});
		});

		localStorage.setItem('s1',s1);
		localStorage.setItem('s2',s2);
		localStorage.setItem('s3',s3);
		localStorage.setItem('s4',s4);
		localStorage.setItem('s5',s5);
		localStorage.setItem('score',score);
		localStorage.setItem('cscore', cscore);
		localStorage.setItem('dscore', -(dscore));

	  });