//컨텐트 페이지(웹 페이지)
//팝업 페이지(아이콘을 클릭했을 때 나오는 영역)


	//컨텐츠 페이지를 대상으로 코드를 실행해주세요. 
	chrome.tabs.executeScript({
		code: 'document.querySelector("body").innerText'
	  }, function (result) {
		// 위의 코드가 실행된 후에 이 함수를 호출해주세요. 그 때 result에 담아주세요. 
	 
		//이 문서에서 body  태그 아래에 있는 모든 텍스트를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
		var bodyText = result[0];
		
		/* 약관의 구체성 평가 */
		// 첫항목의 단어가 없으면 == s1이 0이면 이용동의가 없는 것 -> 이용동의가 없습니다. 경고문구 식으로 하려고 s1~s5로 따로 나눔
		// 기본 0점으로 시작하여 단어가 없는게 아니면(있으면) 20점으로

		var s1 = 0;  // 1.개인정보 수집 이용 동의서 존재 여부 점수
		var s2 = 0;  // 2.개인정보의 처리 목적 여부 점수
		var s3 = 0;  // 3.개인벙보의 처리 및 보유 기간 여부 점수
		var s4 = 0;  // 4.처리하는 개인정보의 항목 여부 점수
		var s5 = 0;  // 5.주요 개인정보 처리 표시 여부 점수
		var warning = '';

		if(bodyText.match(/개인정보 수집 및 이용 동의|개인정보 수집 이용 동의|개인정보 수집 및 이용에 대한 동의|개인정보 수집 및 이용에 관한 동의|개인정보 수집 및 이용에 동의|개인정보 수집 및 이용에 대한 안내|개인정보 수집 및 이용에 관한 안내|개인정보 수집 이용 안내|개인정보 수집 및 이용 안내|개인정보 수집 및 이용안내|개인정보 수집 및 서비스 활용 동의|개인정보 수집 및 서비스 활용 안내|개인정보 수집 및 이용/g) != null){
			s1 = 20;
		}else{
			warning = warning + '❗ 본 사이트는 개인 정보의 수집 및 이용 동의를 받지 않습니다.\n';
		}
		if(bodyText.match(/개인정보의 수집 이용 목적|개인정보의 수집 목적 및 이용 목적|개인정보 수집 목적|개인정보 수집, 이용 목적|수집하는 개인정보 및 이용 목적|수집하는 개인정보 항목 및 이용 목적|개인정보의 수집 및 이용 목적|개인정보의 수집 이용 목적|개인정보의 수집, 이용 목적|개인정보 수집, 이용 항목 및 목적|수집 및 이용 목적|수집하는 개인정보 항목, 목적|개인정보 수집 목적|개인정보의 수집 이용 목적|수집한 개인정보의 이용/g) != null){
			s2 = 20;
		}else{
			warning = warning + '❗ 본 사이트는 개인 정보의 수집 및 이용의 목적을 밝히지 않습니다.\n';
		}
		if(bodyText.match(/개인정보 보유 및 이용기간|개인정보의 보유 및 이용기간|개인정보 이용기간 및 파기|개인정보 보유 기간|개인정보 이용 기간|개인정보의 이용기간 및 파기|보유 및 이용기간/g) != null){
			s3 = 20;
		}else{
			warning = warning + '❗ 본 사이트는 개인 정보의 보유 기간을 밝히지 않습니다.\n';
		}
		if(bodyText.match(/개인정보의 수집 항목|개인정보 수집 항목|수집하는 개인정보의 항목|수집 항목|수집항목|수집하는 개인정보 항목|회사가 수집하는 개인정보 항목|회원가입시 수집하는 정보|수집하는 개인정보의 항목|수집하는 개인정보의 항목 및 수집방법|수집하는 개인정보 항목, 목적|수집하는 항목/g) != null){
			s4 = 20;
		}else{
			warning = warning + '❗ 본 사이트는 수집하는 개인정보의 항목을 밝히지 않습니다.\n';
		}
		if(bodyText.match(/주민등록번호|여권번호|운전면허번호|외국인등록번호/g) == null){
			s5 = 20;  // 주민번호~ 항목들 없으면 20점
		}else{
			if(bodyText.match(/고유식별정보/g) != null) s5 = 20;  // 주민번호~ 항목 있는데 고유식별정보라는 표시가 없는게 아니면(있으면) 20점
			else warning = warning + '❗ 본 사이트는 수집하는 항목이 고유식별정보임을 밝히지 않습니다.\n';
		}

		var score = s1 + s2 + s3 + s4 + s5;

		/* 위험도 키워드 필터링 */

		var basic = ['위탁', '수탁', '제3자', '국외이전', '전화권유판매', '전화상담', '안내 권유 전화', '텔레마케팅', '마케팅', '마켓팅', '광고', '이벤트', '이벤트 참여',
					'이벤트 개인정보', '서비스방문기록', '서비스이용기록', '접속 기록', '로그', '접속 로그', '쿠키', 'cookie', '맞춤식 서비스', '맞춤형 서비스', '개인특화서비스',
					'맞춤 서비스', '기기정보', '단말기기정보', '단말기 정보', '단말기에 관한 정보', '위치정보', '개인위치정보', '회원번호', '사원증 번호', '사원번호', '결혼 여부',
					'결혼기념일', '자녀정보', '제휴서비스', '제휴사', '제휴회사', '관심 분야', '취향', '취미', '직업', '성별', '운전면허', '운전 여부', '브라우저', 'OS', '운영체제',
					'검색어', 'IP 주소', 'IP address'];
		var sensitive = ['인종', '민족', '종교', '노동 조합', '유전', '정당', '정치', '성생활', '지문', '얼굴', '홍채', '망막', '정맥', '장문', '귓바퀴', '뇌파', '심전도', '유전정보',
						'음성', '필적', '걸음걸이', '자판 입력'];
		var basicText = '';
		var sensText = '';
		var idx = '';  // 필터링할 단어의 시작 위치
		var start = 0;  // 단어가 들어있는 문장의 시작 위치 (그 문장의 앞 문장의 끝을 .으로 찾음)
		var end = 0;    // 단어가 들어있는 문장의 끝 위치 (역시 .으로 끝을 찾음)
		

		for(var i = 0;i<basic.length;i++){
			var n = 1;
			var indices = [];
			idx = bodyText.indexOf(basic[i]);
			if( idx != -1 ){
				basicText = basicText + "<<< " + basic[i] + " >>>" + "\n";
				score = score - 2;
			}
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(basic[i], idx+1);
			}
			  
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
				  
				basicText = basicText + n + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				n = n + 1;
			}
		}
		for(var i = 0;i<sensitive.length;i++){
			var n = 1;
			var indices = [];
			idx = bodyText.indexOf(sensitive[i]);
			if( idx != -1 ){
				sensText = sensText + "<<< " + sensitive[i] + " >>>" + "\n";
				score = score - 4;
			}
			while ( idx != -1 ){
				indices.push(idx);
				idx = bodyText.indexOf(sensitive[i], idx+1);
			}
			  
			for(var j = 0; j < indices.length; j++){
				start = bodyText.lastIndexOf(".", indices[j]);
				end = bodyText.indexOf(".", start+1);
				  
				sensText = sensText + n + " ========" + "\n" + bodyText.substring(start+1, end+1) + "\n\n";
				n = n + 1;
			}
		}
  
		if(score<=30) {
			document.getElementById("circle").style.borderColor = "red";
		}
		else if(score<=70) {
			document.getElementById("circle").style.borderColor = "yellow";
		}
		else {
			document.getElementById("circle").style.borderColor = "green";
		}

		// id값이 result인 태그에 결과를 추가한다. 
		document.querySelector('#circle').innerText = score;
		document.querySelector('#warning').innerText = warning;
		document.querySelector('#cont4').innerText = basicText + "\n" + sensText + "\n";

		document.addEventListener("DOMContentLoaded", function(){
			var btn = document.getElementById("btn2");
			btn.addEventListener("click", function(){
				window.open('next.html');
			});
		});

		localStorage.setItem('s1',s1);
		localStorage.setItem('s2',s2);
		localStorage.setItem('s3',s3);
		localStorage.setItem('s4',s4);
		localStorage.setItem('s5',s5);

	  });
