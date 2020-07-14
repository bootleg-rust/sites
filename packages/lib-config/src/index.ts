import { ConfigProvider, PackageJSON } from "./config";
export * from "./providers";
export * from "./config";

export function Config({
  providers,
  packageJSON,
}: {
  providers: Array<ConfigProvider<unknown, unknown, unknown>>;
  packageJSON: PackageJSON;
}) {
  if (providers.length < 1) {
    throw new Error("Config: at least one provider required");
  }
  let provider = providers[0];
  for (let i = 1; i < providers.length; i++) {
    provider = provider.join(providers[i]);
  }
  return provider.buildConfig({ packageJSON });
}
