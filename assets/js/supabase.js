/* =========================================================

   NINICE BOUTIQUE

   CONNEXION SUPABASE

   ========================================================= */

(function () {

    "use strict";

    /*

     * Vérification de la configuration

     */

    if (!window.NINICE_CONFIG) {

        console.error(

            "NINICE BOUTIQUE : configuration Supabase introuvable."

        );

        return;

    }

    /*

     * Vérification de la bibliothèque Supabase

     */

    if (!window.supabase) {

        console.error(

            "NINICE BOUTIQUE : la bibliothèque Supabase n'est pas chargée."

        );

        return;

    }

    const {

        SUPABASE_URL,

        SUPABASE_ANON_KEY

    } = window.NINICE_CONFIG;

    /*

     * Vérification des paramètres

     */

    if (

        !SUPABASE_URL ||

        !SUPABASE_ANON_KEY

    ) {

        console.error(

            "NINICE BOUTIQUE : paramètres Supabase incomplets."

        );

        return;

    }

    /*

     * Création du client Supabase

     */

    window.niniceSupabase =

        window.supabase.createClient(

            SUPABASE_URL,

            SUPABASE_ANON_KEY,

            {

                auth: {

                    persistSession: true,

                    autoRefreshToken: true,

                    detectSessionInUrl: true

                }

            }

        );

    /*

     * Petit indicateur technique.

     * Aucun mot de passe ni donnée sensible n'est affiché.

     */

    window.NINICE_SUPABASE_READY = true;

    console.info(

        "NINICE BOUTIQUE : connexion Supabase initialisée."

    );

})()
