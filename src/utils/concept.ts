import { Field } from "../types/concept";
import { fieldColors } from "../theme/tokens";

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

export const FIELD_COLORS: Record<Field, string> = fieldColors;

export function getFieldColor(field: string): string {
  return FIELD_COLORS[field as Field] || "#6B6660";
}

export function getFieldIcon(field: string): string {
  return FIELD_ICONS[field as Field] || "📖";
}
