import { Egg, Mars, Venus } from "lucide-react";
import { PokemonDetails } from "../../../types/pokemonDetails";
import { PokemonSpecies } from "../../../types/pokemonSpecies";
import styles from "./AboutTab.module.scss";
import StatsBar from "../StatsBar/StatsBar";

type Props = {
  pokemon: PokemonDetails;
  species?: PokemonSpecies;
};

export default function AboutTab({ pokemon, species }: Props) {
  // 🛑 Guard FIRST before accessing species
  if (!species) return null;

  /* =========================
     BREEDING CALCULATIONS
  ========================== */

  const cycles = species.hatch_counter ?? 0;

  // PokeAPI formula:
  // max steps = hatch_counter × 255
  // min steps = max - 127
  const maxSteps = cycles * 255;
  const minSteps = maxSteps - 127;

  /* =========================
     GENDER CALCULATION
  ========================== */

  // gender_rate: -1 = genderless
  const femaleRate = species.gender_rate;

  const femalePercent = femaleRate >= 0 ? (femaleRate / 8) * 100 : null;

  const malePercent = femalePercent !== null ? 100 - femalePercent : null;

  /* =========================
     DESCRIPTION
  ========================== */

  const englishFlavor = species.flavor_text_entries?.find(
    (f) => f.language.name === "en"
  );

  const description = englishFlavor?.flavor_text.replace(/\f/g, " ") ?? "";

  /* =========================
     DYNAMIC EGG GROUP STYLES
  ========================== */

  const getEggGroupClass = (group: string) =>
    styles[group.toLowerCase()] ?? styles.defaultEgg;

  const total = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  /* =========================
     RENDER
  ========================== */

  return (
    <div className={styles.container}>
      {/* LEFT CONTENT */}

      <div className={styles.left}>
        <p className={styles.description}>{description}</p>

        <div className={styles.baseStatsContainer}>
          <h3 className={styles.sectionTitle}>Base Stats</h3>

          <div className={styles.statsList}>
            {pokemon.stats.map((stat) => (
              <StatsBar
                key={stat.stat.name}
                label={stat.stat.name}
                value={stat.base_stat}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT BREEDING CARD WITH TOTAL */}
      <div className={styles.right}>
        <div className={styles.breedingCard}>
          <h3 className={styles.cardTitle}>Breeding</h3>

          {/* Egg Groups */}
          <div className={styles.row}>
            <span className={styles.label}>Egg Groups:</span>

            <div className={styles.eggGroups}>
              {species.egg_groups?.map((group) => (
                <span
                  key={group.name}
                  className={`${styles.eggBadge} ${getEggGroupClass(
                    group.name
                  )}`}
                >
                  {group.name}
                </span>
              ))}
            </div>
          </div>

          {/* Gender */}
          {malePercent !== null && (
            <div className={styles.row}>
              <span className={styles.label}>Gender:</span>

              <div className={styles.gender}>
                <div className={`${styles.genderItem} ${styles.male}`}>
                  <Mars size={18} strokeWidth={2.5} />
                  <span>{malePercent.toFixed(1)}%</span>
                </div>

                <div className={`${styles.genderItem} ${styles.female}`}>
                  <Venus size={18} strokeWidth={2.5} />
                  <span>{femalePercent?.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Egg Cycles */}
          <div className={styles.row}>
            <span className={styles.label}>Egg Cycles:</span>

            <div className={styles.eggCycles}>
              <Egg size={18} strokeWidth={2} />
              <span>
                {cycles} ({minSteps.toLocaleString()} –{" "}
                {maxSteps.toLocaleString()} steps)
              </span>
            </div>
          </div>
        </div>

        <div className={styles.totalCard}>
          <div className={styles.totalHeader}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>{total}</span>
          </div>

          <div className={styles.totalBarTrack}>
            <div className={styles.totalBarFill} />
          </div>
        </div>
      </div>
    </div>
  );
}
