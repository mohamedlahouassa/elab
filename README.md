# Elab
# Description:
Elab est une plateforme Saas (Software As A Service) destiné à l'ensemble des laboratoires
d’analyses pour faciliter la distribution d’information vers les clients. D’un côté elle permet
au laboratoire de bien gérer ses clients, et d’un autre elle facilite pour le client la
récupération des résultats d’analyse.
Ses fonctionnalités :
- Chaque client à un compte dans le laboratoire qu’il consulte.
- Un laboratoire gère plusieurs comptes clients.
- Le laboratoire envoie les résultats médicaux à chaque client.
- Chaque laboratoire a un compte chez elab.
Description:
Elab est une plateforme Saas (Software As A Service) destiné à l'ensemble des laboratoires
d’analyses pour faciliter la distribution d’information vers les clients. D’un côté elle permet
au laboratoire de bien gérer ses clients, et d’un autre elle facilite pour le client la
récupération des résultats d’analyse.
Ses fonctionnalités :
- Chaque client à un compte dans le laboratoire qu’il consulte.
- Un laboratoire gère plusieurs comptes clients.
- Le laboratoire envoie les résultats médicaux à chaque client.
- Chaque laboratoire a un compte chez elab.
# Les technologies utilisées :
C’est une plateforme web, divisée en front-end, back-end, Database et déployée sur un serveur cloud.
# front-end :
 . React JS
 . CSS
# back-end :
 . Node JS
 . Express JS
# Database : 
 . MySQL

 ![alt text](https://github.com/mohamedlahouassa/elab/blob/main/git2.PNG?raw=true) 
# Front-end:
# Coté Laboratoire : Elle contient :<br/>
1- une page d’authentification.<br/>
2- une page administration pour gérer les clients :<br/>
● create client : créer un compte pour un client et lui générer automatiquement un
username et un password pour chaque client.<br/>
● show clients : afficher la liste des clients inscrits.<br/>
● delete client : supprimer un client choisi.<br/>
● post documents to client : charger un fichier vers le client.<br/>
● delete documents from clients : supprimer un document chargé vers un client.<br/>
● view downloads : voir si un client télécharge son document.<br/>
# Coté Client : Elle contient :<br/>
1- une page d’authentification.<br/>
2- une page principale qui contient les informations personnelles et les
résultats\documents envoyé par le laboratoire<br/>
# Database: Elle est composée de : <br/>
1- une table de clients, ces attributs sont : client_id, name, …etc <br/>
2- une table de documents, ces attributs sont : doc_id, client_id,name, ….etc <br/>
# Backend: Il est composé de :  <br/>
1- Routeur pour un laboratoire:  Ce routeur gère les requêtes de laboratoire qui consistent de :  <br/>
authentification avec JWT dans login.js <br/>
sub-routeur client qui gère les requêtes CRUD (create,update,delete,select ) sur les clients (Il est obligatoire de passer le token dans chaque requête) <br/>
sub-routeur document qui gère les requêtes (create,delete ,select) sur les documents (Il est obligatoire de passer le token dans chaque requête) <br/>
2- routeur pour client : Ce routeur gère les requêtes des clients qui consistent de :  <br/>
authentification avec JWT dans login.js <br/>
sub-router document qui gère les requêtes (select, update) sur les documents <br/>
sub-router info qui gère les requêtes (select,update) sur le client lui-même. <br/>
3- router pour la DB  <br/>
db.js la connexion avec la base de données <br/>
# Saas
la plateforme elab est comme software as service côté hébergement chaque laboratoire a deux Containers :<br/>
MySql Container<br/>
Server Container (Node js)<br/>
et chaque laboratoire a un subdomain<br/>
par ex : lab1.elab.com (laboratoire 1)<br/>
              lab2.elab.com (laboratoire 2)
notre serveur ouvre seulement deux ports (80,443) avec une seule address ip public qui héberge plusieurs sites Webs (Containers)<br/>
# Comment ?
en utilisant un reverse Proxy qui est un Container recevant toutes les requêtes dans les ports 80,443, et qui connaît le domain name source de cette requête donc il va renvoyer cette requête au Container correspondant,  étant donnée 2 Laboratoires: (lab1 ,lab2), alors le reverse proxy connait les 2 sous domains (lab1.elab.com lab2.elab.com) et connais aussi 2 containers
Nodejs ContainerLab1 et Nodejs ContainerLab2, donc il va envoyer la requête au NodejsContainerLab1 si le domain name de la source de cette requete est Lab1.elab.com

![alt text](https://github.com/mohamedlahouassa/elab/blob/main/Git.PNG?raw=true)




