# Design Lab Normandie

Plateforme communautaire fédérant les designers du territoire normand — annuaire participatif, vitrine institutionnelle et espace de mise en réseau.

## 🛠️ Stack technique

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS v3** avec design system custom (palette géologique normande)
- **Framer Motion** pour les animations
- **Supabase** (Auth, PostgreSQL, Storage)
- **Prisma** comme ORM
- **React Hook Form** + **Zod** pour les formulaires
- **Resend** pour les emails transactionnels

## 🚀 Installation locale

### Prérequis

- Node.js 18+
- npm 9+
- Compte Supabase (pour la base de données et l'authentification)

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/your-org/designlab-normandie.git
cd designlab-normandie

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# 4. Générer le client Prisma
npx prisma generate

# 5. Appliquer les migrations (nécessite une base PostgreSQL)
npx prisma migrate dev

# 6. Lancer le serveur de développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## 📁 Structure du projet

```
├── app/
│   ├── (site)/          # Pages publiques (Homepage, Annuaire, etc.)
│   ├── (admin)/         # Zone admin protégée
│   ├── api/             # API routes (designers, contact, newsletter)
│   └── auth/            # Callbacks Supabase Auth
├── components/
│   ├── layout/          # Navbar, Footer, MobileMenu
│   ├── home/            # Sections de la homepage
│   ├── annuaire/        # Composants annuaire (cards, filtres, recherche)
│   ├── designer/        # Composants fiche designer
│   ├── forms/           # Formulaires (inscription, contact)
│   ├── ui/              # Composants UI réutilisables
│   └── providers/       # Context providers
├── lib/                 # Utilitaires, validations, animations, constantes
├── prisma/              # Schéma et migrations
├── emails/              # Templates emails (React Email)
├── public/fonts/        # Polices self-hosted (Fraunces, DM Sans, DM Mono)
└── types/               # Types TypeScript globaux
```

## 🎨 Direction artistique

L'identité visuelle s'inspire de la **géologie normande** — falaises, calcaire, craie, silex. Palette :

| Token   | Couleur   | Usage                  |
|---------|-----------|------------------------|
| chalk   | `#F5F2ED` | Fond principal         |
| slate   | `#2C3340` | Texte, éléments forts  |
| earth   | `#7A5C3E` | Accent chaud           |
| flint   | `#8A8C8F` | Gris secondaire        |
| moss    | `#4A6741` | Accent vif             |
| ink     | `#1A1C1E` | Noir profond           |

## 🌐 Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Configurer les variables d'environnement dans le dashboard Vercel (voir `.env.example`).

La région primaire est `cdg1` (Paris), configurée dans `vercel.json`.

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage avec hero, mission, designers en vedette |
| `/annuaire` | Annuaire filtrable des designers normands |
| `/annuaire/[slug]` | Fiche designer individuelle |
| `/rejoindre` | Formulaire d'inscription multi-étapes |
| `/projets` | Projets et expérimentations |
| `/manifeste` | Manifeste et à propos |
| `/agenda` | Événements à venir |
| `/contact` | Formulaire de contact |
| `/admin` | Dashboard admin (protégé) |

## 📝 Licence

Tous droits réservés — Design Lab Normandie.
