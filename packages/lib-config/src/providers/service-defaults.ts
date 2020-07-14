import { port, str } from "envalid";
import { ConfigProvider } from "../config";

export const ServiceDefaults = new ConfigProvider({
  schema: {
    ENV: str({
      devDefault: "dev",
      desc: "Environment where application is running",
    }),
    PORT: port({ default: 8080 }),
    NODE_ENV: str({ devDefault: "development", default: "production" }),
  },
  derivedValues: ({ env, packageJSON }) => {
    const name = packageJSON.name.replace("@bootleg-rust/", "");
    const version = packageJSON.version;
    // eslint-disable-next-line -- proper types for this would be nice but are hard
    const instanceName = `${env.ENV}-${name}`;

    return {
      SERVICE_NAME: name,
      PACKAGE_VERSION: version,
      SERVICE_INSTANCE_NAME: instanceName,
      IS_PROD: env.ENV === "prod",
    };
  },
  universalWhitelist: [
    "ENV",
    "SERVICE_NAME",
    "PACKAGE_VERSION",
    "SERVICE_INSTANCE_NAME",
    "IS_PROD",
    "NODE_ENV",
  ] as const,
});
