import { Ruler, Weight, Sparkles, Eye } from "lucide-react";
import styles from "./PokemonHero.module.scss";
import { PokemonDetails } from "../../../types/pokemonDetails";

type Props = {
  pokemon: PokemonDetails;
};

export default function PokemonHero({ pokemon }: Props) {
  const officialArtwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default;

  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  const visibleAbilities = pokemon.abilities.filter((a) => !a.is_hidden);
  const hiddenAbilities = pokemon.abilities.filter((a) => a.is_hidden);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.id}>
            #{pokemon.id.toString().padStart(3, "0")}
          </span>

          <h1 className={styles.name}>{pokemon.name}</h1>

          <div className={styles.types}>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`${styles.badge} ${styles[t.type.name]}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className={styles.infoCard}>
            <div className={styles.row}>
              <div className={styles.abilityBlock}>
                <Sparkles size={18} />
                <span>
                  {visibleAbilities
                    .map((a) => a.ability.name.replace("-", " "))
                    .join(", ")}
                </span>
              </div>

              <div className={styles.stat}>
                <Ruler size={16} />
                <span>{pokemon.height / 10} m</span>
              </div>
            </div>

            {hiddenAbilities.length > 0 && (
              <div className={styles.row}>
                <div className={styles.hiddenAbility}>
                  <Eye size={18} />
                  <span className={styles.hiddenLabel}>Hidden Ability:</span>
                  <span>
                    {hiddenAbilities
                      .map((a) => a.ability.name.replace("-", " "))
                      .join(", ")}
                  </span>
                </div>

                <div className={styles.stat}>
                  <Weight size={16} />
                  <span>{pokemon.weight / 10} kg</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={`${styles.glow} ${styles[primaryType]}`} />
          <div className={styles.sparkles} />

          {officialArtwork && (
            <img
              src={officialArtwork}
              alt={pokemon.name}
              className={styles.image}
            />
          )}
        </div>
      </div>
    </section>
  );
}
