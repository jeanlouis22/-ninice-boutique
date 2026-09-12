/* =========================================================

   NINICE BOUTIQUE

   FONCTIONS COMMUNES

   ========================================================= */

(function () {

    "use strict";

    const NINICE = {

        /* -------------------------------------------------

           FORMATAGE DU PRIX

           ------------------------------------------------- */

        formatPrice(value) {

            const amount =

                Number(value || 0);

            return new Intl.NumberFormat(

                "fr-FR",

                {

                    maximumFractionDigits: 0

                }

            ).format(amount) + " FCFA";

        },

        /* -------------------------------------------------

           ÉCHAPPEMENT HTML

           ------------------------------------------------- */

        escapeHTML(value) {

            if (

                value === null ||

                value === undefined

            ) {

                return "";

            }

            const div =

                document.createElement("div");

            div.textContent =

                String(value);

            return div.innerHTML;

        },

        /* -------------------------------------------------

           SLUG

           ------------------------------------------------- */

        createSlug(value) {

            return String(value || "")

                .normalize("NFD")

                .replace(/[\u0300-\u036f]/g, "")

                .toLowerCase()

                .trim()

                .replace(/[^a-z0-9]+/g, "-")

                .replace(/^-+|-+$/g, "");

        },

        /* -------------------------------------------------

           NOTIFICATION

           ------------------------------------------------- */

        notify(

            message,

            duration = 3000

        ) {

            let notification =

                document.querySelector(

                    ".site-notification"

                );

            if (!notification) {

                notification =

                    document.createElement("div");

                notification.className =

                    "site-notification";

                document.body.appendChild(

                    notification

                );

            }

            notification.textContent =

                message;

            notification.classList.add(

                "show"

            );

            window.clearTimeout(

                notification._timeout

            );

            notification._timeout =

                window.setTimeout(

                    () => {

                        notification.classList.remove(

                            "show"

                        );

                    },

                    duration

                );

        },

        /* -------------------------------------------------

           LOCAL STORAGE

           ------------------------------------------------- */

        getStorage(

            key,

            fallback = null

        ) {

            try {

                const value =

                    localStorage.getItem(key);

                if (value === null) {

                    return fallback;

                }

                return JSON.parse(value);

            } catch (error) {

                console.warn(

                    "Erreur de lecture localStorage :",

                    error

                );

                return fallback;

            }

        },

        setStorage(

            key,

            value

        ) {

            try {

                localStorage.setItem(

                    key,

                    JSON.stringify(value)

                );

                return true;

            } catch (error) {

                console.warn(

                    "Erreur d'écriture localStorage :",

                    error

                );

                return false;

            }

        },

        removeStorage(key) {

            try {

                localStorage.removeItem(key);

                return true;

            } catch (error) {

                console.warn(

                    "Erreur suppression localStorage :",

                    error

                );

                return false;

            }

        },

        /* -------------------------------------------------

           PANIER

           ------------------------------------------------- */

        getCart() {

            return this.getStorage(

                "ninice_cart",

                []

            );

        },

        getCartCount() {

            const cart =

                this.getCart();

            return cart.reduce(

                (total, item) =>

                    total +

                    Number(item.quantity || 0),

                0

            );

        },

        updateCartCounters() {

            const count =

                this.getCartCount();

            document

                .querySelectorAll(".cart-count")

                .forEach(element => {

                    element.textContent =

                        count;

                    element.hidden =

                        count <= 0;

                });

        },

        /* -------------------------------------------------

           FAVORIS

           ------------------------------------------------- */

        getFavorites() {

            return this.getStorage(

                "ninice_favorites",

                []

            );

        },

        isFavorite(productId) {

            return this

                .getFavorites()

                .includes(productId);

        },

        /* -------------------------------------------------

           CHEMIN DU SITE

           ------------------------------------------------- */

        getSiteRoot() {

            const path =

                window.location.pathname;

            /*

             * GitHub Pages :

             *

             * /

             * /-ninice-boutique/

             * /-ninice-boutique/pages/

             * /-ninice-boutique/admin/

             */

            const marker =

                "/pages/";

            const adminMarker =

                "/admin/";

            const markerIndex =

                path.indexOf(marker);

            if (markerIndex !== -1) {

                return path.substring(

                    0,

                    markerIndex

                );

            }

            const adminIndex =

                path.indexOf(adminMarker);

            if (adminIndex !== -1) {

                return path.substring(

                    0,

                    adminIndex

                );

            }

            /*

             * Si on est à la racine du projet,

             * on récupère le chemin avant le fichier.

             */

            const cleanPath =

                path.split("?")[0];

            const lastSlash =

                cleanPath.lastIndexOf("/");

            if (lastSlash <= 0) {

                return "";

            }

            /*

             * Pour index.html à la racine GitHub Pages,

             * le chemin du projet est déjà contenu

             * dans pathname.

             */

            if (

                cleanPath.endsWith(

                    "/index.html"

                )

            ) {

                return cleanPath.substring(

                    0,

                    cleanPath.lastIndexOf(

                        "/index.html"

                    )

                );

            }

            return "";

        },

        getPathPrefix() {

            const path =

                window.location.pathname;

            if (

                path.includes("/pages/") ||

                path.includes("/admin/")

            ) {

                return "../";

            }

            return "";

        },

        /* -------------------------------------------------

           PARAMÈTRES DE LA BOUTIQUE

           ------------------------------------------------- */

        async getShopSettings() {

            if (

                !window.niniceSupabase

            ) {

                console.error(

                    "Supabase n'est pas disponible."

                );

                return null;

            }

            try {

                const {

                    data,

                    error

                } =

                    await window

                        .niniceSupabase

                        .from("shop_settings")

                        .select("*")

                        .limit(1)

                        .maybeSingle();

                if (error) {

                    console.error(

                        "Impossible de récupérer shop_settings :",

                        error

                    );

                    return null;

                }

                return data;

            } catch (error) {

                console.error(

                    "Erreur shop_settings :",

                    error

                );

                return null;

            }

        },

        /* -------------------------------------------------

           PRODUIT

           ------------------------------------------------- */

        getProductPrice(product) {

            if (!product) {

                return 0;

            }

            if (

                product.promotional_price !== null &&

                product.promotional_price !== undefined &&

                Number(product.promotional_price) > 0

            ) {

                return Number(

                    product.promotional_price

                );

            }

            return Number(

                product.price || 0

            );

        },

        /* -------------------------------------------------

           INITIALISATION

           ------------------------------------------------- */

        init() {

            this.updateCartCounters();

            document.dispatchEvent(

                new CustomEvent(

                    "ninice:ready"

                )

            );

        }

    };

    /*

     * Exposition globale

     */

    window.NINICE =

        Object.freeze(NINICE);

    /*

     * Initialisation après chargement

     */

    if (

        document.readyState ===

        "loading"

    ) {

        document.addEventListener(

            "DOMContentLoaded",

            () => NINICE.init(),

            {

                once: true

            }

        );

    } else {

        NINICE.init();

    }

})();
