Bonjour,

J’ai livré en environnement de développement une première version de l'acquisition multiple (fil Ariane). Cependant, je n’ai pas pu déployer cette version sur l'environnement UAT, car cet environnement doit rester stable cette semaine, étant déjà réservé pour les tests CPPE_DPRO.

Voici les détails du livrable :

Ajout de plusieurs objets dans le fil d'Ariane (insertion en base et mise à jour des données via l'IHM).
Restitution de la liste des objets dans le fil d'Ariane.
Possibilité de supprimer un objet ajouté par le conseiller via l'IHM avant de l’enregistrer en base.
Navigation d'un objet à l'autre par simple clic sur l'objet, avec restitution des données et des résultats d'alignement correspondants.
Calcul de l'alignement pour chaque objet du fil d'Ariane via le bouton "Calculer".
Application des règles métiers existantes pour le mono-objet (contrôle dynamique des champs obligatoires déclenché lors du calcul ou lors de la sélection d’un objet pour une deuxième consultation).
Règles métiers appliquées :

Un conseiller peut ajouter un nouvel objet uniquement après avoir calculé l'alignement de l'objet courant. (Sinon, le bouton "Ajouter un nouvel objet financement" reste désactivé).
Possibilité de supprimer un objet localement via l'IHM.
Le conseiller doit recalculer l'alignement après chaque modification des données via l'IHM. (Cette règle reste en lien avec une autre règle à valider).
Règle non incluse dans cette version :

La règle de gestion qui impose le recalcul de l'alignement à chaque modification des données dans l'IHM (uniquement pour les données relatives aux paramètres de calcul de l'alignement) n'est pas encore implémentée. Merci de revoir ce point côté métier afin de valider une approche qui éviterait d'ajouter de la complexité et des risques de régression.
