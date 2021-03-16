export type LocationValuesContextData = {
  host: string;
  hostname: string;
  href: string;
  origin: string;
  port: string;
  protocol: string;
};

export type LocationValuesProviderProps = {
  children?: React.ReactNode;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  port: string | null;
  protocol: string;
};
