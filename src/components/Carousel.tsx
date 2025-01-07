"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

const Carousel = ({ images, interval = 3000 }: { images: string[]; interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Interval 추적
  const isTransitioning = useRef(false); // 애니메이션 중복 방지

  const nextSlide = useCallback(() => {
    if (isTransitioning.current) return; // 애니메이션 중일 경우 무시
    isTransitioning.current = true;

    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      isTransitioning.current = false; // 애니메이션 종료 후 상태 초기화
    }, 500); // 슬라이드 애니메이션 시간과 동일하게 설정
  }, [images]);

  const prevSlide = useCallback(() => {
    if (isTransitioning.current) return; // 애니메이션 중일 경우 무시
    isTransitioning.current = true;

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      isTransitioning.current = false; // 애니메이션 종료 후 상태 초기화
    }, 500); // 슬라이드 애니메이션 시간과 동일하게 설정
  }, [images]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 이전 Interval 제거
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 정리
      }
    };
  }, [interval, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
    setStartX(0);
    setEndX(0);
  };

  return (
    <div
      className="relative w-full overflow-hidden mx-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 이미지 슬라이드 */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-[440px] h-[440px] object-cover"
          />
        ))}
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-[rgba(234,176,122,1)] p-2 rounded-full"
      >
        &lt;
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-[rgba(234,176,122,1)] p-2 rounded-full"
      >
        &gt;
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;