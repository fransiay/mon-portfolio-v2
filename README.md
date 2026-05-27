# Portfolio BTS Informatique

Portfolio professionnel pour étudiant en BTS SIO (Services Informatiques aux Organisations).

## Structure du projet

```
portfolio/
│
├── index.html              # Page d'accueil
│
├── css/
│   └── style.css           # Feuille de style principale
│
├── js/
│   └── script.js           # Script JavaScript principal
│
├── images/
│   ├── profile.jpg         # Photo de profil
│   ├── project1.png        # Images des projets
│   ├── project2.png
│   └── icons/              # Icônes personnalisées (optionnel)
│
├── documents/
│   └── cv.pdf              # CV téléchargeable
│
├── pages/
│   ├── parcours.html       # Page parcours et compétences
│   ├── projets.html        # Page projets
│   ├── veille.html         # Page veille technologique
│   └── contact.html        # Page contact
│
└── README.md               # Ce fichier
```

## Fonctionnalités

- Design moderne et épuré (blanc, bleu, gris, noir)
- Entièrement responsive (mobile, tablette, desktop)
- Navigation fluide avec menu hamburger sur mobile
- Animations au scroll (Intersection Observer)
- Filtrage des projets par catégorie
- Formulaire de contact avec validation JavaScript
- Timeline interactive pour le parcours
- Barres de progression animées pour les compétences
- Bouton flottant pour télécharger le CV (visible sur toutes les pages)

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles avec variables CSS (Custom Properties)
- **JavaScript** : Vanilla JS (pas de framework)
- **Google Fonts** : Police Poppins

## Installation

1. Téléchargez ou clonez ce projet
2. Ouvrez `index.html` dans votre navigateur
3. Personnalisez le contenu selon vos besoins

## Personnalisation

### Modifier les informations personnelles

1. Ouvrez chaque fichier HTML
2. Remplacez les textes placeholder par vos informations
3. Ajoutez votre photo de profil dans `images/profile.jpg`
4. Ajoutez vos images de projets dans `images/`

### Modifier les couleurs

Ouvrez `css/style.css` et modifiez les variables CSS dans `:root` :

```css
:root {
    --color-accent: #2563eb;       /* Bleu principal */
    --color-accent-light: #3b82f6; /* Bleu clair */
    --color-accent-dark: #1d4ed8;  /* Bleu foncé */
}
```

### Ajouter un nouveau projet

Dans `pages/projets.html`, copiez une carte `<article class="project-card">` et modifiez :
- L'attribut `data-category` (scolaire, personnel, stage)
- Le titre, la description, les technologies
- Les liens vers le projet et GitHub

## Compatibilité navigateurs

- Chrome (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Edge (dernières versions)
- IE 11 (support de base avec fallback)

## Licence

Libre d'utilisation pour usage personnel et éducatif.

## Auteur

Votre Nom - Étudiant BTS SIO
