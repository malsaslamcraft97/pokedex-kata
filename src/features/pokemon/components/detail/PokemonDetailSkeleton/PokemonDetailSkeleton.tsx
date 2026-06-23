import styles from "./PokemonDetailSkeleton.module.scss";

export default function PokemonDetailSkeleton() {
  return (
    <div className={styles.wrapper} data-testid="detail-skeleton">
      {/* HERO SECTION */}
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.id} />
          <div className={styles.name} />
          <div className={styles.types}>
            <div className={styles.type} />
            <div className={styles.type} />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.row} />
            <div className={styles.row} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageGlow} />
          <div className={styles.image} />
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <div className={styles.tab} />
        <div className={styles.tab} />
        <div className={styles.tab} />
      </div>

      {/* CONTENT AREA */}
      <div className={styles.content}>
        <div className={styles.block} />
        <div className={styles.block} />
      </div>
    </div>
  );
}
