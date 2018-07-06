---
title: "Retours sur React-Europe 2016"
author: Florent Duveau
tags: [React, Javascript, conference, GraphQL, Facebook]
---

Chez [Canal+](http://www.canalplus.fr/) nous aimons et utilisons [React](https://facebook.github.io/react/) dans de nombreux services.

Nous avons eu la chance de pouvoir assister cette année à la conférence [React Europe](https://www.react-europe.org/) - LA conf européenne sur React -  qui s’est déroulée le 2 et 3 juin à Paris et a rassemblé quelques centaines des passionnés venus du monde entier. Cette année étaient présents - entre autres - [Christopher Chedeau](https://twitter.com/vjeux), [Cheng Lou](https://twitter.com/_chenglou) et [Dan Abramov](https://twitter.com/dan_abramov) de la React Core Team, [Bonnie Eisenman](https://twitter.com/brindelle) de Twitter ou [Jafar Husain](https://twitter.com/jhusain) de Netflix - du beau monde donc - venus nous présenter les avancées de la stack Facebook et nous permettre de découvrir les grandes orientations des prochains mois/années.

L’édition précédente avait été l’occasion de découvrir en profondeur l’architecture Flux et notamment de vivre la naissance de [Redux](http://redux.js.org/) par Dan Abramov. Les équipes de Facebook avaient aussi présenté deux nouveautés : [GraphQL](http://graphql.org/) et [React-Native](https://facebook.github.io/react-native/).

Cette année peu de découvertes mais Facebook nous a conforté dans l’idée que GraphQL et React-Native sont leurs deux sujets du moment. Deux sujets qui changent en profondeur la manière de concevoir des applications. Et il semble que ça va durer.

GraphQL
=======

GraphQL est ~~un langage~~ [une spécification](http://facebook.github.io/graphql/) de requêtage de données se positionnant entre l’interface et le serveur. Il permet notamment d'agréger de façon "intelligente" des données éparses et les formater dans un json ayant une structure qui sied aux besoins du front. Nous l'utilisons chez Canal+ dans ce but, avec des résultats très satisfaisants (qui feront l'objet d'un prochain article (sourire)).
En production chez Facebook depuis quelques années, GraphQL est aujourd'hui implémenté dans une douzaine de langages (javascript, Java, ruby, go ou .NET ...).

![GraphQL]({{ site.url }}{{site.baseurl}}/images/reactue2016_graphql.png)

Facebook semble vraiment croire en ce nouveau paradigme de communication client/serveur et le nombre impressionnant de projets (la gestion des caches, l'intégration avec React etc...) que propose la communauté montre un engouement réel.

Jafar Husain en a d'ailleurs profité pour présenter [Falcor](https://github.com/Netflix/falcor), la solution proposée par Netflix pour répondre aux mêmes problématiques. La philosophie reste globalement la même mais l'implémentation semble plus souple et nous a personnellement conquis !
 
GraphQL et Falcor remettent donc en cause l'architecture REST, ce qui n'est pas rien ! Mais un changement encore plus profond semble prendre forme avec React-Native...

React-Native
============

React-Native est né d'une volonté féroce de Facebook de simplifier et améliorer leurs développements sur mobile. On se souvient du virage à 180 degrés qu'a opéré la société californienne il y a 4 ans en abandonnant le HTML5 sur mobile au profit d'applications natives et laissant [un souvenir douloureux](http://techcrunch.com/2012/09/11/mark-zuckerberg-our-biggest-mistake-with-mobile-was-betting-too-much-on-html5/) à Mark Zuckerberg. Ce traumatisme est sans doute à la base de nombreuses expérimentations en interne pour trouver une solution qui permettrait de développer des applications exécutables sur plusieurs plateformes et de manière homogène : Le fameux "Learn once, run everywhere", fortement inspiré par le slogan de Sun Microsystems.

Après plus d'un an en open-source, React-Native est en passe de réussir son pari tant les améliorations et la création d'outils autour du framework présentés à ce React Europe sont nombreux. Facebook investit énormément d'énergie pour améliorer l'expérience et architecturer les développements. Limité initialement à iOS puis ouvert à Android, React-Native est aujourd'hui portable sur Tizen et Windows grâce aux [travaux de Samsung et Microsoft](http://techcrunch.com/2016/04/13/facebooks-react-native-open-source-project-gets-backing-from-microsoft-and-samsung/) et d'autres développements sont en cours pour supporter OSX et.... le web !

![React-Native]({{ site.url }}{{site.baseurl}}/images/reactue2016_reactnative.png)

C'est ici qu'on prend la mesure de l'ambition de Facebook de créer un framework qui nous permettrait de créer des interfaces web & native pour un nombre illimité de plateformes avec une même logique de développement. On imagine le gain en coûts et en temps de développements que cela implique ! Cette promesse fait grand écho chez Canal aux vus de nos produits cross-pateform (TV, WEB, MOBILE, BOX) ou la recherche d'optimisations est permanante.

En conclusion
=============

D'autres talks nous ont aussi inspirés, comme [la présentation](https://www.youtube.com/watch?v=mVVNJKv9esE) de Cheng Lou qui nous invite à réfléchir sur la notion d'abstraction dans nos applications.

Cette édition a été l'occasion pour Facebook de s'affirmer encore un peu plus comme un acteur de premier plan dans le monde du développement et l'absence de grosses nouveautés est finalement une bonne nouvelle en montrant la maturité de leurs solutions dans un monde JS en révolution perpétuelle.

PS : les vidéos des conférences sont déjà disponibles sur la [chaîne Youtube](https://www.youtube.com/channel/UCorlLn2oZfgOJ-FUcF2eZ1A) de React-Europe (en anglais)