let commands = [
    { name: "help", description: "Display this help", func: help },
    { name: "clear", description: "Clear the terminal", func: clear},
    { name: "cd", description: "Change directory", func: cd },
    { name: "ls", description: "List files in the current directory", func: ls },
    { name: "cat", description: "Display the content of a file", func: cat },
    { name: "experiences", description: "Display my experiences", func: showExperiences },
    { name: "educations", description: "Display my educations", func: showEducations },
    { name: "skills", description: "Browse into my skills", func: searchSkills },
    { name: "projects" , description: "Load my projects", func: showProjects },
    { name: "contact", description: "Display my contact information", func: contact},
    { name: "exit", description: "Exit the terminal", func: exit},
  ]

  function help(_) {
    term.writeln("Available commands:");
    let maxCommandLength = Math.max(...commands.map(cmd => cmd.name.length));
    console.log(maxCommandLength);
    commands.forEach((command) => {
      term.writeln(`  ${command.name}${" ".repeat(maxCommandLength-command.name.length)} : ${command.description}`);
    });
    return null;
  };

  function clear(_) {
    term.clear();
    setInput('');
    return null;
  };

  function exit(_) {
    let spinner_index = 0;
    setTimeout(() => { 
      window.location.href = "/";
    }, 1000);
    return {
      captureKeys: true,
      onKey: function (key, e) {
        return true;
      },
      onTick: function () {
        term.write("\r" + GREEN + SPINER[spinner_index] + RESET + " Exiting terminal...");
        spinner_index = (spinner_index + 1) % SPINER.length;
        return true;
      },
    };
  };

  function contact(_) {
    term.writeln("");
    term.writeln("Contact me at: ");
    term.writeln("  - Email: nicolas@guerroudj.fr");
    term.writeln("  - LinkedIn: https://www.linkedin.com/in/nicolas-guerroudj/");
    term.writeln("");
    term.writeln("Download my CV: ");
    term.writeln("  - [FR](https://nicolas.guerroudj.fr/assets/CV%20-%20FR.pdf)");
    term.writeln("  - [EN](https://nicolas.guerroudj.fr/assets/CV%20-%20EN.pdf)");
    return null;
  }
 
  function cat(args) {
    console.log("cat", args);
    if (args.length !== 1) {
      term.writeln("Usage: cat <file>");
      return;
    }

    let absolutePath = getAbsolutePath(args[0]);
    let file = absolutePath.split("/").splice(-1)[0];
    let dirPath = absolutePath.split("/").slice(0, -1).join("/");
    let dir = getDir(dirPath);
    if (!dir) {
      term.writeln("Directory not found.");
      return null;
    }
    if (!dir.fs.content[file]) {
      term.writeln("File not found.");
      return null;
    }
    if (dir.fs.content[file].type !== "file") {
      term.writeln("Not a file.");
      return null;
    }
    
    term.writeln(dir.fs.content[file].content);
    return null;

  };

  function cd(args) {
    if (args.length !== 1) {
      term.writeln("Usage: cd <directory>");
      return null;
    }

    let dir = getDir(args[0]);
    if (dir === null) {
      term.writeln("Directory not found.");
      return null;
    }
    console.log("dir", dir);
    path = dir.path;
    currentDir = dir.fs;
    return null;
  };

  function printLs(fs) {
    let list = Object.entries(fs.content).map (([name, item]) => {
      if (item.type === "directory") {
        return `\x1b[34m${name}/\x1b[0m`;
      } else {
        return name;
      }
    });
    term.writeln(list.join("\n\r"));
  }

  function ls(args) {
    if (args.length == 0) {
        printLs(currentDir);
    } else {
      let dir = getDir(args[0]);
      if (dir === null) {
        term.writeln("Directory not found.");
        return null;
      }
      printLs(dir.fs);
    }
    return null;
  };

  function showEducations(args) {
    term.writeln("");
    let maxBeginDateLength = Math.max(...formations.map(edu => edu.date.begin.length));
    term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    for (let education of formations.reverse()) {
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
      let beginDate = education.date.begin;
      let endDate = education.date.end;
      if (endDate === "") {
        endDate = "now";
      }
      term.writeln(" ".repeat(maxBeginDateLength - beginDate.length + 1) + beginDate + " - o -> " + endDate);
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    " + education.name);
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    " + education.description);
      if(education.mentions.length > 0) {
        term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
        term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    Mentions: {"+education.mentions.length+"}");
        for(let mention of education.mentions) {
          term.writeln(" ".repeat(maxBeginDateLength + 4) + "|      " + mention.title);
        }
      }
      if(education.tags.length > 0) {
        term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
        term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    Notions: " + education.tags.join(", "));
      }
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    }
    term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    term.writeln(" ".repeat(maxBeginDateLength + 4) + "▼");
    term.writeln("");
    return null;
  }

  function showExperiences(args) {
    term.writeln("");

    let maxBeginDateLength = Math.max(...experiences.map(exp => exp.date.begin.length));

    term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    for (let experience of experiences.reverse()) {
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
      let beginDate = experience.date.begin;
      let endDate = experience.date.end;
      if (endDate === "") {
        endDate = "now";
      }
      term.writeln(" ".repeat(maxBeginDateLength - beginDate.length + 1) + beginDate + " - o -> " + endDate);
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");

      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    " + experience.company);
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    " + experience.name);
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
      for(let description of experience.descriptions) {
        term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    " + description);
      }
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|    Stack: " + experience.tags.join(", "));
      term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    }
    term.writeln(" ".repeat(maxBeginDateLength + 4) + "|");
    term.writeln(" ".repeat(maxBeginDateLength + 4) + "▼");
    term.writeln("");

    return null;
  }

  function searchSkills(args) {

    let category_index = 0;
    let skill_index = 0;
    let show_tags = false;
    let show_skill = false;

    term.writeln("");
    let numberOfLinesToErase = 0;
    let sh = () => {
      
      for (let i = 0; i < numberOfLinesToErase; i++) {
        term.write('\x1b[2K'); 
        term.write('\x1b[1A'); 
      }
      term.write('\x1b[2K'); 
      term.write('\x1b[G');  
      numberOfLinesToErase = 0;

      if (!show_tags) {
        term.writeln("Catégory de compétences:");
        for (let index = 0; index < competences.length; index++) {
          let category = competences[index];
          if (index === category_index) {
            term.writeln(" \x1b[32m> " + category.name + "\x1b[0m");
          } else {
            term.writeln("   " + category.name);
          }
        }
        term.writeln("(Up/Down to navigate, Enter to select, q to quit)")
        numberOfLinesToErase = competences.length + 2;
      } else if (show_tags && !show_skill) {
        term.writeln("Compétences de " + competences[category_index].name + ":");
        for (let index = 0; index < competences[category_index].tags.length; index++) {
          let tag = competences[category_index].tags[index];
          if (index === skill_index) {
            term.writeln(" \x1b[32m> " + tag.name + "\x1b[0m");
          } else {
            term.writeln("   " + tag.name);
          }
        }
        term.writeln("(Up/Down to navigate, Enter to select, Backspace to go back, q to quit)")
        numberOfLinesToErase = competences[category_index].tags.length + 2;
      } else if (show_skill) {
        let category_name = competences[category_index].name.replace(/[ \/]/g, "_");
        let skill_name = competences[category_index].tags[skill_index].name.replace(/[ \/]/g, "_");
        cat(["/skills/" + category_name + "/" + skill_name + ".md"]);

        term.writeln("Press any key to go back to the list of skills.");
        numberOfLinesToErase = 1;
      }
    }

    sh();

    return {
      captureKeys: true,
      onKey: function (key, e) {
        const { code } = e;

        if(!show_tags) {
          if (code === "ArrowUp") {
            category_index = (category_index - 1 + competences.length) % competences.length;
          } else if (code === "ArrowDown") {
            category_index = (category_index + 1) % competences.length;
          } else if (code === "Enter" || code === "NumpadEnter") {
            skill_index = 0;
            show_tags = true;
          } else if (key === "q") {
            term.writeln("Exiting skills search.");
            return false;
          }
        } else if (show_tags && !show_skill) {
          if (code === "ArrowUp") {
            skill_index = (skill_index - 1 + competences[category_index].tags.length) % competences[category_index].tags.length;
          } else if (code === "ArrowDown") {
            skill_index = (skill_index + 1) % competences[category_index].tags.length;
          } else if (code === "Backspace") {
            show_tags = false;
            category_index = 0;
          } else if (code === "Enter" || code === "NumpadEnter") {
            show_skill = true;
          } else if (key === "q") {
            term.writeln("Exiting skills search.");
            return false;
          }
        } else if (show_skill) {
          if (key === "q") {
            term.writeln("Exiting skills search.");
            return false;
          } else {
            show_skill = false;
          }
        }
       sh();
       return true;
      },
    };
  }

  function showProjects(args) {
    term.writeln("");
    
    let projectsData = {};
    let maxProjectNameLength = Math.max(...projects.map(project => project.name.length));
    for(let project of projects) {
      projectsData[project.name] = {
        name: project.name,
        progress: 0,
        progressFactor: Math.floor(Math.random() * 4.0) + 1.0,
        data: project
      }
    }

    let allLoaded = false;
    let waiting = false;
    let numberOfLinesToErase = 0;

    let project_id = 0;
    let spiner_index = 0;
    let sh = () => {
      if(waiting) {
        return;
      }
      for (let i = 0; i < numberOfLinesToErase; i++) {
        term.write('\x1b[2K'); 
        term.write('\x1b[1A'); 
      }
      term.write('\x1b[2K'); 
      term.write('\x1b[G');
      numberOfLinesToErase = 0;

      if(!allLoaded) {
        term.writeln( GREEN + SPINER[spiner_index] + RESET + " Loading projects...");
        spiner_index = (spiner_index + 1) % SPINER.length;
        numberOfLinesToErase = 1;

        let allProjectsLoaded = true;
        for(let project of projects) {
          let projectData = projectsData[project.name];
          let loaded = true;
          if(projectData.progress < 100) {
            projectData.progress = Math.min(projectData.progress + (Math.floor(Math.random() * projectData.progressFactor * 400.0) + 1.0)/100.0, 100.0);
            loaded = false;
          } 
          allProjectsLoaded = allProjectsLoaded && loaded;
          let progressBar = "[" + GREEN + "█".repeat(Math.floor(projectData.progress / 10)) + " ".repeat(10 - Math.floor(projectData.progress / 10)) + RESET + "]";
          term.writeln(" " + (loaded ? GREEN + "✔" : RED + "✘") + RESET + " " + project.name + " ".repeat(maxProjectNameLength - project.name.length + 1) + progressBar + " (" + Math.floor(projectData.progress) + "%)");
          numberOfLinesToErase += 1;
        }
        if(allProjectsLoaded) {
          allLoaded = true;
          
          term.writeln("");
          term.writeln(GREEN + "⠿" + RESET + " All projects loaded.");
          term.writeln("Press any key to explore project.");
          numberOfLinesToErase += 3;
          waiting = true;
        }
      } else {
        
        for (let index = 0; index < projects.length; index++) {
          let project = projects[index];
          if (index === project_id) {
            term.writeln(" \x1b[32m> " + project.name + "\x1b[0m");
            term.writeln("     " + YELLOW + project.description);
            term.writeln("     Notions: " + project.tags.join(", ") + RESET);
            numberOfLinesToErase += 2;
          } else {
            term.writeln("   " + project.name);
          }
          numberOfLinesToErase += 1;
        }
        term.writeln("");
        term.writeln("(Up/Down to navigate, Enter to select, Backspace to go back, q to quit)")
        numberOfLinesToErase += 2;
      }
    };
    sh();

    return {
      captureKeys: true,
      onKey: function (key, e) {
        if(waiting) {
          waiting = false;
          sh();
          return true;
        }
        const { code } = e;
        if (code === "ArrowUp") {
          project_id = (project_id - 1 + projects.length) % projects.length;
        } else if (code === "ArrowDown") {
          project_id = (project_id + 1) % projects.length;
        } else if (code === "Enter" || code === "NumpadEnter") {
          let project = projects[project_id];
          term.writeln("Loading project: " + project.name);
          numberOfLinesToErase = 1;
          cat(["/projects/" + project.name.replace(/[ \/]/g, "_") + "/README.md"]);
          term.writeln("");
          term.writeln("Press any key to go back to the list of projects.");
          waiting = true;
        } else if (code === "Backspace") {
          allLoaded = false;
          project_id = 0;
        } else if (key === "q") {
          term.writeln("Exiting projects search.");
          return false;
        }
        sh();
        return true;
      },
      onTick: function () {
        if(!allLoaded) {
          sh();
        }
        return true;
      },
    };
  }



  let runningCommand = null;

  setInterval( () => {
    if (runningCommand && runningCommand.onTick) {
      runningCommand.onTick();
    }
  }, 100);

  function execute (command) {
    let args = command.split(" ");
    command = args[0];
    args = args.slice(1);

    console.log("Executing command: " + command + " with args: " + args);
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].name === command) {
        runningCommand = commands[i].func(args);
        return;
      }
    }

    term.write("Command not found. Type 'help' to see available commands.\n");
    setInput('');
    return null;
  };