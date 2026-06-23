import { STAT_COLORS_MAP } from "@/constants";

import styles from "./StatDistributionCard.module.scss";

type Props = {
  stats: { name: string; value: number }[];
  COLORS: Record<string, string>;
};

const LABEL_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function StatDistributionCard({ stats, COLORS }: Props) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Stat Distribution</h3>

      <div className={styles.statsContainer}>
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={styles.stat}
            style={{
              borderLeft: `8px solid ${COLORS[stat.name]}`,
              backgroundColor: STAT_COLORS_MAP[stat.name].light,
            }}
          >
            <div className={styles.statLabel}>{LABEL_MAP[stat.name]}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
