type SvgrComponent = React.StatelessComponent<React.SVGAttributes>;

declare module "*.svg" {
  const ReactComponent: SvgrComponent;
  const url: string;

  // eslint-disable-next-line import/no-default-export
  export default url;
  export { ReactComponent };
}

declare module "*.png";
declare module "*.ftl";

// TODO: write better types
declare module "@tusbar/cache-control";
