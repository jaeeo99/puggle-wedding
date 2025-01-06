"use client";

import Script from "next/script";

const ClientScripts = () => {
  return (
    <>
      {/* 네이버 지도 API */}
      {/* <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=pbwk4m2bvj&submodules=geocoder"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("네이버 지도 스크립트 로드 완료");
        }}
      /> */}

      {/* 카카오 SDK */}
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("카카오 SDK 로드 완료");
          if (window.Kakao) {
            window.Kakao.init("e3224affde953df1586e22f97fc48ebe"); // JavaScript 키 초기화
          }
        }}
      />
    </>
  );
};

export default ClientScripts;