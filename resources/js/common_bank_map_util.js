/**
 * Created by SI2_JongRakMoon on 2018-03-08.
 */

var daumMap = {
    //if map이 null 이면 init이 안된상태
    map: null,
    //지도상에 표시된 마커들
    markers: [],

    //@{name},@{address} 를 포함하여 HTML문으로 작성
    infoContents: null,
    loadingMarkerCount: 0,

    /**
     *  @param {string} mapId HTML상의 map id
     *  @param {string} infoContents 마커를 표시할 주소(this.infoContents 참조)
     */
    init: function (mapId, infoContents) {
        var container = document.getElementById(mapId); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        this.map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
        this.infoContents = infoContents;
    },

    /**
     *  @param {string} markerName 마커에 표시할 이름
     *  @param {string} markerAddress 마커를 표시할 주소
     *  @param {boolean} isCenter 해당 마커를 바로 센터로 이동할지 여부
     */
    addMarkBank: function (markerName, markerAddress, isCenter) {
        this.loadingMarkerCount += 1;
        var markers = this.markers;
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infoContents;
        if (this.infoContents) {
            infoContents = this.infoContents.replace('@{name}', markerName).replace('@{address}', markerAddress);
        } else {
            infoContents = '<div style="width:150px;text-align:center;padding:6px 0;">' + markerName + '</div>'
        }

        if (typeof daum === 'undefined') {
            return;
        }

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new daum.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(markerAddress, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
                var coords = new daum.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new daum.maps.Marker({map: daumMap.map, position: coords});
                // marker.infoWindow = new daum.maps.InfoWindow({content: infoContents, removable: false});
                marker.address = markerAddress;
                markers.push(marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                if (isCenter) {
                    // marker.infoWindow.open(map, marker);
                    daumMap.map.panTo(coords);
                }

                // 마커에 클릭이벤트를 등록합니다
                daum.maps.event.addListener(marker, 'click', function () {
                    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                    // marker.infoWindow.open(map, marker);
                });
            } else {
                // console.log("해당 주소의 위치를 가져오지 못했습니다:" + markerAddress);
            }
            daumMap.loadingMarkerCount -= 1;
        });
    },

    /**
     *  @param {string} address 찾고자 하는 marker의 address
     *  @return {object} 마커 객체(Nullable)
     */
    findMarker: function (address) {
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].address === address) {
                return this.markers[i];
            }
        }
        return null;
    },

    /**
     *  해당 주소의 마커로 이동
     */
    goMarker: function (address) {
        var marker = this.findMarker(address);
        if (marker) {
            // marker.infoWindow.open(daumMap.map, marker);
            daumMap.map.setLevel(3);
            daumMap.map.panTo(marker.getPosition());
        } else {
            if (this.loadingMarkerCount === 0) {
                // customAlert({title: '알림', message: '해당 마커를 찾을 수 없습니다.'});
            }
        }
    }
};
