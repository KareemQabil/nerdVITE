import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import posEn from '../../features/sales-pos/locales/en.json';
import posAr from '../../features/sales-pos/locales/ar.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                "sales-pos": posEn
            },
            ar: {
                "sales-pos": posAr
            }
        },
        lng: "ar", // Default to Arabic as requested
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        ns: ['sales-pos'], // Namespaces
        defaultNS: 'sales-pos'
    });

export default i18n;
