var r1 = 'X';
var r2 = 'X';
var r3 = 'X';
var r4 = 'X';
var r5 = 'X';

var score = localStorage.getItem('score');

var words = ['위탁,수탁', '제3자', '국외이전', '전화권유판매', '전화상담', '안내 권유 전화', '텔레마케팅', '마케팅', '광고', '맞춤형 광고', '이벤트', '서비스방문기록', '서비스이용기록',
			'로그', '쿠키', '맞춤식 서비스', '기기정보', '위치정보', '회원번호', '사원번호', '결혼 여부', '자녀정보', '제휴서비스,제휴사', '취미', '직업', '성별', '운전면허', '브라우저',
			'운영체제', '검색어', '검색기록', 'IP 주소']; //32개
var reasons = ['고객의 개인정보도 함께 이전하게 되어 개인정보가 재유통되거나 남용될 위험이 크다.',
				'개인정보를 목적 외 이용제공이 가능할 수 있다. 또한 제3자 제공 동의를 하지 않는 경우 불이익이 있을 수 있다.',
				'개인정보보호 통제권이 국외로 넘어감으로 개인정보 유출 시 수반되는 위험 및 피해가 커질 수 있다.',
				'원치 않은 판매전화를 수신받고 싶지 않은 경우 동의 시 다시 한번 확인이 필요하다',
				'이용자의 전화번호가 전화상담에 활용될 수 있다',
				'이용자의 전화번호가 안내 권유 전화에 활용될 수 있다.',
				'이용자의 전화번호가 텔레마케팅에 활용될 수 있다.',
				'이용자의 개인정보가 마케팅에 활용되고 이 마케팅을 위해 이용자의 개인정보가 분석될 가능성이 높다.',
				'이용자의 개인정보가 광고에 활용되고 이 광고를 위해 이용자의 개인정보가 분석될 가능성이 높다.',
				'이용자의 행태정보를 수집하여 이용자의 개인정보가 분석된다. 이는 개인정보 침해 위험성이 높다.',
				'이벤트 참여 혹은 경품 지급을 위하여 이름, 휴대폰번호 등 개인정보가 처리 및 저장될 수 있고 주최측이 개인정보를 수집하여 제휴사에게 전달하는 경우가 빈번하기 때문에 개인정보가 재유통되거나 남용될 위험이 크다.',
				'서비스 방문기록이 저장되면 IP주소가 유출될 수 있어 실제 주소가 노출될 가능성이 있다. 또한 서비스 이용기록 분석으로 이용자의 개인정보가 분석되어 또다른 데이터로 재생산될 가능성이 높다.',
				'서비스 이용기록 분석으로 이용자의 개인정보가 분석되어 또다른 데이터로 재생산될 가능성이 높다.',
				'인터넷에 접속하여 수행한 업무내역에 대하여 계정, 접속 일시, 접속자 정보, 수행한 업무 등이 기록되어 이를 통해 맞춤형 광고 등 이용자의 개인정보가 분석될 가능성이 높다.',
				'해당 사이트가 이용자들이 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 활동 내역 등을 저장하게 되어 이를 통해 맞춤형 광고 등 이용자의 개인정보가 분석될 가능성이 높다.',
				'맞춤식 서비스에 동의할 경우 IP, 쿠키, 방문 일시 등 이와 같은 정보들이 수집될 수 있어 자신이 원치 않은  정보가 유출 될 수 있다.',
				'PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집되고 동의 없이 수집될 수 있다.',
				'개인위치정보는 특정개인의 위치정보를 의미하여 특정 개인의 위치를 알 수 없는 경우에도 다른 정보와 용이하게 결합하여 특정 개인의 위치가 노출될 수 있다.',
				'',
				'해당 사이트를 이용할 때 이용자의 사원번호가 실제로 필요한 정보인지 다시 한번 확인이 필요하다.',
				'결혼 여부와 결혼기념일의 정보를 제공하고 싶지 않는 경우 동의 시 다시 한번 확인이 필요하다.',
				'자녀 정보를 제공하고 싶지 않는 경우 동의 시 다시 한번 확인이 필요하다.',
				'서비스 제공자가 업무 제휴, 공동 마케팅 등을 위해 개인정보를 외부의 제3자에게 제공할 수 있다.',
				'해당사이트에서는 이용자의 취미를 수집한다. 꼭 필요한 정보인지 확인할 필요가 있다.',
				'해당사이트에서는 이용자의 직업을 수집한다. 꼭 필요한 정보인지 확인할 필요가 있다.',
				'해당사이트에서는 이용자의 성별을 수집한다. 꼭 필요한 정보인지 확인할 필요가 있다.',
				'해당사이트에서는 이용자의 운전과 관련한 정보를 수집한다. 꼭 필요한 정보인지 확인할 필요가 있다.',
				'해당사이트에서는 이용자가 사용하는 브라우저(크롬, 엣지, 웨일, 사파리 등)를 수집한다. 꼭 필요한 정보인지 확인할 필요가 있다.',
				'해당사이트에서는 이용자의 운영체제(ex. 윈도우, 맥, 리눅스 등)을 수집한다. 꼭 필요한 정보인지 확인이 필요하다.',
				'검색어 수집을 통해 이용자의 관심내역을 파악하여 이용자의 개인정보가 또다른 분야에 활용될 가능성이 높다.',
				'검색기록수집을 통해 이용자의 관심내역을 파악하여 이용자의 개인정보가 또다른 분야에 활용될 가능성이 높다.',
				'IP주소가 수집되어 실제 주소가 노출될 가능성이 있다.'];

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

if(score<=30) {
	document.getElementById("circle").style.borderColor = "#EB274C";
	document.getElementById("status_text").style.color = "#EB274C";
	document.getElementById("status_text").innerText = "위험";
}
else if(score<=70) {
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
document.getElementById("table1").getElementsByTagName("tr")[0].getElementsByTagName("td")[2].innerHTML = r1;
document.getElementById("table1").getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerHTML = r2;
document.getElementById("table1").getElementsByTagName("tr")[2].getElementsByTagName("td")[2].innerHTML = r3;
document.getElementById("table1").getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML = r4;
document.getElementById("table1").getElementsByTagName("tr")[4].getElementsByTagName("td")[2].innerHTML = r5;

for(var i = 0; i < words.length; i++){
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