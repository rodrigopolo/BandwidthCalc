$(function() {

	function thousand(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function pad(num, size) {
		var str = num + "";
		while (str.length < size) str = "0" + str;
		return str;
	}

	function toHHMMSS(n) {
		var sep = ':',
			n 	= parseFloat(n),
			hh 	= parseInt(n / 3600),
			days = '';

			if(hh>24){
				hh = Math.floor(n / 3600) % 24;
				days = thousand(Math.floor(n / 86400))+' days, ';
			}
			n 	%= 3600;
			var mm = parseInt(n / 60),
				ss = parseInt(n % 60);

		return days+pad(hh,2)+sep+pad(mm,2)+sep+pad(ss,2);
	}

	var file_dom = $('#file');
	var exponent_dom = $('#exponent');
	var base_dom = $('#base');
	var bandwidth_dom = $('#bandwidth');
	var sufix_dom = $('#sufix');
	var result_dom = $('#result');

	$('input[type=text]').on('blur', function() {
		calc();
	});

	$('select').on('change', function() {
		calc();
	});

	function calc(){
		var exponent = exponent_dom.val() || 0,
			base = base_dom.val() || 0,
			unit = file_dom.val() || 0,
			bandwidth = bandwidth_dom.val() || 0,
			sufix = sufix_dom.val() || 0;

		var seconds = ((unit * Math.pow(base, exponent)) * 8) / (bandwidth * sufix);

		result_dom.html('<h3>Time: <span class="label label-default">'+toHHMMSS(seconds)+'</span></h3>');
	}

	calc();

});

