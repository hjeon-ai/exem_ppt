"use client";

import { CanvasElement, CanvasTemplate, ThemeKey } from "../types";

export type { ThemeKey };

interface TextSlot {
  key: string;
  top: string;
  left: string;
  width: string;
  fontSize: number;
  fontWeight: "normal" | "bold" | "600";
  color: string;
  lineHeight?: number;
  letterSpacing?: string;
  textShadow?: string;
}

interface ThemeConfig {
  backgroundImage: string;
  width: number;
  height: number;
  slots: TextSlot[];
}

export const THEME_CONFIGS: Record<ThemeKey, ThemeConfig> = {
  "dark-a": {
    backgroundImage: "/templates/bg-dark-a.png",
    width: 892,
    height: 502,
    slots: [
      {
        key: "title",
        top: "21%",
        left: "5.5%",
        width: "58%",
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "subtitle",
        top: "36%",
        left: "5.5%",
        width: "55%",
        fontSize: 22,
        fontWeight: "600",
        color: "#9ca3af",
        lineHeight: 1.3,
      },
      {
        key: "author",
        top: "46%",
        left: "5.5%",
        width: "40%",
        fontSize: 13,
        fontWeight: "normal",
        color: "#e2e8f0",
        lineHeight: 1.4,
      },
    ],
  },
  "dark-x": {
    backgroundImage: "/templates/bg-dark-x.png",
    width: 446,
    height: 251,
    slots: [
      {
        key: "title",
        top: "20%",
        left: "5.5%",
        width: "58%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#ffffff",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "subtitle",
        top: "36%",
        left: "5.5%",
        width: "55%",
        fontSize: 11,
        fontWeight: "600",
        color: "#9ca3af",
        lineHeight: 1.3,
      },
      {
        key: "author",
        top: "46%",
        left: "5.5%",
        width: "40%",
        fontSize: 7,
        fontWeight: "normal",
        color: "#e2e8f0",
        lineHeight: 1.4,
      },
    ],
  },
  "light-b": {
    backgroundImage: "/templates/bg-light-b.png",
    width: 446,
    height: 251,
    slots: [
      {
        key: "titleLine1",
        top: "21%",
        left: "5.5%",
        width: "58%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#111827",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "titleLine2",
        top: "32%",
        left: "5.5%",
        width: "58%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#111827",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "subtitle",
        top: "52%",
        left: "5.5%",
        width: "55%",
        fontSize: 11,
        fontWeight: "600",
        color: "#9ca3af",
        lineHeight: 1.3,
      },
      {
        key: "author",
        top: "62%",
        left: "5.5%",
        width: "40%",
        fontSize: 7,
        fontWeight: "normal",
        color: "#6b7280",
        lineHeight: 1.4,
      },
    ],
  },
  "light-stripe": {
    backgroundImage: "/templates/bg-light-stripe.png",
    width: 446,
    height: 251,
    slots: [
      {
        key: "titleLine1",
        top: "21%",
        left: "5.5%",
        width: "58%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#111827",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "titleLine2",
        top: "32%",
        left: "5.5%",
        width: "58%",
        fontSize: 15,
        fontWeight: "bold",
        color: "#111827",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      {
        key: "subtitle",
        top: "52%",
        left: "5.5%",
        width: "55%",
        fontSize: 11,
        fontWeight: "600",
        color: "#9ca3af",
        lineHeight: 1.3,
      },
      {
        key: "author",
        top: "62%",
        left: "5.5%",
        width: "40%",
        fontSize: 7,
        fontWeight: "normal",
        color: "#6b7280",
        lineHeight: 1.4,
      },
    ],
  },
};

export interface ThemedCanvasTemplate extends CanvasTemplate {}

interface CanvasPreviewProps {
  template: ThemedCanvasTemplate;
  scale?: number;
  interactive?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  onElementMouseDown?: (id: string, e: React.MouseEvent) => void;
  showGrid?: boolean;
  className?: string;
  themeKey?: ThemeKey;
}

export function resolveThemeKey(
  template: ThemedCanvasTemplate,
  override?: ThemeKey
): ThemeKey | null {
  if (override) return override;
  if (template.themeKey && template.themeKey in THEME_CONFIGS) {
    return template.themeKey;
  }

  const name = template.name.toLowerCase();
  const entries = Object.keys(THEME_CONFIGS) as ThemeKey[];
  for (const key of entries) {
    if (name.includes(key.replace("-", " ")) || name.includes(key)) {
      return key;
    }
  }

  return null;
}

function getTextElements(template: CanvasTemplate): CanvasElement[] {
  return [...template.elements]
    .filter((el) => el.type === "text")
    .sort((a, b) => a.zIndex - b.zIndex);
}

function renderThemedText(
  element: CanvasElement,
  slot: TextSlot,
  isSelected: boolean,
  interactive: boolean,
  onSelect?: (id: string) => void,
  onElementMouseDown?: (id: string, e: React.MouseEvent) => void
) {
  const content = element.content?.trim() || "";
  if (!content) return null;

  const selectionRing = isSelected && interactive && (
    <div className="pointer-events-none absolute inset-0 rounded-sm ring-2 ring-exem-400 ring-offset-1 ring-offset-transparent" />
  );

  return (
    <div
      key={element.id}
      data-element-id={element.id}
      data-slot={slot.key}
      className="absolute"
      style={{
        top: slot.top,
        left: slot.left,
        width: slot.width,
        color: slot.color,
        fontSize: element.fontSize ?? slot.fontSize,
        fontWeight: element.fontWeight ?? slot.fontWeight,
        fontFamily: element.fontFamily ?? "Pretendard, sans-serif",
        textAlign: element.textAlign ?? "left",
        lineHeight: slot.lineHeight ?? 1.35,
        letterSpacing: slot.letterSpacing,
        textShadow: slot.textShadow,
        whiteSpace: "pre-wrap",
        wordBreak: "keep-all",
        zIndex: element.zIndex + 10,
        cursor: interactive && !element.locked ? "pointer" : "default",
        pointerEvents: element.locked ? "none" : "auto",
      }}
      onMouseDown={(e) => {
        if (interactive && !element.locked) {
          e.stopPropagation();
          onSelect?.(element.id);
          onElementMouseDown?.(element.id, e);
        }
      }}
    >
      {content}
      {selectionRing}
    </div>
  );
}

function renderElement(
  element: CanvasElement,
  isSelected: boolean,
  interactive: boolean,
  onSelect?: (id: string) => void,
  onElementMouseDown?: (id: string, e: React.MouseEvent) => void
) {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
    zIndex: element.zIndex,
    cursor: interactive && !element.locked ? "move" : "default",
    pointerEvents: element.locked ? "none" : "auto",
    boxSizing: "border-box",
  };

  const selectionRing = isSelected && interactive && (
    <div
      className="pointer-events-none absolute inset-0 rounded-sm ring-2 ring-exem-400 ring-offset-1 ring-offset-transparent"
      style={{ zIndex: 9999 }}
    />
  );

  switch (element.type) {
    case "text":
      return (
        <div
          key={element.id}
          style={{
            ...baseStyle,
            color: element.fill,
            fontSize: element.fontSize,
            fontWeight: element.fontWeight,
            fontFamily: element.fontFamily,
            textAlign: element.textAlign,
            display: "flex",
            alignItems: "center",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.3,
          }}
          data-element-id={element.id}
          onMouseDown={(e) => {
            if (interactive && !element.locked) {
              e.stopPropagation();
              onSelect?.(element.id);
              onElementMouseDown?.(element.id, e);
            }
          }}
        >
          {element.content}
          {selectionRing}
        </div>
      );

    case "rect":
      return (
        <div
          key={element.id}
          style={{
            ...baseStyle,
            backgroundColor: element.fill,
            border: `${element.strokeWidth}px solid ${element.stroke}`,
            borderRadius: element.borderRadius ?? 0,
          }}
          data-element-id={element.id}
          onMouseDown={(e) => {
            if (interactive && !element.locked) {
              e.stopPropagation();
              onSelect?.(element.id);
              onElementMouseDown?.(element.id, e);
            }
          }}
        >
          {selectionRing}
        </div>
      );

    case "circle":
      return (
        <div
          key={element.id}
          style={{
            ...baseStyle,
            backgroundColor: element.fill,
            border: `${element.strokeWidth}px solid ${element.stroke}`,
            borderRadius: "50%",
          }}
          data-element-id={element.id}
          onMouseDown={(e) => {
            if (interactive && !element.locked) {
              e.stopPropagation();
              onSelect?.(element.id);
              onElementMouseDown?.(element.id, e);
            }
          }}
        >
          {selectionRing}
        </div>
      );

    case "line":
      return (
        <div
          key={element.id}
          style={{
            ...baseStyle,
            display: "flex",
            alignItems: "center",
          }}
          data-element-id={element.id}
          onMouseDown={(e) => {
            if (interactive && !element.locked) {
              e.stopPropagation();
              onSelect?.(element.id);
              onElementMouseDown?.(element.id, e);
            }
          }}
        >
          <div
            style={{
              width: "100%",
              height: element.strokeWidth,
              backgroundColor: element.stroke,
              borderRadius: element.strokeWidth / 2,
            }}
          />
          {selectionRing}
        </div>
      );

    case "image":
      return (
        <div
          key={element.id}
          style={{
            ...baseStyle,
            border: `${element.strokeWidth}px solid ${element.stroke}`,
            borderRadius: element.borderRadius ?? 0,
            overflow: "hidden",
            backgroundColor: "#1e293b",
          }}
          data-element-id={element.id}
          onMouseDown={(e) => {
            if (interactive && !element.locked) {
              e.stopPropagation();
              onSelect?.(element.id);
              onElementMouseDown?.(element.id, e);
            }
          }}
        >
          {element.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={element.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-slate-500">
              <svg
                className="mb-1 h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">이미지</span>
            </div>
          )}
          {selectionRing}
        </div>
      );

    default:
      return null;
  }
}

function ThemedCanvas({
  template,
  theme,
  scale,
  interactive,
  selectedId,
  onSelect,
  onElementMouseDown,
  showGrid,
  className,
}: {
  template: ThemedCanvasTemplate;
  theme: ThemeConfig;
  scale: number;
  interactive: boolean;
  selectedId: string | null;
  onSelect?: (id: string | null) => void;
  onElementMouseDown?: (id: string, e: React.MouseEvent) => void;
  showGrid: boolean;
  className: string;
}) {
  const canvasWidth = theme.width;
  const canvasHeight = theme.height;
  const textElements = getTextElements(template);

  return (
    <div
      className={`relative overflow-hidden shadow-2xl ${className}`}
      style={{
        width: canvasWidth * scale,
        height: canvasHeight * scale,
      }}
    >
      <div
        className={`relative origin-top-left ${showGrid ? "canvas-grid" : ""}`}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: template.backgroundColor,
          backgroundImage: `url(${theme.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `scale(${scale})`,
        }}
        onClick={() => interactive && onSelect?.(null)}
      >
        {theme.slots.map((slot, index) => {
          const element = textElements[index];
          if (!element) return null;
          return renderThemedText(
            element,
            slot,
            selectedId === element.id,
            interactive,
            onSelect ?? undefined,
            onElementMouseDown
          );
        })}
      </div>
    </div>
  );
}

export default function CanvasPreview({
  template,
  scale = 1,
  interactive = false,
  selectedId = null,
  onSelect,
  onElementMouseDown,
  showGrid = false,
  className = "",
  themeKey,
}: CanvasPreviewProps) {
  const resolvedThemeKey = resolveThemeKey(template, themeKey);

  if (resolvedThemeKey) {
    const theme = THEME_CONFIGS[resolvedThemeKey];
    return (
      <ThemedCanvas
        template={template}
        theme={theme}
        scale={scale}
        interactive={interactive}
        selectedId={selectedId}
        onSelect={onSelect}
        onElementMouseDown={onElementMouseDown}
        showGrid={showGrid}
        className={className}
      />
    );
  }

  const sortedElements = [...template.elements].sort(
    (a, b) => a.zIndex - b.zIndex
  );

  return (
    <div
      className={`relative overflow-hidden shadow-2xl ${className}`}
      style={{
        width: template.width * scale,
        height: template.height * scale,
      }}
    >
      <div
        className={`relative origin-top-left ${showGrid ? "canvas-grid" : ""}`}
        style={{
          width: template.width,
          height: template.height,
          backgroundColor: template.backgroundColor,
          transform: `scale(${scale})`,
        }}
        onClick={() => interactive && onSelect?.(null)}
      >
        {sortedElements.map((element) =>
          renderElement(
            element,
            selectedId === element.id,
            interactive,
            onSelect ?? undefined,
            onElementMouseDown
          )
        )}
      </div>
    </div>
  );
}
