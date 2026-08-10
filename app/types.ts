export type ElementType = "text" | "rect" | "circle" | "line" | "image";

export type ThemeKey = "dark-a" | "light-b" | "dark-x" | "light-stripe";

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  zIndex: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  content?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
  borderRadius?: number;
  imageUrl?: string;
}

export interface CanvasTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  themeKey?: ThemeKey;
  elements: CanvasElement[];
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  selectedId: string | null;
  zoom: number;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

export type ToolMode = "select" | "text" | "rect" | "circle" | "line" | "image";

export const DEFAULT_CANVAS_WIDTH = 1280;
export const DEFAULT_CANVAS_HEIGHT = 720;

export const THEME_KEYS: ThemeKey[] = [
  "dark-a",
  "light-b",
  "dark-x",
  "light-stripe",
];

export const THEME_META: Record<
  ThemeKey,
  {
    label: string;
    width: number;
    height: number;
    backgroundColor: string;
    slotLabels: string[];
    defaultTexts: string[];
  }
> = {
  "dark-a": {
    label: "Dark A",
    width: 892,
    height: 502,
    backgroundColor: "#0a0a0a",
    slotLabels: ["제목", "부제목", "작성자"],
    defaultTexts: [
      "MaxGauge를 활용한 성능분석 보고서",
      "“BISDB” Database system",
      "소속팀 | 이름",
    ],
  },
  "dark-x": {
    label: "Dark X",
    width: 446,
    height: 251,
    backgroundColor: "#1a1a1a",
    slotLabels: ["제목", "부제목", "작성자"],
    defaultTexts: [
      "MaxGauge를 활용한 성능분석 보고서",
      "“BISDB” Database system",
      "소속팀 | 이름",
    ],
  },
  "light-b": {
    label: "Light B",
    width: 446,
    height: 251,
    backgroundColor: "#f9f9f9",
    slotLabels: ["제목 (1줄)", "제목 (2줄)", "부제목", "작성자"],
    defaultTexts: [
      "MaxGauge를 활용한",
      "성능분석 보고서",
      "“BISDB” Database system",
      "소속팀 | 이름",
    ],
  },
  "light-stripe": {
    label: "Light Stripe",
    width: 446,
    height: 251,
    backgroundColor: "#f0f4f8",
    slotLabels: ["제목 (1줄)", "제목 (2줄)", "부제목", "작성자"],
    defaultTexts: [
      "MaxGauge를 활용한",
      "성능분석 보고서",
      "“BISDB” Database system",
      "소속팀 | 이름",
    ],
  },
};

export const DEFAULT_ELEMENT_PROPS: Record<
  ElementType,
  Omit<CanvasElement, "id" | "zIndex">
> = {
  text: {
    type: "text",
    x: 100,
    y: 100,
    width: 240,
    height: 48,
    rotation: 0,
    opacity: 1,
    locked: false,
    fill: "#ffffff",
    stroke: "transparent",
    strokeWidth: 0,
    content: "텍스트 입력",
    fontSize: 24,
    fontWeight: "normal",
    fontFamily: "Pretendard, sans-serif",
    textAlign: "left",
  },
  rect: {
    type: "rect",
    x: 100,
    y: 100,
    width: 200,
    height: 120,
    rotation: 0,
    opacity: 1,
    locked: false,
    fill: "#3389fc",
    stroke: "#1d6af1",
    strokeWidth: 2,
    borderRadius: 8,
  },
  circle: {
    type: "circle",
    x: 100,
    y: 100,
    width: 120,
    height: 120,
    rotation: 0,
    opacity: 1,
    locked: false,
    fill: "#59abff",
    stroke: "#1d6af1",
    strokeWidth: 2,
  },
  line: {
    type: "line",
    x: 100,
    y: 100,
    width: 200,
    height: 4,
    rotation: 0,
    opacity: 1,
    locked: false,
    fill: "#ffffff",
    stroke: "#ffffff",
    strokeWidth: 4,
  },
  image: {
    type: "image",
    x: 100,
    y: 100,
    width: 240,
    height: 160,
    rotation: 0,
    opacity: 1,
    locked: false,
    fill: "transparent",
    stroke: "#334155",
    strokeWidth: 1,
    imageUrl: "",
    borderRadius: 4,
  },
};

export function createElement(
  type: ElementType,
  overrides?: Partial<CanvasElement>
): CanvasElement {
  const defaults = DEFAULT_ELEMENT_PROPS[type];
  return {
    ...defaults,
    id: crypto.randomUUID(),
    zIndex: Date.now(),
    ...overrides,
  };
}

export function getTextElements(template: CanvasTemplate): CanvasElement[] {
  return [...template.elements]
    .filter((el) => el.type === "text")
    .sort((a, b) => a.zIndex - b.zIndex);
}

export function createThemedTemplate(themeKey: ThemeKey): CanvasTemplate {
  const meta = THEME_META[themeKey];
  const isDark = themeKey.startsWith("dark");
  const now = new Date().toISOString();

  const elements = meta.defaultTexts.map((content, index) => {
    const isTitle =
      themeKey.startsWith("light") ? index <= 1 : index === 0;
    const isSubtitle =
      themeKey.startsWith("light") ? index === 2 : index === 1;

    return createElement("text", {
      content,
      zIndex: index + 1,
      locked: true,
      fill: isDark
        ? isTitle
          ? "#ffffff"
          : isSubtitle
            ? "#9ca3af"
            : "#e2e8f0"
        : isTitle
          ? "#111827"
          : isSubtitle
            ? "#9ca3af"
            : "#6b7280",
      fontWeight: isTitle ? "bold" : "normal",
      fontSize: isDark
        ? themeKey === "dark-a"
          ? index === 0
            ? 30
            : index === 1
              ? 22
              : 13
          : index === 0
            ? 15
            : index === 1
              ? 11
              : 7
        : index <= 1
          ? 15
          : index === 2
            ? 11
            : 7,
    });
  });

  return {
    id: crypto.randomUUID(),
    name: meta.label,
    width: meta.width,
    height: meta.height,
    backgroundColor: meta.backgroundColor,
    themeKey,
    elements,
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultTemplates(): CanvasTemplate[] {
  return THEME_KEYS.map((key) => createThemedTemplate(key));
}

export function createDefaultTemplate(): CanvasTemplate {
  return createThemedTemplate("dark-a");
}

export function applyThemeToTemplate(
  template: CanvasTemplate,
  themeKey: ThemeKey
): CanvasTemplate {
  const preservedTexts = getTextElements(template).map(
    (el) => el.content ?? ""
  );
  const fresh = createThemedTemplate(themeKey);

  return {
    ...fresh,
    id: template.id,
    name: template.name,
    createdAt: template.createdAt,
    updatedAt: new Date().toISOString(),
    elements: fresh.elements.map((el, index) => ({
      ...el,
      content: preservedTexts[index] ?? el.content,
    })),
  };
}
