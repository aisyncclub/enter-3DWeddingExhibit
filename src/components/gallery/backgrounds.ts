export type ThemeKey = 'chapel' | 'garden' | 'night';

export interface BackgroundConfig {
  key: ThemeKey;
  label: string;
  fogColor: number;
  fogDensity: number;
  ambientColor: number;
  ambientIntensity: number;
  dirLightColor: number;
  dirLightIntensity: number;
  floorColor: number;
  floorMetal: number;
  floorRough: number;
  wallColor: number;
  skyColor: number;
  particle: 'petal' | 'star';
  particleColor: number;
}

export const BACKGROUNDS: Record<ThemeKey, BackgroundConfig> = {
  chapel: {
    key: 'chapel',
    label: '채플',
    fogColor: 0xfff8f0,
    fogDensity: 0.04,
    ambientColor: 0xfff3e0,
    ambientIntensity: 0.7,
    dirLightColor: 0xffe8b0,
    dirLightIntensity: 1.4,
    floorColor: 0xf0e6d8,
    floorMetal: 0.0,
    floorRough: 0.8,
    wallColor: 0xfaf4ec,
    skyColor: 0xfff8f0,
    particle: 'petal',
    particleColor: 0xf0a0b0,
  },
  garden: {
    key: 'garden',
    label: '정원',
    fogColor: 0xeaf5ea,
    fogDensity: 0.03,
    ambientColor: 0xd4edda,
    ambientIntensity: 0.8,
    dirLightColor: 0xfff5d0,
    dirLightIntensity: 1.6,
    floorColor: 0xc8dfc0,
    floorMetal: 0.0,
    floorRough: 0.9,
    wallColor: 0xf0f8ee,
    skyColor: 0xdff0e8,
    particle: 'petal',
    particleColor: 0xffb8c8,
  },
  night: {
    key: 'night',
    label: '밤하늘',
    fogColor: 0x08102a,
    fogDensity: 0.025,
    ambientColor: 0x1a2060,
    ambientIntensity: 0.4,
    dirLightColor: 0xc8d8ff,
    dirLightIntensity: 0.9,
    floorColor: 0x0e1830,
    floorMetal: 0.3,
    floorRough: 0.6,
    wallColor: 0x0c1428,
    skyColor: 0x060e20,
    particle: 'star',
    particleColor: 0xffe8a0,
  },
};
