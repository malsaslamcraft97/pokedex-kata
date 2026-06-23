import { STATS_COLORS } from "@/constants";
import { PokemonDetails } from "../../../types/pokemonDetails";
import BattleOverview from "../BattleOverview/BattleOverview";
import HighestStatCard from "../HighestStatCard/HighestStatCard";
import StatDistributionCard from "../StatDistributionCard/StatDistributionCard";

import styles from "./StatsTab.module.scss";

export default function StatsTab({ pokemon }: { pokemon: PokemonDetails }) {
  const formattedStats = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.battleOverviewContainer}>
          <h3>Battle Overview</h3>
          <BattleOverview
            stats={pokemon.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            }))}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <HighestStatCard stats={formattedStats} COLORS={STATS_COLORS} />
        <StatDistributionCard stats={formattedStats} COLORS={STATS_COLORS} />
      </div>
    </div>
  );
}
