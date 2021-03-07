import { str } from "envalid";
import { ConfigProvider } from "../config";

function buildBaseURL(
  scheme: string,
  host: string,
  port: string,
  path: string,
): string {
  const hasPort = () => port && port !== "";
  const portStr = hasPort() ? `:${port}` : "";
  return `${scheme}://${host}${portStr}${path}`;
}

export const SiteReferences = new ConfigProvider({
  schema: {
    CRATES_IO_URL_SCHEME: str({ devDefault: "http", default: "https" }),
    CRATES_IO_URL_HOST: str({
      devDefault: "localhost",
      default: "dev.bootleg-crates.io",
    }),
    CRATES_IO_URL_PORT: str({ devDefault: "4001", default: "" }),
    CRATES_IO_URL_BASEPATH: str({ devDefault: "", default: "" }),

    API_URL_SCHEME: str({ devDefault: "http", default: "https" }),
    API_URL_HOST: str({
      devDefault: "localhost",
      default: "api.dev.bootleg-crates.io",
    }),
    API_URL_PORT: str({ devDefault: "8000", default: "" }),
    API_URL_BASEPATH: str({ devDefault: "", default: "" }),
  },
  derivedValues: ({ env }) => {
    return {
      CRATES_IO_BASEURL: buildBaseURL(
        env.CRATES_IO_URL_SCHEME,
        env.CRATES_IO_URL_HOST,
        env.CRATES_IO_URL_PORT,
        env.CRATES_IO_URL_BASEPATH,
      ),
      API_BASEURL: buildBaseURL(
        env.API_URL_SCHEME,
        env.API_URL_HOST,
        env.API_URL_PORT,
        env.API_URL_BASEPATH,
      ),
    };
  },
  universalWhitelist: ["CRATES_IO_BASEURL", "API_BASEURL"] as const,
});
