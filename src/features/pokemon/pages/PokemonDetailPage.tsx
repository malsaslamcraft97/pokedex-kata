import { useNavigate, useParams } from "react-router-dom";
import { pokemonApi } from "../api/pokemonApi";
import styles from "./PokemonDetailPage.module.scss";

import PokemonHero from "../components/detail/PokemonHero";
import PokemonTabs from "../components/detail/Tabs/PokemonTabs";
import PokemonDetailSkeleton from "../components/detail/PokemonDetailSkeleton/PokemonDetailSkeleton";
import { ArrowLeft } from "lucide-react";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data: species } = pokemonApi.useGetPokemonSpeciesQuery(name ?? "");
  const { data, isError, refetch } = pokemonApi.useGetPokemonDetailsQuery(
    name ?? ""
  );

  if (isError)
    return (
      <div className={styles.pageWrapper}>
        <header>
          <button
            aria-label="Go back"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={28} />
          </button>
          <h1>
            Pokédex
            <span className={styles.redDot} />
          </h1>
        </header>

        <div className={styles.detailContainer}>
          <div className={styles.errorState}>
            <p>Error loading</p>
            <button className={styles.retryBtn} onClick={() => refetch()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className={styles.pageWrapper}>
        <header>
          <button className={styles.backButton} aria-label="Go back">
            <ArrowLeft size={28} color="#636e72" />
          </button>
          <h1>
            Pokédex
            <span className={styles.redDot} />
          </h1>
        </header>

        <div className={styles.detailContainer}>
          <PokemonDetailSkeleton />
        </div>
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <header>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={28} color="#636e72" />
        </button>
        <h1>
          Pokédex
          <span className={styles.redDot} />
        </h1>
      </header>
      <div className={styles.detailContainer}>
        <PokemonHero pokemon={data} />
        <PokemonTabs pokemon={data} species={species} />
      </div>
    </div>
  );
}
