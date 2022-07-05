export interface Point {
  x: number;
  y: number;
}

export interface Rectangle extends Point {
  w: number;
  h: number;
}

export type HSLColor = [number, number, number];

export interface FireworkSettings {
  particlesPerTick: number;
  color: HSLColor;
  speed: number;
}

export interface RandomFireworkSettings extends FireworkSettings {
  randomFromToVariation: number;
  bounds: Rectangle,
  randomColors: HSLColor[]
}

export const DEFAULT_SETTINGS: FireworkSettings = {
  particlesPerTick: 3,
  color: [0, 0, 1],
  speed: 100
}

export const DEFAULT_RANDOM_SETTINGS: RandomFireworkSettings = {
  ...DEFAULT_SETTINGS,
  randomFromToVariation: 100,
  bounds: {x: 0, y: 0, w: 100, h: 100},
  randomColors: [DEFAULT_SETTINGS.color]
}

export class Firework {
  safeSettings: FireworkSettings;
  progress = 0;
  constructor(
    public from: Point,
    public to: Point,
    public settings?: Partial<FireworkSettings>
  ) {
    this.safeSettings = {
      ...DEFAULT_SETTINGS,
      ...settings
    }
  }

  static createRandom(settings?: Partial<RandomFireworkSettings>) {
    let safeSettings = {
      ...DEFAULT_RANDOM_SETTINGS,
      ...settings
    }
    let from: Point = {
      x: safeSettings.bounds.x + Math.floor(safeSettings.bounds.w * Math.random()),
      y: safeSettings.bounds.y + safeSettings.bounds.h
    };
    let to: Point = {
      x: from.x + Math.floor(safeSettings.randomFromToVariation * Math.random()) * 2 - safeSettings.randomFromToVariation,
      y: safeSettings.bounds.y + Math.floor(safeSettings.bounds.h * Math.random())
    };
    let color: HSLColor = safeSettings.randomColors[Math.floor(safeSettings.randomColors.length * Math.random())];
    return new Firework(from, to, {
      ...safeSettings,
      color
    });
  }
}