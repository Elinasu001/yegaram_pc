var depth1, depth2, depth3;
var lnb;

$(document).ready(function() {
    tooltip();
    accessibilityFocus();
    // header / based on sitemapWrap
	
	/***
	* 예가람저축은행 금플개편사업 신규 추가
	***/
	// 탭
	$(".tab-item > li").click(function(){
		var tabCont = $(this).attr("data-tab");
		
		$(this).addClass("on").siblings().removeClass("on");

		$("#" + tabCont).addClass("on")
		$("#" + tabCont).siblings().removeClass("on");

	});
	
	

	
	
    //globalNav.init();

  //  $('.menu-wrap').on('mouseenter focusin', function() {
  //      $('.menu-wrap').addClass('open');
  //  }).on('mouseleave focusout', function() {
  //      $('.menu-wrap').removeClass('open');
  //  });

  //  $('.depth1 > a').on('mouseenter focusin', function() {
  //      $(this).addClass('active');
  //  }).on('mouseleave focusout', function() {
  //      $(this).removeClass('active');
  //  });

  //  $('.depth2 a').on('mouseenter focusin', function() {
  //      $(this).parents('.depth2').prev('a').addClass('active');
  //  }).on('mouseleave focusout', function() {
  //      $(this).removeClass('active');
  //      $('.depth1 a').removeClass('active');
  //  });

    //레이어팝업이 열렸을 경우 초점이 밖으로  안나가게
    // $('.layerpopup .btn-menu-close').on('focusin', function(){
    //     isFinal = true;
    // }).on('focusout', function(){
    //     isFinal = false;
    // });

    // var isFinal = false;
    // $('body').keydown(function (e) {
    //     if (e.keyCode == 9) {
    //         if(isFinal){
    //             //e.preventDefault();
    //             //$('.all-layer').focus();
    //         }
    //     }
    // });

    // select
    var select = $("select");
    if ($("select").length > 0) {
        $("select").each(function() {
            var select_name = $(this).children("option:selected").text();
            $(this).siblings("p").text(select_name);
        });
    }
    select.change(function() {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("p").text(select_name);
    });
    // accordion
    var currentFullNum = -1;
    var isOpen = false;
    $('.accordion li .question-wrap').attr('aria-expanded', 'false').attr('title', '닫힘');
    $(document).on('click', '.accordion li .question-wrap', function(e) {
        e.preventDefault();
        var num = $('.accordion > li').index($(this).parent());
        $('.accordion li').removeClass('active');
        
        $('.accordion li .question-wrap').attr('aria-expanded', 'false').attr('title', '닫힘');
        if (currentFullNum == num) {
            if (isOpen) {
                $('.accordion > li').removeClass('active');
                $('.accordion li .question-wrap').attr('aria-expanded', 'false').attr('title', '닫힘');
                $(this).next('.answer-wrap').slideUp('fast');
                isOpen = false;
            } else {
                $('.accordion > li').eq(num).addClass('active');
                /** 2021.08.31 웹접근성 수정
                title - '닫힘' >> '열림' 으로 수정,
                 선택자 '.accordion li' >>>> '.accordion > li' 로 변경, title - '닫힘' >> '열림' 으로 수정 **/
                $('.accordion > li').eq(num).find('.question-wrap').attr('aria-expanded', 'false').attr('title', '열림');
                $(this).next('.answer-wrap').slideDown('fast');
                isOpen = true;
            }
        } else {
            $('.accordion > li').not(':eq(' + num + ')').removeClass('active');
            $('.answer-wrap').slideUp('fast');
            $('.accordion > li').eq(num).addClass('active');
            /** 2021.08.31 웹접근성 수정
            선택자 '.accordion li' >>>> '.accordion > li' 로 변경, title - '닫힘' >> '열림' 으로 수정**/
            $('.accordion > li').eq(num).find('.question-wrap').attr('aria-expanded', 'true').attr('title', '열림');
            $(this).next('.answer-wrap').slideDown('fast');
            isOpen = true;
        }
        currentFullNum = num;
    });

    //faq 질문위치
    faqPosition();

    //unit-txt의 유무 판단하여 unit-txt의 위치와 input padding setting
    $('input').each(function(index) {
        if ($(this).siblings('.unit-txt').length) {
            //var _top = $(this).position().top;
            var _paddingRight = $(this).siblings('.unit-txt').outerWidth();
            //$(this).siblings('.unit-txt').css('top',_top);
            $(this).css('padding-right', _paddingRight);
        }
    });
    //top-banner
    $('.top-banner .btn-close').on('click', function() {
        $(this).parents('.top-banner').slideUp('fast');
    });

    //check/radio focus
    $("body").on('focusin', '.check', function() {
        $(this).addClass('focus');
    });
    $("body").on('focusout', '.check', function() {
        $(this).removeClass('focus');
    });

    $('.radio').on('focusin', function() {
        $(this).trigger('click');
        $(this).addClass('focus');
        $(this).addClass('r-on');
    });
    $('.radio').on('change', function() {
        $(this).parent('label').addClass('r-on');
    });
    $('.radio').on('focusout', function() {
        $(this).removeClass('focus');
        if (!$(this).find('input').is(':checked')) {
            $('.radio input').parent('label').removeClass('r-on');
        } else {
            $(this).find('input').parent('label').addClass('r-on');
        }
    });
    $('body').on('click', '.radio', function() {
        $(this).focus();
    });

    //선택약관 전체선택관련 20210621
    var itemsIdAry=['T000800003','T000800011','T000800014','T000800013','T000800016','T000800017','T000800022','T001000002'];

    //전체동의
    $('#all-check').on('click', function() {
    	if ($('#all-check').prop('checked')) {
            $('.agree-wrap .items-wrap').each(function(){
            	var itemsId = $(this).attr('id');
            	
            	if(itemsIdAry.indexOf(itemsId) == -1){ //선택약관 제외 20210621
            		$(this).find('.item-check > div > .ctm-check').addClass("checked");
            		$(this).find('.item-check > div > .ctm-check > input').prop("checked", true);
            		$(this).find('.btn-normal.tiny').addClass('done');
            		//sub동의
            		$(this).find('.guide-means').show();
            		$(this).find('.guide-means .ctm-check input').parent().addClass("checked");
            		$(this).find('.guide-means .ctm-check input').prop('checked', true);
            	}
            });
        } else {
            $('.agree-wrap .items-wrap').each(function(){
            	var itemsId = $(this).attr('id');
            	
            	if(itemsIdAry.indexOf(itemsId) == -1){ //선택약관 제외 20210621
            		$(this).find('.item-check > div > .ctm-check').removeClass("checked");
            		$(this).find('.item-check > div > .ctm-check > input').prop("checked", false);
            		
            		$(this).find('.guide-means').hide();
            		$(this).find('.guide-means .ctm-check input').prop('checked', false);
            	}
            });
        }
    });
 
	 $('#all-ch-check').on('click', function() {
	 	if ($('#all-ch-check').prop('checked')) {
	         $('.agree-wrap .items-wrap').each(function(){
	         	var itemsId = $(this).attr('id');

	         	if(itemsIdAry.indexOf(itemsId) != -1){ //선택약관 만 20210621
	         		$(this).find('.item-check > div > .ctm-check').addClass("checked");
	         		$(this).find('.item-check > div > .ctm-check > input').prop("checked", true);
	         		$(this).find('.btn-normal.tiny').addClass('done');
	         		//sub동의
	         		$(this).find('.guide-means').show();
	         		$(this).find('.guide-means .ctm-check input').parent().addClass("checked");
	         		$(this).find('.guide-means .ctm-check input').prop('checked', true);
	         	}
	         });
	     } else {
	         $('.agree-wrap .items-wrap').each(function(){
	         	var itemsId = $(this).attr('id');
	         	
	         	if(itemsIdAry.indexOf(itemsId) != -1){ //선택약관 만 20210621
	         		$(this).find('.item-check > div > .ctm-check').removeClass("checked");
	         		$(this).find('.item-check > div > .ctm-check > input').prop("checked", false);
	         		$(this).find('.guide-means .ctm-check').removeClass('checked');
	         		$(this).find('.guide-means .ctm-check input').prop('checked', false);
	         		$(this).find('.guide-means').hide();
	         	}
	         });
	     }
	 });
 
    $('.agree-wrap .item-check .ctm-check').on('click', function() {
        var allcnt = 0;
        var chkcnt = 0;
        var chAllCnt = 0;
        var chChkcnt = 0;
        $('.agree-wrap .items-wrap').each(function(){
        	var itemsId = $(this).attr('id');
        	if($("#"+itemsId+"").is(":visible")){
        		
        		if(itemsIdAry.indexOf(itemsId) == -1){ //선택약관 제외 20210621
        			allcnt++;
        			if($("#"+itemsId+"").find('.item-check .ctm-check input').prop('checked')){
        				chkcnt++;
        			}
        		}else{
        			chAllCnt++;
        			if($("#"+itemsId+"").find('.item-check .ctm-check input').prop('checked')){
        				chChkcnt++;
        			}
        		}
        	}
        });
        
        if (allcnt == chkcnt) {
            $('#all-check').prop('checked', true);
            $('#all-check').parent().addClass("checked");
        } else {
            $('#all-check').prop('checked', false);
            $('#all-check').parent().removeClass("checked");
        }
        
        if (chAllCnt == chChkcnt) { //선택약관 전체선택 20210621
            $('#all-ch-check').prop('checked', true);
            $('#all-ch-check').parent().addClass("checked");
        } else {
            $('#all-ch-check').prop('checked', false);
            $('#all-ch-check').parent().removeClass("checked");
        }
        
        if($(this).find("input").attr("id")){
        	if($(this).find("input").attr("id")=='agree6'||$(this).find("input").attr("id")=='agree31'||$(this).find("input").attr("id")=='agree26'||
        		$(this).find("input").attr("id")=='agree27'||$(this).find("input").attr("id")=='agree29'||$(this).find("input").attr("id")=='agree50'){
            	var guide_means = $(this).parent().parent().parent().parent().find('.guide-means');
                //sub동의
                if ($(this).find('input').is(':checked')) {
                	guide_means.show();
            		guide_means.find('.ctm-check').addClass('checked');
            		guide_means.find('input').prop('checked', true);
                } else {
                	guide_means.hide();
                	guide_means.find('.ctm-check').removeClass('checked');
                	guide_means.find('input').prop('checked', false);
                }
                
            }
        	
        	if($(this).find("input").attr("id")=='agree9'){
        		if ($(this).find('input').is(':checked')) {
        			$(".add_class2").show();
        			$(".add_class2").find('.ctm-check').addClass('checked');
        			$(".add_class2").find('.ctm-check').find('input').prop('checked', true);
        		}else{
        			$(".add_class2").hide();
        		}
        	}
        	
        	if($(this).find("input").attr("id")=='agree19'){
        		if ($(this).find('input').is(':checked')) {
        			$(".add_class_2").show();
        			$(".add_class_2").find('.ctm-check').addClass('checked');
        			$(".add_class_2").find('.ctm-check').find('input').prop('checked', true);
        		}else{
        			$(".add_class_2").hide();
        		}
        	}
        	
        }
        
    });

    //약관 sub동의
    $('.guide-means').each(function() {
        $(this).hide();
        var all = $(this).find('.guide-all');
        var subChk = $(this).find('.type').find('.ctm-check');

        all.on('click', function() {
        	checkSubTerms(this);
        	checkSubNon();
        });
        
        $('.agree7').on('click', function() {
        	checkSubTerms(this);
        	checkSubNon();
        });
		
		$('.agree37').on('click', function() {
        	checkSubNon();
        });
        
        $('.agree8').on('click', function() {
        	if ($(this).prop('checked')) {
    			$('.agree12').parent().addClass('checked');
    			$('.agree12').prop('checked',true);
    		}else{
    			$('.agree12').parent().removeClass('checked');
    			$('.agree12').prop('checked',false);
    		}
        	checkSubNon();
        });
        
        $('.agree12').on('click', function() {
        	if ($(this).prop('checked')) {
    			$('.agree8').parent().addClass('checked');
    			$('.agree8').prop('checked',true);
    		}else{
    			$('.agree8').parent().removeClass('checked');
    			$('.agree8').prop('checked',false);
    		}
        	checkSubNon();
        });

		$('.agree40').on('click', function() {
        	checkSubNon();
        });
		$('.agree43').on('click', function() {
        	checkSubNon();
        });
		$('.agree45').on('click', function() {
        	checkSubNon();
        });
		$('.agree51').on('click', function() {
        	checkSubNon();
        });
        subChk.on('click', function() {
            var allcnt = $(this).parent('.type').find('input').length;
            var chkcnt = $(this).parent('.type').find('input:checked').length;
            if (allcnt == chkcnt) {
                all.parent(".ctm-check").addClass('checked');
                all.prop('checked', true);
            } else {
                all.parent(".ctm-check").removeClass('checked');
                all.prop('checked', false);
            }
            if(chkcnt==0){
            	$('#agree7').parent().removeClass('checked');
            	$('#agree7').prop('checked', false);
            }else{
            	$('#agree7').parent().addClass('checked');
            	$('#agree7').prop('checked', true);
            }
            checkSubNon();
            /*if ( chkcnt != 0 ){
                $(this).parents('.guide-means').siblings('.guide-agree').find('input').prop('checked',true);
            } else {
                $(this).parents('.guide-means').siblings('.guide-agree').find('input').prop('checked',false);
            }*/
        });
    });

    //자세히팝업 클릭시(대출신청, 전자민원신청, 금리인하요구권, 온라인서류제출, 멤버십서비스)
    $('.agree-box .btn-normal.tiny, .agree-txt .btn-normal.tiny, .agree-area .btn-normal.tiny').attr('data', 'agree-more');
    var agreeBtn = '[data=agree-more]';
    $('body').on('click', agreeBtn, function() {
        $(this).addClass('done');
    });

    $('.all-agree').on('click', function() {
        if ($(this).find('input').is(':checked')) {
            $(this).parents('.agree-area').find('.btn-normal.tiny').addClass('done');
            if($('#agreementallLayer').is(":visible")){//선택약관 전체선택관련 20210621
            	allLayerOpenRadioSetting();
            }
        }
    });

    $('.all-chAgree').on('click', function() {
        if ($(this).find('input').is(':checked')) {
            //$(this).parents('.agree-chAgree').find('.btn-normal.tiny').addClass('done');
            if($('#agreementChallLayer').is(":visible")){//선택약관 전체선택관련 20210621
            	allLayerOpenRadioSetting();
            }
        }
    });
    
    //tab
    $('.tab-page').each(function() {
        var tab = $(this).find('li').children('a');
        var tabcon = $(this).find('.contents-area:visible');
        var tabconH = $(this).find('.contents-area:visible').height();
        $(this).css('padding-bottom', tabconH + 5);
        tab.on('click', function() {
            var tabconH2 = $(this).next('.contents-area').height();
            $(this).parents('.tab-page').css('padding-bottom', tabconH2 + 5);
            $(this).parent('li').siblings('li').removeClass('active');
            $(this).parent('li').addClass('active');
            $('.contents-area').hide();
            $(this).next('.contents-area').show();
        });
    });

    //약관 체크시 약관팝업 open
    /* 전체약관보기 팝업 */
    $('#agreementallLayer .con').each(function() {
        var agreeNum = $(this).attr('data');
        $(this).html($('#' + agreeNum).html());
    });
    /* 대출신청, 전자민원신청 */
    $('.items-wrap').each(function() {
        var chk = $(this).find('.item-check > div > .ctm-check input');
        chk.on('change', function() {
            var chkcnt = $(this).parents('.items-wrap').find('.item-check > div > .ctm-check input:checked').length;
            if (chkcnt == 1 && $(this).is(':checked')) {
                if ($(this).parent().siblings('button').length != 0) {
                    $(this).parent().siblings('button').trigger('click');
                } else {
                    $(this).parents('.items-wrap').find('button').eq(0).trigger('click');
                }
            }
        });
    });

    /* 금리인하요구권, 온라인 서류제출 */
    var chkWrap = $('.agree-txt input, .agree-area input');
    chkWrap.on('click', function() {
        if ($(this).is(':checked')) {
            $(this).parent('.ctm-check').siblings('button').trigger('click');
            $(this).parent('.ctm-check').siblings('button').addClass('done');
        }
    });

    //패밀리사이트
    $('.family-site > a').on('click', function() {
        $('.family-list').slideToggle('fast');
    });
    $('.family-close').on('click', function() {
        $('.family-list').slideUp('fast');
        $('.family-site > a').focus();
    });

    //quick-menu
    $('.list-wrap a').attr('tabindex', -1);
    setTimeout(function() {
        $('.quick-menu').removeClass('close');
        $('.quick-toggle').text('퀵메뉴 닫기');
        $('.list-wrap a').attr('tabindex', 0);
    }, 100);
    var quick = setTimeout(function() {
        $('.quick-menu').addClass('close');
        $('.quick-toggle').text('퀵메뉴 열기');
        $('.list-wrap a').attr('tabindex', -1);
    }, 5000);

    $('.quick-menu').on('mouseenter', function() {
        clearTimeout(quick);

    });
    $('.quick-menu').on('mouseleave', function() {
    	quick = setTimeout(function() {
            $('.quick-menu').addClass('close');
            $('.quick-toggle').text('퀵메뉴 열기');
            $('.list-wrap a').attr('tabindex', -1);
        }, 5000);
    });


    $('.quick-list .depth3 .current').parents('.depth2').find('a').eq(0).addClass('current');
    $('.quick-toggle').on('click', function() {
        quickScroll();
        $('.quick-menu').toggleClass('close');
        if ($(this).parent().hasClass('close')) {
            $(this).text('퀵메뉴 열기');
            $('.list-wrap a').attr('tabindex', -1)
        } else {
            $(this).text('퀵메뉴 닫기');
            $('.list-wrap a').attr('tabindex', 0)
        }
    });

    //슬라이더 버튼
    // $('.money-btn-wrap button').on('click', function(e) {
    //     var _plusVal = parseFloat($(this).attr('data'));
    //     var _plusGubun = $(this).attr('gubun');
    //     var _selector = $(this).parent().siblings('.inp-area').find('input');
    //     var _max = parseFloat($(this).parent().siblings('.slider-wrap').find('.slider').attr('max'));
    //     if ($(this).hasClass('dark')) {
    //         _selector.val(0).trigger("change");
    //     } else {
    //         if (_plusGubun == "2") {
    //             if (removeComma(_selector.val()) + _plusVal >= _max) {
    //                 _selector.val(addComma(_max)).trigger("change");
    //             } else {
    //                 _selector.val(addComma(removeComma(_selector.val()) + _plusVal)).trigger("change");
    //             }
    //         } else {
    //             _selector.val(_plusVal).trigger("change");
    //         }
    //     }
    // });

    //금융계산기 계산결과

    // $('.calculator').each(function(){
    //     var calcInput =  $(this).find('#money, #month, #interest, #month2, #return');
    //     var calcSlider = $(this).find('#monthMoneySlider, #paymentSlider, #interestSlider, #paymentSlider2, #returnSlider');
    //     calcInput.on('keydown',function(e){
    //         if (  e.keyCode == 13 ) {
    //             calcSlider.slider({
    //                 value:removeComma(calcInput.val())
    //             });
    //         }
    //     });
    // });

    // $('.calculator-wrap .btn-reinquiry, .calculator-wrap .btn-reset').on('click',function(){
    //     $('.calculator-result').hide();
    //     $( "#monthMoneySlider, #paymentSlider, #interestSlider, #paymentSlider2, #returnSlider" ).slider({
    //         value:0
    //     });
    //     $('#money, #month, #interest, #month2, #return').val('');

    // });

    //quickmenu
    quickScroll();

    //메인 공지사항팝업
    $('.noti-layer li').eq(0).find('a').click();

    //본인인증 라디오 r-on
    $('.auth-list .radio').on('click', function() {
        $('.auth-list .radio input:focus').each(function() {
            if ($(this).parent().hasClass('focus')) {
                $(this).parents('.auth-list').find('.radio').removeClass('r-on');
                $(this).parent().addClass('r-on');
            }
        });
    });

    //금리인하요구권 신청사유 r-on
    $(document).on('click', '.reason-area .radio', function() {
        $('.reason-area .radio input:focus').each(function() {
            if ($(this).parent().hasClass('focus')) {
                $(this).parents('.reason-area').find('.radio').removeClass('r-on');
                $(this).parent().addClass('r-on');
            } else {
                $('.reason-area .radio').removeClass('r-on');
            }
        });
    });


    if (winH2 > $('body').outerHeight()) {
        $('.btn-top').hide();
    }

    var layerH = winH2 - 110;
    $('.layerpopup').css('max-height', layerH);

    $('select').each(function() {
        if ($(this).val() != '') {
            $(this).siblings('.ui-selectmenu-button').addClass('in-value');
        } else {
            $(this).siblings('.ui-selectmenu-button').removeClass('in-value');
        }
    });

    $('select').selectmenu({
        change: function(event, ui) { 
            if ($(this).val() != '') {
                $(this).siblings('.ui-selectmenu-button').addClass('in-value');
            } else {
                $(this).siblings('.ui-selectmenu-button').removeClass('in-value');
            }
        }
    });

    /* 리스트갯수 홀수일때 */
    $('.box-list').each(function() {
        var listCnt = $(this).find('dd').length;
        //console.log(listCnt);
        if (listCnt % 2 == 1) {
            $(this).find('dd:last-child').css('width', '100%');
        }
    });

    //페이징 title
    $('.pagination li a.active').attr('title', '현재페이지');

    //새창열기 title
    $('a[target="_blank"]').attr('title', '새창열기');

    /* 파일버튼 접근성 관련 */
    $('.file-hidden').on('focusin', function(e) {
        $('.btn-file').css('outline', '2px solid #a5c7fe').addClass('focusin');
    }).on('focusout', function(e) {
        $('.btn-file').css('outline', 'none').removeClass('focusin');
    });

    //2020-07-21
    $('.faq-list-wrap').find('.btn-slide-open').each(function(){
        $slideArea = $(this).closest('.accordion-wrap').find('.accordion');
        $(this).click(function(){
            $(this).toggleClass('active');
            if( $(this).hasClass('active') ){
                $(this).text('닫힘');
                $(this).addClass('active');
                $slideArea.slideDown();
            }else{
                $(this).text('열림');
                $slideArea.slideUp();
                $(this).removeClass('active');
            }
        })
    })
	
	/*
	// 2023-07-13 추가
	$(".table-style tbody tr").each(function(i, e){

		if( $(this).find("td").eq(i).attr("rowspan") ){
			$(".table-style tbody td:first-child").css("border-left", "1px solid red");
		}else if( $(this).find("th").eq(i).attr("rowspan") ){
			$(".table-style tbody tr td:first-child").css("border-left", "1px solid blue");
		}



	});
	*/

	

});

/***
* 예가람저축은행 금플개편사업 신규 추가
***/
function gnbShow(e) {
	$(".center-menu > li").removeClass("active");
	e.closest(".center-menu > li").addClass("active");
};
function gnbHide() {
	$(".center-menu > li").removeClass("active");
};

function openWinPopup(url) {
    window.open(url, "", 'scrollbars=yes,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=948,height=700,left=474,top=0,fullscreen');
}

$(window).load(function() {
    btnTop();
});
$(window).resize(function() {
    quickScroll();
    layerHeight();
});
$(window).scroll(function() {
    btnTop();
});
//메인 금리
$.fn.counter = function(options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options);

    var thisElement = $(this);

    $({
        count: settings.start
    }).animate({
        count: settings.end
    }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
            //var mathCount = Math.ceil(this.count);
            var mathCount = this.count.toFixed(2);
            thisElement.text(mathCount);
        },
        complete: settings.complete
    });
};
$.fn.counterM = function(options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options);

    var thisElement = $(this);

    $({
        count: settings.start
    }).animate({
        count: settings.end
    }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
            //var mathCount = Math.ceil(this.count);
            var mathCountM = this.count.toFixed();
            thisElement.text(mathCountM);
        },
        complete: settings.complete
    });
};

function quickScroll() {
    var winH = $(window).height();
    var quickH = $('.quick-menu').height();
    if (winH < quickH + 140) {
        $('.quick-menu').addClass('inscroll');
        $('.quick-menu.inscroll .list-wrap').height(winH - 199);

    } else {
        $('.quick-menu').removeClass('inscroll');
        $('.quick-menu .list-wrap, .quick-menu').css('height', 'auto');
    }
}

//금융주소 한번에 웹툰보기
function goWebtoon() {
    var popUrl = "../../../resources/file/webtoon.html"
    var popOption = "width=500, height=800, resizable=no, scrollbars=yes, status=no, left=100, top=100;"
    window.open(popUrl, "", popOption).focus();
    return false;
}

function btnTop() {
    //btn-top
    if ($(window).scrollTop() == 0) {
        $('.btn-top').hide();
    } else {
        $('.btn-top').fadeIn(300);
    }
}

var globalNav = {
    init: function() {
        if (typeof depth1 != "undefined" && depth1 > -1 && typeof depth1 != "string") this.currentOneDepthNum = depth1 - 1;
        if (typeof depth1 != "undefined" && depth1 > -1) this.currentTwoDepthNum = depth2 - 1;
        if (typeof depth1 != "undefined" && depth1 > -1) this.currentThreeDepthNum = depth3 - 1;
        this.setLayout();
    },
    setLayout: function() {
        var _self = this;
        if (typeof depth1 != "undefined" && depth1 > -1) {
            if (typeof depth2 != "undefined" && depth2 > -1) {
                this.setText(this.currentOneDepthNum, this.currentTwoDepthNum, this.currentThreeDepthNum);
                this.activePage(this.currentOneDepthNum);
                if (typeof depth3 != "undefined" && depth3 > -1) {
                    this.setText(this.currentOneDepthNum, this.currentTwoDepthNum, this.currentThreeDepthNum);
                    this.activePage(this.currentOneDepthNum);
                }
            }
        } else if (typeof depth1 == "string") {
            _txt = depth1;
            this.setText(_txt, 0, this.currentExpDepthNum);
            this.activePage(0);
        }
        this.addEvent();
    },
    setText: function(_oneDepth, _twoDepth, _threeDepth) {
        var _self = this;
        var depth1Txt;
        if (typeof _oneDepth == "string") {
            depth1Txt = _oneDepth;
        } else {
            depth1Txt = $('#sitemapWrap h3').eq(_oneDepth).text();
        }
        if (_twoDepth != undefined && _twoDepth != -1) { //// 2depth가 있을 경우
            var depth2Txt = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") .all-depth2 > li:eq("' + _twoDepth + '") > a').text().replace('- ', '');
        } else {
            var depth2Txt = '';
        }
        if (_threeDepth != undefined && _threeDepth != -1) { //// 3depth가 있을 경우
            var depth3Txt = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") .all-depth2 > li:eq("' + _twoDepth + '") .all-depth3 > li:eq("' + _threeDepth + '") > a').text().replace('- ', '');
        } else {
            var depth3Txt = '';
        }
        _self.setTitle(depth1Txt, depth2Txt, depth3Txt);
        _self.setBreadcrumb(_oneDepth, depth1Txt, _twoDepth, depth2Txt, _threeDepth, depth3Txt);
    },
    setTitle: function(_depth1Txt, _depth2Txt, _depth3Txt, _depthExpTxt) {
        var _titleData = '';
        //if ( _depthExpTxt != '') { _titleData += _depthExpTxt + ' &lt; '; } //예외depth(depthExp)가 있는 경우

        if (_depth3Txt != '') {
            _titleData += _depth3Txt + ' &lt; ' + _depth2Txt + ' &lt; ' + _depth1Txt + ' &lt; ';
        } else if (_depth2Txt != '') {
            _titleData += _depth2Txt + ' &lt; ' + _depth1Txt + ' &lt; ';
        } else {
            _titleData += _depth1Txt + ' &lt; ';
        }
        try {
            //new browsers
            $('title').html(_titleData + '예가람저축은행');
        } catch (e) {
            //IE8
            document.title = _titleData + '예가람저축은행';
        }
    },
    setBreadcrumb: function(_oneDepth, _depth1Txt, _twoDepth, _depth2Txt, _threeDepth, _depth3Txt) {

    	$('.breadcrumb .home').attr('href', "/");
        $('.breadcrumb .depth1').empty().text(_depth1Txt);
        if (typeof _oneDepth == "string") {
            $('.breadcrumb .depth1').attr('href', $(location).attr('href'));
        } else {
            $('.breadcrumb .depth1').attr('href', $("#sitemapWrap .all-menu-col:eq(" + _oneDepth + ") h3 a").attr('href'));
        }
        var _leng = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") ul').length;
        if (_twoDepth != undefined && _twoDepth != -1 && _leng > 0) { //// 2depth가 있을 경우
            var depth2Link = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") .all-depth2 > li:eq("' + _twoDepth + '") > a').attr('href');
            $('.breadcrumb .depth2').empty().text(_depth2Txt);
            $('.breadcrumb .depth2').attr('href', depth2Link);
        } else {
            $('.breadcrumb .depth2').empty().remove();
        }
        var _leng2 = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") .all-depth2 > li:eq("' + _twoDepth + '") ul').length;
        if (_threeDepth != undefined && _threeDepth != -1 && _leng2 > 0) { //// 3depth가 있을 경우
            var depth3Link = $('#sitemapWrap .all-menu-col:eq("' + _oneDepth + '") .all-depth2 > li:eq("' + _twoDepth + '") li:eq("' + _threeDepth + '") > a').attr('href');
            $('.breadcrumb .depth3').empty().text(_depth3Txt);
            $('.breadcrumb .depth3').attr('href', depth3Link);
        } else {
            $('.breadcrumb .depth3').empty().remove();
        }

    },
    activePage: function(_oneDepth) {
        //if(typeof _oneDepth != 'undefined'){
        //  $('#gnb .depth1').eq(_oneDepth).find('a').addClass('active');
        //}
    },
    addEvent: function() {
        // $('.menu-wrap').on('mouseenter focusin',function(){
        //     $('.menu-wrap').addClass('open');
        // }).on('mouseleave focusout',function(){
        //     $('.menu-wrap').removeClass('open');
        // });

        // $('.depth1 > a').on('mouseenter focusin',function(){
        //     $(this).addClass('active');
        // }).on('mouseleave focusout',function(){
        //     $(this).removeClass('active');
        // });

        // $('.depth2 a').on('mouseenter focusin',function(){
        //     $(this).parents('.depth2').prev('a').addClass('active');
        // }).on('mouseleave focusout',function(){
        //     $(this).removeClass('active');
        //      $('.depth1 a').removeClass('active');
        // });
    }
};

function layerHeight() {
    var layerH = $(window).height() - 110;
    $('.layerpopup').css('max-height', layerH);
}

function faqPosition() {
    $('.accordion li').each(function() {
        var offset = $(this).offset();
        var offsetT = offset.top;
        $(this).attr('data', offsetT);
        $('.accordion li .question-wrap').on('click', function() {
            var thistop = $(this).parent().attr('data');
            $(window).scrollTop(thistop - 70);
        });
    });
}

function checkSubTerms(_this){
	var subCheckId = ["guide1","guide2","guide3","guide4","guide5","guide-all","agree7"];
	var temp="";
	for(var i=0; i<subCheckId.length;i++){
		temp = subCheckId[i];
		if ($(_this).prop('checked')) {
			$("#"+temp).parent().addClass('checked');
			$("#"+temp).prop('checked',true);
		}else{
			$("#"+temp).parent().removeClass('checked');
			$("#"+temp).prop('checked',false);
		}
	}
}

function checkSubNon(){
	if(!$('.agree7').prop('checked')&&!$('.agree8').prop('checked')&&!$('.agree37').prop('checked')){
		$('#means_sub').hide();
		$('#agree6').prop('checked',false);
		$('#agree6').parent().removeClass('checked');
		
		if(!$('.agree40').prop('checked')){
			$('#means_sub1').hide();
			$('#agree26').prop('checked',false);
			$('#agree26').parent().removeClass('checked');
		}
		if(!$('.agree43').prop('checked')){
			$('#means_sub2').hide();
			$('#agree27').prop('checked',false);
			$('#agree27').parent().removeClass('checked');
		}
		if(!$('.agree45').prop('checked')){
			$('#means_sub3').hide();
			$('#agree29').prop('checked',false);
			$('#agree29').parent().removeClass('checked');
		}
		if(!$('.agree51').prop('checked')){
			$('#means_sub4').hide();
			$('#agree50').prop('checked',false);
			$('#agree50').parent().removeClass('checked');
		}
		choiceChkCnt();
	}else {
		if(!$('.agree40').prop('checked')){
			$('#means_sub1').hide();
			$('#agree26').prop('checked',false);
			$('#agree26').parent().removeClass('checked');
			choiceChkCnt();
		}
		if(!$('.agree43').prop('checked')){
			$('#means_sub2').hide();
			$('#agree27').prop('checked',false);
			$('#agree27').parent().removeClass('checked');
			choiceChkCnt();
		}
		if(!$('.agree45').prop('checked')){
			$('#means_sub3').hide();
			$('#agree29').prop('checked',false);
			$('#agree29').parent().removeClass('checked');
			choiceChkCnt();
		}
		if(!$('.agree51').prop('checked')){
			$('#means_sub4').hide();
			$('#agree50').prop('checked',false);
			$('#agree50').parent().removeClass('checked');
			choiceChkCnt();
		}
	}
}

//약관 전체선택관련 20210621
function allLayerOpenRadioSetting(){
	 $("#T000800001_2_1").parent().parent().addClass("checked");
	 $("#T000800001_2_1").attr("checked","checked");
	 $("#T000800002_2_1").parent().parent().addClass("checked");
	 $("#T000800002_2_1").attr("checked","checked");
	 $("#T000800003_2_1").parent().parent().addClass("checked");
	 $("#T000800003_2_1").attr("checked","checked");
	 $("#T000800015_2_1").parent().parent().addClass("checked");
	 $("#T000800015_2_1").attr("checked","checked");
}

function choiceChkCnt(){
	var chAllCnt = 0;
    var chChkcnt = 0;
    $('.agree-wrap .items-wrap').each(function(){
    	var itemsId = $(this).attr('id');
    	if($("#"+itemsId+"").is(":visible")){
    		
			chAllCnt++;
			if($("#"+itemsId+"").find('.item-check .ctm-check input').prop('checked')){
				chChkcnt++;
			}
    	}
    });
    
    if (chAllCnt == chChkcnt) { //선택약관 전체선택 20210621
        $('#all-ch-check').prop('checked', true);
        $('#all-ch-check').parent().addClass("checked");
    } else {
        $('#all-ch-check').prop('checked', false);
        $('#all-ch-check').parent().removeClass("checked");
    }
}



