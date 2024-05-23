var winH2 = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
$(window).scroll(function() {
    var bodyH = $('body, html').outerHeight() - $('#footerWrap').outerHeight() - winH2;
    var wScroll = $('body, html').scrollTop();
    if (bodyH < wScroll) {
        $('.btn-top').addClass('btnbtm');
    } else {
        $('.btn-top').removeClass('btnbtm');
    }
});
$(document).on('click', '.btn-top', function(e) {
    e.preventDefault();
    $('body, html').animate({
        scrollTop: 0
    }, 450);
});
//문자열자르기
function cutByLen(str, maxByte) {
    for (b = i = 0; c = str.charCodeAt(i);) {
        b += c >> 7 ? 2 : 1;
        if (b > maxByte)
            break;
        i++;
    }
    return str.substring(0, i);
}
// 접근성 관련 포커스 강제 이동
function accessibilityFocus() {
    $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e) {
        var next = $(e.target).attr('data-focus-next'),
            prev = $(e.target).attr('data-focus-prev'),
            target = next || prev || false;
        if (!target || e.keyCode != 9) {
            return;
        }
        //console.log('next : '+next+'\nprev : '+prev);
        if ((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) {
            setTimeout(function() {
                //console.log('target : '+target);
                $('[data-focus="' + target + '"]').focus();
            }, 1);
        }
    });
}

function tooltip() {
    var openBtn = '[data-tooltip]',
        closeBtn = '.tooltip-close';

    function getTarget(t) {
        return $(t).attr('data-tooltip');
    }

    function open(t) {
        var showTarget = $('[data-tooltip-con="' + t + '"]');
        showTarget.show();
        layerOpenFunc(showTarget);
        showTarget.focus();
        showTarget.find('.tooltip-close').data('activeTarget', t);
        //$(window).scrollTop(0);
    }

    function close(t) {
        var activeTarget = $('[data-tooltip-con="' + t + '"]');
        activeTarget.hide();
        if(t != 'changeList-layer'){        	
        	$('[data-tooltip="' + t + '"]').focus();
        }
        deleteBlock();

        /* 레이어팝업이 중복으로 뜰때*/
        if ($('.layerpopup:visible').length > 1) {
            addBlock();
        }
        if(btnFocusTaget !=""){
        	$(btnFocusTaget).focus();
        }
    }
    $(document).on('click', openBtn, function(e) {
        e.preventDefault();
        open(getTarget(e.target));
    }).on('click', closeBtn, function(e) {
        e.preventDefault();
        close($(this).data('activeTarget'));
    });
}
//레이어팝업 높이 판단하여 block와 position 컨트롤
function layerOpenFunc(_target,prodOpen) {
    layerHeight();

    if (_target.outerHeight() > $(window).height()) {
        _target.css({
            'position': 'absolute',
            'top': '50px',
            'left': getCenterAlignPos($(window).width(), _target.outerWidth())
        });
        addBlock('full');
    } else {
        _target.css({
            'position': 'fixed',
            'top': getCenterAlignPos($(window).height(), _target.outerHeight()),
            'left': getCenterAlignPos($(window).width(), _target.outerWidth())
        });
        addBlock();
    }
    
    var streamdocsAdd = $("#streamdocsAdd").val();

    /* 약관전체보기 팝업 */
    if ($('#agreementallLayer:visible').length == 1) {
        var ctsTotal = $('#agreementallLayer .con').length;
        var idx = $('#agreementallLayer .con').index();
        var allLayerTextVal
        $('#agreementallLayer .con').hide();
        $('#agreementallLayer .con').eq(idx - 1).show();

        $('.all-agree .total').html(ctsTotal);
        $('.all-agree .view').html(idx);

        $('.ctrl-box button').click(function() {
        	
        	var ifreamId;
        	
            if ($(this).hasClass('btn-next')) {
                if (idx < ctsTotal) {
                	//20211214 약관 PDF 적용 
                	var divId = essentialItemArry[idx];
                	
                	if(divId !=""){
	                	var viewerElement = document.getElementById("viewerAllL"+idx); 
	        			/*var streamdocs = new StreamDocs({
	        				element : viewerElement,
	        			});*/
						var value = $("#"+divId+"").find("button").val();
						var nameValue = $("#"+divId+"").find("button").parent().find("label").find("span").text();//20220727 pdfview title추가
						if(nameValue == ""){
							nameValue = $("#"+divId+"").find("button").parent().find("label").text();//20220727 한도조회
						}
						var scale=119;
						
						//$("#viewerAllL"+idx+"").attr("src",streamdocsAdd+value);//pdf관련 원본 20220808
						$("#viewerAllL"+idx+"").attr("src","/resources/pdfjs-2/web/viewer.html?file=/resources/pdfjs-2/"+value);
						$("#viewerAllL"+idx+"").attr("title",nameValue);//20220727 pdfview title추가
						/*streamdocs.document.open().then(function(){
							streamdocs.viewer.setScale({scale:119});
						});*/
    				}
                	
                    idx++;
                    $('.all-agree .view').html(idx);
                    $('#agreementallLayer .con').hide();
                    $('#agreementallLayer .con').eq(idx - 1).show();
                }
            } else {
                if (idx > 1) {
                	
                    idx--;
                    //20211214 약관 PDF 적용 
                    var viewerElement = document.getElementById("viewerAllL"+(idx-1)); 
        			/*var streamdocs = new StreamDocs({
        				element : viewerElement,
        			});*/
        			//streamdocs.viewer.setScale({scale:119});
        			
                    $('.all-agree .view').html(idx);
                    $('#agreementallLayer .con').hide();
                    $('#agreementallLayer .con').eq(idx - 1).show();
                }
            }
            idx = idx;
        });
        
    }
    
    //선택약관 전체선택관련 20210621
    if ($('#agreementChallLayer:visible').length == 1) {
        var ctsTotal = $('#agreementChallLayer .con').length;
        var idx = $('#agreementChallLayer .con').index();

        $('#agreementChallLayer .con').hide();
        $('#agreementChallLayer .con').eq(idx - 1).show();

        $('.all-agree .total1').html(ctsTotal);
        $('.all-agree .view1').html(idx);

        $('.ctrl-box button').click(function() {
            if ($(this).hasClass('btn-next')) {
                if (idx < ctsTotal) {
                	//20211214 약관 PDF 적용 
                	
        			var divId = optinItemArry[idx];
    				
                	if(divId !=""){
	                	var viewerElement = document.getElementById("viewerChallL"+idx); 
	        			/*var streamdocs = new StreamDocs({
	        				element : viewerElement,
	        			});*/
						var value = $("#"+divId+"").find("button").val();
						var nameValue = $("#"+divId+"").find("button").parent().find("label").find("span").text();//20220727 pdfview title추가
						if(nameValue == ""){
							nameValue = $("#"+divId+"").find("button").parent().find("label").text();//20220727 한도조회
						}
						var scale=119;
						
						//$("#viewerChallL"+idx+"").attr("src",streamdocsAdd+value);//pdf관련 원본 20220808
						$("#viewerChallL"+idx+"").attr("src","/resources/pdfjs-2/web/viewer.html?file=/resources/pdfjs-2/"+value);
						$("#viewerChallL"+idx+"").attr("title",nameValue);//20220727 pdfview title추가
						/*streamdocs.document.open().then(function(){
							streamdocs.viewer.setScale({scale:119});
						});*/
    				}
                	
                    idx++;
                    $('.all-agree .view1').html(idx);
                    $('#agreementChallLayer .con').hide();
                    $('#agreementChallLayer .con').eq(idx - 1).show();
                }
            } else {
                if (idx > 1) {
                	idx--;
                	//20211214 약관 PDF 적용 
                	var viewerElement = document.getElementById("viewerChallL"+(idx-1)); 
        			/*var streamdocs = new StreamDocs({
        				element : viewerElement,
        			});*/
        			//streamdocs.viewer.setScale({scale:119});
                    
                    $('.all-agree .view1').html(idx);
                    $('#agreementChallLayer .con').hide();
                    $('#agreementChallLayer .con').eq(idx - 1).show();
                }
            }
            idx = idx;
        });
        
    }
    

    //레이어팝업 iscroll
    if (_target.outerHeight() == $(window).height() - 110) {
        //_target.find('button.btn-normal').parents('.btn-wrap').css('padding-bottom',60);
        var popNum = _target.attr('id');
        var myScroll = new IScroll('#' + popNum, {
            scrollbars: true,
            mouseWheel: true,
            disableMouse: true,
            interactiveScrollbars: true,
            preventDefault: false,
            bounce: false,
        });
        $('.ctrl-box button').click(function() {
            setTimeout(function() {
                myScroll.refresh();
            }, 100);
        });
        
    }

    /* 레이어팝업이 중복으로 뜰때 */
    if ($('.layerpopup:visible').length > 1) {
        $('.block:nth(0)').css('z-index', 30);
    }
}
//block
function addBlock(_full) {

    $('html').css('overflow', 'hidden');
    if (_full == 'full') {
        $('body').append('<div class="block"></div>').css({
            'height': $('document').outerHeight,
            'position': 'absolute'
        });
        //$('body, html').scrollTop(0);
    } else {
        //$('body').append('<div class="block"></div>').css({'height': '100%', 'overflow': 'hidden'});
        $('body').append('<div class="block"></div>');
        //$('body, html, #wrap').css({'overflow': 'hidden','height': winH2});
    }
    $('.block').fadeIn(300);
    $('.block').on('click', function() {
        /* 알림팝업창 일때, 로딩팝업 일때 */
        if ($('.layerpopup:visible').hasClass('alert-layer') == 0 && $('.loading-layer:visible').length == 0) {
            if ($('.block').length > 0) {
                $('.block').fadeOut(300).empty().remove();
                $('.layerpopup').fadeOut(300);
            }

            $('body, html, #wrap').css({
                'height': '',
                'overflow': ''
            });
            if ($(this).hasClass('menu-open')) {
                $('.menu-close').click();
            }
        }
    });
    $('.close').on('click', function() {
        $('.block').trigger('click');
    });
}

function deleteBlock() {
    $('.block').fadeOut(300);
    $('.block').detach();
    $('body, html, #wrap').css({
        'height': '',
        'overflow': ''
    });
}
//popup
function openPopup(id,prodOpen) {
    var _target = $('#' + id);
    _target.fadeIn(300);
    layerOpenFunc(_target,prodOpen);
    _target.focus();
    _target.find('.btn-menu-close, .tooltip-close').on('click', function() {
        closePopup(id);

        /* 레이어팝업이 중복으로 뜰때 */
        if ($('.layerpopup:visible').length > 1) {
            $(this).parent('.layerpopup').hide();
            $('.layerpopup').css('z-index', 20);
            addBlock();
        }
    });
}

function closePopup(id) {
    deleteBlock();
    $('#' + id).fadeOut(300);
}

jQuery(function($) {
    /* Checkbox  */
    //var checkBox = $('.ctm-check');
    var addClassCheckBox = function($input) {
        if ($input.prop('checked')) {
        	//console.log("checked");
            $input.parent().addClass('checked');
            $input.attr("checked", true);
            $input.prop("checked", true);
        } else {
        	//console.log(" not checked");
            $input.parent().removeClass('checked');
            $input.attr("checked", false);
            $input.prop("checked", false);
        }
    };
    $(document).on('change', '.ctm-check input', function() {
        addClassCheckBox($(this));
    });

    /* radio */
    var Radio = $('.ctm-radio');
    var addClassRadio = function($input) {
        var tname = $input.attr("name");
        $('input[type=radio]').each(function(){
            if( tname == $(this).attr("name") ){
                $(this).parent().removeClass('checked');
                $(this).prop("checked", false);
                $(this).attr("checked", false);
            }
        });
        $input.parent().addClass('checked');
        $input.prop("checked", true);
        $input.attr("checked", true);
    };
    $(document).on('change', '.ctm-radio input', function() {
        addClassRadio($(this));
    });
});

//radio, checkbox custom style
function setupLabel() {
    if ($('.check > input').length) {
        $('.check').each(function() {
            $(this).removeClass('c-on');
        });
        $('.check > input').each(function() {
            //$(this).prop('disabled',true);
            if ($(this).is(':checked')) {
                $(this).parent('label').addClass('c-on');
            } else {
                $(this).parent('label').removeClass('c-on');
            }
        });
    }
    if ($('.radio input').length) {
        $('.radio').each(function() {
            //$(this).removeClass('r-on'); //페이지 열리자마자 r-on이 없어져버려서 기본체크표시가 안됨
        });
        $('.radio input:checked').each(function() {
            if ($(this).parent().hasClass('focus')) {
                $(this).parent().siblings('.radio').removeClass('r-on');
                $(this).parent().addClass('r-on');

            }
        });

    }
}

/* selectbox */
 jQuery.fn.extend({
    selectbox: function(options) {
         return this.each(function() {
            new jQuery.SelectBox(this, options);
         });
    }
 });

/* pawel maziarz: work around for ie logging */
if (!window.console) {
    var console = {
        log: function(msg) {}
    };
}

$(document).ready(function() {
    //$('.select-wrap select').selectbox();
    $('.select-wrap select').selectmenu();
//    $('.ui-selectmenu-menu .ui-menu').attr({'role':'combobox'});
    $("body").on("click", ".check", function(e) {
        if ($(this).find('input').is(':checked')) {
            //$(this).find('input').prop("checked", false);
        } else {
            //$(this).find('input').prop("checked", true);
        }
        setupLabel();
    });
    $("body").on("click focus", ".radio", function(e) {
        setupLabel();
    });
    //setupLabel();
    
    var referrer = document.referrer;
    var nowUrl = document.URL
    var referrerCnt=0;
    var nowUrlCnt=0;
    var viewName = sessionStorage.getItem("VIEW_NAME");
    
	var addArray = ["/portal/civil_apply_list","/portal/civil_apply_detail","/portal/civil_apply_detail_edit","/portal/online_detail","/portal/online_detail_edit"];
	
	if(addArray.length > 0){
		for(var i=0; i <= addArray.length-1; i++ ){
			
			if(referrer.indexOf(addArray[i]) != -1){
				referrerCnt++;
			}
			if(nowUrl.indexOf(addArray[i]) != -1){
				nowUrlCnt++;
			}
		}
		
		if((referrerCnt > 0) && (nowUrlCnt==0)){
			sessionStorage.clear();
		}
	}
});

// select 삭제  function
function selClear(selId) {
    $(selId + "_input").remove();
    $(selId + '_container').remove();
}

//font Control
function fontPlus() {
    $('*').each(function() {
        var _fontSize = parseInt($(this).css('font-size')) * 1.1;
        //console.log(_fontSize);
        $(this).css({
            'font-size': _fontSize + "px"
        });
    });
}

function fontMinus() {
    $('*').each(function() {
        var _fontSize = parseInt($(this).css('font-size')) / 1.1;
        //console.log(_fontSize);
        $(this).css({
            'font-size': _fontSize + "px"
        });
    });
}

/**
 * 중앙정렬 위치
 * @param containerSize : 컨테이너의 크기
 * @param targetSize : 컨테이너에 들어 있는 오브젝트의 크기
 * @return
 */
function getCenterAlignPos(containerSize, targetSize) {
    var pos = (containerSize - targetSize) / 2;
    return pos;
}

/**
 * 해당 포인트를 기준으로 중간에 걸칠경우
 * @param centerPos : 기준선
 * @param targetSize : 오브젝트의 크기
 * @return
 *
 */
function getCenterPos(centerPos, targetSize) {
    var pos = centerPos - (targetSize / 2);
    return pos;
}

/**
 * 랜덤값 간단하게 뽑아오기
 * @param min : 가장 적은값
 * @param max  : 가장 높은값
 * @return
 *
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * 브라우저 종류 알기
 * if(getBrowser.name == "msie") { ... }
 *
 */
var getBrowser = (function() {
    var s = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
        /(trident)(?:.*rv:([\w.]+))?/.exec(s) ||
        /(msie) ([\w.]+)/.exec(s) ||
        /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) || [];
    return {
        name: match[1] || "",
        version: match[2] || "0"
    };
}());

/**
 * PC 인지 모바일인지 판단하기
 * return true : pc
 * return false : mobile
 *
 */
var isPc = (function() {
    var filter = "win16|win32|win64|mac";
    var isPc = true;

    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            //("모바일 기기에서 접속");
            return false;
        } else {
            //("PC에서 접속");
            return true;
        }
    }
});



/**
 * Input
 *
 */
$(document).ready(function() {
    var placeholderTarget = $('.input-box input[type="text"], .input-box input[type="password"]');

    //포커스시
    placeholderTarget.on('focus', function() {
        $(this).siblings('label').fadeOut('fast');
        $(this).siblings('span.fade').fadeOut('fast');
    });

    //포커스아웃시
    placeholderTarget.on('focusout', function() {
        if ($(this).val() == '') {
            $(this).siblings('label').fadeIn('fast');
            $(this).siblings('span.fade').fadeIn('fast');
        }
    });
});

//roll
jQuery(function() {
    var rollover = {
        newimage: function(src) {
            return src.substring(0, src.search(/(\.[a-z]+)$/)) + '_on' + src.match(/(\.[a-z]+)$/)[0];
        },
        oldimage: function(src) {
            return src.replace(/_on\./, '.');
        },
        init: function() {
            $('.roll').hover(
                function() {
                    $(this).attr('src', rollover.newimage($(this).attr('src')));
                },
                function() {
                    $(this).attr('src', rollover.oldimage($(this).attr('src')));
                });
        }
    };
    rollover.init();
});
//숫자 콤마
function addComma(data_value) {
    return Number(data_value).toLocaleString('en').split(".")[0];
}

function removeComma(data_value) { // 콤마제거
    if (typeof data_value == "undefined" || data_value == null || data_value == "") {
        return "";
    }
    var txtNumber = '' + data_value;
    var replaceNum = txtNumber.replace(/(,)/g, "")
    return parseInt(replaceNum);
}
//커스텀팝업
/**
 * customAlert
 * @param _option.title : 제목
 * @param _option.message : 내용
 * @param _option.type : confirm or anything
 * @param _callback1 : 확인버튼
 * @param _callback1 : 취소버튼
 * @return
 *
 */
function customAlert(_option, _callback1, _callback2) {
    var _html = "";
    _html += "<div id=\"customAlertLayer\" class=\"layerpopup alert-layer\">";
    _html += "<p class=\"title\">" + _option.title + "</p>";
    _html += "<hr>";
    _html += "<p class=\"message\">" + _option.message + "</p>";
    _html += "<div class=\"btn-wrap\">";
    _html += "<button type=\"button\" name=\"button\" class=\"btn-normal form c-confirm\">확인</button>";
    if (_option.type == "confirm") _html += "<button type=\"button\" name=\"button\" class=\"btn-normal form c-cancle\">취소</button>";
    _html += "</div>";
    _html += "</div>";
    $('body').append(_html.replace(/(\n|\r\n)/g, '<br>'));
    //$('.block').eq(0).remove(0);
    //addBlock("fixed");
    layerOpenFunc($('#customAlertLayer'));
    $('#customAlertLayer').show();
    $('#customAlertLayer button').focus();
    $('.block').eq(0).css('z-index', 30);
    $('.c-confirm').on('click', function() {
        if (typeof _callback1 === "function") {
        	customAlertDel();
            _callback1();
        }else{
        	customAlertDel();
        }
        
    });
    $('.c-cancle').on('click', function() {
        if (typeof _callback2 === "function") {
        	customAlertDel();
            _callback2();
        }else{
        	customAlertDel();
        }
      
    });

    function customAlertDel() {

        //deleteBlock("fixed");

        /* 레이어팝업이 중복으로 뜰때 */
        if ($('.layerpopup:visible').length == 1) {
            $('html').css('overflow', '');
        }
        $('.block').eq(0).fadeOut().empty().remove();
        $('#customAlertLayer').fadeOut().empty().remove();
    }
}

function addLoading(_type) {
    var _num = Math.floor(Math.random() * 2) + 1;
    var _html = "";
    _html += "<div id=\"loadingLayer\" class=\"loading-layer\">";
    _html += "<div class=\"progress-wrap \">";
    if (_type == "progress") {
        _html += "<div class=\"progress-bar \">";
        _html += "<span class=\"bar \"></span>";
        _html += "<img src=\"../../../resources/images/common/img_progressbar.png\" class=\"progressbar\">";
        _html += "</div>";
        _html += "<p class=\"txt \"><span class=\"current\">1</span>/<span class=\"total\">5</span></p>";
        _html += "</div>";
    }
    _html += "</div>";
    if ($('.loading-layer:visible').length != 0) {
        removeLoading();
    }
    $('body').append(_html);
    if (_type == "progress") {
        $("#loadingLayer").addClass('progress');
    }
    if (_num == 2) {
        $("#loadingLayer").addClass('type2');
    }
    $("#loadingLayer").animateSprite({
        fps: 5,
        loop: true,
        complete: function() {
            // use complete only when you set animations with 'loop: false'
            //alert("animation End");
        }
    });
    //$('html').addClass('scroll-y');
    layerOpenFunc($('#loadingLayer'));
    if ($('.layerpopup:visible').length < 1) {
        $('.block').eq(0).css('z-index', 30);
    }
    $('.block:last-child').css('z-index', 30);

}
//20180628 loading type추가 addLoading에 type progress 일때만 사용
function progressLoading(_currentNum, _totalNum) {
    var total = 100 / _totalNum;
    var current = _currentNum * total;
    $('#loadingLayer .progress-wrap .current').text(_currentNum);
    $('#loadingLayer .progress-wrap .total').text(_totalNum);
    $('#loadingLayer .progress-wrap .progress-bar .bar').width(current + "%");
}

function removeLoading() {
    $('#loadingLayer').fadeOut().empty().remove();
    //$('html').removeClass('scroll-y');
    if ($('.layerpopup:visible').length >= 1) {
        $('.block').eq(0).fadeOut().empty().remove();
    } else {
        deleteBlock();
    }
    $('.block:last-child').css('z-index', 10);

}
