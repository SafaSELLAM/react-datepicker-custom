import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                placeholder: "mm/dd/YYYY",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ],
                previous: "Previous",
                next: "Next",
                "today": "today"

            }
        },
        fr: {
            translation: {
                placeholder: "jj/mm/AAAA",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                months: [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                ],
                previous: "Précédent",
                next: "Suivant",
                "today": "Aujourd’hui"

            }
        }
    },
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n
