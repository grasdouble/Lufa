import type { Chromatic } from './chromatic.js';
import type { Neutral } from './neutral.js';
import { chromatic } from './chromatic.js';
import { neutral } from './neutral.js';

export const color = {
  chromatic,
  neutral,
};

export type Color = {
  chromatic: Chromatic;
  neutral: Neutral;
};
