import type { I18nProvider } from "@refinedev/core";
import i18n from "../i18n"; // We will create this next

export const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any, defaultMessage?: string) => {
        return i18n.t(key, { ...options, defaultValue: defaultMessage }) as string;
    },
    changeLocale: (lang: string) => {
        return i18n.changeLanguage(lang);
    },
    getLocale: () => {
        return i18n.language;
    },
};
