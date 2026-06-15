import { Field } from "../types/concept";

export const FIELDS: Field[] = [
  "经济学",
  "心理学",
  "管理学",
  "计算机科学",
  "哲学",
  "金融学",
];

export const FIELD_ICONS: Record<Field, string> = {
  "经济学": "📊",
  "心理学": "🧠",
  "管理学": "📋",
  "计算机科学": "💻",
  "哲学": "🔮",
  "金融学": "💰",
};

export const FIELD_COLORS: Record<Field, string> = {
  "经济学": "#E17055",
  "心理学": "#6C5CE7",
  "管理学": "#00B894",
  "计算机科学": "#0984E3",
  "哲学": "#FDCB6E",
  "金融学": "#E84393",
};

export function getFieldColor(field: string): string {
  return FIELD_COLORS[field as Field] || "#636E72";
}

export function getFieldIcon(field: string): string {
  return FIELD_ICONS[field as Field] || "📖";
}
