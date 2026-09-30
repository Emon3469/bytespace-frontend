import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// next/image needs the Next runtime; render a plain <img> in unit tests.
vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img"> & { fill?: boolean; preload?: boolean }) => {
    // Strip next/image-only props before rendering a plain <img>.
    const imgProps: Record<string, unknown> = { ...props };
    delete imgProps.fill;
    delete imgProps.preload;
    delete imgProps.sizes;
    const { src, alt, ...rest } = imgProps as ComponentProps<"img">;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === "string" ? src : ""} alt={alt} {...rest} />;
  },
}));

// jsdom does not implement matchMedia.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
