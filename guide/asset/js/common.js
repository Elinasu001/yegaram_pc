
$(document).ready(function(){
	
	var winWidth = $(window).width();

	if( winWidth <= 768){
		$(".wrapper").addClass("aside-closed");
		console.log( "모" );	
	}else{
		console.log( "컴" );
		$(".wrapper").removeClass("aside-closed");
	}

	console.log( $(window).width() ); 
	// aside menu
	$(".btn-mainnav").click(function(){

		if( $(".wrapper").hasClass("aside-closed") ){
			$(".wrapper").removeClass("aside-closed");
		}else{
			$(".wrapper").addClass("aside-closed");
		}
		
	});

$(window).resize(function(){
	
	var winWidth = $(window).width();

	if( winWidth <= 768){
		$(".wrapper").addClass("aside-closed");
		console.log( "모" );	
	}else{
		console.log( "컴" );
		$(".wrapper").removeClass("aside-closed");
	}
	console.log( $(window).width() ); 
});

function Mobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

}
/*
function Mobile() {
	return 
	/Android/,
	/webOS/,
	/iPhone/,
	/iPad/,
	/iPod/,
	/BlackBerry/,
	/IEMobile/,
	/Opera Mini/i.test(navigator.userAgent);
}
*/


});

/*//
SyntaxHighlighter.defaults['gutter'] = false;
SyntaxHighlighter.defaults['auto-links'] = false; // 링크 설정 (기본값 true)
SyntaxHighlighter.defaults['wrap-lines'] = false; // 링크 설정 (기본값 true)
SyntaxHighlighter.all();

$(document).ready(function(){

	$(".btn-mainnav").click(function(){
		alert(2);
	});
//메뉴 active
$(".btn-mainnav").click(function(){
	var aside = $(".aside");
	
	if($("section").hasClass("aside-closed")){
		$("section").removeClass("aside-closed")
	}else{
		$("section").addClass("aside-closed")
	}
	
});
*/
//tab메뉴
/*$(function(){
	$(".tab-content > div").hide();
	$(".tab-nav a").click(function(){
		$(".tab-content > div").hide().filter(this.hash).fadeIn();
		$(".tab-nav a").removeClass("on");
		$(this).addClass("on");
		return false;
	}).filter(":eq(0)").click();
});*
	
	

});
*/