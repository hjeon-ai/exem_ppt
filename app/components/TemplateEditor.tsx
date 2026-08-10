'use client';

import React, { useState, useRef } from 'react';

interface SlideData {
  theme: string;
  mainTitle: string;
  subTitle: string;
  department: string;
  author: string;
}

const TEMPLATE_OPTIONS = [
  { id: 'dark-a', name: 'Dark Stripe A', desc: '하단 시그니처 스트라이프', bg: '/templates/bg-dark-a.svg', isLight: false },
  { id: 'light-b', name: 'Light Pattern B', desc: '블루 라인 패턴', bg: '/templates/bg-light-b.svg', isLight: true },
  { id: 'dark-x', name: 'Dark X-Brand', desc: '대형 브랜드 X 패턴', bg: '/templates/bg-dark-x.svg', isLight: false },
  { id: 'light-stripe', name: 'Light Side Stripe', desc: '우측 전면 사이드 스트라이프', bg: '/templates/bg-light-stripe.svg', isLight: true },
];

export const TemplateEditor = () => {
  // 플랫폼 자체 전체 테마 (dark | light)
  const [platformTheme, setPlatformTheme] = useState<'dark' | 'light'>('dark');

  const [slideData, setSlideData] = useState<SlideData>({
    theme: 'dark-a',
    mainTitle: 'MaxGauge 기반 DB 성능 분석 보고서',
    subTitle: '2026년 하반기 시스템 최적화 제안',
    department: 'DB 컨설팅 1팀',
    author: '홍길동 팀장',
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const currentTemplate = TEMPLATE_OPTIONS.find((t) => t.id === slideData.theme) || TEMPLATE_OPTIONS[0];
  const isSlideLight = currentTemplate.isLight;

  const isPlatformDark = platformTheme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans select-none transition-colors duration-300 ${
        isPlatformDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* ===== 상단 헤더 (EXEM 로고 + 테마 토글 버튼) ===== */}
      <header
        className={`border-b px-8 py-4 flex justify-between items-center transition-colors duration-300 ${
          isPlatformDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-4">
          {/* 왼쪽 상단 엑셈 로고 */}
          <img
            src="/Logo_White.svg"
            alt="EXEM Logo"
            className={`h-6 w-auto transition-all ${!isPlatformDark ? 'invert' : ''}`}
          />
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isPlatformDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
            Canvas Builder
          </span>
        </div>

        {/* 라이트/다크 모드 전환 토글 버튼 */}
        <button
          onClick={() => setPlatformTheme(isPlatformDark ? 'light' : 'dark')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
            isPlatformDark
              ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-200 text-gray-800'
          }`}
        >
          <span>{isPlatformDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}</span>
        </button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 max-w-[1800px] mx-auto w-full">
        {/* ===== 왼쪽 패널: 템플릿 선택 & 텍스트 편집 ===== */}
        <div
          className={`lg:col-span-4 border rounded-2xl p-6 space-y-6 h-fit transition-colors duration-300 ${
            isPlatformDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          <h2 className="font-semibold text-lg">템플릿 선택</h2>

          <div className="grid grid-cols-2 gap-3">
            {TEMPLATE_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSlideData((prev) => ({ ...prev, theme: item.id }))}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-20 ${
                  slideData.theme === item.id
                    ? 'border-[#00e6a5] ring-2 ring-[#00e6a5]/20 ' + (isPlatformDark ? 'bg-gray-800' : 'bg-emerald-50/50')
                    : isPlatformDark
                    ? 'border-gray-800 bg-gray-950 hover:border-gray-700'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-xs">{item.name}</span>
                <span className={`text-[10px] ${isPlatformDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.desc}</span>
              </button>
            ))}
          </div>

          <hr className={isPlatformDark ? 'border-gray-800' : 'border-gray-200'} />

          <div className="space-y-4">
            <h3 className={`font-semibold text-sm ${isPlatformDark ? 'text-gray-300' : 'text-gray-700'}`}>콘텐츠 편집</h3>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isPlatformDark ? 'text-gray-400' : 'text-gray-600'}`}>메인 제목</label>
              <textarea
                rows={2}
                value={slideData.mainTitle}
                onChange={(e) => setSlideData({ ...slideData, mainTitle: e.target.value })}
                className={`w-full border rounded-lg p-3 text-sm focus:border-[#00e6a5] focus:outline-none resize-none transition ${
                  isPlatformDark ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isPlatformDark ? 'text-gray-400' : 'text-gray-600'}`}>부제목 / 서브 타이틀</label>
              <input
                type="text"
                value={slideData.subTitle}
                onChange={(e) => setSlideData({ ...slideData, subTitle: e.target.value })}
                className={`w-full border rounded-lg p-3 text-sm focus:border-[#00e6a5] focus:outline-none transition ${
                  isPlatformDark ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                placeholder="부제목을 입력하세요"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isPlatformDark ? 'text-gray-400' : 'text-gray-600'}`}>소속팀</label>
                <input
                  type="text"
                  value={slideData.department}
                  onChange={(e) => setSlideData({ ...slideData, department: e.target.value })}
                  className={`w-full border rounded-lg p-3 text-sm focus:border-[#00e6a5] focus:outline-none transition ${
                    isPlatformDark ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${isPlatformDark ? 'text-gray-400' : 'text-gray-600'}`}>작성자</label>
                <input
                  type="text"
                  value={slideData.author}
                  onChange={(e) => setSlideData({ ...slideData, author: e.target.value })}
                  className={`w-full border rounded-lg p-3 text-sm focus:border-[#00e6a5] focus:outline-none transition ${
                    isPlatformDark ? 'bg-gray-950 border-gray-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== 오른쪽 패널: 캔버스 실시간 미리보기 ===== */}
        <div className="lg:col-span-8 flex flex-col justify-start space-y-4">
          <div className={`flex justify-between items-center text-sm px-1 ${isPlatformDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>실시간 Canvas 미리보기</span>
          </div>

          <div
            className={`w-full flex justify-center items-center p-4 rounded-xl shadow-inner border transition-colors duration-300 ${
              isPlatformDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}
          >
            <div
              ref={canvasRef}
              className="relative w-full aspect-[16/9] bg-cover bg-center overflow-hidden shadow-2xl transition-all duration-300 rounded-md"
              style={{ backgroundImage: `url(${currentTemplate.bg})` }}
            >
              {/* 슬라이드 내부 실시간 텍스트 매핑 */}
              <div className="absolute left-[7%] top-[25%] right-[20%] text-left space-y-3 pointer-events-none">
                <h1
                  className="text-3xl lg:text-5xl font-bold tracking-tight break-keep leading-tight"
                  style={{ color: isSlideLight ? '#000000' : '#ffffff' }}
                >
                  {slideData.mainTitle}
                </h1>

                <h2
                  className="text-xl lg:text-3xl font-semibold tracking-tight break-keep"
                  style={{ color: isSlideLight ? '#B1B1B1' : '#d1d5db' }}
                >
                  {slideData.subTitle}
                </h2>

                <div
                  className="pt-6 flex items-center space-x-2 text-xs lg:text-base font-medium"
                  style={{ color: isSlideLight ? '#363636' : '#d1d5db' }}
                >
                  <span>{slideData.department}</span>
                  <span className="opacity-40">|</span>
                  <span>{slideData.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};