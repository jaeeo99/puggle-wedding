"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    naver: any;
  }
}
const waitForNaverMaps = (): Promise<void> => {
  return new Promise((resolve) => {
    const checkReady = () => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
};

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded || !mapElement.current) return;
  
    const initializeMap = async () => {
      await waitForNaverMaps(); // API 준비 대기
  
      const { naver } = window;
  
      const address = "서울특별시 송파구 신천동 7-20";
      const locationName = "더 베네치아 웨딩홀";
  
      const map = new naver.maps.Map(mapElement.current!, {
        center: new naver.maps.LatLng(37.514575, 127.105144),
        zoom: 16,
        draggable: false, // 드래그 비활성화
        scrollWheel: false, // 스크롤 휠 비활성화
        pinchZoom: false, // 핀치 줌 비활성화
        keyboardShortcuts: false, // 키보드 단축키 비활성화
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });
  
      naver.maps.Service.geocode({ query: address }, (status: any, response: any) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("주소 검색 실패:", status);
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
    };
  
    initializeMap();
  }, [isScriptLoaded]);

  const openMap = (appUrl: string, webUrl: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = appUrl;
      setTimeout(() => window.open(webUrl, "_blank"), 500);
    } else {
      window.open(webUrl, "_blank");
    }
  };

  return (
    <div>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=pbwk4m2bvj&submodules=geocoder"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div ref={mapElement} id="map" style={{ width: "100%", height: "400px" }} />
      <div className="flex justify-center items-center m-[20px] gap-4">
        <button className="rounded border-[1px] border-[#eaeaea] gowun-batang-regular w-[120px] h-[40px]" onClick={() => openMap("nmap://search?query=더%20베네치아%20웨딩홀", "https://map.naver.com/v5/search/더%20베네치아%20웨딩홀")}>
          네이버 지도
        </button>
        <button className="rounded border-[1px] border-[#eaeaea] gowun-batang-regular w-[120px] h-[40px]" onClick={() => openMap("kakaomap://search?q=더%20베네치아%20웨딩홀", "https://map.kakao.com/?q=더%20베네치아%20웨딩홀")}>
          카카오맵
        </button>
        <button className="rounded border-[1px] border-[#eaeaea] gowun-batang-regular w-[120px] h-[40px]" onClick={() => openMap("tmap://search?name=더%20베네치아%20웨딩홀", "https://www.tmap.co.kr/search/?searchKeyword=더%20베네치아%20웨딩홀")}>
          T맵
        </button>
      </div>
    </div>
  );
};

export default NaverMap;