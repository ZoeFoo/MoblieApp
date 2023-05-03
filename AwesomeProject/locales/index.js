import { I18n } from "i18n-js";

import en from "./en.json";
import zhTW from "./zh-tw.json";
import zhCN from "./zh-cn.json";

const i18n = new I18n({
    en,
    "zh-TW": zhTW,
    "zh-CN": zhCN,
});
i18n.defaultLocale = "en";
i18n.locale = "en";

export default i18n;