import { str } from "envalid";
import { ConfigProvider } from "./config";
import { Config } from "./index";

const fixtures = {
  packageJSON: { name: "some-name", version: "0.1.0" },
  provider1: new ConfigProvider({
    schema: {
      ONE: str({
        default: "true",
      }),
    },
    derivedValues: () => {
      return { ONE_DERIVED: "true" };
    },
    universalWhitelist: ["ONE"] as const,
  }),
  provider2: new ConfigProvider({
    schema: {
      TWO: str({
        default: "true",
      }),
    },
    derivedValues: () => {
      return { TWO_DERIVED: "true" };
    },
    universalWhitelist: ["TWO_DERIVED"] as const,
  }),
  provider3: new ConfigProvider({
    schema: {
      THREE: str({
        default: "true",
      }),
    },
    derivedValues: () => {
      return { THREE_DERIVED: "true" };
    },
    universalWhitelist: [] as const,
  }),
};

describe("Config", () => {
  test("basic config", () => {
    const { config, universalConfig } = Config({
      providers: [fixtures.provider1, fixtures.provider2],
      packageJSON: fixtures.packageJSON,
    });

    expect(config).toMatchObject({
      ONE: "true",
      TWO: "true",
      ONE_DERIVED: "true",
      TWO_DERIVED: "true",
    });
    expect(universalConfig).toMatchObject({
      ONE: "true",
      TWO_DERIVED: "true",
    });
  });
});

describe("ConfigProvider", () => {
  it("join", () => {
    const result1 = fixtures.provider1.buildConfig({
      packageJSON: fixtures.packageJSON,
    });
    expect(result1).toStrictEqual({
      config: { ONE: "true", ONE_DERIVED: "true" },
      universalConfig: { ONE: "true" },
    });

    const result2 = fixtures.provider1
      .join(fixtures.provider2)
      .buildConfig({ packageJSON: fixtures.packageJSON });
    expect(result2).toStrictEqual({
      config: {
        ONE: "true",
        ONE_DERIVED: "true",
        TWO: "true",
        TWO_DERIVED: "true",
      },
      universalConfig: { ONE: "true", TWO_DERIVED: "true" },
    });

    const result3 = fixtures.provider1
      .join(fixtures.provider2)
      .join(fixtures.provider3)
      .buildConfig({ packageJSON: fixtures.packageJSON });

    expect(result3).toStrictEqual({
      config: {
        ONE: "true",
        ONE_DERIVED: "true",
        TWO: "true",
        TWO_DERIVED: "true",
        THREE: "true",
        THREE_DERIVED: "true",
      },
      universalConfig: { ONE: "true", TWO_DERIVED: "true" },
    });
  });
});
