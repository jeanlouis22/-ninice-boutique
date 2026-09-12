/* =========================================================

   NINICE BOUTIQUE

   FONCTIONS COMMUNES

   Version définitive — GitHub Pages + Supabase

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

                .replace(

                    /[\u0300-\u036f]/g,

                    ""

                )

                .toLowerCase()

                .trim()

                .replace(

                    /[^a-z0-9]+/g,

                    "-"

                )

                .replace(

                    /^-+|-+$/g,

                    ""

                );

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

                    document.createElement(

                        "div"

                    );

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

                    localStorage.getItem(

                        key

                    );

                if (value === null) {

                    return fallback;

                }

                return JSON.parse(

                    value

                );

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

                localStorage.removeItem(

                    key

                );

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

            const cart =

                this.getStorage(

                    "ninice_cart",

                    []

                );

            return Array.isArray(cart)

                ? cart

                : [];

        },

        setCart(cart) {

            return this.setStorage(

                "ninice_cart",

                Array.isArray(cart)

                    ? cart

                    : []

            );

        },

        getCartCount() {

            const cart =

                this.getCart();

            return cart.reduce(

                (

                    total,

                    item

                ) => {

                    return (

                        total +

                        Number(

                            item.quantity || 0

                        )

                    );

                },

                0

            );

        },

        updateCartCounters() {

            const count =

                this.getCartCount();

            document

                .querySelectorAll(

                    ".cart-count"

                )

                .forEach(element => {

                    element.textContent =

                        count;

                    element.hidden =

                        count <= 0;

                });

        },

        /* -------------------------------------------------

           AJOUT AU PANIER

           ------------------------------------------------- */

        addToCart(

            product,

            quantity = 1,

            size = "",

            color = ""

        ) {

            if (!product || !product.id) {

                return false;

            }

            const cart =

                this.getCart();

            const price =

                this.getProductPrice(

                    product

                );

            const image =

                product.main_image_url ||

                product.image ||

                (

                    Array.isArray(

                        product.images

                    )

                        ? product.images[0]

                        : ""

                );

            const numericQuantity =

                Math.max(

                    1,

                    Number(quantity || 1)

                );

            const existingIndex =

                cart.findIndex(item =>

                    String(item.id) ===

                        String(product.id) &&

                    String(item.size || "") ===

                        String(size || "") &&

                    String(item.color || "") ===

                        String(color || "")

                );

            if (

                existingIndex !== -1

            ) {

                cart[existingIndex].quantity =

                    Number(

                        cart[existingIndex]

                            .quantity || 0

                    ) +

                    numericQuantity;

                cart[existingIndex].price =

                    price;

                cart[existingIndex].image =

                    image;

                cart[existingIndex]

                    .main_image_url =

                    image;

            } else {

                cart.push({

                    id: product.id,

                    name:

                        product.name || "",

                    price: price,

                    image: image,

                    main_image_url:

                        image,

                    quantity:

                        numericQuantity,

                    size:

                        size || "",

                    color:

                        color || ""

                });

            }

            const saved =

                this.setCart(cart);

            if (saved) {

                this.updateCartCounters();

                document.dispatchEvent(

                    new CustomEvent(

                        "ninice:cart-updated"

                    )

                );

            }

            return saved;

        },

        /* -------------------------------------------------

           SUPPRESSION DU PANIER

           ------------------------------------------------- */

        removeFromCart(

            productId,

            size = "",

            color = ""

        ) {

            const cart =

                this.getCart();

            const filtered =

                cart.filter(item => {

                    return !(

                        String(item.id) ===

                            String(productId) &&

                        String(item.size || "") ===

                            String(size || "") &&

                        String(item.color || "") ===

                            String(color || "")

                    );

                });

            const saved =

                this.setCart(filtered);

            if (saved) {

                this.updateCartCounters();

                document.dispatchEvent(

                    new CustomEvent(

                        "ninice:cart-updated"

                    )

                );

            }

            return saved;

        },

        /* -------------------------------------------------

           FAVORIS

           ------------------------------------------------- */

        getFavorites() {

            const favorites =

                this.getStorage(

                    "ninice_favorites",

                    []

                );

            return Array.isArray(

                favorites

            )

                ? favorites

                : [];

        },

        isFavorite(productId) {

            return this

                .getFavorites()

                .some(

                    id =>

                        String(id) ===

                        String(productId)

                );

        },

        toggleFavorite(productId) {

            if (

                productId === null ||

                productId === undefined

            ) {

                return false;

            }

            let favorites =

                this.getFavorites();

            const id =

                String(productId);

            const index =

                favorites.findIndex(

                    favoriteId =>

                        String(favoriteId) ===

                        id

                );

            let isNowFavorite = false;

            if (index !== -1) {

                favorites.splice(

                    index,

                    1

                );

                isNowFavorite = false;

            } else {

                favorites.push(

                    productId

                );

                isNowFavorite = true;

            }

            this.setStorage(

                "ninice_favorites",

                favorites

            );

            document.dispatchEvent(

                new CustomEvent(

                    "ninice:favorites-updated",

                    {

                        detail: {

                            productId:

                                productId,

                            isFavorite:

                                isNowFavorite

                        }

                    }

                )

            );

            return isNowFavorite;

        },

        /* -------------------------------------------------

           CHEMIN DU SITE

           ------------------------------------------------- */

        getSiteRoot() {

            const path =

                window.location.pathname;

            const marker =

                "/pages/";

            const adminMarker =

                "/admin/";

            const markerIndex =

                path.indexOf(

                    marker

                );

            if (

                markerIndex !== -1

            ) {

                return path.substring(

                    0,

                    markerIndex

                );

            }

            const adminIndex =

                path.indexOf(

                    adminMarker

                );

            if (

                adminIndex !== -1

            ) {

                return path.substring(

                    0,

                    adminIndex

                );

            }

            const cleanPath =

                path.split("?")[0];

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

            /*

             * Pour la racine GitHub Pages,

             * on garde le chemin du projet

             * lorsque celui-ci est présent.

             */

            const segments =

                cleanPath

                    .split("/")

                    .filter(Boolean);

            if (

                segments.length === 1 &&

                !cleanPath.endsWith(".html")

            ) {

                return "/" + segments[0];

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

                        .from(

                            "store_settings"

                        )

                        .select("*")

                        .limit(1)

                        .maybeSingle();

                if (error) {

                    console.error(

                        "Impossible de récupérer store_settings :",

                        error

                    );

                    return null;

                }

                return data;

            } catch (error) {

                console.error(

                    "Erreur store_settings :",

                    error

                );

                return null;

            }

        },

        /* -------------------------------------------------

           PRIX EFFECTIF DU PRODUIT

           ------------------------------------------------- */

        getProductPrice(product) {

            if (!product) {

                return 0;

            }

            if (

                product.promotional_price !==

                    null &&

                product.promotional_price !==

                    undefined &&

                Number(

                    product.promotional_price

                ) > 0

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

           VÉRIFICATION PROMOTION

           ------------------------------------------------- */

        isProductOnPromotion(product) {

            if (!product) {

                return false;

            }

            const now =

                new Date();

            const start =

                product.promotion_start_date

                    ? new Date(

                        product.promotion_start_date

                    )

                    : null;

            const end =

                product.promotion_end_date

                    ? new Date(

                        product.promotion_end_date

                    )

                    : null;

            if (

                start &&

                now < start

            ) {

                return false;

            }

            if (

                end &&

                now > end

            ) {

                return false;

            }

            return (

                product.is_promotion === true ||

                (

                    product.promotional_price !==

                        null &&

                    product.promotional_price !==

                        undefined &&

                    Number(

                        product.promotional_price

                    ) > 0

                )

            );

        },

        /* -------------------------------------------------

           POURCENTAGE PROMOTION

           ------------------------------------------------- */

        getPromotionPercent(product) {

            if (!product) {

                return 0;

            }

            if (

                product.promotion_percent !==

                    null &&

                product.promotion_percent !==

                    undefined

            ) {

                return Number(

                    product.promotion_percent

                );

            }

            const oldPrice =

                Number(

                    product.old_price || 0

                );

            const promotionalPrice =

                Number(

                    product.promotional_price || 0

                );

            if (

                oldPrice > 0 &&

                promotionalPrice > 0 &&

                promotionalPrice < oldPrice

            ) {

                return Math.round(

                    (

                        (

                            oldPrice -

                            promotionalPrice

                        ) /

                        oldPrice

                    ) *

                    100

                );

            }

            return 0;

        },

        /* -------------------------------------------------

           IMAGE PRINCIPALE

           ------------------------------------------------- */

        getProductImage(product) {

            if (!product) {

                return "";

            }

            if (

                product.main_image_url

            ) {

                return product.main_image_url;

            }

            if (

                product.image

            ) {

                return product.image;

            }

            if (

                Array.isArray(

                    product.images

                ) &&

                product.images.length > 0

            ) {

                return product.images[0];

            }

            return "";

        },

        /* -------------------------------------------------

           URL PRODUIT

           ------------------------------------------------- */

        getProductUrl(product) {

            if (

                !product ||

                !product.id

            ) {

                return "#";

            }

            const prefix =

                this.getPathPrefix();

            return (

                prefix +

                "pages/produit.html?id=" +

                encodeURIComponent(

                    product.id

                )

            );

        },

        /* -------------------------------------------------

           URL CATÉGORIE

           ------------------------------------------------- */

        getCategoryUrl(category) {

            if (

                !category

            ) {

                return "#";

            }

            const prefix =

                this.getPathPrefix();

            const value =

                category.slug ||

                category.id ||

                "";

            return (

                prefix +

                "pages/categories.html?category=" +

                encodeURIComponent(

                    value

                )

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

    /* -------------------------------------------------

       EXPOSITION GLOBALE

       ------------------------------------------------- */

    window.NINICE =

        Object.freeze(

            NINICE

        );

    /* -------------------------------------------------

       INITIALISATION APRÈS CHARGEMENT

       ------------------------------------------------- */

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
