import { Concept } from "../types/concept";
import economics from "./concepts/economics.json";
import psychology from "./concepts/psychology.json";
import management from "./concepts/management.json";
import computerScience from "./concepts/computer-science.json";
import philosophy from "./concepts/philosophy.json";
import finance from "./concepts/finance.json";

export const concepts: Concept[] = [
  ...economics,
  ...psychology,
  ...management,
  ...computerScience,
  ...philosophy,
  ...finance,
] as Concept[];
