'use client';

import React, { useState, useRef } from 'react';

interface SlideData {
  theme: string;
  mainTitle: string;
  subTitle: string;
  department: string;
  author: string;
  fontFamily: string;
  titleColor: string;
  titleFontSize: number;
}

const TEMPLATE_OPTIONS = [
  { id: 'dark-a', name: 'Dark Stripe A', desc: '하단 시그니처 스트라이프', bg: '/templates/bg-dark-a.svg', isLight: false },
  { id: 'light-b', name: 'Light Pattern B', desc: '블루 라인 패턴', bg: '/templates/bg-light-b.svg', isLight: true },
  { id: 'dark-x', name: 'Dark X-Brand', desc: '대형 브랜드 X 패턴', bg: '/templates/bg-dark-x.svg', isLight: false },
  { id: 'light-stripe', name: 'Light Side Stripe', desc: '우측 전면 사이드 스트라이프', bg: '/templates/bg-light-stripe.svg', isLight: true },
];

const FONT_OPTIONS = [
  { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { label: 'Pretendard', value: "'Pretendard', sans-serif" },
  { label: 'Unica 77 LL', value: "'Unica 77 LL', sans-serif" },
];

const COLOR_PALETTE = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#B1B1B1' },
  { name: 'Cyan', hex: '#40E2FF' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Yellow', hex: '#FFFF00' },
];

export const TemplateEditor = () => {
  const [platformTheme, setPlatformTheme] = useState<'dark' | 'light'>('dark');

  const [slideData, setSlideData] = useState<SlideData>({
    theme: 'dark-a',
    mainTitle: 'MaxGauge 기반 DB 성능 분석 보고서',
    subTitle: '2026년 하반기 시스템 최적화 제안',
    department: 'DB 컨설팅 1팀',
    author: '홍길동 팀장',
    fontFamily: "'Pretendard', sans-serif",
    titleColor: '#FFFFFF',
    titleFontSize: 44, // 기본 폰트 크기
  });

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const currentTemplate = TEMPLATE_OPTIONS.find((t) => t.id === slideData.theme) || TEMPLATE_OPTIONS[0];
  const isPlatformDark = platformTheme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isPlatformDark ? 'bg-[#0a0d14] text-slate-100' : 'bg-[#f4f6f8] text-slate-900'
      }`}
    >
      {/* ===== 상단 헤더 ===== */}
      <header
        className={`border-b px-8 py-4 flex justify-between items-center backdrop-blur-md transition-colors duration-300 ${
          isPlatformDark ? 'bg-[#111622]/80 border-slate-800/80' : 'bg-white/80 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3">
          <img
            src="/logo/Logo_White.svg"
            alt="EXEM Logo"
            className={`h-6 w-auto transition-all ${!isPlatformDark ? 'invert' : ''}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00e6a5]/10 text-[#00e6a5] border border-[#00e6a5]/20">
            Studio Canvas
          </span>
        </div>

        <button
          onClick={() => setPlatformTheme(isPlatformDark ? 'light' : 'dark')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
            isPlatformDark
              ? 'border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 hover:border-[#00e6a5]/40'
              : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm'
          }`}
        >
          <span>{isPlatformDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
        </button>
      </header>

      {/* ===== 메인 컨텐츠 영역 ===== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 max-w-[1800px] mx-auto w-full">
        {/* ===== 왼쪽 사이드바 옵션 패널 ===== */}
        <div
          className={`lg:col-span-4 border rounded-2xl p-6 space-y-6 h-fit transition-colors duration-300 ${
            isPlatformDark
              ? 'bg-[#111622] border-slate-800/80 shadow-2xl shadow-black/40'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}
        >
          {/* 1. 템플릿 선택 (한 줄에 하나씩 나열) */}
          <div>
            <h2 className="font-bold text-base tracking-tight mb-1">템플릿 선택</h2>
            <p className={`text-xs mb-3 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
              원하는 디자인 슬라이드 스타일을 선택하세요.
            </p>

            <div className="flex flex-col space-y-2">
              {TEMPLATE_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setSlideData((prev) => ({
                      ...prev,
                      theme: item.id,
                      // 템플릿 기본 폰트 색상 가이드 세팅
                      titleColor: item.isLight ? '#000000' : '#FFFFFF',
                    }))
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                    slideData.theme === item.id
                      ? 'border-[#00e6a5] bg-[#00e6a5]/5 ring-1 ring-[#00e6a5]'
                      : isPlatformDark
                      ? 'border-slate-800 bg-[#0d111a] hover:border-slate-700 hover:bg-slate-800/50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs">{item.name}</div>
                    <div className={`text-[11px] ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.desc}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      item.isLight ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-400'
                    }`}
                  >
                    {item.isLight ? 'Light' : 'Dark'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <hr className={isPlatformDark ? 'border-slate-800' : 'border-slate-200'} />

          {/* 2. 타이포그래피 & 스타일 옵션 (폰트, 컬러, 크기) */}
          <div className="space-y-4">
            <h3 className={`font-bold text-sm ${isPlatformDark ? 'text-slate-200' : 'text-slate-700'}`}>
              스타일 옵션
            </h3>

            {/* 폰트 선택 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                폰트 패밀리
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setSlideData((prev) => ({ ...prev, fontFamily: f.value }))}
                    className={`py-2 px-2 text-center rounded-lg border text-xs font-medium transition ${
                      slideData.fontFamily === f.value
                        ? 'border-[#00e6a5] bg-[#00e6a5]/10 text-[#00e6a5]'
                        : isPlatformDark
                        ? 'border-slate-800 bg-[#0d111a] hover:border-slate-700 text-slate-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 폰트 컬러 선택 팔레트 */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                텍스트 컬러
              </label>
              <div className="flex items-center space-x-2">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSlideData((prev) => ({ ...prev, titleColor: c.hex }))}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 flex items-center justify-center ${
                      slideData.titleColor === c.hex ? 'border-[#00e6a5] scale-110 ring-2 ring-[#00e6a5]/30' : 'border-slate-700'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {slideData.titleColor === c.hex && (
                      <span className={c.hex === '#FFFFFF' || c.hex === '#FFFF00' || c.hex === '#40E2FF' ? 'text-black text-xs font-bold' : 'text-white text-xs font-bold'}>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 폰트 사이즈 컨트롤러 */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={`text-xs font-semibold ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  제목 폰트 크기
                </label>
                <span className="text-xs font-mono text-[#00e6a5]">{slideData.titleFontSize}px</span>
              </div>
              <input
                type="range"
                min={24}
                max={72}
                step={2}
                value={slideData.titleFontSize}
                onChange={(e) => setSlideData((prev) => ({ ...prev, titleFontSize: Number(e.target.value) }))}
                className="w-full accent-[#00e6a5] bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <hr className={isPlatformDark ? 'border-slate-800' : 'border-slate-200'} />

          {/* 3. 콘텐츠 텍스트 편집 */}
          <div className="space-y-4">
            <h3 className={`font-bold text-sm ${isPlatformDark ? 'text-slate-200' : 'text-slate-700'}`}>
              콘텐츠 편집
            </h3>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                메인 제목
              </label>
              <textarea
                rows={2}
                value={slideData.mainTitle}
                onChange={(e) => setSlideData({ ...slideData, mainTitle: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:border-[#00e6a5] focus:ring-1 focus:ring-[#00e6a5] focus:outline-none resize-none transition-all ${
                  isPlatformDark
                    ? 'bg-[#0d111a] border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                부제목 / 서브 타이틀
              </label>
              <input
                type="text"
                value={slideData.subTitle}
                onChange={(e) => setSlideData({ ...slideData, subTitle: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:border-[#00e6a5] focus:ring-1 focus:ring-[#00e6a5] focus:outline-none transition-all ${
                  isPlatformDark
                    ? 'bg-[#0d111a] border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="부제목을 입력하세요"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  소속팀
                </label>
                <input
                  type="text"
                  value={slideData.department}
                  onChange={(e) => setSlideData({ ...slideData, department: e.target.value })}
                  className={`w-full border rounded-xl p-3 text-sm focus:border-[#00e6a5] focus:ring-1 focus:ring-[#00e6a5] focus:outline-none transition-all ${
                    isPlatformDark ? 'bg-[#0d111a] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  작성자
                </label>
                <input
                  type="text"
                  value={slideData.author}
                  onChange={(e) => setSlideData({ ...slideData, author: e.target.value })}
                  className={`w-full border rounded-xl p-3 text-sm focus:border-[#00e6a5] focus:ring-1 focus:ring-[#00e6a5] focus:outline-none transition-all ${
                    isPlatformDark ? 'bg-[#0d111a] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== 오른쪽 캔버스 미리보기 패널 ===== */}
        <div className="lg:col-span-8 flex flex-col justify-start space-y-4">
          <div className={`flex justify-between items-center text-xs font-medium px-1 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>실시간 Canvas 미리보기 (16:9)</span>
          </div>

          <div
            className={`w-full flex justify-center items-center p-6 rounded-2xl border transition-colors duration-300 ${
              isPlatformDark
                ? 'bg-[#111622] border-slate-800/80 shadow-2xl'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}
          >
            <div
              ref={canvasRef}
              className="relative w-full aspect-[16/9] bg-cover bg-center overflow-hidden shadow-2xl transition-all duration-300 rounded-lg border border-white/10"
              style={{
                backgroundImage: `url(${currentTemplate.bg})`,
                fontFamily: slideData.fontFamily,
              }}
            >
              {/* 슬라이드 텍스트 캔버스 매핑 */}
              <div className="absolute left-[7%] top-[25%] right-[20%] text-left space-y-3 pointer-events-none">
                <h1
                  className="font-bold tracking-tight break-keep leading-tight transition-all"
                  style={{
                    color: slideData.titleColor,
                    fontSize: `${slideData.titleFontSize}px`,
                  }}
                >
                  {slideData.mainTitle}
                </h1>

                <h2
                  className="text-xl lg:text-2xl font-semibold tracking-tight break-keep opacity-80"
                  style={{ color: slideData.titleColor }}
                >
                  {slideData.subTitle}
                </h2>

                <div
                  className="pt-6 flex items-center space-x-2 text-xs lg:text-base font-medium opacity-80"
                  style={{ color: slideData.titleColor }}
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