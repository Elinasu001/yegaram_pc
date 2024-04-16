
//계좌번호
String.prototype.acountNoFormatting = function() {
	
	var result = this.getNumber();
	if(5 < result.length) {
		
		result = result.substr(0,3)+"-"+result.substr(3,2)+"-"+result.substr(5,2)+"-"+result.substr(7);
	}
	
	return result;
};

//금액 포맷 추가
String.prototype.monyFormatting = function(option) {

	var result = "";
	
	if("-" === this.substr(0,1)) {
		result = "-";
	}
	
	var data =  this.split(".");
	var number = data[0].getNumber();

	//올림
	if("ceil" === option || 1 === option) {
		
		if(data[1] && data[1].getNumber() ) {
			number = number+"."+data[1].getNumber();
		}
		
		number = (Math.ceil(number*1))+"";
		result = result + number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
	} 
	//버림
	else if("floor" === option || 2 === option) {
		
		if(data[1] && data[1].getNumber() ) {
			number = number+"."+data[1].getNumber();
		}
		
		number = (Math.floor(number*1))+"";
		result = result + number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
	} 
	//반올림
	else if("round" === option || 3 === option) {
		
		if(data[1] && data[1].getNumber() ) {
			number = number+"."+data[1].getNumber();
		}
		
		number = (Math.round(number*1))+"";
		result = result + number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
	} else {
		
		if(data[1] && data[1].getNumber() ) {
			result = result + number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + "." + data[1].getNumber(); 
		} else {
			result = result + number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
		}
	}
	
	return result; 
};

//숫자만
String.prototype.getNumber = function() {
	
	return this.replace(/[^0-9]/g,'');
};

Number.prototype.monyFormatting = function(option) {
	var data = this+"";
	
	return data.monyFormatting(option);
};

/*
 * option >> yyyymmdd, yyyymm, yyyy
 * division >> -, / 
 */
Date.prototype.formatDate = function(option, division) {
	
	var result = "";
	if(!division) division = "";
	
	if(4 === option.length) {
		
		result += this.getFullYear();
	} else if(6 === option.length) {
		
		var month = 1 === String(this.getMonth()+1).length ? '0'+(this.getMonth()+1) : (this.getMonth()+1);
		result += this.getFullYear() + division + month;
	} else if(8 === option.length) {
		
		var month = 1 === String(this.getMonth()+1).length ? '0'+(this.getMonth()+1) : (this.getMonth()+1);
		var day = 1 === String(this.getDate()).length ? '0'+this.getDate() : this.getDate();
		result += this.getFullYear() + division + month + division + day;
	}
	
	return result;
};

var Hp_commonFunc = ({
	
	//브라우져에서 디바이스 구분
	getUserDevice : function() {
		
		var result = "";
		
		var userAgent = navigator.userAgent.toLowerCase();
		
		if("android".indexOf(userAgent) !== -1) {
			
			result = "android";
		} 
		else if("iphone,ipad,ipod".indexOf(userAgent) !== -1) {
			
			result = "ios";
		}
		else {
			
			result = "pc";
		}
		
		return result;
	},
	
});


var UiFunc = ({
	 addAgreementAllLayer : function(){
	    	$('#agreementallLayer .con').each(function(){
				var agreeNum = $(this).attr('data');
	    		$(this).html( $('#'+agreeNum).html() );
	    	});
	    	//선택약관 전체선택관련 20210621
	    	$('#agreementChallLayer .con').each(function(){
				var agreeNum = $(this).attr('data');
	    		$(this).html( $('#'+agreeNum).html() );
	    	});
 	 },  
});

var JusoUtil = ({
	
	successJusoCallBack : function(){}, 
	failJusoCallBack : function(){},
	
	openJusoPopup : function( param , successFunc, failFunc , isMobile ){
		
		if( typeof param === "undefined" ){
			param = {};
		}
		
		if( typeof successFunc === "function" ){
			JusoUtil.successJusoCallBack = successFunc;
		}
		
		if( typeof failFunc === "function" ){
			JusoUtil.failJusoCallBack = failFunc;
		}
		
		var isMobile = isMobile;
		
		//window.open('?step=1', "pop", "width=570,height=420, scrollbars=yes, resizable=yes");
		var url = '/portal/juso_popup?step=1&isMobile=' + isMobile;
		UtilFunc.popupWindow(url, "주소찾기", "570", "420" );
		
	},
	
});

$(document).ready(function(){

	//한글만 입력..
    $('input ').each(function(){
        
    	var _option = $(this).attr('option');
    	
    	if("onlyKr" == _option) {
    		var $that = $(this); 
    		var isComposing = false;
    		var hasCompositionJustEnded = false;
    		
    		$that.keyup(function(e) {
    			//console.log("keyup");
    			if(isComposing || hasCompositionJustEnded) {
    				hasCompositionJustEnded = false;
        			return;
    			}
    			
    			var inputVal = $that.val();
    			//console.log(inputVal);
    			$that.val(inputVal.replace(/[^(ㄱ-힣a-zA-Z)]/gi,''));
    		});
    		
    		$that.on("compositionstart", function(e) {
    			//console.log("compositionstart");
    			isComposing = true;
    		})
    		.on("compositionend", function(e) {
    			//console.log("compositionend");
    			isComposing = false;
    			hasCompositionJustEnded = true;
    		})
    		.on("keydown", function(e) {
    			//console.log("keydown");
    			if(e.which !== 229) {
    				hasCompositionJustEnded = false;
    			}
    		});
    	} else if("onlyNum" == _option) {
    		var $that = $(this); 
    		
    		$that.keyup(function(e) {
    			var inputVal = $that.val();
    			$that.val(inputVal.replace(/[^0-9]/g,''));
    		});
    		
    		$that.on("change", function(e) {
    			var inputVal = $that.val();
    			$that.val(inputVal.replace(/[^0-9]/g,''));
    		})
    	}

    });
	
});



