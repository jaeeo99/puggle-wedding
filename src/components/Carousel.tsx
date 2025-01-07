"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

const Carousel = ({ images, interval = 3000 }: { images: string[]; interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0); // 터치 시작 위치
  const [endX, setEndX] = useState(0); // 터치 끝 위치

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images]);

  // 자동 전환 효과
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 정리
  }, [interval, nextSlide, currentIndex]);

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  // 터치 이동
  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  // 터치 끝
  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      nextSlide(); // 왼쪽으로 스와이프
    } else if (endX - startX > 50) {
      prevSlide(); // 오른쪽으로 스와이프
    }
    setStartX(0);
    setEndX(0);
  };

  return (
    <div
      className="relative w-[440px] h-[660px] overflow-hidden mx-auto"
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
          <Image
            key={index}
            src={src}
            alt={`Slide ${index}`}
            width={440}
            height={660}
            className="w-[440px] h-[660px] object-cover"
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