# PhotoTech Web App

Découvrez PhotoTech, l'outil pratique conçu pour simplifier la gestion de vos images. Avec PhotoTech, enregistrez jusqu'à 5 profils différents, chaque profil étant personnalisable avec une photo de profil unique.

Notre interface intuitive vous permet de sauvegarder aisément vos images depuis n'importe quel dossier, vous offrant une gestion simplifiée de votre bibliothèque de photos. De plus, visualisez et gérez vos images en toute simplicité, directement depuis notre plateforme.

## Installation

### Prérequis

- Node.js
- npm

### Étapes d'installation

1. Clonez ce dépôt:
   ```bash
   git clone https://github.com/corentin-lechene/phototech
   ```
2. Installez les dépendances:
   ```bash
    npm install
    ```
3. Créez un fichier `private-key-admin.json` à la racine du projet et ajoutez les variables suivantes:
    ```env
    {
        "apiKey": "lorem",
        "authDomain": "lorem.firebaseapp.com",
        "projectId": "lorem",
        "storageBucket": "lorem.appspot.com",
        "messagingSenderId": "lorem",
        "appId": "lorem"
    }
   ```

4. Lancez le serveur:
    ```bash
    npm run dev
    ```

# Authors
- Abdallah SLIMANE
- Corentin LECHÊNE
- Mélissa LAURENT