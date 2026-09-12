/* =========================================================

   NINICE BOUTIQUE

   NAVIGATION + FOOTER

   ========================================================= */

(function () {

    "use strict";

    function getPrefix() {

        if (

            window.NINICE &&

            typeof window.NINICE.getPathPrefix ===

                "function"

        ) {

            return window.NINICE.getPathPrefix();

        }

        const path =

            window.location.pathname;

        if (

            path.includes("/pages/") ||

            path.includes("/admin/")

        ) {

            return "../";

        }

        return "";

    }

    function getCurrentPage() {

        const path =

            window.location.pathname

                .split("/")

                .pop()

                .toLowerCase();

        if (

            path === "" ||

            path === "index.html"

        ) {

            return "index.html";

        }

        return path;

    }

    function isActive(page) {

        const current =

            getCurrentPage();

        return current === page

            ? "active"

            : "";

    }

    /* -----------------------------------------------------

       NAVIGATION

       ----------------------------------------------------- */

    function renderHeader() {

        const target =

            document.getElementById(

                "site-header"

            );

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

                                href="${prefix}pages/favoris.html"

                                class="header-icon-button"

                                aria-label="Favoris"

                                title="Favoris"

                            >

                                <span

                                    class="icon-symbol"

                                    aria-hidden="true"

                                >

                                    ♡

                                </span>

                            </a>

                            <a

                                href="${prefix}pages/panier.html"

                                class="header-icon-button"

                                aria-label="Panier"

                                title="Panier"

                            >

                                <span

                                    class="icon-symbol"

                                    aria-hidden="true"

                                >

                                    🛍

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

                                <span

                                    class="icon-symbol"

                                    aria-hidden="true"

                                >

                                    ☰

                                </span>

                            </button>

                        </div>

                    </div>

                    <div class="mobile-search">

                        <form

                            class="search-wrapper"

                            id="global-search-form"

                        >

                            <span

                                class="search-icon"

                                aria-hidden="true"

                            >

                                ⌕

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

                                Expédition

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

                    <span

                        class="mobile-bottom-icon"

                        aria-hidden="true"

                    >

                        ⌂

                    </span>

                    <span>

                        Accueil

                    </span>

                </a>

                <a

                    href="${prefix}pages/categories.html"

                    class="mobile-bottom-link ${isActive("categories.html")}"

                >

                    <span

                        class="mobile-bottom-icon"

                        aria-hidden="true"

                    >

                        ▦

                    </span>

                    <span>

                        Catégories

                    </span>

                </a>

                <a

                    href="${prefix}pages/panier.html"

                    class="mobile-bottom-link ${isActive("panier.html")}"

                >

                    <span

                        class="mobile-bottom-icon"

                        aria-hidden="true"

                    >

                        🛍

                    </span>

                    <span>

                        Panier

                    </span>

                </a>

            </nav>

        `;

        initializeNavigation();

        loadGlobalShopSettings();

    }

    /* -----------------------------------------------------

       INTERACTIONS

       ----------------------------------------------------- */

    function initializeNavigation() {

        const toggle =

            document.getElementById(

                "mobile-menu-toggle"

            );

        const menu =

            document.getElementById(

                "mobile-menu"

            );

        if (

            toggle &&

            menu

        ) {

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

            menu

                .querySelectorAll("a")

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

                    /*

                     * La page catégories/recherche

                     * sera développée plus tard.

                     */

                    window.location.href =

                        prefix +

                        "pages/categories.html" +

                        "?search=" +

                        encodeURIComponent(query);

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

    /* -----------------------------------------------------

       PARAMÈTRES BOUTIQUE

       ----------------------------------------------------- */

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

                await window.NINICE

                    .getShopSettings();

            if (!settings) {

                return;

            }

            /*

             * Le logo et les autres paramètres

             * seront entièrement exploités

             * lorsque la page d'administration

             * sera construite.

             */

            const logoUrl =

                settings.logo_url ||

                settings.logo ||

                null;

            const logo =

                document.getElementById(

                    "global-brand-logo"

                );

            if (

                logo &&

                logoUrl

            ) {

                logo.innerHTML = `

                    <img

                        src="${escapeAttribute(logoUrl)}"

                        alt="Logo NINICE BOUTIQUE"

                    >

                `;

            }

            /*

             * Si le nom de la boutique existe

             * dans Supabase, il pourra remplacer

             * la valeur par défaut.

             */

            if (

                settings.name ||

                settings.store_name

            ) {

                const name =

                    settings.name ||

                    settings.store_name;

                document

                    .querySelectorAll(

                        ".brand-name"

                    )

                    .forEach(element => {

                        element.textContent =

                            name;

                    });

            }

        } catch (error) {

            console.warn(

                "Paramètres boutique non chargés :",

                error

            );

        }

    }

    /* -----------------------------------------------------

       SÉCURITÉ HTML ATTRIBUT

       ----------------------------------------------------- */

    function escapeAttribute(value) {

        return String(value || "")

            .replace(/&/g, "&amp;")

            .replace(/"/g, "&quot;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;");

    }

    /* -----------------------------------------------------

       INITIALISATION

       ----------------------------------------------------- */

    function init() {

        renderHeader();

        const footer =

            document.getElementById(

                "site-footer"

            );

        if (footer) {

            renderFooter();

        }

    }

    /* -----------------------------------------------------

       FOOTER

       ----------------------------------------------------- */

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

                                >

                                    NB

                                </span>

                                <span

                                    class="brand-name"

                                >

                                    NINICE BOUTIQUE

                                </span>

                            </a>

                            <p class="footer-description">

                                Une boutique pensée pour

                                vous proposer une sélection

                                élégante, moderne et accessible.

                            </p>

                        </div>

                        <div class="footer-column">

                            <h3>

                                Navigation

                            </h3>

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

                            <h3>

                                Informations

                            </h3>

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

                                    Expédition

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

                            <h3>

                                Boutique

                            </h3>

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

    }

    /* -----------------------------------------------------

       LANCEMENT

       ----------------------------------------------------- */

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
