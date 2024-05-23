$(document).ready(function() {
	
	$("#car_yn").selectmenu({
		select : function(){
			if($(this).val()=='Y'){
				$("#car_no").closest(".form-wrap").css("display", "block");
			}else{
				$("#car_no").closest(".form-wrap").css("display", "none");
			}
		},
		change : function(){
			if($(this).val()=='Y'){
				$("#car_no").closest(".form-wrap").css("display", "block");
			}else{
				$("#car_no").closest(".form-wrap").css("display", "none");
			}
			//ss 20220804 웹 접근성 관련 작업 추가
			var selectVal = $(this).find("option:selected").text();
            $("#car_yn-button").attr("title",selectVal);
            //ee 20220804 웹 접근성 관련 작업 추가
		}
	});
	
	$(".chk_span").on('click', function() {
		var temp = $(this).parent().parent().find(".ctm-check");
		if(temp.hasClass("checked")){
			temp.find("input").prop("checked","");
			temp.find("input").trigger("change");	
		}else{
			temp.find("input").prop("checked","checked");
			temp.find("input").trigger("change");
		}
	});
	
});

//레이어팝업 라디오박스
function termsRadioChangeEvent(){
 var radioNm ;
 var radioId_1 ;
 var radioId_2 ;
 var chkVal ;
 var textVal = "";
	
 $(".tiny").on("click", function(){
	 if(($("#loan_prod").val() == "GL090") ||($("#loan_prod").val() == "GL091")){
		textVal= "국세체납정보, (담보대출) 담보물권 정보";
	}else{
		textVal="국세체납정보";
	}
	 $("#agreementLayer2").find(".pop-wrap").find(".table-wrap").find("#changeTextVal").text(textVal);
	 var codeI= $(this).parent().parent().parent().parent().parent().attr("id");
		if(codeI != undefined && codeI !=''){
		
		radioNm = codeI+"_1_1";
		radioId_1 = codeI+"_2_1";
		radioId_2 = codeI+"_2_2";
		$("#"+radioId_1+" ").parent().parent().addClass("checked");
		$("#"+radioId_1+" ").attr("checked","checked");

		$("input:radio[name='"+radioNm+"']").on("click", function(){
			if($("input:radio[name='"+radioNm+"']").is(':checked')){
				if($("#"+radioId_1+"").is(':checked')){
					$("#"+radioId_2+" ").parent().parent().removeClass("checked");
					$("#"+radioId_1+" ").parent().parent().addClass("checked");
					$("#"+radioId_2+" ").attr("checked","");
					$("#"+radioId_1+" ").attr("checked","checked");
				}else{
					$("#"+radioId_1+" ").parent().parent().removeClass("checked");
					$("#"+radioId_2+" ").parent().parent().addClass("checked");
					$("#"+radioId_1+" ").attr("checked","");
					$("#"+radioId_2+" ").attr("checked","checked");
					$("."+codeI+"_2"+"").css("display","block");
					$("."+codeI+"_1"+"").css("display","none");
				}
				$(".layerpopup").find(".tooltip-close").click();
				chkVal = $("input:radio[name='"+radioNm+"']:checked").val();
				if(codeI == 'T000800001'){
					$("#CRDT_AGR_DTL_YN").val(chkVal);
					$("#btnAgree1").click();
				}else if(codeI == 'T000800002'){
					$("#PROD_AGR_DTL_YN").val(chkVal);
					$("#btnAgree2").click();
				}else if(codeI == 'T000800003'){
					$("#SRVC_AGR_DTL_YN").val(chkVal);
					$("#btnAgree3").click();
				}/* else if(codeI == 'T000800015'){
					$("#THIRD_AGR_DTL_YN").val(chkVal);
					$("#btnAgree36").click();
				} */
				
			}
		});
		chkVal = $("input:radio[name='"+radioNm+"']:checked").val();
		if(codeI == 'T000800001'){
			$("#CRDT_AGR_DTL_YN").val(chkVal);
		}else if(codeI == 'T000800002'){
			$("#PROD_AGR_DTL_YN").val(chkVal);
		}else if(codeI == 'T000800003'){
			$("#SRVC_AGR_DTL_YN").val(chkVal);
		}/* else if(codeI == 'T000800015'){
			$("#THIRD_AGR_DTL_YN").val(chkVal);
		} */
	}
	
 });
}

