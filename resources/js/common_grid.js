var GridFn = ({
	colorLevel1 : "powderblue",
	colorLevel2 : "lavender",
	colorLevel3 : "white",
	colorLevel4 : "skyblue",
	colorLevel5 : "lightyellow",
	colorDefault : "white",
	/**
	 * Grid Unload
	 */
	gridUnload : function(gridId) {
		$(gridId).jqGrid('GridUnload');
	},
	/**
	 * Grid Reload
	 */
	gridReload : function(gridId) {
		$(gridId).trigger("reloadGrid");
	},
	/**
	 * Grid Create 생성
	 * 
	 * @param gridId        		grid ID               
	 * @param titleName     		grid caption 이름,     표시안할 것이면 null
	 * @param targetUrl     		json data 얻어올 url,   조회안할 것이면 null
	 * @param formData     		targetUrl 호출하면서 보낼 form데이터
	 * @param colModels     		grid column 정보
	 * 
	 * @param fnClick       		click event 수신할 함수  
	 * @param fnDblClick    		double click event 수신할 함수
	 * @param checkBox      		checkbox 표시여부(true : 표시, false : 미표시)
	 * @param multiSelect   		multi select 여부(true : 다중선택, false: 1개만 선택)
	 * @param rowNum        		한화면에 표시할 default row 갯수
	 * 
	 * @param fnLoadComplete 	load 완료 event 수신할 함수
	 * @param footerSum 			하단에 custom row 표시 여부(true/false	- 	default:false))
	 * @param shrinkToFit			column width 넓이 속성값 사용여부 여부(true/false - default:true)
	 * @param saveFileName     CSV다운로드할 파일명(test.csv)
	 * @param height				그리드 높이 (default: 350)
	 * 
	 * @param gridPager			pager tag id
	 * @param fnPaging			paging event 
	 */
	gridCreate : function(gridId, titleName, targetUrl, formData, colModels
					, fnClick, fnDblClick, checkBox, multiSelect, rowNum
					, fnLoadComplete, footerSum, shrinkToFit, saveFileName, gridHeight
					, gridPager, fnPaging ) {
		
		if( !rowNum )			rowNum = 15;
		if( !footerSum ) 		footerSum = false;
//		if( !shrinkToFit ) 		shrinkToFit = true;
		if( !gridHeight ) 		gridHeight = 350;
		if( !saveFileName ) 	saveFileName = '그리드데이터';
		if( !gridPager ) 		gridPager = '#gridpager';
		
		$(gridId).jqGrid({
			url : targetUrl,
			postData: formData,
			mtype:'POST',
			datatype : 'json',
			jsonReader : {
				root:  function(obj) { return (obj.result) ? obj.data.data:null; },
				records: function(obj) { return (obj.result) ? obj.data.totalRecords:0; },
				page: function(obj) { return (obj.result) ? obj.data.page:0; },
				total: function(obj) { return (obj.result) ? obj.data.totalPages:0; },
				repeatitems : true,
			},
			height : gridHeight, 
			autowidth : true,
			shrinkToFit : shrinkToFit,
			/*forceFit: true,*/
            colModel : colModels,
			onSelectRow : fnClick,
			ondblClickRow : fnDblClick,
			beforeSelectRow : function(rowId, e) {
				if( !multiSelect ) $(this).jqGrid('resetSelection');
				return(true);
			},			
			rownumbers : true,
			viewrecords : true,
		    loadonce : true,
			rowNum : rowNum,
		    rowList: [15*1, 15*2, 15*3, 100],
		    pager: $(gridPager),
		    loadComplete:	fnLoadComplete,
		    footerrow: footerSum,
		    userDataOnFooter: footerSum,
		    onPaging: function (pgButton) {
				var currentPage 		= $(gridId).getGridParam('page'); //get current  page
		        var lastPage 			= $(gridId).getGridParam("lastpage"); //get last page
		        var countPerPage 	= $(gridId).getGridParam("rowNum");
		        
		        var newPage = 1;
		        var newCountPerPage = $(".ui-pg-selbox").val(); 
		        
		        if( pgButton == 'records' ) 						{	/**nothing**/		    	}
		        else if( pgButton == 'user' ) 					{ 	newPage = $(".ui-pg-input").val();		}
				else if( pgButton == 'first_gridpager' ) 	{	newPage = 1;				}
				else if( pgButton == 'prev_gridpager' ) 	{	newPage = currentPage-1;		}
				else if( pgButton == 'next_gridpager' ) 	{	newPage = currentPage+1;	}
				else if( pgButton == 'last_gridpager' ) 		{	newPage = lastPage;	}
		        
				if( newPage<1 ) 			newPage = 1;
				if( newPage>lastPage ) newPage = lastPage;
				
				$('#page').val(newPage);
				$('#countPerPage').val(newCountPerPage);
				if( fnPaging ) 	setTimeout( function(){	fnPaging() }, 10 );
		    }
		});
		
		$(gridId).navGrid(gridPager, { edit: false, add: false, del: false, search: false, refresh: true, view: false, position: "left"}).navButtonAdd(gridPager, {
						caption: "CSV",
						buttonicon:"ui-icon-arrowthickstop-1-s", 
						onClickButton: function(){  GridFn.gridExportCSV( gridId, saveFileName ); }, 
						position: "last"
					});
		$(gridId).trigger("reloadGrid");
    	$(".ui-pg-selbox").val(rowNum).prop("selected", true);
	},
	gridCreateObj : function(param) {

		function root(obj) { return (obj.result) ? obj.data.data:null; }
		
		if( !param.gridId ) { console.err('param.gridId cannot be null.'); return;}
		if( !param.pager ) { console.err('param.pager cannot be null.'); return;}
		
		if( !param.rowNum )			param.rowNum = 15;
		if( !param.footerrow ) 		param.footerrow = false;
		if( !param.height ) 		param.height = 350;
		if( !param.saveFileName ) 	param.saveFileName = '그리드데이터';
		if( !param.gridPager ) 		param.gridPager = '#gridpager';
		if( !param.datatype )		param.datatype = 'json';
		if( !param.mtype )			param.mtype = 'POST';
		if( !param.jsonReader )		param.jsonReader = {
			root: root,
			records: function(obj) { return (obj.result) ? obj.data.totalRecords:0; },
			page: function(obj) { return (obj.result) ? obj.data.page:0; },
			total: function(obj) { return (obj.result) ? obj.data.totalPages:0; },
			repeatitems : true,
		};
		if( !param.authwidth )		param.autowidth = true;
		if( !param.rownumbers )		param.rownumbers = true;
		if( !param.viewrecords )	param.viewrecords = true;
		if( !param.rowList )		param.rowList = [param.rowNum*1, param.rowNum*2, param.rowNum*3];
		if( !param.emptyrecords )	param.emptyrecords = "데이터가 없습니다.";
		if( !param.datatype )		param.datatype = 'json';
		if( !param.loadtext )		param.loadtext = "조회중...";
		if( !param.ondblClickRow )	param.ondblClickRow = function (){ console.log('double clicked.') };
		if( !param.authwidth )		param.authwidth = true;
		if( !param.checkBox )		param.checkBox = false;
		if( !param.multiSelect )	param.multiSelect = false;
		if( !param.loadonce )		param.loadonce = false;
		if( !param.sortable )		param.sortable = true;
		if( !param.csvFormatter )	param.csvFormatter = {};
		
		var $gridId = $(param.gridId);
		
	    $gridId.jqGrid(param);
	    $gridId.jqGrid('navGrid', param.pager
	    		, { // navGrid option 
	    			edit: false, add: false, del: false, search: true, refresh: true, view: false, position: "left" 
	    		} , {}, {}, {}, {
	    			muiltipleSearch: true
	    		}
	    );
	    $gridId.jqGrid('navButtonAdd', param.pager, {
					caption: "CSV", 
					buttonicon:"ui-icon-arrowthickstop-1-s", 
					onClickButton: function(){
						const colModel = $gridId.jqGrid('getGridParam', 'colModel');
						const postData = $gridId.jqGrid('getGridParam', 'postData');
						delete postData.page;
						delete postData.rows;
						AjaxFunc.ajaxAsync(param.url, postData, function(data) {
							const jsonData = root(data).map(function(row, index) {
								const formatter = param.csvFormatter;
								for(const key in formatter) {
									row[key] = formatter[key](row[key]);
								}
								return row; 
							});
							UtilFunc.downloadCsvFileFromJson( jsonData, param.saveFileName, true );
						});
					}, 
					position: "last"
				});
	},
	
	/**
	 * 자료 CSV 다운로드
	 */
	gridExportCSV : function(gridId, saveFileName) {
		var jsonData = GridFn.getGridJsonData( gridId );
		if( jsonData ) 
			UtilFunc.downloadCsvFileFromJson( jsonData, saveFileName, true );
	},
	/**
	 * jqGrid 리스트 parsing to json
	 */
	getGridJsonData : function (id){
		
		var jsonData 	= null;
	
		var gridDatas 	= $(id).jqGrid('getGridParam', 'data'); 
		var colModels 	= $(id).jqGrid('getGridParam', 'colModel');
		
		var obj 	= new Object();
		obj.items = new Array();
		
		if( gridDatas && gridDatas.length>0 ){
			
			for(var dataIndex in gridDatas){
				//그리드 row단위로 데이터 구하기
				var row = new Object();
				row["번호"] = parseInt(dataIndex) + 1;
				//row.push( { '번호': (parseInt(dataIndex) + 1) } );
				//그리드 컬럼 갯수만큼 데이터 구하기
				for (var i=1; i<colModels.length; i++) {
					if( !colModels[i].hidden ) {
						var key 		= colModels[i].label;
						var value 	= gridDatas[dataIndex][colModels[i].name];
						
						if(value == undefined){
							value = '';
						}
						
						if( colModels[i].formatter ) { 
							var options = new Object();
							options["colModel"] = colModels[i];
							value = colModels[i].formatter( value, options, gridDatas[dataIndex] );
							//value = colModels[i].formatter( value, colModels[i], gridDatas[dataIndex] ); 
						}
						row[key+' '] = value;
					}
				}
				//row추가
				obj.items.push(row);
			}
			jsonData = JSON.stringify(obj.items);
		}else {
			console.log('grid data load empty or error.', gridDatas)
		}
		
		return jsonData;
	},
	/**
	 * Formatter - 일자 YYYY-MM-DD
	 */
	gridFormatterDt : function(cellvalue, options, rowObject) {
		var formatted = '';
		var temp = '';
		
		if( cellvalue==null || cellvalue == undefined ) {
			formatted = '';
		} else if( cellvalue.length<8 ) {
			formatted = cellvalue;
		} else
		{
			formatted = cellvalue.substr(0,4) + '-';
			formatted += cellvalue.substr(4,2) + '-';
			formatted += cellvalue.substr(6,2);
		}
		return formatted;
	},
	/**
	 * Formatter - 일시 YYYY-MM-DD hh:mi:ss
	 */
	gridFormatterDttm : function(cellvalue, options, rowObject) {
		var formatted = '';
		var temp = '';
		if( cellvalue==null || cellvalue == undefined ) {
			formatted = '';
		} else if( cellvalue.length<14 ) {
			formatted = cellvalue;
		} else
		{
			formatted = cellvalue.substr(0,4) + '-';
			formatted += cellvalue.substr(4,2) + '-';
			formatted += cellvalue.substr(6,2) + ' ';
			formatted += cellvalue.substr(8,2) + ':';
			formatted += cellvalue.substr(10,2) + ':';
			formatted += cellvalue.substr(12,2);
		}
		return formatted;
	},
	/**
	 * Formatter - 숫자 천단위 , 
	 */
	gridFormatterThousandNumber : function(cellvalue, options, rowObject) {
		var formatted = '';
		var source = cellvalue;
		
		if( cellvalue==null || cellvalue == undefined )	formatted = '';
		else {
			source += '';
			x = source.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1].substr(0,2) : '';
			if( Number(x1)>=1000 )
			{
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}			
			}
			formatted = x1 + x2;
		}
		return formatted;
	},
	/**
	 * grid 내 data 갯수
	 */
	gridDataLength : function(gridId) {
		var gridDatas 	= $(gridId).jqGrid('getGridParam', 'data'); 
		return (gridDatas !== undefined && gridDatas != null ) ? gridDatas.length : 0 ;
	},
	/**
	 * 여기부터 안쓰는것??
	 * 
	 */
	gridCreateUrlNotSetting : function(gridId, colModels, selectRowFn, resultMap) {
		var v_resultMap = resultMap;
		if( v_resultMap == null ) 	v_resultMap = 'resultMap';
		
		$(gridId).jqGrid({
			datatype : 'json',
			mtype : 'post',
			colModel : colModels,
			height : '70%',
			rowNum : 9999,
			rownumbers : true,
			autowidth : true,
			jsonReader : {
				repeatitems : false,
				root: v_resultMap,
				page: 'page'
			},
			onSelectRow : selectRowFn,
			viewrecords : true,
			caption : null
		});
	},
	gridCreateWithSelectRow : function(gridId, target_url, colModels, selectRowFn, resultMap) {
		var v_resultMap = resultMap;
		if( v_resultMap == null ) 	v_resultMap = 'resultMap';
		
		$(gridId).jqGrid({
			url : target_url,
			datatype : 'json',
			jsonReader : {
				root: v_resultMap,
				records: function(obj){return obj.size;},
				page: 1,
				total: 1,
				repeatitems : false,
			},
			colModel : colModels,
			rowNum : 9999,
			rownumbers : true,
			autowidth : true,
			height : '70%',
			onSelectRow : selectRowFn,
			viewrecords : true,
			caption : 'jqgrid'
		});
	},
	gridCreateWithDblClickRow : function(gridId, target_url, colModels, dblClickFn, resultMap) {
		var v_resultMap = resultMap;
		if( v_resultMap == null ) 	v_resultMap = 'resultMap';
		
		$(gridId).jqGrid({
			url : target_url,
			datatype : 'json',
			jsonReader : {
				root: v_resultMap,
				records: function(obj){return obj.size;},
				page: 1,
				total: 1,
				repeatitems : false,
			},
			colModel : colModels,
			rowNum : 9999,
			rownumbers : true,
			autowidth : true,
			height : '70%',
			viewrecords : true,
			ondblClickRow : dblClickFn,
			caption : 'jqgrid'
		});
	},gridCreateMultiSelect : function(gridId, target_url, colModels, dblClickFn) {
		$(gridId).jqGrid({
			url : target_url,
			datatype : 'json',
			jsonReader : {
				root: 'resultMap',
				records: function(obj){return obj.size;},
				page: 1,
				total: 1,
				repeatitems : false,
			},
			colModel : colModels,
			rowNum : 9999,
			rownumbers : false,
			autowidth : true,
			height : '70%',
			multiselect:true,
			viewrecords : true,
			ondblClickRow : dblClickFn,
			caption : 'jqgrid'
		});
	},gridCreateMultiSelectPop : function(gridId, target_url, colModels) {
		$(gridId).jqGrid({
			url : target_url,
			datatype : 'json',
			jsonReader : {
				root: 'resultMap',
				records: function(obj){return obj.size;},
				page: 1,
				total: 1,
				repeatitems : false,
			},
			colModel : colModels,
			rowNum : 9999,
			rownumbers : true,
			autowidth : false,
			height : 300,
			viewrecords : true,
			multiselect:true,
			mtype:'POST'
		});
	},gridCreateSingleSelectPop : function(gridId, target_url, colModels) {
		$(gridId).jqGrid({
			url : target_url,
			datatype : 'json',
			jsonReader : {
				root: 'resultMap',
				records: function(obj){return obj.size;},
				page: 1,
				total: 1,
				repeatitems : false,
			},
			colModel : colModels,
			rowNum : 9999,
			rownumbers : true,
			autowidth : false,
			height : 300,
			viewrecords : true,
			multiselect: true,
			beforeSelectRow : function(rowId, e) {
				$(this).jqGrid('resetSelection');
				return(true);
			},
			mtype:'POST'
		});
	},
	/*
	Selects the <option> element belonging to selectElement that has text 
	`targetText`, if any exists.

	selectElement should be either a <select> element, a jQuery object wrapping a
	<select> element, or a jQuery selector that will select a <select> element.
	*/
	selectOptionByText : function (selectElement, targetText) {
		var $selectElement, $options, $targetOption;

		$selectElement = jQuery(selectElement);
		$options = $selectElement.find('option');
		$targetOption = $options.filter(
		    function () {return jQuery(this).text() == targetText;}
		);
		if( $targetOption==null ) {
			$targetOption = $options[0];
		}
		// We use `.prop` if it's available (which it should be for any jQuery
		// versions above and including 1.6), and fall back on `.attr` (which
		// was used for changing DOM properties in pre-1.6) otherwise.
		if (jQuery().prop) {
		    $targetOption.prop('selected', true);
		} 
		else {
		    $targetOption.attr('selected', 'true');
		}
	},
	selectOptionByValue : function (selectElement, targetValue) {
		var $selectElement, $options, $targetOption;

		$selectElement = jQuery(selectElement);
		$options = $selectElement.find('option');
		$targetOption = $options.filter(
		    function () {return jQuery(this).attr('value') == targetValue;}
		);
		if( $targetOption==null ) {
			$targetOption = $options[0];
		}
		// We use `.prop` if it's available (which it should be for any jQuery
		// versions above and including 1.6), and fall back on `.attr` (which
		// was used for changing DOM properties in pre-1.6) otherwise.
		if (jQuery().prop) {
		    $targetOption.prop('selected', true);
		} 
		else {
		    $targetOption.attr('selected', 'true');
		}
	},
	getSelectedText : function(selectElement) {
		return $(selectElement + ' option:selected').text();
	},
	getSelectedValue : function(selectElement) {
		return $(selectElement + ' option:selected').val();
	},
	getSelectedRowIndex : function(gridId) {
		return $(gridId).jqGrid ('getGridParam', 'selrow');
	},
	setSelectedRowIndex : function(gridId, rowIndex) {
		return $(gridId).jqGrid ('setSelection', rowIndex, false);
	},
	createEditor : function(id) {
		var editor = CKEDITOR.replace(id,
				{
					customConfig : './config.js'
				});
		return editor;
	}
	
//  지우지 말것!!
//  map 에서 key 뽑을 때 샘플
//	getColNames : function(colModels) {
//		var colNames = [];
//		for(var i=0;i<colModels.length;i++) {
//			var model = colModels[i];
//			if( model.hasOwnProperty('name') ) {
//				colNames.push( model['name'] );
//			}
//		}
//	},	
});