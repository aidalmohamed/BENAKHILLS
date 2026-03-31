# Plan de Restauration et Amélioration de Benak Hills

Ce plan vise à résoudre les problèmes de base de données Neon, restaurer le panneau d'administration manquant (ou cassé), et implémenter le système d'upload direct d'images compressées.

## Objectifs 
1. **Rétablir la base de données** sur une nouvelle instance Neon.
2. **Corriger les erreurs de sauvegarde** (models et offres) causées par des schémas de table incomplets ou des points de terminaison API manquants.
3. **Implémenter l'upload direct d'images** (Base64) pour éviter de dépendre de liens externes.
4. **Réinjecter les images de la galerie** fournies par l'utilisateur.

## Étapes de réalisation

### 1. Structure de la Base de Données (api/db.ts)
- Ajouter la table `models`.
- Mettre à jour la table `offers` avec les champs manquants (`updated_at`, `title_en`, etc.).
- S'assurer que toutes les tables (`gallery`, `carousel`, `leads`, `admins`) sont correctement initialisées.

### 2. Points de Terminaison API (api/)
- **Créer `api/models.ts`** : Ce fichier est actuellement manquant, ce qui explique l'impossibilité de sauvegarder les modèles.
- **Mettre à jour `api/offers.ts`** : Corriger les incohérences de colonnes lors de l'insertion et de la mise à jour.
- **Support des images** : Modifier les APIs pour accepter les flux de données d'images.

### 3. Panneau d'Administration (Frontend)
- **Rétablir le routage** : Actuellement, `App.tsx` n'a pas de routes. Je vais ajouter `react-router-dom` pour supporter `/` (vitrine) et `/admin`.
- **Interface d'administration** : Reconstruire une interface complète pour gérer les modèles, offres, galeries et carrousels.
- **Upload direct** : Remplacer les champs "URL" par des sélecteurs de fichiers convertissant les images en Base64 avant l'envoi.

### 4. Migration des Données
- Si l'utilisateur fournit les données de l'ancienne base, je créerai un script d'import. Sinon, nous repartirons sur la nouvelle base.

### 5. Injection de Galerie
- Une fois le système prêt, j'injecterai directement les images fournies.
