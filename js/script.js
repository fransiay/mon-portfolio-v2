/* ================================================
   PORTFOLIO - SCRIPT JAVASCRIPT PRINCIPAL
   ================================================
   Description: Gestion des interactions et animations
   Structure: Initialisation > Navigation > Animations > Formulaire > Utilitaires
   ================================================ */

// ================================================
// 1. INITIALISATION
// ================================================
// Attendre que le DOM soit complètement chargé avant d'exécuter le code

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités du site
    initNavbar();           // Effets de la barre de navigation
    initMobileMenu();       // Menu hamburger mobile
    initSmoothScroll();     // Scroll fluide entre sections
    initScrollAnimations(); // Animations au défilement
    initSkillBars();        // Animation des barres de compétences
    initProjectFilters();   // Filtres des projets
    initContactForm();      // Validation du formulaire
    initHoroscope();        // Widget horoscope
    initActiveNavLink();    // Surlignage du lien actif
});

// ================================================
// 2. NAVIGATION - Effets de la barre de navigation
// ================================================

/**
 * Ajoute une ombre à la navbar lors du scroll
 * Améliore l'expérience utilisateur en indiquant visuellement le scroll
 */
function initNavbar() {
    // Récupérer l'élément navbar
    const navbar = document.getElementById('navbar');
    
    // Si la navbar n'existe pas, arrêter l'exécution
    if (!navbar) return;
    
    // Écouter l'événement de scroll sur la fenêtre
    window.addEventListener('scroll', function() {
        // Ajouter/retirer la classe 'scrolled' selon la position du scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================================================
// 3. MENU MOBILE - Gestion du menu hamburger
// ================================================

/**
 * Gère l'ouverture et la fermeture du menu sur mobile
 * Inclut l'animation du bouton hamburger et du menu
 */
function initMobileMenu() {
    // Récupérer les éléments du menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Vérifier que les éléments existent
    if (!navToggle || !navMenu) return;
    
    // Toggle du menu au clic sur le bouton hamburger
    navToggle.addEventListener('click', function() {
        // Basculer les classes active sur le bouton et le menu
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        // Cela évite le double scroll sur mobile
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        // Vérifier si le clic est dans le menu ou sur le bouton toggle
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        // Si le clic est en dehors et que le menu est ouvert, le fermer
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================================
// 4. SCROLL FLUIDE - Navigation entre sections
// ================================================

/**
 * Active le scroll fluide pour tous les liens d'ancrage internes
 * Prend en compte la hauteur de la navbar fixe
 */
function initSmoothScroll() {
    // Sélectionner tous les liens commençant par #
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            // Empêcher le comportement par défaut du lien
            event.preventDefault();
            
            // Récupérer l'ID de la section cible
            const targetId = this.getAttribute('href');
            
            // Ignorer si le href est juste "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculer la position en tenant compte de la navbar
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Effectuer le scroll fluide
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================
// 5. LIEN ACTIF - Surligner la section courante
// ================================================

/**
 * Met à jour automatiquement le lien de navigation actif
 * basé sur la section actuellement visible à l'écran
 */
function initActiveNavLink() {
    // Récupérer toutes les sections avec un ID
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Si pas de sections ou de liens, arrêter
    if (sections.length === 0 || navLinks.length === 0) return;
    
    /**
     * Fonction pour déterminer quelle section est visible
     * et mettre à jour le lien correspondant
     */
    function updateActiveLink() {
        // Position actuelle du scroll + offset pour une détection précise
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Vérifier si la section est dans la zone visible
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Ajouter la classe active au lien correspondant
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Écouter le scroll pour mettre à jour le lien actif
    window.addEventListener('scroll', updateActiveLink);
    
    // Appeler une fois au chargement pour initialiser
    updateActiveLink();
}

// ================================================
// 6. ANIMATIONS AU SCROLL - Intersection Observer
// ================================================

/**
 * Anime les éléments quand ils entrent dans le viewport
 * Utilise l'API Intersection Observer pour de meilleures performances
 */
function initScrollAnimations() {
    // Sélectionner tous les éléments avec l'attribut data-animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // Si pas d'éléments à animer, arrêter
    if (animatedElements.length === 0) return;
    
    // Options de l'observateur
    const observerOptions = {
        root: null,          // Utilise le viewport comme référence
        rootMargin: '0px',   // Pas de marge supplémentaire
        threshold: 0.1       // Déclencher quand 10% de l'élément est visible
    };
    
    /**
     * Callback appelé quand un élément entre/sort du viewport
     * @param {Array} entries - Liste des éléments observés
     * @param {IntersectionObserver} observer - L'instance de l'observateur
     */
    const observerCallback = function(entries, observer) {
        entries.forEach(function(entry) {
            // Si l'élément est visible
            if (entry.isIntersecting) {
                // Ajouter la classe pour déclencher l'animation CSS
                entry.target.classList.add('visible');
                
                // Arrêter d'observer cet élément (animation unique)
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'observateur
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observer chaque élément
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ================================================
// 7. BARRES DE COMPÉTENCES - Animation
// ================================================

/**
 * Anime les barres de progression des compétences
 * L'animation se déclenche quand la barre devient visible
 */
function initSkillBars() {
    // Récupérer toutes les barres de progression
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Si pas de barres, arrêter
    if (skillBars.length === 0) return;
    
    // Options pour l'observateur
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5    // Déclencher quand 50% de la barre est visible
    };
    
    /**
     * Callback pour animer la largeur des barres
     */
    const observerCallback = function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Récupérer la valeur de progression depuis l'attribut data
                const progressValue = entry.target.getAttribute('data-progress');
                
                // Animer la largeur avec un léger délai pour l'effet
                setTimeout(function() {
                    entry.target.style.width = progressValue + '%';
                }, 200);
                
                // Arrêter d'observer cette barre
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer et appliquer l'observateur
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

// ================================================
// 8. FILTRES DE PROJETS - Filtrage par catégorie
// ================================================

/**
 * Gère le filtrage des projets par catégorie
 * Permet d'afficher uniquement les projets d'une catégorie spécifique
 */
function initProjectFilters() {
    // Récupérer les boutons de filtre et les cartes de projet
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Si pas de boutons ou de cartes, arrêter
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    // Écouter les clics sur les boutons de filtre
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Récupérer la valeur du filtre depuis l'attribut data-filter
            const filterValue = this.getAttribute('data-filter');
            
            // Mettre à jour l'état actif des boutons
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filtrer les cartes de projet
            projectCards.forEach(function(card) {
                // Récupérer la catégorie de la carte
                const cardCategory = card.getAttribute('data-category');
                
                // Afficher ou masquer selon le filtre sélectionné
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Afficher la carte avec animation
                    card.classList.remove('hidden');
                    card.classList.remove('visible');
                    
                    // Réappliquer l'animation avec un délai
                    setTimeout(function() {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    // Masquer la carte
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ================================================
// 9. FORMULAIRE DE CONTACT - Validation
// ================================================

/**
 * Initialise la validation du formulaire de contact
 * Vérifie les champs et affiche les messages appropriés
 */
function initContactForm() {
    // Récupérer le formulaire
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    // Si le formulaire n'existe pas, arrêter
    if (!form) return;
    
    // Écouter la soumission du formulaire
    form.addEventListener('submit', function(event) {
        // Empêcher l'envoi par défaut
        event.preventDefault();
        
        // Réinitialiser les erreurs précédentes
        clearErrors();
        
        // Récupérer les valeurs des champs (trim pour enlever les espaces)
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Variable pour suivre la validité du formulaire
        let isValid = true;
        
        // --- Validation du nom ---
        if (name === '') {
            showError('name', 'Veuillez entrer votre nom');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        }
        
        // --- Validation de l'email ---
        if (email === '') {
            showError('email', 'Veuillez entrer votre email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Veuillez entrer un email valide');
            isValid = false;
        }
        
        // --- Validation du sujet ---
        if (subject === '') {
            showError('subject', 'Veuillez entrer un sujet');
            isValid = false;
        } else if (subject.length < 5) {
            showError('subject', 'Le sujet doit contenir au moins 5 caractères');
            isValid = false;
        }
        
        // --- Validation du message ---
        if (message === '') {
            showError('message', 'Veuillez entrer votre message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }
        
        // Si le formulaire est valide, simuler l'envoi
        if (isValid) {
            submitForm(form, formSuccess);
        }
    });
    
    // Validation en temps réel - Retirer l'erreur quand l'utilisateur tape
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.textContent = '';
                this.classList.remove('error');
            }
        });
    });
}

/**
 * Vérifie si un email est valide avec une expression régulière
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide, false sinon
 */
function isValidEmail(email) {
    // Expression régulière pour valider le format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Affiche un message d'erreur pour un champ spécifique
 * @param {string} fieldId - L'ID du champ en erreur
 * @param {string} message - Le message d'erreur à afficher
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field && errorElement) {
        // Ajouter la classe d'erreur au champ
        field.classList.add('error');
        // Afficher le message
        errorElement.textContent = message;
    }
}

/**
 * Efface tous les messages d'erreur du formulaire
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputElements = document.querySelectorAll('.form-input');
    
    // Effacer le texte des erreurs
    errorElements.forEach(function(error) {
        error.textContent = '';
    });
    
    // Retirer la classe d'erreur des champs
    inputElements.forEach(function(input) {
        input.classList.remove('error');
    });
}

/**
 * Simule l'envoi du formulaire
 * Dans un vrai projet, remplacer par un appel AJAX vers le serveur
 * @param {HTMLFormElement} form - Le formulaire
 * @param {HTMLElement} successElement - L'élément de message de succès
 */
function submitForm(form, successElement) {
    // Récupérer et désactiver le bouton pendant l'envoi
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Envoi en cours...</span>';
    submitButton.disabled = true;
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    
    // Envoyer via Fetch vers Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Réinitialiser le formulaire
            form.reset();
            
            // Afficher le message de succès
            if (successElement) {
                successElement.classList.add('show');
                successElement.textContent = "Votre message a été envoyé avec succès ! Je vous répondrai bientôt.";
            }
        } else {
            alert("Oups ! Un problème est survenu lors de l'envoi.");
        }
    })
    .catch(error => {
        alert("Oups ! Un problème réseau est survenu.");
    })
    .finally(() => {
        // Restaurer le bouton
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Masquer le message de succès après 5 secondes
        setTimeout(function() {
            if (successElement) {
                successElement.classList.remove('show');
            }
        }, 5000);
    });
}

// ================================================
// 10. UTILITAIRES - Fonctions helper
// ================================================

/**
 * Fonction de debounce pour optimiser les événements fréquents
 * Limite le nombre d'exécutions d'une fonction dans le temps
 * 
 * @param {Function} func - La fonction à exécuter
 * @param {number} wait - Le délai en millisecondes entre les exécutions
 * @returns {Function} - La fonction avec debounce appliqué
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifie si un élément est visible dans le viewport
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean} - True si l'élément est visible
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================================
// 11. OPTIMISATIONS - Performance
// ================================================

// Appliquer le debounce aux événements de scroll fréquents
// Cela améliore les performances en limitant les appels de fonction
window.addEventListener('scroll', debounce(function() {
    // Les actions optimisées au scroll peuvent être ajoutées ici
    // Par exemple: lazy loading d'images, mise à jour de compteurs, etc.
}, 10));

// ================================================
// 12. SUPPORT NAVIGATEURS - Fallbacks
// ================================================

// Vérifier le support de IntersectionObserver (non supporté par IE)
if (!('IntersectionObserver' in window)) {
    // Fallback pour les anciens navigateurs
    // Afficher directement les éléments sans animation
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(function(element) {
        element.classList.add('visible');
    });
    
    // Animer les barres de compétences immédiatement
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(function(bar) {
        const progressValue = bar.getAttribute('data-progress');
        bar.style.width = progressValue + '%';
    });
}

// ================================================
// FIN DU SCRIPT

/**
 * Initialise le widget horoscope en récupérant les données via l'API publique.
 * La fonction est appelée au chargement du DOM (voir initHoroscope() dans l'écouteur DOMContentLoaded).
 */
function initHoroscope() {
    const container = document.getElementById('horoscope-content');
    if (!container) return;
    // Afficher un indicateur de chargement
    container.innerHTML = '<p>Chargement du horoscope…</p>';
    fetch('https://daily-horoscope-widget.vercel.app/api/horoscope')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Attendre que le HTML contienne les champs attendus
            const { horoscope, event, info } = data;
            const html = `
                <div class="horoscope-section-content">
                    <h3 class="section-subtitle">Horoscope</h3>
                    <p class="horoscope-text">${horoscope}</p>
                    <h3 class="section-subtitle">Événement du jour</h3>
                    <p class="event-text">${event}</p>
                    <h3 class="section-subtitle">Information du jour</h3>
                    <p class="info-text">${info}</p>
                </div>`;
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du horoscope :', error);
            container.innerHTML = '<p>Impossible de charger le horoscope. Veuillez réessayer plus tard.</p>';
        });
}

// FIN DU SCRIPT
// ================================================
