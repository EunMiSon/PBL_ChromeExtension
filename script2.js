var r1 = 'X';
var r2 = 'X';
var r3 = 'X';
var r4 = 'X';
var r5 = 'X';

var score = localStorage.getItem('score');

var cscoreText = "약관의 완성도 - " + localStorage.getItem('cscore') + "점";
var dscoreText = "약관의 위험 단어 - " + localStorage.getItem('dscore') + "점";

document.querySelector('#cont').innerText = localStorage.getItem('keyText');

var words = ['주민등록번호, 여권번호, 운전면허번호, 외국인등록번호, 외국인등록정보, 신분증 사본', '인종, 민족, 종교, 노동조합, 유전, 정치, 성생활', '지문, 얼굴, 홍채, 망막, 정맥, 귓바퀴',
			'뇌파, 심전도, 유전정보', '음성, 필적, 걸음걸이, 자판입력', '신용정보, 신용카드번호, 계좌번호, CVV, 카드유효기간, 직불카드, 신용카드 정보, 신용카드 비밀번호, 계좌 정보',
			'위치정보, 개인위치정보', '건강상태, 진료기록',	'성별, UDID, CI, 프로필 이미지',
			'학력, 직업, 키, 신장, 몸무게, 체중, 결혼(혼인)여부, 결혼기념일, 자녀정보, 취미, 관심분야, 취향, 운전면허, 운전여부, 병역사항, 보훈대상 여부', 'IP 주소, IP Address, IP 정보',
			'MAC 주소',	'사이트 방문 기록, 방문 일시, 서비스 방문 기록, 서비스 이용기록', '접속 기록, 접속 로그', '쿠키, cookie', '기기정보, 단말기기정보, 단말기 정보, 단말기에 관한 정보', 
			'브라우저',	'OS, 운영체제',	'사원증 번호, 사원 번호', '검색어, 검색기록', '위탁, 수탁', '제 3자, 제 3자에게 제공', '국외이전', '전화권유판매', '전화상담, 안내권유전화, 텔레마케팅', 
			'마케팅, 마켓팅', '광고', '맞춤형 광고', '이벤트 참여, 이벤트 개인정보', '맞춤식 서비스, 맞춤형 서비스, 개인 특화 서비스, 맞춤 서비스', '제휴 서비스, 제휴사, 제휴회사', 'SNS 계정']; //32개

var reasons = ['이 항목들은 고유식별정보에 해당하거나 고유식별정보를 포함하고 있습니다. 약관에 해당 항목들이 있다면 서비스를 이용하는데 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'이 항목들은 민감정보에 해당합니다. 약관에 해당 항목들이 포함되어 있다면 서비스를 이용하는데 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'이 항목들은 생체정보 중 신체정보에 해당합니다. 이용자의 사생활 침해 우려가 있기 때문에 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'이 항목들은 생체정보 중 생리적 정보에 해당합니다. 이용자의 사생활 침해 우려가 있기 때문에 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'이 항목들은 생체정보 중 행동적 정보에 해당합니다. 이용자의 사생활 침해 우려가 있기 때문에 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'이 항목들은 신용정보로 처리가 엄격하게 제한된 개인정보 입니다. 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'이 항목은 위치정보로 특정 개인의 위치정보(위치정보만으로는 특정 개인의 위치를 알 수 없는 경우에도 다른 정보와 용이하게 결합하여 특정 개인의 위치를 알 수 있는 것을 포함)를 의미합니다. 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다',
				'이 항목은 의료 정보로 이용자의 인권 및 사생활 보호에 중대한 피해를 야기할 수 있는 정보입니다. 해당 서비스 사용 시 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'이 항목들은 개인식별정보입니다. 약관에 해당 항목들이 포함되어 있다면 서비스를 이용하는데 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'약관에 해당 항목들이 포함되어 있다면 서비스를 이용하는데 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'IP주소가 수집되어 실제 주소가 노출될 가능성이 있습니다.',
				'MAC 주소는 다른 정보와 결합하면 사용 패턴이 드러나기 때문에 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'서비스 이용기록 분석으로 이용자의 개인정보가 분석되어 또 다른 데이터로 재생산될 가능성이 높습니다.',
				'인터넷에 접속하여 수행한 업무 내역에 대하여 계정, 접속 일시, 접속자 정보, 수행한 업무 등이 기록되어 이를 통해 맞춤형 광고 등 이용자의 개인정보가 분석될 가능성이 높습니다.',
				'쿠키를 이용해 고객의 이름, 주소, 비밀번호, 관심 분야 등 쿠키로 수반되는 다양한 개인정보 수집이 가능하므로 실제 필요한 정보인지 확인할 필요가 있습니다.',
				'PC 웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집되고 동의 없이 수집될 수 있습니다.',
				'약관에 이 항목이 포함되어 있다면 이용자가 사용하는 브라우저(크롬, 엣지, 웨일, 사파리 등)를 수집하는 것입니다. 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'약관에 이 항목이 포함되어 있다면 이용자의 운영체제(ex. 윈도우, 맥, 리눅스 등)를 수집하는 것입니다. 꼭 필요한 정보인지 확인할 필요가 있습니다.',
				'해당 사이트를 이용할 때 이용자의 사원번호가 실제로 필요한 정보인지 다시 한번 확인이 필요합니다.',
				'검색어 수집을 통해 이용자의 관심 내역을 파악하여 이용자의 개인정보가 또 다른 분야에 활용될 가능성이 높습니다.',
				'고객의 개인정보도 함께 이전하게 되어 개인정보가 재 유통되거나 남용될 위험이 큽니다.',
				'개인정보를 목적 외 이용 제공이 가능할 수 있습니다. 또한 제3자 제공 동의를 하지 않는 경우 불이익이 있을 수 있습니다.',
				'개인정보보호 통제권이 국외로 넘어감으로써 개인정보 유출 시 수반되는 위험 및 피해가 커질 수 있습니다.',
				'원치 않은 판매전화를 수신 받고 싶지 않은 경우 동의 시 다시 한번 확인이 필요합니다.',
				'이용자의 전화번호가 활용될 수 있습니다.',
				'이용자의 개인정보가 마케팅에 활용되고 이 마케팅을 위해 이용자의 개인정보가 분석될 가능성이 높습니다.',
				'이용자의 개인정보가 광고에 활용되고 이 광고를 위해 이용자의 개인정보가 분석될 가능성이 높습니다.',
				'이용자의 행태정보를 수집하여 이용자의 개인정보가 분석됩니다. 이는 개인정보 침해 위험성을 높입니다.',
				'이벤트 참여 혹은 경품 지급을 위하여 이름, 휴대폰 번호 등 개인정보가 처리 및 저장될 수 있고 주최 측이 개인정보를 수집하여 제휴사에게 전달하는 경우가 빈번하기 때문에 개인정보가 재 유통되거나 남용될 위험이 큽니다.',
				'맞춤식 서비스에 동의할 경우 IP, 쿠키, 방문 일시 등과 같은 정보들이 수집되어 자신의 개인정보가 별다른 동의 없이 분석되고 활용될 수 있습니다.',
				'서비스 제공자가 업무 제휴, 공동 마케팅 등을 위해 개인정보를 외부의 제3자에게 제공할 수 있습니다.',
				'자신의 SNS 계정을 알리는 것을 원하지 않는다면 개인정보 제공 동의를 재고해야 합니다.'];

if(localStorage.getItem('s1') == 20){
	r1 = 'O';
}
if(localStorage.getItem('s2') == 20){
	r2 = 'O';
}
if(localStorage.getItem('s3') == 20){
	r3 = 'O';
}
if(localStorage.getItem('s4') == 20){
	r4 = 'O';
}
if(localStorage.getItem('s5') == 20){
	r5 = 'O';
}

if(score<=45) {
	document.getElementById("circle").style.borderColor = "#EB274C";
	document.getElementById("status_text").style.color = "#EB274C";
	document.getElementById("status_text").innerText = "위험";
}
else if(score<=80) {
	document.getElementById("circle").style.borderColor = "#FFC041";
	document.getElementById("status_text").style.color = "#FFC041";
	document.getElementById("status_text").innerText = "경고";
}
else {
	document.getElementById("circle").style.borderColor = "#4CD964";
	document.getElementById("status_text").style.color = "#4CD964";
	document.getElementById("status_text").innerText = "안전";
}

document.getElementById("circle").innerText = score;
document.getElementById("cscore").innerText = cscoreText;
document.getElementById("dscore").innerText = dscoreText;

document.getElementById("table1").getElementsByTagName("tr")[0].getElementsByTagName("td")[2].innerHTML = r1;
document.getElementById("table1").getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerHTML = r2;
document.getElementById("table1").getElementsByTagName("tr")[2].getElementsByTagName("td")[2].innerHTML = r3;
document.getElementById("table1").getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML = r4;
document.getElementById("table1").getElementsByTagName("tr")[4].getElementsByTagName("td")[2].innerHTML = r5;

for(var i = 1; i < words.length; i++){
	document.getElementById("table2").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = words[i];
	document.getElementById("table2").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML = reasons[i];
}

// document.write('<table style="width: 800px;">');
// for (var i = 0; i < words.length; i++) {
//   document.write('<tr>');
//   for (var j = 0; j < 2; j++)  {
//     document.write('<td>');
//     document.write(i + ", " + j);
//     document.write('</td>');
//   }
//   document.write('</tr>')
// }
// document.write('</table>');