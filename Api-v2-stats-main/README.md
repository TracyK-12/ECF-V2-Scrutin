V2
Un second scrutin est prévu.
Bien sûr, l'application n'est pour l'instant pas prévue pour gérer ce cas de figure.
Vous avez déjà mis à jour l'API (V2), mais il faut maintenant passer à l'APP elle-même.

Steve sera toujours le seul qui aura accès à l'app.

En vous appuyant sur l'API, il faudra ajouter les notions suivantes : .Scrutin

Nous aurons plusieurs pages :
	. Ecran d'accueil.
	. Ecran de vote (similaire à celui de la V1)
	. Ecran de statistiques, affichant les chiffres du nombre de votant (bonus : sous forme de graphique)

->Écran d’accueil qui affiche tous les scrutins disponibles

	Pour chaque scrutin : titre, date de début/fin et un bouton « Voir »

	En cliquant sur un scrutin, on navigue vers la vue des membres de ce scrutin

.Ecran de vote / Liste des membres par scrutin

	Tableau listant nom, prénom, date de naissance, et état du vote (has_voted) pour le scrutin sélectionné

	Emargement (vote)

	Bouton Voter à côté de chaque membre non marqué

	Une fois cliqué, le bouton disparaît et devient un label A voté, action irréversible

.Consultation des statistiques

    Affichage sous forme de tableau ou de graphique simple (bar chart)
