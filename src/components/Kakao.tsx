"use client";
import React from "react";

const KakaoSharePage = () => {
  const shareToKakao = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("e3224affde953df1586e22f97fc48ebe"); // 카카오 디벨로퍼스 JavaScript 키
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "더 베네치아 웨딩홀",
        description: "서울특별시 송파구 신천동 7-20에 위치한 아름다운 웨딩홀입니다.",
        imageUrl: "https://via.placeholder.com/800x400", // 썸네일 이미지 URL
        link: {
          mobileWebUrl: "https://cedar.kr", // 모바일 웹 URL
          webUrl: "https://cedar.kr", // PC 웹 URL
        },
      },
      social: {
        likeCount: 100,
        commentCount: 50,
        sharedCount: 200,
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: "https://cedar.kr", // 모바일 웹 URL
            webUrl: "https://cedar.kr", // PC 웹 URL
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={shareToKakao}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      카카오톡으로 공유하기
    </button>
  );
};

export default KakaoSharePage;