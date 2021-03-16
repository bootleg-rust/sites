export enum ResourceMode {
  EMBEDDED,
  REMOTE,
  AUTO,
}

export type EmbeddedResource = {
  data: string;
};

export type RemoteResource = {
  url: string;
};

export type ResourcesArg<T = RemoteResource | EmbeddedResource> = {
  [code: string]: T[];
};

export interface EmbeddedProviderProps {
  mode: ResourceMode.EMBEDDED;
  resources: ResourcesArg<EmbeddedResource>;
  children: React.ReactNode;
}

export interface RemoteProviderProps {
  mode: ResourceMode.REMOTE;
  resources: ResourcesArg<RemoteResource>;
  children: React.ReactNode;
}

export interface AutoProviderProps {
  mode?: ResourceMode.AUTO;
  resources: ResourcesArg<RemoteResource | RemoteResource>;
  children: React.ReactNode;
}

export type FluentProviderProps =
  | AutoProviderProps
  | EmbeddedProviderProps
  | RemoteProviderProps;

export type FluentConfigStaticRef = {
  resources?: ResourcesArg<EmbeddedResource>;
};

export type FluentConfigData = {
  staticRef: FluentConfigStaticRef;
  parseMarkup?(str: string): Array<Node>;
  initialResources?: ResourcesArg<EmbeddedResource>;
};

export type FluentConfigProviderProps = {
  children?: React.ReactNode;
  parseMarkup?(str: string): Array<Node>;
  initialResources?: ResourcesArg<EmbeddedResource>;
  staticRef?: FluentConfigStaticRef;
};
