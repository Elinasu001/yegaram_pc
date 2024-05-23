/* 예가람저축은행금융플랫폼 기본 js
 * */

/**
 * AjaxFunc
 * + Ajax call 처리를 위한 Function 집합
 */
var AjaxFunc = ({
	//진행바 추가
	ajaxAsyncWithProcess : function(ajax_url, ajax_data, ajax_successFn, ajax_errorFn) {
		
		addLoading();
		
		$.ajax({
			// contentType: "application/json; charset=UTF-8",
			dataType : "json",
			type : "POST",
			url : ajax_url,
			data : ajax_data,
			success : function(data) {
				
				removeLoading();
				if( ajax_successFn ) {
					ajax_successFn(data);
				}
			},
			error : function(xhr, status, error) {
				
				removeLoading();
				var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				if( ajax_errorFn ) {
					ajax_errorFn(errorInfo);
				}
			}
		});
	},
	
	//동기처리
	ajaxSyncWithProcess : function(ajax_url, ajax_data, ajax_successFn, ajax_errorFn) {
		
		addLoading();
		
		$.ajax({
			// contentType: "application/json; charset=UTF-8",
			dataType : "json",
			type : "POST",
			url : ajax_url,
			data : ajax_data,
			async : false,
			success : function(data) {
				
				removeLoading();
				if( ajax_successFn ) {
					ajax_successFn(data);
				}
			},
			error : function(xhr, status, error) {
				
				removeLoading();
				var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				if( ajax_errorFn ) {
					ajax_errorFn(errorInfo);
				}
			}
		});
	},
	
	ajaxAsync : function(ajax_url, ajax_data, ajax_successFn, ajax_errorFn) {
		$.ajax({
			// contentType: "application/json; charset=UTF-8",
			dataType : "json",
			type : "POST",
			url : ajax_url,
			data : ajax_data,
			success : function(data) {
				if( ajax_successFn ) {
					ajax_successFn(data);
				}
			},
			error : function(xhr, status, error) {
				var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				if( ajax_errorFn ) {
					ajax_errorFn(errorInfo);
				}
			}
		});
	},
	ajaxAsyncMultipart : function(ajax_url, ajax_data, ajax_successFn, ajax_errorFn) {
		
		addLoading();
		$.ajax({
			//contentType: "application/json; charset=UTF-8",
			dataType : "json",
			enctype: 'multipart/form-data',
			type : "POST",
			url : ajax_url,
			data : ajax_data,
			processData : false,
			contentType: false,
			success : function(data) {
				
				removeLoading();
				if( ajax_successFn ) {
					ajax_successFn(data);
				}else {
					alert('receive Success');
				}
			},
			error : function(xhr, status, error) {
				
				removeLoading();
				var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				if( ajax_errorFn ) {
					ajax_errorFn(errorInfo);
				}else {
					alert(errorInfo);
				}
			}
		});
	},
	
	 ajaxAsyncMultipartForm : function(ajax_url, form_name, ajax_successFn, ajax_errorFn) {
	        $('#' + form_name).ajaxForm({
	            dataType : "text",
	            type : "POST",
	            url : ajax_url,
	            enctype: "multipart/form-data",
	            processData : false,
	            contentType: false,
	            success : function(data) {
	                if( ajax_successFn ) {
	                    ajax_successFn(JSON.parse(data));
	                }else {
	                    alert('receive Success');
	                }
	            },
	            error : function(xhr, status, error) {
	                var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
	                if( ajax_errorFn ) {
	                    ajax_errorFn(errorInfo);
	                }else {
	                    alert(errorInfo);
	                }
	            }
	        });

	        $('#' + form_name).submit();
	    },
	    
	ajaxAsyncJson : function(ajax_url, ajax_data, ajax_successFn, ajax_errorFn) {
		$.ajax({
			contentType: "application/json; charset=UTF-8",
			dataType : "json",
			type : "POST",
			url : ajax_url,
			data : ajax_data,
			success : function(data) {
				if( ajax_successFn ) {
					ajax_successFn(data);
				}else {
					//alert('receive Success');
				}
			},
			error : function(xhr, status, error) {
				var errorInfo = "receive Error:::code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				if( ajax_errorFn ) {
					ajax_errorFn(errorInfo);
				}else {
					alert(errorInfo);
				}
			}
		});
	},
});


