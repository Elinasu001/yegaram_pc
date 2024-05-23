/* 예가람저축은행금융플랫폼 기본 js
 * */

$.extend($.validator.messages, {
    required: '\ud544\uc218\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
    remote: "Please fix this field.",
    email: '\uc774\uba54\uc77c \uc8fc\uc18c\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
    url: 'URL \uc8fc\uc18c\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
    date: "Please enter a valid date.",
    dateISO: '\u2018\uc5f0\ub3c4\u2013\uc6d4\u2013\uc77c\u2019 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc5ec \uc8fc\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4.',
    number: '\uc22b\uc790\ub9cc \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
    digits: '\uc22b\uc790(digits)\ub9cc \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
    creditcard: "Please enter a valid credit card number.",
    equalTo: '\uac12\uc774 \uc11c\ub85c \ub2e4\ub985\ub2c8\ub2e4.',
    maxlength: '{0}\uae00\uc790 \uc774\uc0c1\uc740 \uc785\ub825\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.',
    minlength: $.validator.format('\uc801\uc5b4\ub3c4 {0}\uae00\uc790\ub294 \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
    rangelength: $.validator.format('{0}\uae00\uc790 \uc774\uc0c1 {1}\uae00\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.'),
    range: $.validator.format('{0}\uc5d0\uc11c {1} \uc0ac\uc774\uc758 \uac12\uc744 \uc785\ub825\ud558\uc138\uc694.'),
    max: $.validator.format('{0} \uc774\ud558\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.'),
    min: $.validator.format('{0} \uc774\uc0c1\uc73c\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.')
});
$.extend($.validator.prototype, {
    defaultMessage : function( element, method ) {
        var fieldName = this.settings.names[element.name] + ' \ud56d\ubaa9\uc740 '
        return this.findDefined(
            this.customMessage( element.name, method ),
            this.customDataMessage( element, method ),
            // title is never undefined, so handle empty string as undefined
            !this.settings.ignoreTitle && element.title || undefined,
            fieldName + $.validator.messages[ method ],
            "<strong>Warning: No message defined for " + element.name + "</strong>"
        );
    }
    /* name array check */
    , checkForm : function() {
        this.prepareForm();
        for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
            if (this.findByName( elements[i].name ).length != undefined && this.findByName( elements[i].name ).length > 1) {
                for (var cnt = 0; cnt < this.findByName( elements[i].name ).length; cnt++) {
                    this.check( this.findByName( elements[i].name )[cnt] );
                }
            } else {
                this.check( elements[i] );
            }
        }
        return this.valid();
    }
});

/* jquery validate wrapper */
$.fn.extend({
    titoValidate : function(options) {
        options = typeof options == 'undefined' ? {} : options;
        var param = {
                  rules : options.rules || {}
                , names : options.names || {}
                , messages : options.messages || {}
                , onkeyup:false
                , onclick:false
                , onfocusout:false
                , ignoreTitle: false
                , showErrors:function(errorMap, errorList) {
                    if(!$.isEmptyObject(errorList)) {
                        alert(errorList[0].message);
                        errorList[0].element.focus();
                        return false;
                    }
                }
        };
        var validate = this.validate(param);
        validate.resetForm();
    }
});

/* 달력 한글설정 */
jQuery(function($){
     $.datepicker.regional['ko'] = {
            closeText: '닫기'
          , prevText: '이전'
          , nextText: '다음'
          , currentText: '오늘'
          , monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
          , monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12']
          , dayNames: ['일','월','화','수','목','금','토']
          , dayNamesShort: ['일','월','화','수','목','금','토']
          , dayNamesMin: ['일','월','화','수','목','금','토']
          , weekHeader: 'Wk'
          , dateFormat: 'yy-mm-dd'
          , firstDay: 0
          , isRTL: false
          , showMonthAfterYear: true
          , yearSuffix: ''
          , changeYear: false
          , changeMonth: false
          , showButtonPanel: false
     };
     
     $.datepicker.setDefaults($.datepicker.regional['ko']);
});

var validator = (function(validator) {
    /**
     * 날자 체크
     * @param srtDt 시작일 yyyy-mm-dd
     * @param endDt 종료일 yyyy-mm-dd
     * @returns false : 에러, true : 정상
     */
    validator.dateCheck = function(srtDt, endDt) {
        var arySrtDt = srtDt.split("-");
        var aryEndDt = endDt.split("-");

        var startDt = new Date(Number(arySrtDt[0]),Number(arySrtDt[1])-1,Number(arySrtDt[2]));
        var endDt   = new Date(Number(aryEndDt[0]),Number(aryEndDt[1])-1,Number(aryEndDt[2]));
        resultDt    = Math.floor(endDt.valueOf()/(24*60*60*1000)- startDt.valueOf()/(24*60*60*1000));
     
        return resultDt < 0 ? false : true;
    };
    /* 이미지 파일 확장자 체크 */
    validator.isAvailableImgExt = function() {
        var extensionArray = ['JPG','JPEG','GIF','PNG','BMP'];
        return availableExtCheck(extensionArray);
    };
    /* 자료실 파일 확장자 체크 */
    validator.isAvailablePdsExt = function() {
        var extensionArray = ['JPG','JPEG','GIF','PNG','BMP','PDF','XLS','XLSX','PPT','PPTX','HWP','ZIP','DOC','DOCX'];
        return availableExtCheck(extensionArray);
    };
    /* 이메일 체크 */
    validator.isEmailAddress = function(value) {
        return /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/.test( value );
    }
    /* 파일 확장자 체크 */
    function availableExtCheck(extensionArray) {
        var errorMessage = '업로드는 ' + extensionArray.join(' ') + ' 파일만 가능합니다.';
        var result = true;
        $('[type="file"]').each(function(idx, item) {
            if($(item).val() == '') {
                return true;    // continue
            }
            var ext = $(item).val().slice($(item).val().lastIndexOf(".") + 1).toUpperCase();
            if($.inArray(ext, extensionArray) == -1) {
                alert(errorMessage);
                result = false;
                $(item).focus();
                return false;   // break;
            }
        });
        return result;
    }
    
    return validator;
})(window.validator || {});


/**
 *  PageValidate
 *  + 입력항목에 대한 기본적인 Validate 기능 
 */
var PageValidate = (function(PageValidate) {
	/* validate  실행 */
	PageValidate.validate = function(rules) {
		var result = true;
		//$.each(formValidate, function() {
		$.each(rules, function() {
			var ruleArray = this.validate;
			for(var index in ruleArray) {
				var rule = ruleArray[index];
				var ruleObj = ruleMap[rule];
				if(typeof ruleObj == 'undefined' || typeof ruleObj.func != 'function') {
					continue;
				}
				var value = this.type == 'radio' ? $('[name="' + this.id + '"]:checked').val() : $('#' + this.id).val();
				if(ruleObj.func.call(this, value)) {
					if( LayerFunc.alert === undefined ) 
						alert(this.fieldName + ruleObj.message);
					else 
						LayerFunc.alert(this.fieldName + ruleObj.message);
					result = false;
					return false;		// break;
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
	/* 전화번호 체크 */ //2016.03.30 자리수체크수정 이수지
	PageValidate.isTelNo = function(data) {
		var pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
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
	/* validate rule */
	var ruleMap = {
		  'NotNull' : {func : PageValidate.isNull, message : '을(를) 입력하세요' }
		, 'Number' : {func : PageValidate.isNumber, message : '을(를) 숫자로 입력하세요' }
		, 'TelNo' : {func : PageValidate.isTelNo, message : '을(를) 올바르게 입력하여 주세요.(숫자, - 를 포함한 숫자만 입력하세요)'}
		, 'Date' : {func : PageValidate.isDate, message : '을(를) 올바르게 입력하여 주세요.(날짜(yyyy-mm-dd)를 입력하세요)'}
	};
	return PageValidate;
})(window.PageValidate || {});

