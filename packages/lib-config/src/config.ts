import { cleanEnv } from "envalid";

export type PackageJSON = {
  name: string;
  version: string;
};

type DeriveValuesFn<D> = (args: { env: any; packageJSON: PackageJSON }) => D;

export class ConfigProvider<S, D, U> {
  _schema: S;
  _derivedValuesFn: DeriveValuesFn<D>;
  _universalWhitelist: Iterable<U>;

  constructor(args: {
    schema: S;
    derivedValues: DeriveValuesFn<D>;
    universalWhitelist: Iterable<U>;
  }) {
    this._schema = args.schema;
    this._derivedValuesFn = args.derivedValues;
    this._universalWhitelist = args.universalWhitelist;
  }

  join<S2, D2, U2>(p2: ConfigProvider<S2, D2, U2>) {
    const schema = { ...this._schema, ...p2._schema };
    const derivedValues: DeriveValuesFn<D & D2> = (...args) => ({
      ...this._derivedValuesFn(...args),
      ...p2._derivedValuesFn(...args),
    });
    const universalWhitelist = [
      ...this._universalWhitelist,
      ...p2._universalWhitelist,
    ] as const;

    return new ConfigProvider({
      schema,
      derivedValues,
      universalWhitelist,
    });
  }

  buildConfig({ packageJSON }: { packageJSON: PackageJSON }) {
    const env = cleanEnv(process.env, this._schema, { strict: true });
    const derivedValues = this._derivedValuesFn({ env, packageJSON });

    const config = { ...env, ...derivedValues } as Readonly<unknown>;

    // Get the whitelisted `universalConfig`
    const filteredConfig: any = {};
    for (const [key, value] of Object.entries(config)) {
      // TODO: proper types for this would be nice but are hard
      const whitelist = this._universalWhitelist as string[];
      if (whitelist.includes(key)) {
        filteredConfig[key] = value;
      }
    }
    return {
      config,
      universalConfig: filteredConfig,
    };
  }
}
