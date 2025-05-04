const ABOUT_ME = `${BOLD}${BLUE}
\r$$\\   $$\\ $$\\                     $$\\                                                                 
\r$$$\\  $$ |\\__|                    $$ |                                                                
\r$$$$\\ $$ |$$\\  $$$$$$$\\  $$$$$$\\  $$ | $$$$$$\\   $$$$$$$\\                                             
\r$$ $$\\$$ |$$ |$$  _____|$$  __$$\\ $$ | \\____$$\\ $$  _____|                                            
\r$$ \\$$$$ |$$ |$$ /      $$ /  $$ |$$ | $$$$$$$ |\\$$$$$$\\                                              
\r$$ |\\$$$ |$$ |$$ |      $$ |  $$ |$$ |$$  __$$ | \\____$$\\                                             
\r$$ | \\$$ |$$ |\\$$$$$$$\\ \\$$$$$$  |$$ |\\$$$$$$$ |$$$$$$$  |                                            
\r\\__|  \\__|\\__| \\_______| \\______/ \\__| \\_______|\\_______/                                             
\r                                                                                                        
\r             $$$$$$\\  $$\\   $$\\ $$$$$$$$\\ $$$$$$$\\  $$$$$$$\\   $$$$$$\\  $$\\   $$\\ $$$$$$$\\     $$$$$\\ 
\r            $$  __$$\\ $$ |  $$ |$$  _____|$$  __$$\\ $$  __$$\\ $$  __$$\\ $$ |  $$ |$$  __$$\\    \\__$$ |
\r            $$ /  \\__|$$ |  $$ |$$ |      $$ |  $$ |$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |  $$ |      $$ |
\r            $$ |$$$$\\ $$ |  $$ |$$$$$\\    $$$$$$$  |$$$$$$$  |$$ |  $$ |$$ |  $$ |$$ |  $$ |      $$ |
\r            $$ |\\_$$ |$$ |  $$ |$$  __|   $$  __$$< $$  __$$< $$ |  $$ |$$ |  $$ |$$ |  $$ |$$\\   $$ |
\r            $$ |  $$ |$$ |  $$ |$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |
\r            \\$$$$$$  |\\$$$$$$  |$$$$$$$$\\ $$ |  $$ |$$ |  $$ | $$$$$$  |\\$$$$$$  |$$$$$$$  |\\$$$$$$  |
\r             \\______/  \\______/ \\________|\\__|  \\__|\\__|  \\__| \\______/  \\______/ \\_______/  \\______/ 
\r${RESET}
\r Jeune diplômé de l'ENSIMAG, j'ai eu l'opportunité de travailler en alternance chez Hewlett Packard Enterprise (HPE) en tant qu'apprenti ingénieur en développement logiciel.
\r Depuis mon plus jeune âge, l'informatique a toujours été une véritable passion pour moi, et plus particulièrement le développement logiciel.
\r Aujourd'hui, mon objectif est de poursuivre ma carrière en tant qu'ingénieur en développement logiciel au sein d'une entreprise innovante et stimulante.
\r
\r ${GREEN}Passions: ${RED}{4}${RESET}
\r   ${YELLOW}Animation Vidéo:${RESET}
\r     Réalisation de vidéos d'animation 2D principalement du Motion Design sur After Effects.
\r   ${YELLOW}Electronique:${RESET}
\r     Réalisation de projets électroniques sous ESP32, Arduino et Raspberry Pi. 
\r     Principalement de l'IoT.
\r   ${YELLOW}Programmation:${RESET}
\r     Mon métier-passion, je développe depuis l'âge de 12 ans (Java >>>)
\r     Je suis passionné par le développement logiciel et l'algorithmique.
\r   ${YELLOW}Presdigitation:${RESET}
\r     Magicien amateur, j'aime transmettre des émotions à travers la magie.
\r    
\r  ${GREEN}Points forts: ${RESET}
\r   * Rigoureux 
\r   * Autonome
\r   * Curieux
\r   * Passionné
\r   * Autodidacte
\r
\r
\r ${GREEN}${BOLD}Ce shell interractif vous permet de mieux me connaître à travers mes projets et mes compétences.
\r N'hésitez pas à explorer les différentes commandes disponibles grâce à la commande 'help'.
\r ${RESET}
\r Pour obtenir une version PDF de mon CV: 
\r   [EN](https://nicolas.guerroudj.fr/assets/CV%20-%20EN.pdf)
\r   [FR](https://nicolas.guerroudj.fr/assets/CV%20-%20FR.pdf)
\r
`

let projectFs = {};

for (let project of projects) {
    let projectName = project.name.replace(/[ \/]/g, "_")
    
    let sourceLink = project.src;
    if (sourceLink) {
        if (sourceLink.startsWith("//")) {
            sourceLink = "http:" + sourceLink;
        } else if (sourceLink.startsWith("/")) {
          sourceLink = window.location.origin + sourceLink;
        }
    }

    projectFs[projectName] = {
        type: "directory",
        content: {
            "README.md": { type: "file", content: 
                `
                \r${project.figlet.replace(/\n/g, "\n\r")}
                \r
                \r${project.description}
                \r
                \r${project.type} réalisé en ${project.year} 
                \rStack: ${project.tags.join(", ")}
                \r
                \r${project.up ? "URL: " + project.url : "\x1b[1A" }
                \r${sourceLink ? "Source: " + sourceLink : "\x1b[1A" }
                `
             }
        }
    }

}

let skillsFs = {}
for (let skillCategory of competences) {
    let categoryName = skillCategory.name.replace(/[ \/]/g, "_")
    skillsFs[categoryName] = {
        type: "directory",
        content: {}
    }
    for (let skill of skillCategory.tags) {
      let skillName = skill.name.replace(/[ \/]/g, "_") + ".md"
      skillsFs[categoryName].content[skillName] = { 
        type: "file",
        content: `
        \r${skill.figlet.replace(/\n/g, "\n\r")}
        \r
        \r${skill.description}
        \r
        \r${skill.url ? ("Pour en savoir plus: ") + skill.url : "\x1b[1A"}
        \r
        \r${skill.related.length ? ("Notion relié à [" + skill.related.join(", ") + "]") : "\x1b[1A"}
        `
      };
    }
}

let educationsFs = {}

for (let education of formations) {
    let educationName = education.name.replace(/[ \/]/g, "_")
    let date = education.date;
    if (date.begin === date.end) {
        date = "En " + date.begin;
    } else if (date.end === "" || date.end === "now") {
        date = "Depuis " + date.begin;
    } else {
        date = "De " + date.begin + " à " + date.end;
    }
    educationsFs[educationName] = {
        type: "directory",
        content: {
            "README.md": { type: "file", content: 
                `
                \r${education.figlet.replace(/\n/g, "\n\r")}
                \r
                \r${education.description ? education.description : "\x1b[2A"}
                \r
                \r${date}
                \r
                \r${education.tags.length ? "Notions: " + education.tags.join(", ") : "\x1b[2A"}
                \r
                \r${education.mentions.length ? "Mentions: {"+education.mentions.length+"}\n\r  " + education.mentions.map(mention => mention.title).join("\n\r  ") : "\x1b[2A"}
                `
             }
        }
    }
}

let fs = {
    type: "directory",
    content: {
      "home": {
        type: "directory",
        content: {
          "nicolas": { 
            type: "directory",
            content: {
              "about.md": { 
                type: "file",
                 content: ABOUT_ME
              },
            } 
          },
        },
      },
      "projects": {
        type: "directory",
        content: projectFs,
      },
      "skills": {
        type: "directory",
        content: skillsFs,
      },
      "educations": {
        type: "directory",
        content: educationsFs,
      },
    }
  }


  function getAbsolutePath(p) {
    if (!p.startsWith("/")) {
      p = path +"/" + p;
    }

    let parts = p.split("/").filter(part => part !== "" && part !== ".");
    let absolutePath = [];
    for (let part of parts) {
      if (part === "..") {
        absolutePath.pop();
      } else {
        absolutePath.push(part);
      }
    }
    return "/" + absolutePath.join("/");
  }

  function getDir(path) {
    let absolutePath = getAbsolutePath(path);
    
    let directories = absolutePath.split("/");
    
    let dirFs = fs;
    for (let directory of directories) {
      if (directory === "") {
        continue;
      }
      if(dirFs.content[directory] && dirFs.content[directory].type === "directory") {
        dirFs = dirFs.content[directory];
      } else {
        return null;
      }
    }

    return {path: absolutePath, fs: dirFs};
  }
  let path = "/";
  let currentDir = fs;