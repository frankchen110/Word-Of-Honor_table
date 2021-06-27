const serverURL = 'https://script.google.com/macros/s/AKfycbwf9biskz11iM1sztAlEcxJUjLGR3QJ5j_sx3vZNIJcP1uH5tSQeXRmnhot6tDLCH-tUQ/exec';

$(document).ready(function() {
	readFromServer();
});

function readFromServer(){
	let parameter = {};
	parameter.method = 'read1';
	$.post(serverURL, parameter, function(data){
		setTable(data);
	}).fail(function(data){
		alert('error');
	});
}

function setTable(sData){
	let node = $('#tr01').html();
	for (let i = 1; i < sData.length; i++) {
		let content = node.replace('LIST_HERE',i);
		content = content.replace('NAME_HERE', sData[i][1]);
		content = content.replace('WTIME_HERE', sData[i][12]);
		content = content.replace('JTIME_HERE', sData[i][2]);
		content = content.replace('MEAN_HERE', sData[i][11]);
		content = content.replace('SAY_HERE', sData[i][10]);
		$('tbody').append(content);
	}
}