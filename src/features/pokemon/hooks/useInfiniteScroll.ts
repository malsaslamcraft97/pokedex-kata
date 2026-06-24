import { useRef, useEffect } from "react";

type Options = {
  onLoadMore: () => void;
  disabled?: boolean;
};

export default function useInfiniteScroll({ onLoadMore, disabled }: Options) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const stateRef = useRef({ onLoadMore, disabled });

  useEffect(() => {
    stateRef.current = { onLoadMore, disabled };
  }, [onLoadMore, disabled]);

  const loadMoreRef = (node: HTMLDivElement | null) => {
    if (!node) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        const { disabled, onLoadMore } = stateRef.current;
        if (disabled) return;

        onLoadMore();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observerRef.current.observe(node);
  };

  return { loadMoreRef };
}
