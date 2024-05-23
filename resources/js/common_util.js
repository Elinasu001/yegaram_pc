var UtilFunc = ({

    /**
     * YYYYMMDD 일자 String을 Date 타입으로 구한다
     * @strYYYYMMDD "20170331" or "2017-03-31"
     * @return new Date(2017, 3, 31)
     */
    getDate: function (strYYYYMMDD) {
        strYYYYMMDD = strYYYYMMDD.trim();

        var d;
        if (strYYYYMMDD && strYYYYMMDD.length == 8) {
            d = new Date(parseInt(strYYYYMMDD.substring(0, 4)), parseInt(strYYYYMMDD.substring(4, 6)) - 1, parseInt(strYYYYMMDD.substring(6, 8)));
        } else if (strYYYYMMDD && strYYYYMMDD.length == 10) {
            d = new Date(parseInt(strYYYYMMDD.substring(0, 4)), parseInt(strYYYYMMDD.substring(5, 7)) - 1, parseInt(strYYYYMMDD.substring(8, 10)));
        } else {
            d = null;
        }
        return d;
    },
    /***
     * YYYYMMDD 일자 String을 Display 용으로 구한다
     * @strYYYYMMDD "20170331" or "2017-03-31"
     * @return "2017-03-31"
     */
    getDateDisp: function (strYYYYMMDD) {
        strYYYYMMDD = strYYYYMMDD.trim();

        var d;
        if (strYYYYMMDD && strYYYYMMDD.length == 8) {
            d = strYYYYMMDD.substring(0, 4) + "-" + strYYYYMMDD.substring(4, 6) + "-" + strYYYYMMDD.substring(6, 8);
        } else if (strYYYYMMDD && strYYYYMMDD.length == 10) {
            d = "" + parseInt(strYYYYMMDD.substring(0, 4)) + "+" + (parseInt(strYYYYMMDD.substring(5, 7)) - 1) + "+" + parseInt(strYYYYMMDD.substring(8, 10));
        } else if (strYYYYMMDD && strYYYYMMDD.length == 14) {
            d = strYYYYMMDD.substring(0, 4) + "-" + strYYYYMMDD.substring(4, 6) + "-" + strYYYYMMDD.substring(6, 8) + " " + strYYYYMMDD.substring(8, 10) + ":" + strYYYYMMDD.substring(10, 12) + ":" + strYYYYMMDD.substring(12, 14);
        } else {
            d = strYYYYMMDD
        }
        return d;
    },
    /***
     * YYYYMMDD 일자 String을 Display 용으로 구한다
     * @strYYYYMMDD "20170331" or "2017-03-31"
     * @return "2017/03/31"
     */
    getDateSlash: function (strYYYYMMDD) {
        strYYYYMMDD = strYYYYMMDD.trim();

        var d;
        if (strYYYYMMDD && strYYYYMMDD.length == 8) {
            d = strYYYYMMDD.substring(0, 4) + "/" + strYYYYMMDD.substring(4, 6) + "/" + strYYYYMMDD.substring(6, 8);
        } else if (strYYYYMMDD && strYYYYMMDD.length == 10) {
            d = "" + parseInt(strYYYYMMDD.substring(0, 4)) + "+" + (parseInt(strYYYYMMDD.substring(5, 7)) - 1) + "+" + parseInt(strYYYYMMDD.substring(8, 10));
        } else if (strYYYYMMDD && strYYYYMMDD.length == 14) {
            d = strYYYYMMDD.substring(0, 4) + "/" + strYYYYMMDD.substring(4, 6) + "/" + strYYYYMMDD.substring(6, 8) + " " + strYYYYMMDD.substring(8, 10) + ":" + strYYYYMMDD.substring(10, 12) + ":" + strYYYYMMDD.substring(12, 14);
        } else {
            d = strYYYYMMDD
        }
        return d;
    },
    /**
     * Date 타입에서 YYYYMMDD String 형태로 구한다
     * @d new Date(2017, 3, 31)
     * @return "20170331"
     */
    getDateStr: function (d) {
        var strDate;
        var str;
        var pad = '00';

        strDate = d.getFullYear();

        pad = '00';
        str = '' + (d.getMonth() + 1);
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;

        pad = '00';
        str = '' + d.getDate();
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;

        return strDate;
    },
    /**
     * Date 타입에서 YYYY-MM-DD String 형태로 구한다
     * @d new Date(2017, 3, 31)
     * @return "2017-03-31"
     */
    getDateStrWithHyphen: function (d) {
        var strDate;
        var str;
        var pad = '00';

        strDate = d.getFullYear();
        strDate = strDate + "-";

        pad = '00';
        str = '' + (d.getMonth() + 1);
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;
        strDate = strDate + "-";

        pad = '00';
        str = '' + d.getDate();
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;

        return strDate;
    },
    /**
     * Date 타입에서 YYYY-MM-DD String 형태로 구한다 요일추가
     * @d new Date(2017, 3, 31)
     * @return "2017-03-31 (수)"
     */
    getFullDateStrWithHyphen: function (d) {
        var strDate;
        var str;
        var pad = '00';

        strDate = d.getFullYear();
        strDate = strDate + "-";

        pad = '00';
        str = '' + (d.getMonth() + 1);
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;
        strDate = strDate + "-";

        pad = '00';
        str = '' + d.getDate();
        strDate = strDate + pad.substring(0, pad.length - str.length) + str;

        var week = new Array('(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)');

        strDate = strDate + " " + week[d.getDay()];

        return strDate;
    },
    /**
     * 날짜 더하기
     */
    addDays: function (d, days) {
        d.setTime(d.getTime() + (86400000 * days));
        return d;
    },
    /**
     * 현재시각정보
     */
    getCurrentDttm: function () {
        var dttm = '';
        var date = new Date();
        dttm = ''+UtilFunc.paddingLeft(date.getFullYear(), '0', 4);
        dttm += UtilFunc.paddingLeft(date.getMonth() + 1, '0', 2);
        dttm += UtilFunc.paddingLeft(date.getDate(), '0', 2);
        dttm += UtilFunc.paddingLeft(date.getHours(), '0', 2);
        dttm += UtilFunc.paddingLeft(date.getMinutes(), '0', 2);
        dttm += UtilFunc.paddingLeft(date.getSeconds(), '0', 2);
        return dttm;
    },
    paddingLeft: function (value, paddingchar, len) {
        return (value.toString().length < len) ? UtilFunc.paddingLeft(paddingchar + value, len) : value;
    },
    /**
     * JSONData를 CSV파일로 다운로드
     *
     * downloadCsvFileFromJson( jsonData, saveFileName, true );
     *
     * @param jsonData            json 형태의 데이터 { items : { [key:value] , ... } }
     * @param saveFileName    저장할 파일이름
     * @param showLabel            컬럼헤더 표시여부
     */
    downloadCsvFileFromJson: function (jsonData, saveFileName, showLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;

        var CSV = '';
        //Set Report title in first row or line
        //CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (showLabel) {
            var row = "";
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += $.trim(index) + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //파일제목 시간넣기
        var downloadDate = UtilFunc.getCurrentDttm();

        //Generate a file name
        var fileName = saveFileName.replace(/ /g, "_");		//downloadDate+"_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += "_" + downloadDate;
        //Initialize file format you want csv or xls
        //var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV);
        var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    
    /**
     * Text에서 숫자만 추출
     */
    getOnlyNumber: function (value) {
        return (value) ? value.replace(/[^0-9]/g, "") : value;
    },
    
    /**
     * Text에서 문자만 추출
     */
    getOnlyChar: function (value) {
    	return (value) ? value.replace(/[^a-zA-Zㄱ-힣]/g, "") : value;
    },
    
    /**
     * Text에서 영문만 추출
     */
    getOnlyEng: function (value) {
    	return (value) ? value.replace(/[^a-zA-Z]/g, "") : value;
    },
    
    /**
     * Text에서 영문과 숫자만 추출
     */
    getOnlyEngAndNum: function (value) {
    	return (value) ? value.replace(/[^a-zA-Z0-9]/g, "") : value;
    },
    
    /**
     * Text에서 영문,숫자,특수문자 추출
     */
    getOnlyEngAndNumAndSpe: function (value) {
    	return (value) ? value.replace(/[^a-zA-Z0-9_\-\.]/g, "") : value;
    },
    
    /**
     * 팝업윈도우 호출 (부모 가운데)
     */
    popupWindow: function (url, title, w, h, frmPost) {
        wLeft = window.screenLeft ? window.screenLeft : window.screenX;
        wTop = window.screenTop ? window.screenTop : window.screenY;

        var left = wLeft + (window.innerWidth / 2) - (w / 2);
        var top = wTop + (window.innerHeight / 2) - (h / 2);
        map = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if(map == null){
        	alert("팝업이 차단되어 있습니다. \n 설정을 변경해주세요.");
        }
        if (map && frmPost) {
            frmPost.submit();
        }
    },
    popupModalWindow: function (url, title, w, h) {
        Ext.onReady(function () {
            Ext.create('Ext.window.Window', {
                title: title,
                height: h,
                width: w,
                minWidth: w,
                minHeight: h,
                layout: 'fit',
                itemId: 'popUpWin',
                modal: true,
                shadow: false,
                resizable: true,
                constrainHeader: true,
                items: [{
                    xtype: 'box',
                    autoEl: {
                        tag: 'iframe',
                        src: url,
                        frameBorder: '0'
                    }
                }]
            }).show();
        });
    },
    closeModalWindow: function () {
        Ext.ComponentQuery.query('#popUpWin')[0].close();
    },
    getPhoneNumberWithHyphen: function (num, mask) {
        var formatNum = "";
        if (typeof num !== 'string') return formatNum;
        num = num.replace(/\-/g, "");

        if (typeof mask === 'undefined') {
            mask = false;
        }

        if (num.length === 11) {
            if (mask) {
                formatNum = num.replace(/(\d{3})(\d{3,4})(\d{4})/g, "$1-****-$3");
            } else {
                formatNum = num.replace(/(\d{3})(\d{3,4})(\d{4})/g, "$1-$2-$3");
            }
        } else if (num.length === 8) {
            formatNum = num.replace(/(\d{4})(\d{4})/g, "$1-$2");
        } else {
            if (num.indexOf("02") === 0) {
                formatNum = num.replace(/(\d{2})(\d{3,4})(\d{4})/g, "$1-$2-$3");
            } else {
                if (mask) {
                    formatNum = num.replace(/(\d{3})(\d{3,4})(\d{4})/g, "$1-****-$3");
                } else {
                    formatNum = num.replace(/(\d{3})(\d{3,4})(\d{4})/g, "$1-$2-$3");
                }
            }
        }
        return formatNum;
    }, /** 1000 단위로 콤마를 삽입한다. */
    gridFormatterThousandNumber : function (value) {
    	value = value.replace(/,/g, '');
    	if(!!Number(value)) { // 숫자타입 확인.
    		var length = value.length;
    		return value.split('')
			.map(function(v, idx) { return idx != 0 && (length - idx) % 3 == 0 ? ',' + v : v})
			.join('');
    	}
    	return '';
	}, /** 생년월일을 입력받아 올해 (만)나이를 계산한다 (YYYYMMDD, YYMMDD)**/
	getAge : function (value) {
		var age = -1;
		
		if(!value || (value.length != 6 && value.length != 8)) {	return age; }

		var today = new Date();
		var year, monthIndex;
		if( value.length == 6 ) {
			monthIndex = 2;
			year = value.substr(0, 2);
			if(year <= today.getFullYear() % 100) {
				year = '20' + year;
			}else {
				year = '19' + year;
			}
		}else {
			monthIndex = 4;
			year = value.substr(0,4);
		}
		
		var birthDate = new Date([year, value.substr(monthIndex, 2), value.substr((monthIndex+2))].join('/'));
		age = today.getFullYear() - birthDate.getFullYear();
		
		if(today < birthDate.setFullYear(today.getFullYear())) age--;
		return age;
	}
});