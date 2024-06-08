module.exports = [
  {
    name: "Langages de programmation",
    tags: [
      {
        name: "Java",
        description:
          "Langage de programmation orienté objet, couramment utilisé pour le développement d'applications d'entreprise.",
        url: "https://www.oracle.com/java/",
        related: ["JavaFX", "Java Spring Boot"],
      },
      {
        name: "Java Spring Boot",
        description:
          "Framework pour la réalisation d'application Java (Server, Configuration automatique, Injection de dépendance).",
        url: "https://spring.io/projects/spring-boot/",
        related: ["Java"],
      },
      {
        name: "Clojure",
        description:
          "Langage de programmation fonctionnel compilé et transpilé vers du bytecode Java. Une grande interopérabilité avec Java est possible.",
        url: "https://clojure.org/",
        related: ["JavaFX"],
      },
      {
        name: "Go",
        description:
          "Langage de programmation open source conçu chez Google, visant à simplifier la programmation concurrente.",
        url: "https://golang.org/",
        related: [],
      },
      {
        name: "C#",
        alias: [".NET"],
        description: "Langage de programmation orienté objet semblable entre le C++ et le Java.",
        url: "https://learn.microsoft.com/fr-fr/dotnet/csharp/",
        related: ["C++", "Java"],
      },
      {
        name: "C++",
        description:
          "Langage de programmation orienté objet et bas niveau, permettant la gestion manuelle de la mémoire.",
        url: "https://isocpp.org/",
        related: ["Qt"],
      },
      {
        name: "QML",
        description: "Langage de balisage d'interface utilisateur développé dans le framework Qt.",
        url: "https://doc.qt.io/qt-6/qtqml-index.html",
        related: ["Qt"],
      },
      {
        name: "JavaScript",
        description:
          "Langage de programmation interprété, principalement utilisé pour les applications web côté client.",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        related: ["NodeJS", "React"],
      },
      {
        name: "PHP",
        description:
          "Langage de programmation côté serveur, utilisé principalement pour le développement web.",
        url: "https://www.php.net/",
        related: ["Symfony"],
      },
      {
        name: "NodeJS",
        description:
          "Environnement d'exécution JavaScript côté serveur, basé sur le moteur V8 de Google.",
        url: "https://nodejs.org/",
        related: ["Express"],
      },
      {
        name: "Groovy",
        description: "Langage de programmation orienté objet destiné à la plate-forme Jenkins",
        url: "https://groovy-lang.org/",
        related: ["Jenkins", "Java"],
      },
      {
        name: "CSS",
        description: "",
        url: "https://developer.mozilla.org/fr/docs/Web/CSS",
        related: [],
      },
    ],
  },
  {
    name: "Ingénierie Logicielle",
    tags: [
      {
        name: "Algorithmique",
        alias: ["Algorithmie", "Algorithmique avancée", "Algorithme"],
        description: "Technique de conception et d'analyse d'algorithmes.",
        url: "https://fr.wikipedia.org/wiki/Algorithmique",
        related: [],
      },
      {
        name: "UML",
        alias: ["COO"],
        description:
          "Langage de modélisation graphique utilisé dans le développement logiciel/conception orientée objet",
        url: "https://fr.wikipedia.org/wiki/UML_(informatique)",
        related: ["Conception"],
      },
      {
        name: "i18n",
        alias: ["Internationalisation", "Locale"],
        description:
          "Internationalisation: Adaptation d'un produit (logiciel, site web, etc.) à différentes langues et régions.",
        url: "https://fr.wikipedia.org/wiki/Internationalisation_et_localisation",
        related: [],
      },
    ],
  },
  {
    name: "Frameworks et bibliothèques",
    tags: [
      {
        name: "React",
        description:
          "Bibliothèque JavaScript pour la création d'interfaces utilisateur et le développement d'applications multiplateformes.",
        url: "https://reactjs.org/",
        related: ["React Native", "JavaScript"],
      },
      {
        name: "React Native",
        description:
          "Bibliothèque JavaScript pour la création d'interfaces utilisateur et le développement d'applications multiplateformes.",
        url: "https://reactnative.dev/",
        related: ["React", "JavaScript"],
      },
      {
        name: "JavaFX",
        description:
          "Bibliothèque Java pour la création d'applications riches avec une interface utilisateur graphique.",
        url: "https://openjfx.io/",
        related: ["Java"],
      },
      {
        name: "Qt",
        description:
          "Bibliothèque multiplateforme pour le développement d'applications avec interfaces utilisateur graphiques en C++.",
        url: "https://www.qt.io/",
        related: ["C++", "QML"],
      },
      {
        name: "Symfony",
        description: "Framework PHP pour le développement d'applications web et APIs.",
        url: "https://symfony.com/",
        related: ["Twig", "Doctrine"],
      },
      {
        name: "Bootstrap",
        description:
          "Framework CSS pour la création d'interfaces utilisateur responsives et adaptatives.",
        url: "https://getbootstrap.com/",
        related: ["CSS"],
      },
      {
        name: "Semantic UI",
        description:
          "Framework CSS pour la création d'interfaces utilisateur responsives et adaptatives.",
        url: "https://semantic-ui.com/",
        related: ["CSS"],
      },
      {
        name: "Unity",
        description: "Moteur de jeu multiplateforme",
        url: "https://unity.com/fr",
        related: ["C#"],
      },
    ],
  },
  {
    name: "Base de données",
    tags: [
      {
        name: "Relationnelle",
        description: "Type de base de données",
        url: "",
        description: "Base de données relationnelle",
        related: ["Oracle", "PostgreSQL"],
      },
      {
        name: "Oracle",
        description: "",
        url: "https://www.oracle.com/fr/database/technologies/appdev/sql.html",
        description: "Base de données relationnelle",
        related: ["PL/SQL", "Relationnelle"],
      },
      {
        name: "PostgreSQL",
        description: "Base de données relationnelle",
        url: "https://www.postgresql.org/",
        related: ["Relationnelle"],
      },
      {
        name: "PL/SQL",
        description:
          "Langage de programmation de procédures stockées pour les bases de données Oracle.",
        url: "https://www.postgresql.org/",
        related: ["Oracle"],
      },
      {
        name: "NoSQL",
        description: "Type de base de données",
        url: "",
        description: "Base de données relationnelle",
        related: ["MongoDB", "Neo4J"],
      },
      {
        name: "MongoDB",
        description: "NoSQL",
        url: "https://www.mongodb.com/",
        related: ["NoSQL"],
      },
      {
        name: "Neo4J",
        description: "NoSQL orienté graphe",
        url: "https://neo4j.com/",
        related: ["NoSQL"],
      },
    ],
  },
  {
    name: "Tests",
    tags: [
      {
        name: "Test Driven Development",
        alias: ["TDD"],
        description:
          "Méthode de développement de logiciel qui consiste à concevoir un logiciel par des itérations successives très courtes à l'aide de tests unitaire",
        url: "https://fr.wikipedia.org/wiki/Test_driven_development",
        related: ["JUnit"],
      },
      {
        name: "JUnit",
        description:
          "Outil de développement guidé par les tests pour écrire et exécuter des tests unitaires en Java.",
        url: "https://junit.org/junit5/",
        related: ["Test Driven Development"],
      },
      {
        name: "JUnit",
        description:
          "Outil de développement guidé par les tests pour écrire et exécuter des tests unitaires en Java.",
        url: "https://junit.org/junit5/",
        related: ["Test Driven Development"],
      },
      {
        name: "Behaviour Driven Development",
        alias: ["BDD"],
        description:
          "Méthode de programmation agile qui encourage la collaboration entre les développeurs, les ingénieurs qualité et les intervenants non techniques ou commerciaux participant à un projet logiciel",
        url: "https://fr.wikipedia.org/wiki/Test_driven_development",
        related: ["Cucumber"],
      },
      {
        name: "Cucumber",
        description:
          "Outil de développement guidé par le comportement pour définir et exécuter des tests d'acceptation.",
        url: "https://cucumber.io/",
        related: ["Behaviour Driven Development"],
      },
    ],
  },
  {
    name: "Méthodologies",
    tags: [
      {
        name: "Méthode AGILE",
        alias: ["AGILE"],
        description:
          "Approche itérative et incrémentale pour la gestion de projet et le développement de logiciels.",
        url: "https://www.agilealliance.org/",
        related: [],
      },
    ],
  },
  {
    name: "Systèmes et réseaux",
    tags: [
      {
        name: "Bash",
        description: "Shell",
        url: "https://doc.ubuntu-fr.org/bash",
        related: [],
      },

      {
        name: "DevOps",
        description:
          "Mouvement technique visant à l'unification du développement logiciel (dev) et de l'administration des infrastructures informatiques (ops), notamment l'administration système.",
        url: "https://azure.microsoft.com/fr-fr/resources/cloud-computing-dictionary/what-is-devops",
        related: ["Docker", "Kubernetes", "Bash", "Jenkins", "Gitlab CI", "GitHub Actions"],
      },
      {
        name: "Docker",
        description:
          "Plateforme de conteneurisation permettant de simplifier le déploiement et la gestion d'applications en conteneurs.",
        url: "https://www.docker.com/",
        related: ["Kubernetes"],
      },
      {
        name: "Kubernetes",
        description:
          "Orchestrateur de conteneurs open-source permettant d'automatiser le déploiement, la mise à l'échelle et la gestion d'applications conteneurisées.",
        url: "https://kubernetes.io/",
        related: ["Docker"],
      },
    ],
  },

  {
    name: "CI/CD",
    tags: [
      {
        name: "GitLab CI",
        description:
          "Intégration et déploiement continu pour automatiser le déploiement de logiciels",
        url: "https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/",
        related: ["GitHub Actions", "Jenkins", "CI/CD"],
      },
      {
        name: "GitHub Actions",
        description:
          "Intégration et déploiement continu pour automatiser le déploiement de logiciels",
        url: "https://github.com/features/actions",
        related: ["Docker", "Kubernetes", "CI/CD"],
      },
      {
        name: "Jenkins",
        description:
          "Intégration et déploiement continu pour automatiser le déploiement de logiciels",
        url: "https://www.jenkins.io/",
        related: ["GitLab CI", "GitHub Actions", "Groovy", "CI/CD"],
      },
    ],
  },
  {
    name: "Logiciels",
    tags: [
      {
        name: "Git",
        description: "Logiciel de gestion de versions décentralisé.",
        url: "https://git-scm.com/",
        related: ["GitHub Actions", "GitLab CI"],
      },
      {
        name: "Jira",
        description: "Logiciel de gestion de projets.",
        url: "https://www.atlassian.com/fr/software/jira",
        related: ["Méthode AGILE", "Trello"],
      },
      {
        name: "Trello",
        description: "Outil de gestion de projets.",
        url: "https://trello.com/fr",
        related: ["Méthode AGILE", "Jira"],
      },
      {
        name: "HeidiSQL",
        description: "Outil d'administration de base de donnéees relationnelle.",
        url: "https://www.heidisql.com/",
        related: ["Oracle", "PostgreSQL", "Relationnelle"],
      },
    ],
  },
];
