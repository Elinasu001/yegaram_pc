
/**
 *  LayerFunc
 *  + Layer 팝업처리를 위한 Function 집합 
 *  + inc_layer_popup.jsp 가 include 되어 있어야 함
 */
var LayerFunc = ({
	bFade : false,
	
	/**
	 * html
	 */
	openHtml : function(innerHtml, title, fnOk, fnCancel, btnTitleOk, btnTitleCancel) {
		//var layer_id = 'layer_popup_message_dynamic';
		var layer_id = 'layer_popup_message_ok';
		if( fnCancel ) {
			layer_id = 'layer_popup_message_okcancel';
		}
		LayerFunc.coreOpenLayer(true, layer_id, innerHtml, title, fnOk, fnCancel, true, btnTitleOk, btnTitleCancel );
	},
	/**
	 * 처리중...
	 */
	progress : function(message) {
		var layer_id = 'layer_popup_progress';
		if( !message ) {	message = '처리중';	};
		LayerFunc.coreOpenLayer(false, layer_id, message, null, null, null, false );
	},
	/**
	 * alert 창 표시
	 * 
	 * @parameter 	message : 표시할 메시지
	 * 				<br/> okFn : OK버튼 클릭시 수신할 함수
	 * 				<br/> cancelFn : Cancel버튼 클릭 시 수신할 함수
	 * 				<br/> title : 메시지창 타이틀문구
	 */
	alert : function( message, okFn, cancelFn, title ) {
		//layer_popup_message_ok
		//layer_popup_message_okcancel
		var layer_id = 'layer_popup_message_ok';
		if( cancelFn ) {
			layer_id = 'layer_popup_message_okcancel';
		}
		
		LayerFunc.coreOpenLayer(false, layer_id, message, title, okFn, cancelFn, false );
	},
	/**
	 * Layer 즉시 Open
	 * 
	 * layerOpen --> openLayer 
	 * 
	 * @parameter layer_id
	 */
	layerOpen : function(layer_id, message, okFn, cancelFn, title, bClickOut) {
		LayerFunc.coreOpenLayer(false, layer_id, message, title, okFn, cancelFn, bClickOut );
	},
	/**
	 * Layer 즉시 없애기
	 * 
	 * layerClear -> clearLayer
	 */
	layerClear : function(id) {	
		if(id){
			id = '#'+id;
			$(id).hide();	
		}else{
			$('.layer').hide();	
		}
	},
	coreClearLayer : function() {		
		if(LayerFunc.bFade) 	$('.layer').fadeOut();
		else $('.layer').hide();
	},
	/**
	 * @bFade : fade 효과 여부
	 * @parameters 	bFade(필수) : fade 효과 여부
	 * 					<br/> layer_id(필수) : layer id
	 * 					<br/> message(필수) : 메시지내용 
	 * 					<br/> title : 메시지창 타이틀 (default: '안내')
	 * 					<br/> fnOk : OK버튼 클릭시 수신할 함수
	 * 					<br/> fnCancel : Cancel버튼 클릭시 수신할 함수
	 * 					<br/> bClickOut : 배경 클릭시 창 닫을지 안 닫을지 (default: false)
	 */
	coreOpenLayer : function(bFade, layer_id, message, title, fnOk, fnCancel, bClickOut, btnTitleOk, btnTitleCancel ) {
		if( title == null || title == undefined ) 	title = null;
		if( fnOk == null || fnOk == undefined )	fnOk = null;
		if( fnCancel == null || fnCancel == undefined )	fnCancel = null;
		if( bClickOut ==null || bClickOut == undefined ) 	bClickOut = false;

		LayerFunc.bFade 		= bFade;
		
		var layer = $('.layer');
		var temp = $('#' + layer_id);
		var bg = $('#layer_bg').hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

		layer.children('.pop-layer').hide();
		temp.show();
		
		if(LayerFunc.bFade)	layer.fadeIn();	 
		else layer.show();
		
		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('a.cbtn').click(function(e){
			e.preventDefault();
			if(bg){
				LayerFunc.coreClearLayer();	//'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}
		});
		
		if(title) {
			temp.find('.title-l').html(title);
		}
		if(message) {
			temp.find('.ctxt').html(message);
		}
		//btnTitleOk, btnTitleCancel
		if(btnTitleOk) {
			temp.find('a.okbtn').html(btnTitleOk);
		}
		if(btnTitleCancel) {
			temp.find('a.cancelbtn').html(btnTitleCancel);
		}
		temp.find('a.okbtn').unbind( "click" );
		temp.find('a.okbtn').click(function(e){
			e.preventDefault();
			if(fnOk)		fnOk();
			LayerFunc.coreClearLayer();
		});
		
		temp.find('a.cancelbtn').unbind( "click" );
		temp.find('a.cancelbtn').click(function(e){
			e.preventDefault();
			if(fnCancel)		fnCancel();
			LayerFunc.coreClearLayer();
		});
		
		if( bClickOut ) {
			$('.layer .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				e.preventDefault();
				LayerFunc.coreClearLayer();
			});
		}
	},
	/**
	 * FadeIn 효과
	 * layerFadeOpen -> openLayerFade
	 */
	layerFadeOpen : function(layer_id, message, okFn, cancelFn, title, bClickOut) {
		LayerFunc.coreOpenLayer(true, layer_id, message, title, okFn, cancelFn, true );
	},
	/**
	 * FadeOut 효과
	 * 
	 * layerFadeClear -> clearLayerFade
	 * */
	layerFadeClear : function() {		
		$('.layer').fadeOut();
	},
});
