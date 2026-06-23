import { STAT_COLORS_MAP as STAT_COLORS } from "@/constants";

import styles from "./StatsBar.module.scss";

type Props = {
  label: string;
  value: number;
};

const LABEL_FORMAT: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function StatsBar({ label, value }: Props) {
  const normalized = label.toLowerCase();
  const colors = STAT_COLORS[normalized];

  if (!colors) return null; // safety guard

  const percentage = Math.min((value / 150) * 100, 100);

  return (
    <div className={styles.row} style={{ background: colors.light }}>
      <span className={styles.label} style={{ background: colors.pill }}>
        {LABEL_FORMAT[normalized]}
      </span>

      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{
            width: `${percentage}%`,
            background: colors.gradient,
          }}
        />
      </div>

      <span className={styles.value}>{value}</span>
    </div>
  );
}
