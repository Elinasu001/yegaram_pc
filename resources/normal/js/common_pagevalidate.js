/* 예가람저축은행금융플랫폼 기본 js
 * */

/**
 *  PageValidate
 *  + 입력항목에 대한 기본적인 Validate 기능 
 */
var PageValidate = (function(PageValidate) {
	/* validate  실행 */
	PageValidate.validate = function(rules) {
		var result = { result : true, fields : [], alert : function() {
			if(this.fields.length <= 0) return;
			var _this = this;
			customAlert({title : '안내', message : this.fields[0].field + this.fields[0].message }, function() {
				
				var focusid = _this.fields[0].focus ? '.' + _this.fields[0].focus : '#' + _this.fields[0].id;
				focusid = (_this.fields[0].type == 'radio' ? 'input[name="' + _this.fields[0].id + '"]:eq(0)' : focusid);
				
				var offset = $(focusid).offset();
				if(offset) {
					$('html, body').animate({scrollTop: offset.top - 80}, 400, function(){
						if(!$(focusid).is(":visible")){
							$(focusid).show().focus().hide();
						}else{
							$(focusid).focus();
						}
					});
				}else {
					if(!$(focusid).is(":visible")){
						$(focusid).show().focus().hide();
					}else{
						$(focusid).focus();
					}
				}
				
			});
		}, focus: function() {
			if(this.fields.length <= 0) return;
			location.href = '#' + _this.fields[0].id + "_fc";
		}};
		
		// rules : 
		//   {id : 'ssn2',	fieldName : '주민등록번호',	validate : [ 'NotNull' ],	message : '를 입력해주세요.', length : '7'},
		//   ...
		$.each(rules, function() {
			var ruleArray = this.validate;
			var value = this.type == 'radio' ? $('[name="' + this.id + '"]:checked').val() : $('#' + this.id).val();
			if(this.date != undefined) {
				
				var temp = true;
				if(value == null || value == '') {
					temp = false;
				}else if(this.date == 'YYYYMMDD') {
					if(value.length != 8 || new Date([value.substr(0, 4), value.substr(4, 2), value.substr(6)].join('-')) == 'Invalid Date') {
						temp = false;
					}
				}else if(this.date == 'YYMMDD'){
					// 2개 날짜형식중 하나라도 맞으면 성공.
					if(value.length != 6 || 
							new Date(['19' + value.substr(0, 2), value.substr(2, 2), value.substr(4)].join('-')) == 'Invalid Date' ||
							new Date(['20' + value.substr(0, 2), value.substr(2, 2), value.substr(4)].join('-')) == 'Invalid Date') {
						temp = false;
					}
				}
				
				if(!temp) {
					result.fields.push({
						id: this.id,
						field : this.fieldName,
						focus : this.focus,
						click : this.click,
						type : this.type,
						message : this.message ? this.message : ruleObj.message
					});
					result.result = false;
				}
			}
			
			for(var index in ruleArray) { // validate : [ 'NotNull' ]
				var rule = ruleArray[index]; // ruleArray
				var ruleObj = ruleMap[rule]; // ruleMap['Number']

				
				if(typeof ruleObj == 'undefined' || typeof ruleObj.func != 'function') {
					continue;
				}
				
				if(ruleObj.func.call(this, value)) {
					result.result = false;
				}else if(this.length) { // 길이체크.
					var temp = this.length.split('-');
					if(temp.length == 1) {
						var length = temp[0] == '' ? 0 : Number(temp[0]);
						if(value.length != length) {
							result.result = false;
						}
					}else if(temp.length == 2) {
						// 값이 없을경우 최소 0, 최대 1000.
						var minLength = temp[0] == '' ? 0 : Number(temp[0]);
						var maxLength = temp[1] == '' ? 1000 : Number(temp[1]);
						if(value.length < minLength || value.length > maxLength) {
							result.result = false;
						}
					}
				}
				if(!result.result) {
					result.fields.push({
						id: this.id,
						field : this.fieldName,
						focus : this.focus,
						click : this.click,
						type : this.type,
						message : this.message ? this.message : ruleObj.message
					});
				}
			}
		});
		return result;
	};
	/* null 체크 */
	PageValidate.isNull = function(data) {
		return data == null || data.length == 0 ? true : false;
	};
	/* 숫자 체크 */
	PageValidate.isNumber = function(data) {
		var pattern = /^[0-9]+$/;
		return !pattern.test(data);
	};
	/* 전화번호 체크 */ 
	PageValidate.isTelNo = function(data) {
		//var pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
		var pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		return !pattern.test(data);
	};
	/* 휴대폰 체크 */ 
	PageValidate.isMobileNo = function(data) {
		var pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		return !pattern.test(data);
	};
	/* 일자 체크 */ 
	PageValidate.isDate = function(data) {
		var pattern = /^\d{4}-\d{2}-\d{2}$/;
		return !pattern.test(data);
	};
	/* 검색기간 체크 */ 
	PageValidate.searchDate = function(obj1,obj2) {
		return obj2 < obj1 ? false : true;
	};
	/* 이메일 체크 */
	PageValidate.isNotEmail = function(data) {
		//return ! /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/.test( data );
		return ! /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test( data );
	};
	/* 아이디 체크 */
	PageValidate.isNotValidId = function(val) {
		return ! /^[a-zA-Z]{1}[_0-9a-zA-Z-]{3,}$/.test( val );
	};
	/* IP 체크 */
	PageValidate.isNotValidIp = function(val) {
		return ! /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test( val );
	};
	PageValidate.isNotValidSSN = function(val) {
		var pattern = /^\d{6}-\d{7}$/;
		return !pattern.test(val);
	};
	PageValidate.isNotValidChar = function(val) {
		var pattern = /^[a-zA-Z가-힣 ]*$/;
		return !pattern.test(val);
	};
	PageValidate.isNotValidEmailFront = function(val) {
		var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/;
		return !pattern.test(val);
	};
	/* 주민번호 앞자리 */
	PageValidate.isjumin1 = function(val) {
		var jumin1 = val.getNumber();
		6 === jumin1.length ? false : true;
		var yy = jumin1.substring(0,2);
		var mm = jumin1.substring(2,4);
		var dd = jumin1.substring(4,6);
		if(yy < "00" || yy > "99" || mm < "01" || mm > "12" || dd < "01" || dd > "31"){
			return true;
		}
		return false;
	};
	/* 생년월일 */
	PageValidate.isBirth = function(val) {
		var pattern = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
		return !pattern.test(val);
	};
	/* 미래날짜 */
	PageValidate.NotFuture = function(val) {
		if(val.length != 8) return false;
		return val.substring(0,8) > UtilFunc.getCurrentDttm().substring(0,8);
	};
	
	/* validate rule */
	var ruleMap = {
		  'NotNull' : {func : PageValidate.isNull, message : '을(를) 입력하세요' }
		, 'Number' : {func : PageValidate.isNumber, message : '을(를) 숫자로 입력하세요' }
		, 'TelNo' : {func : PageValidate.isTelNo, message : '을(를) 올바르게 입력하세요.' }
		, 'Date' : {func : PageValidate.isDate, message : '을(를) 올바르게 입력하세요.<br>(날짜(yyyy-mm-dd)를 입력하세요)'}
		, 'Email' : {func : PageValidate.isNotEmail, message : '을(를) 올바르게 입력하세요.<br>(이메일형식)'}
		, 'ID' : {func : PageValidate.isNotValidId, message : '을(를) 올바르게 입력하세요.<br>(영문으로 시작, 8자이상)'}
		, 'IP' : {func : PageValidate.isNotValidIp, message : '을(를) 올바르게 입력하세요.<br>(ex. 127.0.0.1)'}
		, 'SSN' : {func : PageValidate.isNotValidSSN, message : '을(를) 올바르게 입력하세요.' }
		, 'Char' : {func : PageValidate.isNotValidChar, message : '을(를) 올바르게 입력하세요.' }
		, 'MobileNo' : {func : PageValidate.isMobileNo, message : '을(를) 올바르게 입력하세요.' }
		, 'isjumin1' : {func : PageValidate.isjumin1, message : '을(를) 올바르게 입력하세요.' }
		, 'Birth' : {func : PageValidate.isBirth, message : '을(를) 올바르게 입력하세요.' }
		, 'NullCheck' : {func : PageValidate.isNull, message : '을(를) 선택하세요' }
		, 'NotFuture' : {func : PageValidate.NotFuture, message : '이(가) 현재날짜보다 미래 입니다.' }
	};
	return PageValidate;
})(window.PageValidate || {});


