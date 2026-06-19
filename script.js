document.addEventListener("DOMContentLoaded", function() {

    // === GESTIONNAIRE D'ONGLETS PRINCIPAL ===
    const navLinks = document.querySelectorAll(".nav-item");
    const footerLinks = document.querySelectorAll(".footer-nav a");
    const sections = document.querySelectorAll(".section-page");

    function navigateToSection(targetId) {
        // 1. Masquer toutes les sections
        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        // 2. Afficher uniquement la section demandée
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add("active-section");
        }

        // 3. Mettre à jour l'état visuel "active" dans le menu du haut
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === targetId) {
                link.classList.add("active");
            }
        });

        // 4. Remonter automatiquement au début de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Événements sur le menu supérieur (Header)
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = this.getAttribute("data-target");
            navigateToSection(target);
        });
    });

    // Événements sur le menu du bas (Footer)
    footerLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = this.getAttribute("data-target");
            navigateToSection(target);
        });
    });

    // Redirections des boutons internes (Bouton Voir la Galerie / Ouvrir la galerie)
    const viewGalleryBtn = document.getElementById("hero-go-gallery");
    const openGalleryCta = document.getElementById("cta-go-gallery");

    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener("click", () => navigateToSection("galerie"));
    }
    if (openGalleryCta) {
        openGalleryCta.addEventListener("click", () => navigateToSection("galerie"));
    }


    // === TRI DYNAMIQUE DE LA GALERIE (FILTRES) ===
    const filterTags = document.querySelectorAll(".filter-tags .tag");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterTags.forEach(tag => {
        tag.addEventListener("click", function() {
            // Activer graphiquement le badge de filtrage sélectionné
            filterTags.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const criteria = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                
                // Si "tous" ou si la catégorie correspond
                if (criteria === "tous" || itemCategory === criteria) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none"; // Correction effectuée ici
                }
            });
        });
    });

});