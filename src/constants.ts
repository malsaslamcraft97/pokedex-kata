export const STATS_COLORS: Record<string, string> = {
  hp: "#4CAF50",
  attack: "#FF9800",
  defense: "#4A90E2",
  "special-attack": "#9C27B0",
  "special-defense": "#EC407A",
  speed: "#26C6DA",
};

export const STAT_COLORS_MAP: Record<
  string,
  { gradient: string; light: string; pill: string }
> = {
  hp: {
    gradient: "linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)",
    light: "rgba(76, 175, 80, 0.12)",
    pill: "#4CAF50",
  },
  attack: {
    gradient: "linear-gradient(90deg, #FF9800 0%, #FFB74D 100%)",
    light: "rgba(255, 152, 0, 0.12)",
    pill: "#FF9800",
  },
  defense: {
    gradient: "linear-gradient(90deg, #4A90E2 0%, #6FA8FF 100%)",
    light: "rgba(74, 144, 226, 0.12)",
    pill: "#4A90E2",
  },
  "special-attack": {
    gradient: "linear-gradient(90deg, #9C27B0 0%, #BA68C8 100%)",
    light: "rgba(156, 39, 176, 0.12)",
    pill: "#9C27B0",
  },
  "special-defense": {
    gradient: "linear-gradient(90deg, #EC407A 0%, #F48FB1 100%)",
    light: "rgba(236, 64, 122, 0.12)",
    pill: "#EC407A",
  },
  speed: {
    gradient: "linear-gradient(90deg, #26C6DA 0%, #4DD0E1 100%)",
    light: "rgba(38, 198, 218, 0.12)",
    pill: "#26C6DA",
  },
};
