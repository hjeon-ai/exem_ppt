'use client';

import React, { useState, useRef } from 'react';

interface SlideItem {
  id: string;
  type: 'cover' | 'content' | 'ending';
  title: string;
  mainTitle: string;
  subTitle: string;
  department: string;
  author: string;
}

interface TemplateConfig {
  theme: string;
  fontFamily: string;
  titleColor: string;
  titleFontSize: number;
}

const TEMPLATE_OPTIONS = [
  { id: 'dark-a', name: 'Dark A', desc: '하단 시그니처 스트라이프', bg: '/templates/bg-dark-a.svg', isLight: false },
  { id: 'dark-b', name: 'Dark B', desc: '대형 브랜드 X 패턴', bg: '/templates/bg-dark-x.svg', isLight: false },
  { id: 'light-a', name: 'Light A', desc: '블루 라인 패턴', bg: '/templates/bg-light-b.svg', isLight: true },
  { id: 'light-b', name: 'Light B', desc: '우측 전면 스트라이프', bg: '/templates/bg-light-stripe.svg', isLight: true },
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
  const [platformTheme, setPlatformTheme] = useState<'dark' | 'light'>('light');

  // 전체 슬라이드 공통 글로벌 스타일 Config
  const [styleConfig, setStyleConfig] = useState<TemplateConfig>({
    theme: 'dark-a',
    fontFamily: "'Pretendard', sans-serif",
    titleColor: '#FFFFFF',
    titleFontSize: 44,
  });

  // 하단 슬라이드 목록 (표지, 내지 1, 엔딩)
  const [slides, setSlides] = useState<SlideItem[]>([
    {
      id: 'slide-1',
      type: 'cover',
      title: '메인 표지',
      mainTitle: 'MaxGauge 기반 DB 성능 분석 보고서',
      subTitle: '2026년 하반기 시스템 최적화 제안',
      department: 'DB 컨설팅 1팀',
      author: '홍길동 팀장',
    },
    {
      id: 'slide-2',
      type: 'content',
      title: '내지 1',
      mainTitle: '주요 시스템 성능 지표 요약',
      subTitle: 'CPU 및 Memory 사용률 추이 분석',
      department: 'DB 컨설팅 1팀',
      author: '홍길동 팀장',
    },
    {
      id: 'slide-3',
      type: 'ending',
      title: '엔딩',
      mainTitle: '감사합니다',
      subTitle: 'Q&A 및 질의응답',
      department: 'EXEM Studio',
      author: 'contact@exem.com',
    },
  ]);

  const [activeSlideId, setActiveSlideId] = useState<string>('slide-1');
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const currentTemplate = TEMPLATE_OPTIONS.find((t) => t.id === styleConfig.theme) || TEMPLATE_OPTIONS[0];
  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];
  const isPlatformDark = platformTheme === 'dark';

  // 활성 슬라이드 데이터 변경 핸들러
  const updateActiveSlide = (key: keyof SlideItem, value: string) => {
    setSlides((prev) =>
      prev.map((slide) => (slide.id === activeSlideId ? { ...slide, [key]: value } : slide))
    );
  };

  // 내지 슬라이드 추가 (+)
  const handleAddSlide = () => {
    const nextContentIndex = slides.filter((s) => s.type === 'content').length + 1;
    const newSlideId = `slide-${Date.now()}`;
    const newSlide: SlideItem = {
      id: newSlideId,
      type: 'content',
      title: `내지 ${nextContentIndex}`,
      mainTitle: `내지 ${nextContentIndex} 제목을 입력하세요`,
      subTitle: '상세 설명 및 세부 내용을 작성하는 공간입니다.',
      department: activeSlide.department,
      author: activeSlide.author,
    };

    // 엔딩 슬라이드 직전에 내지 삽입
    const endingIndex = slides.findIndex((s) => s.type === 'ending');
    const updated = [...slides];
    if (endingIndex !== -1) {
      updated.splice(endingIndex, 0, newSlide);
    } else {
      updated.push(newSlide);
    }

    setSlides(updated);
    setActiveSlideId(newSlideId);
  };

  // 슬라이드 삭제 (✕)
  const handleDeleteSlide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (slides.length <= 1) return;

    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    if (activeSlideId === id) {
      setActiveSlideId(updated[0].id);
    }
  };

  // 동적 테마 클래스
  const activeBorderClass = isPlatformDark
    ? 'border-[#00e6a5] bg-[#00e6a5]/10 text-[#00e6a5]'
    : 'border-slate-800 bg-slate-800 text-white';

  const activeBadgeClass = isPlatformDark
    ? 'bg-[#00e6a5]/10 text-[#00e6a5] border-[#00e6a5]/20'
    : 'bg-slate-200 text-slate-800 border-slate-300';

  const accentTextClass = isPlatformDark ? 'text-[#00e6a5]' : 'text-slate-800';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isPlatformDark ? 'bg-[#0a0d14] text-slate-100' : 'bg-[#f4f6f8] text-slate-900'
      }`}
    >
      {/* ===== 상단 헤더 ===== */}
      <header
        className={`border-b px-6 py-3 flex justify-between items-center backdrop-blur-md transition-colors duration-300 ${
          isPlatformDark ? 'bg-[#111622]/80 border-slate-800/80' : 'bg-white/80 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3">
          <img
            src="/logo/Logo_White.svg"
            alt="EXEM Logo"
            className={`h-5 w-auto transition-all ${!isPlatformDark ? 'invert' : ''}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${activeBadgeClass}`}>
            Studio Canvas
          </span>
        </div>

        <button
          onClick={() => setPlatformTheme(isPlatformDark ? 'light' : 'dark')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg border text-xs font-medium transition-all duration-200 ${
            isPlatformDark
              ? 'border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200'
              : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
          }`}
        >
          <span>{isPlatformDark ? '☀️ Light' : '🌙 Dark'}</span>
        </button>
      </header>

      {/* ===== 메인 레이아웃 (좌측 사이드바 - 중앙 캔버스 - 우측 사이드바) ===== */}
      <div className="flex-1 flex gap-5 p-5 max-w-[1920px] mx-auto w-full items-start">
        
        {/* ===== 1. 좌측 사이드바: 템플릿 & 스타일 옵션 (w-48) ===== */}
        <div
          className={`w-48 shrink-0 border rounded-2xl p-3.5 space-y-4 transition-colors duration-300 ${
            isPlatformDark
              ? 'bg-[#111622] border-slate-800/80 shadow-2xl'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          {/* 템플릿 선택 (Dark A, Dark B, Light A, Light B) */}
          <div>
            <h2 className="font-bold text-xs tracking-tight mb-0.5">템플릿 선택</h2>
            <p className={`text-[10px] mb-2 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
              슬라이드 디자인 테마
            </p>

            <div className="flex flex-col space-y-1.5">
              {TEMPLATE_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setStyleConfig((prev) => ({
                      ...prev,
                      theme: item.id,
                      titleColor: item.isLight ? '#000000' : '#FFFFFF',
                    }))
                  }
                  className={`p-2 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-1 ${
                    styleConfig.theme === item.id
                      ? activeBorderClass
                      : isPlatformDark
                      ? 'border-slate-800 bg-[#0d111a] hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-[11px] truncate">{item.name}</span>
                    <span
                      className={`text-[8px] px-1 py-0.2 rounded font-medium ${
                        item.isLight ? 'bg-amber-500/10 text-amber-600' : 'bg-indigo-500/10 text-indigo-500'
                      }`}
                    >
                      {item.isLight ? 'Light' : 'Dark'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <hr className={isPlatformDark ? 'border-slate-800' : 'border-slate-200'} />

          {/* 스타일 옵션 */}
          <div className="space-y-3">
            <h3 className={`font-bold text-xs ${isPlatformDark ? 'text-slate-200' : 'text-slate-700'}`}>
              스타일 옵션
            </h3>

            {/* 폰트 선택 */}
            <div>
              <label className={`block text-[10px] font-semibold mb-1 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                폰트 패밀리
              </label>
              <div className="flex flex-col space-y-1">
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setStyleConfig((prev) => ({ ...prev, fontFamily: f.value }))}
                    className={`py-1 px-2 text-left rounded-lg border text-[10px] font-medium transition truncate ${
                      styleConfig.fontFamily === f.value
                        ? activeBorderClass
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

            {/* 텍스트 컬러 팔레트 */}
            <div>
              <label className={`block text-[10px] font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                텍스트 컬러
              </label>
              <div className="flex items-center justify-between px-0.5">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setStyleConfig((prev) => ({ ...prev, titleColor: c.hex }))}
                    title={c.name}
                    className={`w-5 h-5 rounded-full transition-transform transform hover:scale-110 flex items-center justify-center ${
                      c.hex === '#FFFFFF' ? 'border border-slate-300' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {styleConfig.titleColor === c.hex && (
                      <span className={c.hex === '#FFFFFF' || c.hex === '#FFFF00' || c.hex === '#40E2FF' ? 'text-black text-[9px] font-bold' : 'text-white text-[9px] font-bold'}>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 폰트 크기 슬라이더 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`text-[10px] font-semibold ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  제목 크기
                </label>
                <span className={`text-[10px] font-mono font-bold ${accentTextClass}`}>{styleConfig.titleFontSize}px</span>
              </div>
              <input
                type="range"
                min={24}
                max={72}
                step={2}
                value={styleConfig.titleFontSize}
                onChange={(e) => setStyleConfig((prev) => ({ ...prev, titleFontSize: Number(e.target.value) }))}
                className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${
                  isPlatformDark ? 'accent-[#00e6a5] bg-slate-700' : 'accent-slate-800 bg-slate-300'
                }`}
              />
            </div>
          </div>
        </div>

        {/* ===== 2. 중앙 영역 (캔버스 미리보기 + 하단 슬라이드 탭) ===== */}
        <div className="flex-1 flex flex-col justify-start space-y-3">
          <div className={`flex justify-between items-center text-xs font-medium px-1 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>실시간 Canvas 미리보기 — <strong className={accentTextClass}>{activeSlide.title}</strong></span>
          </div>

          {/* 캔버스 화면 */}
          <div
            className={`w-full flex justify-center items-center p-4 rounded-2xl border transition-colors duration-300 ${
              isPlatformDark
                ? 'bg-[#111622] border-slate-800/80 shadow-2xl'
                : 'bg-white border-slate-200 shadow-md'
            }`}
          >
            <div
              ref={canvasRef}
              className="relative w-full aspect-[16/9] bg-cover bg-center overflow-hidden shadow-xl transition-all duration-300 rounded-lg border border-slate-500/10"
              style={{
                backgroundImage: `url(${currentTemplate.bg})`,
                fontFamily: styleConfig.fontFamily,
              }}
            >
              {/* 슬라이드 텍스트 캔버스 매핑 */}
              <div className="absolute left-[7%] top-[25%] right-[20%] text-left space-y-3 pointer-events-none">
                <h1
                  className="font-bold tracking-tight break-keep leading-tight transition-all"
                  style={{
                    color: styleConfig.titleColor,
                    fontSize: `${styleConfig.titleFontSize}px`,
                  }}
                >
                  {activeSlide.mainTitle}
                </h1>

                <h2
                  className="text-xl lg:text-2xl font-semibold tracking-tight break-keep opacity-80"
                  style={{ color: styleConfig.titleColor }}
                >
                  {activeSlide.subTitle}
                </h2>

                <div
                  className="pt-6 flex items-center space-x-2 text-xs lg:text-base font-medium opacity-80"
                  style={{ color: styleConfig.titleColor }}
                >
                  <span>{activeSlide.department}</span>
                  <span className="opacity-40">|</span>
                  <span>{activeSlide.author}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 슬라이드 네비게이션 탭 (메인, 내지, 엔딩 + 추가 버튼) */}
          <div
            className={`p-2.5 rounded-xl border flex items-center space-x-2 overflow-x-auto transition-colors ${
              isPlatformDark ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <span className={`text-[10px] font-semibold px-2 shrink-0 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
              페이지 목록:
            </span>

            {slides.map((slide) => {
              const isActive = slide.id === activeSlideId;
              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideId(slide.id)}
                  className={`group relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                    isActive
                      ? activeBorderClass
                      : isPlatformDark
                      ? 'border-slate-800 bg-[#0d111a] hover:border-slate-700 text-slate-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{slide.title}</span>
                  
                  {/* 삭제 버튼 (내지 추가건 삭제 가능) */}
                  {slides.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteSlide(e, slide.id)}
                      className="ml-1 opacity-40 hover:opacity-100 hover:text-red-500 transition-opacity text-[10px]"
                      title="슬라이드 삭제"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}

            {/* + 슬라이드 추가 버튼 */}
            <button
              onClick={handleAddSlide}
              className={`flex items-center justify-center space-x-1 px-3 py-1.5 rounded-lg border border-dashed text-xs font-semibold transition-all shrink-0 ${
                isPlatformDark
                  ? 'border-slate-700 hover:border-[#00e6a5] hover:text-[#00e6a5] text-slate-400'
                  : 'border-slate-300 hover:border-slate-800 hover:text-slate-900 text-slate-600'
              }`}
              title="새 내지 슬라이드 추가"
            >
              <span>+ 내지 추가</span>
            </button>
          </div>
        </div>

        {/* ===== 3. 우측 사이드바: 콘텐츠 편집 (w-72) ===== */}
        <div
          className={`w-72 shrink-0 border rounded-2xl p-4 space-y-4 transition-colors duration-300 ${
            isPlatformDark
              ? 'bg-[#111622] border-slate-800/80 shadow-2xl'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm tracking-tight">콘텐츠 편집</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeBadgeClass}`}>
                {activeSlide.title}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-500'}`}>
              현재 선택된 슬라이드의 텍스트를 수정합니다.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                메인 제목
              </label>
              <textarea
                rows={3}
                value={activeSlide.mainTitle}
                onChange={(e) => updateActiveSlide('mainTitle', e.target.value)}
                className={`w-full border rounded-xl p-3 text-xs focus:outline-none resize-none transition-all ${
                  isPlatformDark
                    ? 'bg-[#0d111a] border-slate-800 text-slate-100 focus:border-[#00e6a5]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800 focus:bg-white'
                }`}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                부제목 / 상세 설명
              </label>
              <input
                type="text"
                value={activeSlide.subTitle}
                onChange={(e) => updateActiveSlide('subTitle', e.target.value)}
                className={`w-full border rounded-xl p-3 text-xs focus:outline-none transition-all ${
                  isPlatformDark
                    ? 'bg-[#0d111a] border-slate-800 text-slate-100 focus:border-[#00e6a5]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800 focus:bg-white'
                }`}
                placeholder="부제목을 입력하세요"
              />
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  소속팀 / 브랜드
                </label>
                <input
                  type="text"
                  value={activeSlide.department}
                  onChange={(e) => updateActiveSlide('department', e.target.value)}
                  className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none transition-all ${
                    isPlatformDark
                      ? 'bg-[#0d111a] border-slate-800 text-slate-100 focus:border-[#00e6a5]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800 focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isPlatformDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  작성자 / 연락처
                </label>
                <input
                  type="text"
                  value={activeSlide.author}
                  onChange={(e) => updateActiveSlide('author', e.target.value)}
                  className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none transition-all ${
                    isPlatformDark
                      ? 'bg-[#0d111a] border-slate-800 text-slate-100 focus:border-[#00e6a5]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800 focus:bg-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};