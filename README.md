# à propos
* Projet de dépôt de données (texte et images) pouvant être stockées puis utilisées pour être affichées sur une autre page de rendu. Idéalement, à chaque nouvel ajout dans le dépôt, les données sont instantanément transmises et mises en page dans le rendu.
* Statut du projet : Gigantesque brouillon de recherches
* Date de déploiement : 15 mai 2018 mdr..

# architecture  
INTERFACE DE DÉPÔT, Privé :  
Home  
  * Hello, petit message de bienvenue
  * bouton S'identifier (accès limité à une poignée d'individus)

Login
  * Formulaire de connexion

 Une fois l'utilisateur reconnu :

 Dépôt  
  1. Choisir déposer article ou photos

  ARTICLE :  

éditeur de texte : quill.js à la place de react ?  
   * Déposer du texte (Titre, chapo et corps de texte) dans une limite de caractères  
   * Optionnel : déposer des images illustrant ce texte (donc lié à lui) + une ligne de légende (crédits et description)

  PHOTOS :
   * Déposer des images (liées les unes aux autres) + une ligne de légende (crédits et description)

  2. Soumettre, sauvegarder les données dans une db  

# architecture  
RENDU, Public :

Home  
   * Hello, petit message de bienvenue

Naviguer  
   * Aperçu des titres, images (niveau zoom 0)  
   * en séléctionnant : déploiement des chapôs (niveau zoom 1)  
   * en sélectionnant encore : affichage de corps des texte et légendes (niveau zoom 2)  
   * retour  
