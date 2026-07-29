<div align="center">
  <img src="https://img.shields.io/badge/Evento-PWA-8B5CF6?style=for-the-badge&logo=pwa&logoColor=white" alt="Evento PWA">
  <br/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-181818?style=flat-square&logo=supabase&logoColor=3ECF8E" alt="Supabase">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
</div>

<br/>

# 🎪 Evento — Gestion d'Événements PWA

> **Application Progressive Web App** pour la gestion complète de petits et moyens événements : inscriptions en ligne, badging digital, scan QR des badges, contrôle d'accès en temps réel, et tableau de bord organisateur.

---

## ✨ Fonctionnalités

### 🎯 Pour les participants
- **Inscription en ligne** — Formulaire adapté selon le type (Visiteur, Exposant, Presse)
- **Badge digital** — QR code unique généré après inscription, téléchargeable et imprimable
- **Photo upload** — Prise de photo ou import depuis la galerie

### 🛂 Pour les organisateurs
- **Scanner QR** — Scan en direct des badges pour validation d'entrée
- **Contrôle d'accès** — Vérification instantanée (admis / déjà scanné / inconnu)
- **Dashboard complet** — Statistiques, participants, logs, galerie médias, paramètres

### 📊 Dashboard organisateur (9 onglets)
| Onglet | Description |
|---|---|
| 📊 **Aperçu** | Statistiques clés : inscrits, scannés, taux de conversion |
| 👥 **Participants** | Liste complète avec recherche et filtres |
| 📋 **Logs d'accès** | Historique des scans avec horodatage |
| 🖼️ **Médias** | Galerie photos des participants uploadées |
| 📢 **Annonces** | Messages diffusés aux participants |
| 🎨 **Personnalisation** | Couleurs, logo, thème de l'événement |
| ⚙️ **Paramètres** | Configuration générale de l'événement |
| 📱 **Scan** | Interface de scan QR avec retour visuel |
| 📈 **Rapports** | Graphiques et statistiques avancées |

---

## 🚀 Déploiement (Cloudflare Pages)

Ce projet est optimisé pour un déploiement instantané sur **Cloudflare Pages**.

### Paramètres de build

| Champ | Valeur |
|---|---|
| **Framework preset** | `None` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Deploy command** | *(laisser vide)* |

### SPA Routing

Un fichier `public/_redirects` est déjà configuré pour le routage côté client :
```
/*    /index.html    200
```

---

## 🛠️ Stack Technique

| Technologie | Utilisation |
|---|---|
| **React 18** | Interface utilisateur |
| **TypeScript** | Typage statique |
| **Vite 5** | Bundler ultra-rapide |
| **Tailwind CSS 3** | Styles utilitaires |
| **shadcn/ui** | Composants UI accessibles |
| **Supabase** | Base de données & Auth |
| **html5-qrcode** | Scan QR natif |
| **qrcode.react** | Génération de QR codes |
| **react-router-dom** | Routage SPA |
| **react-hook-form + Zod** | Formulaires typés et validation |
| **Framer Motion** | Animations fluides |
| **recharts** | Graphiques du dashboard |
| **Cloudflare Pages** | Hébergement & déploiement |

---

## 📁 Structure du Projet

```
src/
├── components/
│   ├── register/       # Formulaires d'inscription
│   │   ├── RegisterSchemas.ts   # Schémas Zod + types
│   │   ├── PhotoUpload.tsx      # Upload photo drag & drop
│   │   ├── VisitorForm.tsx      # Formulaire visiteur
│   │   ├── ExhibitorForm.tsx    # Formulaire exposant avec formules
│   │   └── PressForm.tsx        # Formulaire presse
│   ├── Layout.tsx      # Navigation + Footer
│   ├── Badge.tsx       # Badge digital avec QR code
│   └── QrScanner.tsx   # Scanner QR code
├── pages/
│   ├── Index.tsx       # Landing page avec carousel
│   ├── Register.tsx    # Point d'entrée inscription
│   ├── Scanner.tsx     # Page scan badge
│   ├── Login.tsx       # Authentification
│   ├── About.tsx       # À propos
│   └── Contact.tsx     # Contact
├── pages/dashboard/
│   └── Dashboard.tsx   # Dashboard organisateur
├── contexts/
│   ├── AuthContext.tsx # Contexte authentification
│   └── ThemeContext.tsx # Contexte thème
└── utils/
    └── participantStorage.ts  # Stockage localStorage
```

---

## 🧪 Développement Local

```bash
# Cloner le projet
git clone https://github.com/idhem85/evento.git
cd evento

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📬 Contact

Projet développé par **Mehdi Alaoui** — [@idhem85](https://github.com/idhem85)

---

<div align="center">
  <sub>Fait avec ❤️ pour la gestion d'événements</sub>
</div>
