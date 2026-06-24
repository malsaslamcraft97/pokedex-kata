import { useNavigate } from "react-router-dom";
import styles from "./PokemonCard.module.scss";
import { EnrichedPokemon } from "../../domain/pokemonTransformers";
import { Ruler, Sparkles } from "lucide-react";

type Props = EnrichedPokemon;

export default function PokemonCard({
  formattedId,
  name,
  image,
  types,
  ability,
  height,
}: Props) {
  const navigate = useNavigate();

  const primaryType = types[0]?.toLowerCase();

  const heightInMeters =
    height !== undefined ? (Number(height) / 10).toFixed(1) : null;

  return (
    <div
      className={styles.card}
      data-type={primaryType}
      onClick={() => navigate(`/pokemon/${name.toLowerCase()}`)}
    >
      {/* <div className={styles.themedBg}></div> */}

      {/* HEADER */}
      <div className={styles.header}>
        <span className={styles.id}>{formattedId}</span>

        <div className={styles.groundGlow} />
        <div className={styles.groundSwoosh} />

        <img src={image} alt={name} className={styles.sprite} />
        <div className={styles.spriteShadow} />

        <h3 className={styles.name}>{name}</h3>
        <span className={styles.nameUnderline} />
      </div>

      {/* INFO */}
      <div className={styles.info}>
        {/* TYPE */}
        <div className={styles.row}>
          <span className={styles.label}>Type:</span>
          <div className={styles.typeGroup}>
            {types.map((t) => (
              <span
                key={t}
                className={styles.typeBadge}
                data-type={t.toLowerCase()}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ABILITY */}
        <div className={styles.row}>
          <span className={styles.label}>Ability:</span>
          <div className={styles.valueWithIcon}>
            <Sparkles size={16} />
            <span>{ability ?? "Unknown"}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* HEIGHT */}
        <div className={styles.row}>
          <span className={styles.label}>Height:</span>
          <div className={styles.valueWithIcon}>
            <Ruler size={16} />
            <span>{heightInMeters ? `${heightInMeters} m` : "Unknown"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
