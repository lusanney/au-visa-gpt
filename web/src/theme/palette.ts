import type { MantineColorsTuple, MantineThemeOverride } from "@mantine/core";

// Teal & Slate palette tokens (MUI-like structure)
export type Mode = "light" | "dark";

export const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
} as const;

export const PRIMARY = {
  lighter: "#C9F1F4",
  light: "#18AEB9",
  main: "#0FA3B1",
  dark: "#0B8894",
  darker: "#086C74",
  contrastText: "#fff",
} as const;

export const ACCENT = {
  lighter: "#FDECC7",
  light: "#F8C76A",
  main: "#F59E0B",
  dark: "#B47008",
  darker: "#7A4B05",
  contrastText: "#0B1220",
} as const;

export const SUCCESS = {
  lighter: "#D8FBDE",
  light: "#86E8AB",
  main: "#16A34A",
  dark: "#15803D",
  darker: "#0F5C2C",
  contrastText: "#fff",
} as const;
export const WARNING = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#D97706",
  dark: "#B45309",
  darker: "#7C2D12",
  contrastText: "#0B1220",
} as const;
export const ERROR = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#DC2626",
  dark: "#B91C1C",
  darker: "#7F1D1D",
  contrastText: "#fff",
} as const;

export const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  accent: ACCENT,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
} as const;

export function palette(mode: Mode) {
  if (mode === "dark") {
    return {
      ...COMMON,
      mode: "dark",
      text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
      background: { paper: GREY[800], default: GREY[900], neutral: "#1F2937" },
      action: { active: GREY[500] },
    } as const;
  }
  return {
    ...COMMON,
    mode: "light",
    text: { primary: "#0B1220", secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#fff", default: "#F7F7F5", neutral: GREY[200] },
    action: { active: GREY[600] },
  } as const;
}

// Mantine adapter: primary brand scale (10 shades) and default primary shade index
export const mantineBrandScale: MantineColorsTuple = [
  "#E6F9FB",
  "#C9F1F4",
  "#AEE8EC",
  "#91DEE4",
  "#73D3DB",
  "#54C7D0",
  "#33BAC4",
  "#18AEB9",
  "#0FA3B1",
  "#0B8894",
] as const;

// Slate scale (10 shades) – used for backgrounds/surfaces/foreground
export const slateScale: MantineColorsTuple = [
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
  "#1e293b",
  "#0f172a",
] as const;

// Accent (Amber) scale (10 shades)
export const accentScale: MantineColorsTuple = [
  "#FFFBEB",
  "#FEF3C7",
  "#FDE68A",
  "#FCD34D",
  "#FBBF24",
  "#F59E0B",
  "#D97706",
  "#B45309",
  "#92400E",
  "#78350F",
] as const;

export const mantineThemeConfig: MantineThemeOverride = {
  primaryColor: "brand",
  primaryShade: { light: 8, dark: 8 },
  colors: { brand: mantineBrandScale, slate: slateScale, accent: accentScale },
  defaultRadius: "md",
  radius: {
    xs: "3px",
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
  },
  shadows: {
    // Soft, modern shadow set
    xs: "0 1px 2px rgba(15, 23, 42, 0.06)",
    sm: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)",
    md: "0 4px 8px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)",
    lg: "0 10px 20px rgba(15, 23, 42, 0.08), 0 4px 8px rgba(15, 23, 42, 0.04)",
    xl: "0 20px 40px rgba(15, 23, 42, 0.08), 0 12px 16px rgba(15, 23, 42, 0.04)",
  },
  other: {
    // Expose role tokens on the theme for easy access in components
    roles: {
      light: {
        primary: PRIMARY.main,
        accent: ACCENT.main,
        text: "#0B1220",
        textMuted: GREY[600],
        bg: "#F7F7F5",
        surface: "#fff",
        border: "#E2E8F0",
      },
      dark: {
        primary: PRIMARY.main,
        accent: ACCENT.main,
        text: "#fff",
        textMuted: GREY[500],
        bg: GREY[900],
        surface: GREY[800],
        border: "#1f2937",
      },
    },
  },
};
