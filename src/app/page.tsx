"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Carousel from "@/components/Carousel";
import NaverMap from "@/components/NaverMap";
import KakaoSharePage from "@/components/Kakao";
dayjs.locale("ko");

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const target = dayjs("2025-03-29 14:20:00");

      const totalSeconds = target.diff(now, "second");

      if (totalSeconds <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTimeLeft(); // 처음 한 번 실행
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("문자가 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다. 다시 시도해주세요.");
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex flex-col w-full gap-12 max-w-[440px] bg-white shadow-md rounded-lg pb-24">
        <section id="cover" className="flex max-h-[800px] min-h-[600px] flex-col justify-between relative bg-cover bg-center" style={{ height: "90vh", backgroundImage: "url('/cover.jpg')", backgroundSize: "100%", backgroundPosition: "bottom" }}>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <span className="rozha-one-regular flex flex-col gap-0 text-[80px] leading-[60px] text-white">
              <span>03</span>
              <span>29</span>
            </span>
            <span className="pretendard-regular text-[18px] text-white">결혼식까지 {timeLeft.days}일 남았습니다</span>
            <span className="gowun-batang-regular text-[20px]">우리, 결혼합니다</span>
          </div>
          <video className="w-full object-cover" autoPlay loop muted playsInline src="./cover.mp4"></video>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-6">
          <span className="gowun-batang-bold text-[22px]">박진철 · 임지혜</span>
          <div className="flex flex-col gowun-batang-regular items-center text-[18px] leading-[30px]">
            <span>2025년 3월 29일 토요일 오후 2시 20분</span>
            <span>더베네치아 웨딩홀 3F</span>
          </div>
        </section>
        <section id="invitation" className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h2 className="pretendard-regular font-secondary text-[18px]">INVITATION</h2>
            <h3 className="gowun-batang-regular font-primary text-[22px]">소중한분을 초대합니다.</h3>
          </div>
          <div className="flex flex-col items-center gowun-batang-regular text-[18px]">
            <span>서로가 마주 보며 다져온 사랑을</span>
            <span>이제 함께 한 곳을 바라보며 걸어갈 수 있는</span>
            <span>큰 사랑으로 키우고자 합니다. </span>
          </div>
          <div className="flex flex-col items-center gowun-batang-regular text-[18px] leading-[30px]">
            <span>저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게</span>
            <span>앞날을 축복해 주시면 감사하겠습니다.</span>
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-6">
          <div className="relative w-full h-auto">
            <Image
              src="/wedding.jpg"
              alt="wedding image"
              layout="intrinsic"
              width={440}
              height={500}
            />
          </div>
          <div className="flex flex-col gowun-batang-regular text-[16px] mr-[30px]">
            <span className="text-right"><b className="text-[20px]">박문찬 · 박인향</b>의 장남, <b className="text-[20px]">진철</b></span>
            <span className="text-right">
              <Image
                className="inline mb-[5px] mr-[5px]"
                src="/ic_flower.png"
                alt="flower icon"
                width={20}
                height={20}
              />
              <b className="text-[20px]">임준호 · 임은영</b>의 차녀, <b className="text-[20px]">지혜</b></span>
          </div>
        </section>
        <section id="gallery" className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h2 className="pretendard-regular font-secondary text-[18px]">GALLERY</h2>
            <h3 className="gowun-batang-regular font-primary text-[22px]">우리의 순간</h3>
          </div>
          <Carousel images={[
    "/gallery_main.jpg",
    "/gallery_main.jpg",
    "/gallery_main.jpg"]}/>
          <div className="relative w-full h-auto">
            <Image
              src="/gallery_main.jpg"
              alt="gallery image"
              layout="intrinsic"
              width={440}
              height={660}
            />
          </div>
          <div className="grid grid-cols-3 grid-rows-4 gowun-batang-regular text-[18px] text-center gap-2">
            {Array.from({ length: 12 }, (_, index) => <div key={index}>
              <Image
                src="/gallery_thumb.jpg"
                alt="gallery thumbnail image"
                layout="intrinsic"
                width={120}
                height={120}
              />
            </div>)}
          </div>
        </section>
        <section id="schedule" className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h2 className="pretendard-regular font-secondary text-[18px]">SCHEDULE</h2>
            <h3 className="gowun-batang-regular font-primary text-[22px]">결혼식 일정</h3>
          </div>
          <div className="flex flex-col items-center">
            <span className="gowun-batang-bold text-[22px]">2025.03.29</span>
            <span className="flex flex-col gowun-batang-regular items-center text-[18px] leading-[30px]">토요일 오후 2시 20분</span>
          </div>
          <div className="mx-[60px] w-[calc(100%-120px)] py-[50px] border-[rgba(192, 169, 149, 0.5)] border-t-[1px] border-b-[1px]">
            <div className="calendar grid grid-cols-7 grid-rows-7 gowun-batang-regular text-[18px] text-center gap-2">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
              {Array.from({ length: 42 }, (_, index) => <div key={index}>
                {(index > 5 && index < 37) && (index - 5 === 29 ? <span className="flex items-center justify-center gowun-batang-bold bg-[rgba(234,176,122,1)] text-white w-[40px] h-[40px] rounded-full">{index - 5}</span> : index - 5)}
              </div>)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <div className="flex w-[188px] gowun-batang-regular text-[12px] text-center">
                <span className="flex-1">DAYS</span>
                <span className="flex-1">HOUR</span>
                <span className="flex-1">MIN</span>
                <span className="flex-1">SEC</span>
              </div>
              <span className="flex w-[188px] gowun-batang-bold text-[22px] text-center">
                <span className="flex-1">{timeLeft.days}</span>
                <span>:</span>
                <span className="flex-1">{timeLeft.hours}</span>
                <span>:</span>
                <span className="flex-1">{timeLeft.minutes}</span>
                <span>:</span>
                <span className="flex-1">{timeLeft.seconds}</span>
              </span>
            </div>
            <span className="flex flex-col gowun-batang-regular items-center text-[18px] leading-[30px]">진철, 지혜의 결혼식이 {timeLeft.days}일 남았습니다</span>
          </div>
        </section>
        <section id="location" className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h2 className="pretendard-regular font-secondary text-[18px]">LOCATION</h2>
            <h3 className="gowun-batang-regular font-primary text-[22px]">오시는 길</h3>
          </div>
          <div className="flex flex-col items-center">
            <span className="gowun-batang-bold text-[22px]">더베네치아 웨딩홀 3F</span>
            <span className="flex flex-col gowun-batang-regular items-center text-[18px] leading-[30px]">서울특별시 송파구 신천동 7-20</span>
          </div>
          <div className="relative w-full h-auto">
            <NaverMap />
          </div>
        </section>
        <section id="account" className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h2 className="pretendard-regular font-secondary text-[18px]">ACCOUNT</h2>
            <h3 className="gowun-batang-regular font-primary text-[22px]">마음 전하실 곳</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col gowun-batang-regular items-center text-[18px] leading-[30px]">
              <span>참석이 어려우신 분들을 위해</span>
              <span>계좌번호를 기재하였습니다.</span>
              <span>너그러운 마음으로 양해 부탁드립니다.</span>
            </div>
          </div>
          <div className="flex w-full px-5 flex-col items-center gowun-batang-regular text-[18px] gap-2">
            <div className="flex items-center justify-center w-full h-[70px] bg-[rgba(246,209,180,0.2)] border-[rgba(215,170,129,1)] border-[1px] rounded-[10px]">신랑측 송금하기</div>
            <div className="flex w-full gap-2 px-2">
              <div className="flex flex-1 flex-col gowun-batang-regular text-[16px]">
                <span>박진철</span>
                <span>신한은행 110-243-217120</span>
              </div>
              <div className="flex items-center justify-center w-[80px] h-[48px] pretendard-regular text-[16px] bg-[rgb(245,245,245)] rounded-[10px] cursor-pointer" onClick={() => handleCopy("110-243-217120")}>복사</div>
              <a
                href="https://qr.kakaopay.com/Ej8Jh4QHd"
                target="_blank">
                <div className="flex items-center justify-center w-[80px] h-[48px] bg-[rgb(251,237,84)] rounded-[10px] cursor-pointer">
                  <Image
                    className="inline"
                    src="/ic_kakaopay.png"
                    alt="kakaopay icon"
                    width={60}
                    height={27}
                  />
                </div>
              </a>
            </div>
            <div className="flex w-full gap-2 px-2">
              <div className="flex flex-1 flex-col gowun-batang-regular text-[16px]">
                <span>박문찬</span>
                <span>신한은행 110-243-217120</span>
              </div>
              <div className="flex items-center justify-center w-[80px] h-[48px] pretendard-regular text-[16px] bg-[rgb(245,245,245)] rounded-[10px] cursor-pointer" onClick={() => handleCopy("110-243-217120")}>복사</div>
              <div className="flex items-center justify-center w-[80px] h-[48px] bg-[rgb(251,237,84)] rounded-[10px] cursor-pointer">
                <Image
                  className="inline"
                  src="/ic_kakaopay.png"
                  alt="kakaopay icon"
                  width={60}
                  height={27}
                />
              </div>
            </div>
            <div className="flex w-full gap-2 px-2">
              <div className="flex flex-1 flex-col gowun-batang-regular text-[16px]">
                <span>박인향</span>
                <span>신한은행 110-243-217120</span>
              </div>
              <div className="flex items-center justify-center w-[80px] h-[48px] pretendard-regular text-[16px] bg-[rgb(245,245,245)] rounded-[10px] cursor-pointer" onClick={() => handleCopy("110-243-217120")}>복사</div>
              <div className="flex items-center justify-center w-[80px] h-[48px] bg-[rgb(251,237,84)] rounded-[10px] cursor-pointer">
                <Image
                  className="inline"
                  src="/ic_kakaopay.png"
                  alt="kakaopay icon"
                  width={60}
                  height={27}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full px-5 flex-col items-center gowun-batang-regular text-[18px] gap-2">
          <div className="flex items-center justify-center w-full h-[70px] bg-[rgba(246,209,180,0.2)] border-[rgba(215,170,129,1)] border-[1px] rounded-[10px]">신부측 송금하기</div>
            <div className="flex w-full gap-2 px-2">
              <div className="flex flex-1 flex-col gowun-batang-regular text-[16px]">
                <span>임지혜</span>
                <span>국민은행 564-02-0405-0787</span>
              </div>
              <div className="flex items-center justify-center w-[80px] h-[48px] pretendard-regular text-[16px] bg-[rgb(245,245,245)] rounded-[10px] cursor-pointer" onClick={() => handleCopy("564-02-0405-0787")}>복사</div>
              <a
                href="https://qr.kakaopay.com/FcVbja2gc"
                target="_blank">
                <div className="flex items-center justify-center w-[80px] h-[48px] bg-[rgb(251,237,84)] rounded-[10px] cursor-pointer">
                  <Image  
                    className="inline"
                    src="/ic_kakaopay.png"
                    alt="kakaopay icon"
                    width={60}
                    height={27}
                  />
                </div>
              </a>
            </div>
            <div className="flex w-full gap-2 px-2">
              <div className="flex flex-1 flex-col gowun-batang-regular text-[16px]">
                <span>임은영</span>
                <span>국민은행 172-21-0027-758</span>
              </div>
              <div className="flex items-center justify-center w-[80px] h-[48px] pretendard-regular text-[16px] bg-[rgb(245,245,245)] rounded-[10px] cursor-pointer" onClick={() => handleCopy("172-21-0027-758")}>복사</div>
              <div className="flex items-center justify-center w-[80px] h-[48px] bg-[rgb(251,237,84)] rounded-[10px] cursor-pointer">
                <Image
                  className="inline"
                  src="/ic_kakaopay.png"
                  alt="kakaopay icon"
                  width={60}
                  height={27}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-5">
        <a
          className="flex gowun-batang-regular items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          카카오톡으로 초대장 보내기
        </a>
        <KakaoSharePage />
      </footer>
    </div>
  );
}
