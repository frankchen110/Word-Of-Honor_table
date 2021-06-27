let articleNum = 1;
let serverURL = 'https://docs.google.com/spreadsheets/d/1J7Ah4K6QK8H3N1eJ5vzNexebVn4WMQcb__KDIBc29EA/edit?usp=sharing' ;
let event_ary = ['input[type=text]', 'textarea'];

$(document).ready(function() {
	initBtnFunc();
	setProgress();
	showAni();
});

for(let i =0;i<event_ary.length;i++){
	$(event_ary[i]).focusout(function(event) {
		if ($(this).val() == '') {
			setTip($(this));
		}
	});
	$(event_ary[i]).keyup(function(event) {
		if ($(this).val() != ''){
			removeTip($(this));
		}
	});
}
$('input[type=radio]').change(function(event) {
	removeTip($(this));
});
$('select').change(function(event) {
	removeTip($(this));
});
$('input[type=checkbox]').change(function(event) {
	removeTip($(this));
});




function initBtnFunc(){
	$('.btn-next').click(function(event) {
		checkField();
	});
	$('.btn-prev').click(function(event) {
		switchArticle('prev');
	});
	$('.btn-send').click(function(event) {
		sendToServer();
	});
	$('.btn-prev').hide();
	$('.btn-send').hide();
}

function checkField(){
	switch(articleNum){
		case 2:
			if ($('input[name=userName]').val() == '') {
				setTip($('input[name=userName]'));
				return false;
			}

			if ($('input[name=schoolName]').val() == '') {
				setTip($('input[name=schoolName]'));
				return false;
			}


			if($('input[type=radio]:checked').val() == undefined){
				setTip($('input[type=radio]'));
				return false;
			}
			if ($('input[name=userTitle]').val() == '') {
				setTip($('input[name=userTitle]'));
				return false;
			}

			if($('select').val() == null){
				setTip($('select'));
				return false;
			}
			if ($('input[name=userTel]').val() == '') {
				setTip($('input[name=userTel]'));
				return false;
			}
			if ($('input[name=email]').val() == '') {
				setTip($('input[name=email]'));
				return false;
			}
			switchArticle('next');
			break;
		case 4:

			if($('input[name=userNeed2]:checked').val() == undefined){
				setTip($('input[name=userNeed2]'));
				return false;
			}else if($('input[name=userNeed2]:checked').val() == '其他'){
				if($('input[name=userNeed2-5-text]')==''){
					setTip($('input[name=userNeed2]'));
					return false;
				}
			}
			switchArticle('next');
			break;
		case 5:
			if($('input[name=userNeed1]:checked').val() == undefined){
				setTip($('input[name=userNeed1]'));
				return false;
			}else if($('input[name=userNeed1]:checked').val() == '其他'){
				if($('input[name=userNeed1-5-text]')==''){
					setTip($('input[name=userNeed1]'));
					return false;
				}
			}
			switchArticle('next');
			break;
		case 6:
			if($('textarea[name=userNeed3]').val() == ''){
				setTip($('textarea[name=userNeed3]'));
				return false;
			}
			switchArticle('next');
			break;
		case 7:
			if($('textarea[name=userNeed4]').val() == ''){
				setTip($('textarea[name=userNeed4]'));
				return false;
			}
			break;
		default:
			switchArticle('next');
	}
}

function setTip(dom){
	let template = $('#tipTemplate01');
	let node = $('#tipTemplate01').html();
	if(dom.closest('.main-group').find('.tip').length == 0){
		dom.closest('.main-group').append(node);
		dom.closest('.main-group').addClass('bdr');
	}
}

function removeTip(dom){
	dom.closest('.main-group').find('.tip').remove();
	dom.closest('.main-group').removeClass('bdr');
}

function switchArticle(situation){
	
	switch(situation){
		case 'next':
			if (articleNum < 8){
				$('nav').hide();
				gsap.to('#article'+articleNum ,  {
					duration:1,
					x: $('.container').width()*-1,
					onComplete: backToCenter,
					onCompleteParams: [articleNum, situation] 
				});
				$('.img'+articleNum).hide();
				$('.img'+articleNum).removeClass('newPosi');
				articleNum++;
				$('#article'+articleNum).show();
				gsap.to('#article'+articleNum, {duration:0, x: $('.container').width()});
				gsap.to('#article'+articleNum, {duration:1, x: 0});
				setProgress();
			}
			break;
		case 'prev':
			if (articleNum > 1){
				$('nav').hide();
				gsap.to('#article'+articleNum ,  {
					duration:1,
					x: $('.container').width(),
					onComplete: backToCenter,
					onCompleteParams: [articleNum, situation] 
				});
				$('.img'+articleNum).hide();
				$('.img'+articleNum).removeClass('newPosi');
				articleNum--;
				$('#article'+articleNum).show();
				gsap.to('#article'+articleNum, {duration:0, x: $('.container').width()*-1});
				gsap.to('#article'+articleNum, {duration:1, x: 0});
				setProgress();
			}
			break;
	}
}

function backToCenter(oldNum, situation){
	$('#article'+oldNum).hide();
	gsap.to('#article'+oldNum , {duration:0, x:0});
	$('nav').show();
	$('.img'+articleNum).show();
	showAni();
	switch(situation){
		case 'next':
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			if (articleNum == 7) {
				$('.btn-next').hide();
				$('.btn-send').show();
			}else if (articleNum == 8) {
				$('nav').hide();
			}
			break;
		case 'prev':
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			if (articleNum == 1) {
				$('.btn-prev').hide();
			}
			break;
	}
}

function showAni(){
	setTimeout(function(){
		$('.img'+articleNum).addClass('newPosi');
	},100);
}

function setProgress(){
	let w = Math.floor((articleNum/8)*100);
	$('.progress-bar').css('width', w+'%')
}

function sendToServer(){
	let parameter = {};
	parameter.userName = $('input[name=userName]').val();
	parameter.schoolName = $('input[name=schoolName]').val();
	parameter.schoolType = $('input[name=schoolType]:checked').val();
	parameter.userTitle = $('input[name=userTitle]').val();
	parameter.userIdentity = $('select[name=userIdentity]').val();
	parameter.userTel = $('input[name=userTel]').val();
	parameter.email = $('input[name=email]').val();
	let need2 = new Array();
	$('input[name=userNeed2]:checked').each(function(index, el) {
		if($(this).val() == '其他'){
			need2.push('其他: '+$('input[name=userNeed2-5-text]').val());
		}else{
			need2.push($(this).val());
		}
		need2.push($(this).val());
	});
	parameter.userNeed2 = JSON.stringify(need2);
	let need1 = $('input[name=userNeed1]:checked').map(function(){
		return ($(this).val() == '其他')? ('其他: '+$('input[name=userNeed1-5-text]').val()) : $(this).val();
	}).get();
	parameter.userNeed1 = JSON.stringify(need1);
	parameter.userNeed3 = $('textarea[name=userNeed3]').val();
	parameter.userNeed4 = $('textarea[name=userNeed4]').val();
	parameter.method = "write1";
	console.log(parameter);

	$('.cover').css('display', 'grid');
	$.post('https://script.google.com/macros/s/AKfycbwf9biskz11iM1sztAlEcxJUjLGR3QJ5j_sx3vZNIJcP1uH5tSQeXRmnhot6tDLCH-tUQ/exec', parameter, function(data){
		console.log(data);
		if (data.result = 'sus') {
			// alert('送出成功');
			switchArticle('next');
			$('.cover').css('display', 'none');
		}else{
			$('.cover').css('display', 'none');
			alert('送出失敗，請檢查後再試看看');
		}
	}).fail(function(data){
		alert('送出失敗');
		console.log(data);
	});
}