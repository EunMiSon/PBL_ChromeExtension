//컨텐트 페이지(웹 페이지)
//팝업 페이지(아이콘을 클릭했을 때 나오는 영역)

function matching(user){
	//컨텐트 페이지를 대상으로 아래와 같은 코드를 실행할 것이다.
	chrome.tabs.executeScript({

	code:'document.querySelector("body").innerText'
	}, function(result){
	//위의 code내의 코드가 실행된 후에 이 함수를 호출해라. 위의 코드가 리턴해주는 값은 result라는 변수에 담아라


	//이 문서에서 body태그 아래에 있는 모든 텍스트를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
	var bodyText = result[0];

	//bodyText의 모든 단어를 추출하고(띄어쓰기 단위로 분리), 그 단어의 숫자를 센다.
	//그리고 그 결과를 bodyNum이라는 변수에 담는다.
	var bodyNum = bodyText.split(' ').length;

	//bodyText에서 자신이 알고있는 단어(the)가 몇 번 등장하는지를 알아본다. 그 결과를 myNum이라는 변수에 담는다.
	//they를 the로 치지 않기 위해 띄어쓰기가 있는지까지 체크한다. 그러기위해 \\b 를 추가
	var myNum = bodyText.match(new RegExp('\\b('+user+')\\b', 'gi')).length;

	var per = myNum/bodyNum*100;
	per = per.toFixed(1); //소수점 첫째자리까지만 보이게

	//id값이 result인 태그에 결과를 추가한다.
	document.querySelector('#result').innerText = 
	myNum + '/' + bodyNum + '(' + (per) + '%)';

	});
}

//크롬 스토리지에 저장된 값을 가져와라.
chrome.storage.sync.get(function(data){
	// #user의 값으로 data의 값을 입력해라.
	document.querySelector('#user').value = data.userWords;


	//값을 분석해 그 결과를 #result에 넣어라.
	matching(data.userWords);

                                      });


//컨텐트 페이지의 #user(textarea)에 입력된 값이 변경되었을 때, function을 실행해라.
document.querySelector('#user').addEventListener('change', function(){

	//컨텐트 페이지에 몇 개의 단어가 등장하는지 계산
	var user = document.querySelector('#user').value;

	//크롬 스토리지에 입력값을 저장한다. (userWords란 이름으로 사용자가 입력한 정보가 저장됨)
	chrome.storage.sync.set({
		userWords: user
	});

	matching(user);

})
