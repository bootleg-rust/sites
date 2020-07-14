declare module "*.svg" {
  export const ReactComponent: React.ComponentType<React.DetailedHTMLProps<
    JSX.IntrinsicElements["svg"],
    SVGElement
  >>;
}
declare module "*.png";

// TODO: write better types
declare module "@tusbar/cache-control";
