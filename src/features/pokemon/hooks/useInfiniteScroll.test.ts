import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

let intersectionCallback: IntersectionObserverCallback;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    intersectionCallback = cb;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

function attachSentinel(loadMoreRef: (node: HTMLDivElement | null) => void) {
  act(() => {
    loadMoreRef(document.createElement("div"));
  });
}

function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    intersectionCallback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useInfiniteScroll - loading more", () => {
  it("calls onLoadMore when the sentinel element intersects the viewport", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({ onLoadMore, disabled: false })
    );

    attachSentinel(result.current.loadMoreRef);
    triggerIntersection(true);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not call onLoadMore when the element is not intersecting", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({ onLoadMore, disabled: false })
    );

    attachSentinel(result.current.loadMoreRef);
    triggerIntersection(false);

    expect(onLoadMore).not.toHaveBeenCalled();
  });
});

describe("useInfiniteScroll - disabled flag", () => {
  it("does not call onLoadMore when disabled is true at mount", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({ onLoadMore, disabled: true })
    );

    attachSentinel(result.current.loadMoreRef);
    triggerIntersection(true);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("does not call onLoadMore when disabled updates to true after mount", () => {
    const onLoadMore = vi.fn();
    const { result, rerender } = renderHook(
      ({ disabled }) => useInfiniteScroll({ onLoadMore, disabled }),
      { initialProps: { disabled: false } }
    );

    attachSentinel(result.current.loadMoreRef);
    rerender({ disabled: true });
    triggerIntersection(true);

    expect(onLoadMore).not.toHaveBeenCalled();
  });
});

describe("useInfiniteScroll - sentinel ref", () => {
  it("does not throw when loadMoreRef is called with null", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({ onLoadMore: vi.fn(), disabled: false })
    );

    expect(() => {
      act(() => result.current.loadMoreRef(null));
    }).not.toThrow();
  });
});
