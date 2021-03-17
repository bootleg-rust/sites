import { makeValidator } from "envalid";
import { ConfigProvider } from "../config";

const csv = makeValidator(val => {
  if (!val) {
    return [];
  }

  if (Array.isArray(val)) {
    return val;
  }

  const values = val.split(",").filter(Boolean);

  return values;
});

export const LocalizationConfigProvider = new ConfigProvider({
  schema: {
    LOCALIZATION_ENABLE_LOCALES: csv({
      default: [],
    }),
  },
  derivedValues: () => {
    return {};
  },
  universalWhitelist: ["LOCALIZATION_ENABLE_LOCALES"] as const,
});
