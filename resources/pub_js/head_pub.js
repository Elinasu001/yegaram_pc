var depth1 = 0;
	    var depth2 = 0;
	    var depth3 = 0;
        
       $(function() {
           
    	   addLoading();
    	   setTimeout(function() {
    		   removeLoading();
    	   }, 700);
           PageFunc.init(${getDepositProd});
            
        });
    
        var PageFunc = ({
            
        	init : function (getProd) {
                
                if(getProd.result) {
                    
                    depth1 = 1;
                	depth2 = getProd.data.getDepositProd.CATE_ORDER*1;
                	depth3 = getProd.data.getDepositProd.PROD_ORDER*1;
                	
                	PageFunc.setProdContents(getProd.data.getDepositProd);

                    
                	PageFunc.setProdList(getProd.data.selectProdList);
                	
                } else {
                    
                    //customAlert({title : "알림" , message : getProd.resultMessage });
                    location.replace('/error/404');
                }
                
            },
            
            //상품소개 
            setProdContents : function(getDepositProd) {
            	
                if("Y" !== getDepositProd.NONTAX_SAVING_OPEN_YN) {
                    //비과세종합저축안내 버튼 
                    $("#nontaxYn").hide();
                }
                $(".prod-visual .prod-tit h2").append($('<img src="/common/download/'+getDepositProd.IMG_TITLE+'" alt = "' + getDepositProd.PROD_NM + '" />'));
                $(".prod-visual .character").append($('<img src="/common/download/'+getDepositProd.IMG_CHARACTER+'" alt = "' + getDepositProd.PROD_NM + '" />'));
                $(".prod-visual .prod-tit .desc").html(getDepositProd.DESC);
                $(".prod-visual .prod-tit .hashtag span").html(getDepositProd.KEYWORD);
                $(".contents > .prod-info > .prod-cts > .define-list").prepend($(getDepositProd.DESC_HP));
                
                var intrate = getDepositProd.INTRATE_DESC ? getDepositProd.INTRATE_DESC : "";
                
               
                $("#retireInfo").hide();

               	if(getDepositProd.PROD_CD=="P000000044"){
               		$("#retireInfo").show();
               		$("#depositProAll").hide();
               		$(".define-list > li > #rateDiv").parent().remove();
               	}else{
               		if(intrate.trim()) {
                       	
                           $(".define-list > li > #rateDiv").html(intrate.trim());
                       } else {
                       	$(".define-list > li > #rateDiv").parent().remove();
                       }
               		if("Y" !== getDepositProd.DEPOS_PROTECT_OPEN_YN) {
                           //예금자보호
                       	$("#deposProtect").hide();
                       }
               	}

                var dt = getDepositProd.SALE_START_DT ? getDepositProd.SALE_START_DT : "";
                $(".prod-info .prod-date .date").text("기준일 : "+dt);
                var info = getDepositProd.CONFIRM_INFO ? getDepositProd.CONFIRM_INFO : "";
                $(".prod-info .prod-date .compliance").text("예가람저축은행 준법감시인 심의필 "+info);

                if((getDepositProd.CONFIRM_INFO_BANK != "") && (getDepositProd.CONFIRM_INFO_BANK != undefined)){
    				$(".complianceBank").show();
    				$(".prod-info .prod-date .complianceBank").text("저축은행중앙회 심의필 " + getDepositProd.CONFIRM_INFO_BANK);
    			}else{
    				$(".complianceBank").hide();
    			}
                
                if (getDepositProd.PROD_CD == "P000000037" || getDepositProd.PROD_CD == "P000000040" || getDepositProd.PROD_CD == "P000000018") {
                	$("#noteEl").append("<br>해지 및 제신고, 예적금담보대출은 본인 거래만 가능합니다.");
                }

                if (getDepositProd.PROD_CD == "P000000044") {
                	$("#noteEl").append("<br>이 예금은 퇴직연금제도 범위 내에서 운용되는 상품으로 질권 설정, 담보제공, 지급정지, 상계 등이 불가합니다.");
                }

                if (getDepositProd.PROD_CD == "P000000085") {
                	$("#noteEl").append("<br>해당 상품은 1인 1계좌 개설만 가능합니다.");
                	$("#noteEl").append("<br>해당 상품 해지 및 한도제한계좌해제요청, 이체한도 증액은 SB톡톡플러스 APP을 통해 할 수 있습니다.");
                	$("#noteEl").append("<br>비대면계좌개설을 위한 조건 충족시에만 가입가능.");
                }
            },
            
            //상품리스트
            setProdList : function(selectProdList) {
            	
            	if(0 === selectProdList.length) {
            		$(".sub-menu-wrap > .sub-menu").empty();
            		$(".sub-menu-wrap p").hide();
            		return;
            	}
            	
            	
            	$(".sub-menu-wrap > .sub-menu > ul").empty();
            	
            	for(var i=0;i<selectProdList.length; i++) {
            		
            		$(".sub-menu-wrap > .sub-menu > ul").append($('<li><a href="/deposit/product/'+selectProdList[i].PROD_CD+'">'+selectProdList[i].PROD_NM+'</a></li>'));
            		
            	}
            	
                var subMenu;
				subMenu = $('.sub-menu ul').bxSlider({
					slideWidth: 263,
					minSlides: 4,
					maxSlides: 4,
					moveSlides: 1,
					slideMargin: 0,
					pager: false,
					infiniteLoop: false
					//hideControlOnEnd: true
				});

            },
            
        });