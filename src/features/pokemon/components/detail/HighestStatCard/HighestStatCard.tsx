import styles from "./HighestStatCard.module.scss";

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

/**
 * ViewBox: 160 x 56
 * Pill height: 56px
 * The right edge is a single smooth arc (concave inward) that mimics
 * the left silhouette of the white value capsule sitting next to it.
 *
 * The arc goes from (x=140, y=0) curving inward to the left at midpoint,
 * then back out to (x=140, y=56).
 * Control points push the curve inward (to the left).
 */
function StatPillShape({ color, label }: { color: string; label: string }) {
  const H = 56;
  const R = H / 2; // 28

  // Where the arc starts/ends on x-axis
  const arcX = 138;
  // How far inward the arc scoops (to the left)
  const scoop = 18;

  const d = [
    `M ${R} 0`,
    `L ${arcX} 0`,
    // Single cubic bezier: concave scoop inward on right side
    // both control points pulled left of arcX
    `C ${arcX - scoop} ${H * 0.15}, ${arcX - scoop} ${H * 0.85}, ${arcX} ${H}`,
    `L ${R} ${H}`,
    `Q 0 ${H} 0 ${H - R}`,
    `L 0 ${R}`,
    `Q 0 0 ${R} 0`,
    `Z`,
  ].join(" ");

  return (
    <div className={styles.leftColorWrapper}>
      <svg
        viewBox={`0 0 160 ${H}`}
        preserveAspectRatio="none"
        className={styles.leftColorSvg}
      >
        <path d={d} fill={color} />
      </svg>
      <span className={styles.leftColorLabel}>{label}</span>
    </div>
  );
}

export default function HighestStatCard({ stats, COLORS }: Props) {
  const sorted = [...stats].sort((a, b) => b.value - a.value);
  const topTwo = sorted.slice(0, 2);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Highest Stat</h3>

      <div className={styles.row}>
        {topTwo.map((stat) => (
          <div key={stat.name} className={styles.pill}>
            <StatPillShape
              color={COLORS[stat.name]}
              label={LABEL_MAP[stat.name]}
            />
            <div className={styles.value}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
