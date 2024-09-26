Bonjour 
J’ai livré en dev une première version de l'acquisition multiple (fil Ariane) 
, je n'ai pas pu livrer sur UAT car cet environnement doit rester stable cette semaine (déjà réservé pour les tests CPPE__DPRO)

Ci-dessous la revue sur le livrable : 

---> Ajout de plusieurs objets dans le fil ariane (post dans la base patch des données via IHM)
---> Restitution de la liste des objets sur le fil Ariane 
---> Possibilité de supprimer sur IHM un objet ajouté par le conseiller avant de poster en base 
---> Changement d'un objet a un autre via le clic sur l'objet (restitution des données et du résultat Alignement pour chaque objet en cliquant là-dessus) 
---> Calcul de l'alignement pour chaque objet du fil ariane via le bouton calculer
---> Application de toutes les règles métiers déjà utilisé pour le mono objet (contrôle dynamique des champs obligatoires basé sur le click bouton calcul uniquement ou lors d'un retour sur l'objet pour une deuxième consultation (deuxième clic)) 

Règles métiers :

---> Un conseiller peut ajouter un nouvel objet si et seulement s’il calcule l'alignement sur l'objet courant 
(Si non le bouton ajouter un nouvel objet financement reste grisé) 
---> Possibilité de suppression d'un objet localement au niveau de l'IHM 
---> Le conseiller doit refaire le calcul après chaque modification des données via IHM (cette règle est en relation avec la règle en bas qui manque reste à valider)  

Cette version n’embarque pas la règle suivante :
Règle de gestion manquante : imposer le calcul de l'alignement à chaque modification des données dans l'IHM (uniquement les données en relation avec les paramètres de calcul de l’alignement)
(Merci de revoir coté métier si on peut faire autrement le contrôle car il y a un risque d'ajout de complexité et de régression)  
Vu la complexité des règles métiers et le manque des détails sur cette fonctionnalité, on a essayé de définir les règles moi et Estelle et Sabrina.


Merci.
