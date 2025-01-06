"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) return;

    const { naver } = window;

    if (!naver || !naver.maps) {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
      return;
    }

    const address = "서울특별시 송파구 신천동 7-20";
    const locationName = "더 베네치아 웨딩홀";

    const map = new naver.maps.Map(mapElement.current!, {
      center: new naver.maps.LatLng(37.514575, 127.105144),
      zoom: 16,
    });

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        console.error("주소 검색에 실패했습니다.");
        return;
      }

      const result = response.v2.addresses[0];
      const coords = new naver.maps.LatLng(result.y, result.x);

      map.setCenter(coords);

      new naver.maps.Marker({
        position: coords,
        map,
        title: locationName,
      });

      new naver.maps.InfoWindow({
        content: `<div style="font-size:14px; padding:10px;">${locationName}</div>`,
        disableAutoPan: true,
      }).open(map, coords);
    });
  }, [isScriptLoaded]);

  const openNaverMap = () => {
    const encodedName = encodeURIComponent("더 베네치아 웨딩홀");
    const naverAppUrl = `nmap://search?query=${encodedName}`;
    const webUrl = `https://map.naver.com/v5/search/${encodedName}`;
    window.location.href = naverAppUrl;

    // 앱이 없는 경우 웹으로 이동
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 500);
  };

  const openKakaoMap = () => {
    const encodedName = encodeURIComponent("더 베네치아 웨딩홀");
    const kakaoAppUrl = `kakaomap://search?q=${encodedName}`;
    const webUrl = `https://map.kakao.com/?q=${encodedName}`;
    window.location.href = kakaoAppUrl;

    // 앱이 없는 경우 웹으로 이동
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 500);
  };

  const openTMap = () => {
    const encodedName = encodeURIComponent("더 베네치아 웨딩홀");
    const tmapAppUrl = `tmap://search?name=${encodedName}`;
    const webUrl = `https://www.tmap.co.kr/search/?searchKeyword=${encodedName}`;
    window.location.href = tmapAppUrl;

    // 앱이 없는 경우 웹으로 이동
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 500);
  };

  return (
    <div>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=pbwk4m2bvj&submodules=geocoder"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)} // 스크립트 로드 상태 설정
      />
      <div
        ref={mapElement}
        style={{ width: "100%", height: "400px" }}
        id="map"
      ></div>
      <div className="flex space-x-4 justify-center items-center gowun-batang-regular">
        <button
          onClick={openNaverMap}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          네이버 지도
        </button>
        <button
          onClick={openKakaoMap}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          카카오맵
        </button>
        <button
          onClick={openTMap}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          T맵
        </button>
      </div>
    </div>
  );
};

export default NaverMap;


// import React, { useEffect, useRef } from "react";

// const NaverMap = () => {
//   const mapElement = useRef(null);

//   useEffect(() => {
//     const { naver } = window;

//     if (!naver) {
//       console.error("네이버 지도 API가 로드되지 않았습니다.");
//       return;
//     }

//     const address = "서울특별시 송파구 신천동 7-20";
//     const locationName = "더 베네치아 웨딩홀";

//     // 지도 초기화
//     const map = new naver.maps.Map(mapElement.current, {
//       center: new naver.maps.LatLng(37.514575, 127.105144), // 초기 좌표
//       zoom: 16, // 확대 레벨
//     });

//     // 주소 검색 및 마커 추가
//     naver.maps.Service.geocode({ query: address }, (status, response) => {
//       if (status !== naver.maps.Service.Status.OK) {
//         console.error("주소 검색에 실패했습니다.");
//         return;
//       }

//       const result = response.v2.addresses[0]; // 첫 번째 검색 결과 사용
//       const coords = new naver.maps.LatLng(result.y, result.x);

//       // 지도 중심 이동
//       map.setCenter(coords);

//       // 마커 추가
//       const marker = new naver.maps.Marker({
//         position: coords,
//         map,
//         title: locationName,
//       });

//       // 정보 창 추가
//       const infoWindow = new naver.maps.InfoWindow({
//         content: `<div style="font-size:14px; padding:10px;">${locationName}</div>`,
//         disableAutoPan: true,
//       });

//       // 정보 창 열기
//       infoWindow.open(map, marker);
//     });
//   }, []);

//   return (
//     <div>
//       <div
//         ref={mapElement}
//         style={{ width: "100%", height: "400px" }}
//         id="map"
//       ></div>
//     </div>
//   );
// };

// export default NaverMap;