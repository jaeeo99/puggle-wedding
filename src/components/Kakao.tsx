"use client";
import Script from "next/script";
import React, { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("231860e66b4d70e20227ec3249fca2ad"); // JavaScript 앱 키
      }
    }
  }, []);

  const shareCustomKakao = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Link.sendCustom({
      templateId: 116059, // 템플릿 ID
      templateArgs: {
        title: "공유 제목",
        description: "공유 설명",
      },
    });
  };

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="beforeInteractive"
      />
      <button
        onClick={shareCustomKakao}
        className="flex items-center justify-center px-4 py-2 bg-[#FEE500] rounded-md text-black font-bold hover:opacity-90"
      >
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 로고"
          className="w-6 h-6 mr-2"
        />
        카카오톡으로 공유하기
      </button>
    </>
  );
};

export default KakaoShareButton;
