import { type Chromatic, chromatic } from './chromatic.js';
import { type Neutral, neutral } from './neutral.js';

export const color = {
  chromatic,
  neutral,
};

export type Color = {
  chromatic: Chromatic;
  neutral: Neutral;
};
