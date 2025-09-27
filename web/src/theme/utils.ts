import type { MantineTheme } from "@mantine/core";

import { palette } from "./palette";

function getScheme(theme: MantineTheme): "light" | "dark" {
  // Mantine doesn’t expose colorScheme on the theme object in all versions; use DOM attribute fallback
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-mantine-color-scheme");
    return attr === "dark" ? "dark" : "light";
  }
  // On server, default to light
  return "light";
}

export function brandColor(theme: MantineTheme, shade?: number): string {
  const defaultShade = typeof theme.primaryShade === "number" ? theme.primaryShade : 8;
  const idx = shade ?? defaultShade;
  return theme.colors.brand[idx];
}

export function roleColors(theme: MantineTheme) {
  const p = palette(getScheme(theme));
  const scheme = getScheme(theme);
  const rolesFromTheme = (theme.other as any)?.roles?.[scheme];
  // Prefer roles exposed on theme.other for DX; fallback to computed palette
  const fallback = {
    primary: p.primary.main,
    accent: p.accent.main,
    text: p.text.primary,
    textMuted: p.text.secondary,
    bg: p.background.default,
    surface: p.background.paper,
    border: p.grey[200],
  };
  return rolesFromTheme ?? fallback;
}
