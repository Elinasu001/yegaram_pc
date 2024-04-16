$(document).ready(function(){

    //슬라이더 버튼
    $('.money-btn-wrap > button').on('click', function(e) {
        
    	var _plusVal = parseFloat($(this).attr('data'));
        var _plusGubun = $(this).attr('gubun');
        var _selector = $(this).parent().siblings('.inp-area').find('input');
        var _max = parseFloat($(this).parent().siblings('.slider-wrap').find('.slider').attr('max'));

        if ($(this).hasClass('dark')) {
            
        	_selector.val(0).trigger("change");
        } else {
        	
        	var num_val = 0; 
        	
        	if (_plusGubun == "2") {
        		num_val = removeComma(_selector.val()) + _plusVal; 
        	} else {
        		num_val = _plusVal; 
        	}
    		
    		num_val = num_val*1 > _max*1 ? _max*1 : num_val*1;
    		
    		_selector.val(addComma(num_val+"")).trigger("change");

        }
    });

    //금융계산기 계산결과

    $('.calculator').each(function(){
        var calcInput =  $(this).find('#money, #month, #interest, #month2, #return');
        //var calcSlider = $(this).find('#monthMoneySlider, #paymentSlider, #interestSlider, #paymentSlider2, #returnSlider');
        calcInput.on('keyup',function(e){
        	
        	var $that = $(this); 
        	var inputVal = ($that.val()).replace(/[^(0-9)*(\.)?(0-9)*]/g,'');
        	$that.val(inputVal);
        });
    });

    $('.calculator-wrap .btn-reinquiry, .calculator-wrap .btn-reset').on('click',function(){
        $('.calculator-result').hide();
        $( "#monthMoneySlider, #paymentSlider, #interestSlider, #paymentSlider2, #returnSlider" ).slider({
            value:0
        });
        $('#money, #month, #interest, #month2, #return').val('');

    });
    
});   