import styles from "./PokemonCardSkeleton.module.scss";

export default function PokemonCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.id} />
      <div className={styles.name} />
      <div className={styles.types}>
        <div className={styles.type} />
        <div className={styles.type} />
      </div>
    </div>
  );
}
