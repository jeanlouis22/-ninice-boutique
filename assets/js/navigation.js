/* =========================================================

   NINICE BOUTIQUE

   NAVIGATION + FOOTER

   Version définitive — GitHub Pages + Supabase

   ========================================================= */

(function () {

    "use strict";

    /* ---------------------------------------------------------

       CHEMIN DU SITE

       --------------------------------------------------------- */

    function getPrefix() {

        const path = window.location.pathname;

        if (

            path.includes("/pages/") ||

            path.includes("/admin/")

        ) {

            return "../";

        }

        return "";

    }

    /* ---------------------------------------------------------

       PAGE ACTUELLE

       --------------------------------------------------------- */

    function getCurrentPage() {

        const path = window.location.pathname

            .split("/")

            .pop()

            .toLowerCase();

        return path === ""

            ? "index.html"

            : path;

    }

    /* ---------------------------------------------------------

       PAGE ACTIVE

       --------------------------------------------------------- */

    function isActive(page) {

        return getCurrentPage() === page

            ? "active"

            : "";

    }

    /* ---------------------------------------------------------

       ICÔNES SVG

       --------------------------------------------------------- */

    const ICONS = {

        search: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <circle

                    cx="11"

                    cy="11"

                    r="6.5"

                ></circle>

                <path

                    d="M16 16L21 21"

                ></path>

            </svg>

        `,

        heart: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <path

                    d="M20.8 8.7

                       C20.8 13.4 12 19.5 12 19.5

                       S3.2 13.4 3.2 8.7

                       C3.2 5.8 5.2 4 7.8 4

                       C9.5 4 11 4.9 12 6.2

                       C13 4.9 14.5 4 16.2 4

                       C18.8 4 20.8 5.8 20.8 8.7Z"

                ></path>

            </svg>

        `,

        cart: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <path

                    d="M3 4H5L7.2 15.2

                       C7.4 16.2 8.2 17 9.3 17H17.5

                       C18.5 17 19.3 16.4 19.6 15.5L21 9H6"

                ></path>

                <circle

                    cx="9.5"

                    cy="20"

                    r="1.2"

                ></circle>

                <circle

                    cx="17"

                    cy="20"

                    r="1.2"

                ></circle>

            </svg>

        `,

        menu: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <path d="M4 7H20"></path>

                <path d="M4 12H20"></path>

                <path d="M4 17H20"></path>

            </svg>

        `,

        home: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <path

                    d="M3 10.5L12 3L21 10.5"

                ></path>

                <path

                    d="M5.5 9.5V20H18.5V9.5"

                ></path>

                <path

                    d="M9.5 20V14H14.5V20"

                ></path>

            </svg>

        `,

        categories: `

            <svg

                viewBox="0 0 24 24"

                aria-hidden="true"

                focusable="false"

            >

                <rect

                    x="4"

                    y="4"

                    width="6"

                    height="6"

                    rx="1"

                ></rect>

                <rect

                    x="14"

                    y="4"

                    width="6"

                    height="6"

                    rx="1"

                ></rect>

                <rect

                    x="4"

                    y="14"

                    width="6"

                    height="6"

                    rx="1"

                ></rect>

                <rect

                    x="14"

                    y="14"

                    width="6"

                    height="6"

                    rx="1"

                ></rect>

            </svg>

        `

    };

    /* ---------------------------------------------------------

       AJOUT DES STYLES DES ICÔNES

       --------------------------------------------------------- */

    function injectNavigationIconStyles() {

        if (

            document.getElementById(

                "ninice-navigation-icon-styles"

            )

        ) {

            return;

        }

        const style =

            document.createElement("style");

        style.id =

            "ninice-navigation-icon-styles";

        style.textContent = `

            .header-icon-button .icon-symbol,

            .mobile-menu-toggle .icon-symbol,

            .mobile-bottom-icon,

            .search-icon {

                display: inline-flex;

                align-items: center;

                justify-content: center;

            }

            .header-icon-button .icon-symbol svg,

            .mobile-menu-toggle .icon-symbol svg,

            .mobile-bottom-icon svg,

            .search-icon svg {

                width: 20px;

                height: 20px;

                display: block;

                fill: none;

                stroke: currentColor;

                stroke-width: 1.8;

                stroke-linecap: round;

                stroke-linejoin: round;

            }

            .mobile-bottom-icon svg {

                width: 21px;

                height: 21px;

            }

            .search-icon svg {

                width: 18px;

                height: 18px;

            }

            .mobile-menu-toggle .icon-symbol svg {

                width: 22px;

                height: 22px;

            }

            .brand-logo {

                overflow: hidden;

                display: inline-flex;

                align-items: center;

                justify-content: center;

            }

            .brand-logo img {

                width: 100%;

                height: 100%;

                object-fit: cover;

                display: block;

            }

            .cart-count {

                min-width: 17px;

                height: 17px;

                padding: 0 4px;

                border-radius: 999px;

                display: inline-flex;

                align-items: center;

                justify-content: center;

                font-size: 10px;

                line-height: 1;

                font-weight: 700;

            }

            .cart-count[hidden] {

                display: none !important;

            }

        `;

        document.head.appendChild(style);

    }

    /* ---------------------------------------------------------

       HEADER

       --------------------------------------------------------- */

    function renderHeader() {

        const target =

            document.getElementById("site-header");

        if (!target) {

            return;

        }

        const prefix =

            getPrefix();

        target.innerHTML = `

            <header class="site-header">

                <div class="container">

                    <div class="header-main">

                        <a

                            href="${prefix}index.html"

                            class="brand"

                            aria-label="NINICE BOUTIQUE - Accueil"

                        >

                            <span

                                class="brand-logo"

                                id="global-brand-logo"

                            >

                                NB

                            </span>

                            <span class="brand-name">

                                NINICE BOUTIQUE

                            </span>

                        </a>

                        <nav

                            class="desktop-navigation"

                            aria-label="Navigation principale"

                        >

                            <a

                                href="${prefix}index.html"

                                class="nav-link ${isActive("index.html")}"

                            >

                                Accueil

                            </a>

                            <a

                                href="${prefix}pages/categories.html"

                                class="nav-link ${isActive("categories.html")}"

                            >

                                Catégories

                            </a>

                            <a

                                href="${prefix}pages/promotions.html"

                                class="nav-link ${isActive("promotions.html")}"

                            >

                                Promotions

                            </a>

                            <a

                                href="${prefix}pages/contact.html"

                                class="nav-link ${isActive("contact.html")}"

                            >

                                Nous contacter

                            </a>

                        </nav>

                        <div class="nav-actions">

                            <a

                                href="${prefix}pages/recherche.html"

                                class="header-icon-button"

                                aria-label="Recherche"

                                title="Recherche"

                            >

                                <span class="icon-symbol">

                                    ${ICONS.search}

                                </span>

                            </a>

                            <a

                                href="${prefix}pages/favoris.html"

                                class="header-icon-button"

                                aria-label="Favoris"

                                title="Favoris"

                            >

                                <span class="icon-symbol">

                                    ${ICONS.heart}

                                </span>

                            </a>

                            <a

                                href="${prefix}pages/panier.html"

                                class="header-icon-button"

                                aria-label="Panier"

                                title="Panier"

                            >

                                <span class="icon-symbol">

                                    ${ICONS.cart}

                                </span>

                                <span

                                    class="cart-count"

                                    hidden

                                >

                                    0

                                </span>

                            </a>

                            <button

                                type="button"

                                class="mobile-menu-toggle"

                                id="mobile-menu-toggle"

                                aria-label="Ouvrir le menu"

                                aria-expanded="false"

                            >

                                <span class="icon-symbol">

                                    ${ICONS.menu}

                                </span>

                            </button>

                        </div>

                    </div>

                    <div class="mobile-search">

                        <form

                            class="search-wrapper"

                            id="global-search-form"

                        >

                            <span class="search-icon">

                                ${ICONS.search}

                            </span>

                            <input

                                type="search"

                                class="search-input"

                                id="global-search-input"

                                placeholder="Rechercher un article..."

                                autocomplete="off"

                                aria-label="Rechercher un article"

                            >

                        </form>

                    </div>

                    <div

                        class="mobile-menu"

                        id="mobile-menu"

                    >

                        <nav

                            class="mobile-menu-list"

                            aria-label="Menu mobile"

                        >

                            <a

                                href="${prefix}index.html"

                                class="mobile-menu-link ${isActive("index.html")}"

                            >

                                Accueil

                            </a>

                            <a

                                href="${prefix}pages/categories.html"

                                class="mobile-menu-link ${isActive("categories.html")}"

                            >

                                Catégories

                            </a>

                            <a

                                href="${prefix}pages/promotions.html"

                                class="mobile-menu-link ${isActive("promotions.html")}"

                            >

                                Promotions

                            </a>

                            <a

                                href="${prefix}pages/recherche.html"

                                class="mobile-menu-link ${isActive("recherche.html")}"

                            >

                                Recherche

                            </a>

                            <a

                                href="${prefix}pages/favoris.html"

                                class="mobile-menu-link ${isActive("favoris.html")}"

                            >

                                Favoris

                            </a>

                            <a

                                href="${prefix}pages/contact.html"

                                class="mobile-menu-link ${isActive("contact.html")}"

                            >

                                Nous contacter

                            </a>

                            <a

                                href="${prefix}pages/livraison.html"

                                class="mobile-menu-link ${isActive("livraison.html")}"

                            >

                                Livraison

                            </a>

                            <a

                                href="${prefix}pages/expedition.html"

                                class="mobile-menu-link ${isActive("expedition.html")}"

                            >

                                Expéditions

                            </a>

                            <a

                                href="${prefix}pages/conseils.html"

                                class="mobile-menu-link ${isActive("conseils.html")}"

                            >

                                Conseils

                            </a>

                            <a

                                href="${prefix}pages/avis.html"

                                class="mobile-menu-link ${isActive("avis.html")}"

                            >

                                Avis

                            </a>

                            <a

                                href="${prefix}pages/a-propos.html"

                                class="mobile-menu-link ${isActive("a-propos.html")}"

                            >

                                À propos

                            </a>

                            <a

                                href="${prefix}pages/localisation.html"

                                class="mobile-menu-link ${isActive("localisation.html")}"

                            >

                                Où nous trouver

                            </a>

                        </nav>

                    </div>

                </div>

            </header>

            <nav

                class="mobile-bottom-navigation"

                aria-label="Navigation mobile"

            >

                <a

                    href="${prefix}index.html"

                    class="mobile-bottom-link ${isActive("index.html")}"

                >

                    <span class="mobile-bottom-icon">

                        ${ICONS.home}

                    </span>

                    <span>Accueil</span>

                </a>

                <a

                    href="${prefix}pages/categories.html"

                    class="mobile-bottom-link ${isActive("categories.html")}"

                >

                    <span class="mobile-bottom-icon">

                        ${ICONS.categories}

                    </span>

                    <span>Catégories</span>

                </a>

                <a

                    href="${prefix}pages/panier.html"

                    class="mobile-bottom-link ${isActive("panier.html")}"

                >

                    <span class="mobile-bottom-icon">

                        ${ICONS.cart}

                    </span>

                    <span>

                        Panier

                    </span>

                    <span

                        class="cart-count"

                        hidden

                    >

                        0

                    </span>

                </a>

            </nav>

        `;

        injectNavigationIconStyles();

        initializeNavigation();

        loadGlobalShopSettings();

    }

    /* ---------------------------------------------------------

       INITIALISATION NAVIGATION

       --------------------------------------------------------- */

    function initializeNavigation() {

        const toggle =

            document.getElementById(

                "mobile-menu-toggle"

            );

        const menu =

            document.getElementById(

                "mobile-menu"

            );

        if (toggle && menu) {

            toggle.addEventListener(

                "click",

                () => {

                    const isOpen =

                        menu.classList.toggle(

                            "is-open"

                        );

                    toggle.setAttribute(

                        "aria-expanded",

                        String(isOpen)

                    );

                }

            );

            menu.querySelectorAll("a")

                .forEach(link => {

                    link.addEventListener(

                        "click",

                        () => {

                            menu.classList.remove(

                                "is-open"

                            );

                            toggle.setAttribute(

                                "aria-expanded",

                                "false"

                            );

                        }

                    );

                });

        }

        const searchForm =

            document.getElementById(

                "global-search-form"

            );

        const searchInput =

            document.getElementById(

                "global-search-input"

            );

        if (

            searchForm &&

            searchInput

        ) {

            searchForm.addEventListener(

                "submit",

                event => {

                    event.preventDefault();

                    const query =

                        searchInput.value.trim();

                    if (!query) {

                        return;

                    }

                    const prefix =

                        getPrefix();

                    window.location.href =

                        prefix +

                        "pages/recherche.html?search=" +

                        encodeURIComponent(

                            query

                        );

                }

            );

        }

        if (

            window.NINICE &&

            typeof window.NINICE.updateCartCounters ===

                "function"

        ) {

            window.NINICE.updateCartCounters();

        }

    }

    /* ---------------------------------------------------------

       PARAMÈTRES GLOBAUX DE LA BOUTIQUE

       --------------------------------------------------------- */

    async function loadGlobalShopSettings() {

        if (

            !window.NINICE ||

            typeof window.NINICE.getShopSettings !==

                "function"

        ) {

            return;

        }

        try {

            const settings =

                await window.NINICE.getShopSettings();

            if (!settings) {

                return;

            }

            const logoUrl =

                settings.logo_url ||

                settings.logo ||

                "";

            const storeName =

                settings.name ||

                settings.store_name ||

                "NINICE BOUTIQUE";

            /*

             * Mise à jour de tous les logos

             */

            document

                .querySelectorAll(".brand-logo")

                .forEach(logo => {

                    if (!logoUrl) {

                        return;

                    }

                    logo.innerHTML = `

                        <img

                            src="${escapeAttribute(logoUrl)}"

                            alt="${escapeAttribute(storeName)}"

                        >

                    `;

                });

            /*

             * Mise à jour de tous les noms

             */

            document

                .querySelectorAll(".brand-name")

                .forEach(element => {

                    element.textContent =

                        storeName;

                });

            /*

             * Mise à jour du titre si nécessaire

             */

            if (

                settings.name ||

                settings.store_name

            ) {

                const currentTitle =

                    document.title;

                if (

                    currentTitle.includes(

                        "NINICE BOUTIQUE"

                    )

                ) {

                    document.title =

                        currentTitle.replace(

                            /NINICE BOUTIQUE/gi,

                            storeName

                        );

                }

            }

        } catch (error) {

            console.warn(

                "Paramètres boutique non chargés :",

                error

            );

        }

    }

    /* ---------------------------------------------------------

       ÉCHAPPEMENT ATTRIBUT

       --------------------------------------------------------- */

    function escapeAttribute(value) {

        return String(value || "")

            .replace(/&/g, "&amp;")

            .replace(/"/g, "&quot;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;");

    }

    /* ---------------------------------------------------------

       FOOTER

       --------------------------------------------------------- */

    function renderFooter() {

        const target =

            document.getElementById(

                "site-footer"

            );

        if (!target) {

            return;

        }

        const prefix =

            getPrefix();

        const year =

            new Date().getFullYear();

        target.innerHTML = `

            <footer class="site-footer">

                <div class="container">

                    <div class="footer-main">

                        <div class="footer-brand">

                            <a

                                href="${prefix}index.html"

                                class="brand"

                            >

                                <span

                                    class="brand-logo"

                                    id="footer-brand-logo"

                                >

                                    NB

                                </span>

                                <span class="brand-name">

                                    NINICE BOUTIQUE

                                </span>

                            </a>

                            <p class="footer-description">

                                Une boutique pensée pour vous proposer

                                une sélection élégante, moderne et accessible.

                            </p>

                        </div>

                        <div class="footer-column">

                            <h3>Navigation</h3>

                            <div class="footer-links">

                                <a

                                    href="${prefix}index.html"

                                    class="footer-link"

                                >

                                    Accueil

                                </a>

                                <a

                                    href="${prefix}pages/categories.html"

                                    class="footer-link"

                                >

                                    Catégories

                                </a>

                                <a

                                    href="${prefix}pages/promotions.html"

                                    class="footer-link"

                                >

                                    Promotions

                                </a>

                                <a

                                    href="${prefix}pages/recherche.html"

                                    class="footer-link"

                                >

                                    Recherche

                                </a>

                                <a

                                    href="${prefix}pages/favoris.html"

                                    class="footer-link"

                                >

                                    Favoris

                                </a>

                                <a

                                    href="${prefix}pages/panier.html"

                                    class="footer-link"

                                >

                                    Panier

                                </a>

                            </div>

                        </div>

                        <div class="footer-column">

                            <h3>Informations</h3>

                            <div class="footer-links">

                                <a

                                    href="${prefix}pages/livraison.html"

                                    class="footer-link"

                                >

                                    Livraison

                                </a>

                                <a

                                    href="${prefix}pages/expedition.html"

                                    class="footer-link"

                                >

                                    Expéditions

                                </a>

                                <a

                                    href="${prefix}pages/avis.html"

                                    class="footer-link"

                                >

                                    Avis clients

                                </a>

                                <a

                                    href="${prefix}pages/conseils.html"

                                    class="footer-link"

                                >

                                    Conseils

                                </a>

                                <a

                                    href="${prefix}pages/a-propos.html"

                                    class="footer-link"

                                >

                                    À propos

                                </a>

                            </div>

                        </div>

                        <div class="footer-column">

                            <h3>Boutique</h3>

                            <div class="footer-links">

                                <a

                                    href="${prefix}pages/contact.html"

                                    class="footer-link"

                                >

                                    Nous contacter

                                </a>

                                <a

                                    href="${prefix}pages/localisation.html"

                                    class="footer-link"

                                >

                                    Où nous trouver

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="footer-bottom">

                    <div class="container">

                        <div class="footer-bottom-inner">

                            <span>

                                © ${year}

                                NINICE BOUTIQUE.

                                Tous droits réservés.

                            </span>

                            <span>

                                Boutique en ligne

                            </span>

                        </div>

                    </div>

                </div>

            </footer>

        `;

        /*

         * Après création du footer,

         * on recharge les paramètres pour

         * que son logo et son nom soient synchronisés.

         */

        loadGlobalShopSettings();

    }

    /* ---------------------------------------------------------

       INITIALISATION

       --------------------------------------------------------- */

    function init() {

        renderHeader();

        renderFooter();

    }

    if (

        document.readyState ===

        "loading"

    ) {

        document.addEventListener(

            "DOMContentLoaded",

            init,

            {

                once: true

            }

        );

    } else {

        init();

    }

})();
