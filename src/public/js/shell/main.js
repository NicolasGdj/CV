let term = new Terminal({
    cursorBlink: true,
    theme: {
      background: '#1e1e1e',
      foreground: '#ffffff',
      cursor: '#00ff00',
    },
    
  });

  term.loadAddon(new WebLinksAddon.WebLinksAddon());
  const fitAddon = new FitAddon.FitAddon();

  term.loadAddon(fitAddon);

let prompt = () => {
return `${BLUE}${BOLD}nicolas@gdj:${path}${RESET} `;
};
let history = [];
let historyIndex = 0;
let input = '';
let cursorPos = 0;

let redrawLine = () => {
  term.write("\r" + " ".repeat(term.cols));  
  term.write("\r" + prompt() + input);
  if (input.length - cursorPos > 0) {
    term.write(`\x1b[${input.length - cursorPos}D`);
  }
};

let setInput = (line) => {
  input = line;
  cursorPos = input.length;
  redrawLine();
};

window.onload = function() {
  term.open(document.getElementById("terminal"));
  fitAddon.fit();

  term.write(ABOUT_ME)

  term.write(prompt());

  // Handle user input
  term.onKey(function ({ key, domEvent }) {
    const { ctrlKey, altKey, shiftKey, code } = domEvent;
    console.log(code)

    if(runningCommand && runningCommand.captureKeys) {
      if(ctrlKey && code === "KeyC") {
        if(runningCommand.onKill) {
          runningCommand.onKill();
        }
        runningCommand = null;
        setInput('');
      } else {
        if(!runningCommand.onKey(key, domEvent)) {
          runningCommand = null;
          setInput('');
        } else {
          return;
        }
      }
    }

    if(ctrlKey && code === "KeyC") {
      term.write("\n\r");
      setInput('');
    }

    if (code === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        setInput(history[historyIndex]);
        cursorPos = history[historyIndex].length;
      }
    } else if (code === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        setInput(history[historyIndex]);
        cursorPos = history[historyIndex].length;
      } else {
        historyIndex = history.length;
        setInput('');
        cursorPos = 0;
      }
    } else if (code === "ArrowLeft") {
      if (cursorPos > 0) {
        term.write('\x1b[D');
        cursorPos--;
      }
    } else if (code === "ArrowRight") {
      if (cursorPos < input.length) {
        term.write('\x1b[C');
        cursorPos++;
      }
    } else if (code === "Backspace") {
      if (cursorPos > 0) {
        input = input.slice(0, cursorPos - 1) + input.slice(cursorPos);
        cursorPos--;
        redrawLine();
      }
    } else if (code === "Delete") {
      if (cursorPos < input.length) {
        input = input.slice(0, cursorPos) + input.slice(cursorPos + 1);
        redrawLine();
      }
    } else if (code === "Enter" || code === "NumpadEnter") {
      term.write("\n\r");
      if (input) {
        history.push(input);
        historyIndex = history.length;
        execute(input);
      }
      setInput('');
    } else if (code === "Home") {
      cursorPos = 0;
      redrawLine();
    }
    else if (code === "End") {
      cursorPos = input.length;
      redrawLine();
    } else if(code === "Tab") {

      // Auto-completion logic
      domEvent.preventDefault();
      let args = input.split(" ");
      let arg = args[args.length - 1];

      let beginning = "";
      let dirPath = arg;
      if(dirPath.endsWith("/")) {
        dirPath = dirPath.slice(0, -1);
        beginning = arg;
        arg = "";
      } else {
        let lastSlashIndex = arg.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
          dirPath = arg.slice(0, lastSlashIndex);
          beginning = arg.slice(0, lastSlashIndex + 1);
          arg = arg.slice(lastSlashIndex + 1);
        } else {
          dirPath = ".";
        }
      }
      let dir = getDir(dirPath);
      if (dir === null) {
        dir = currentDir
      }

      let completions = Object.entries(dir.fs.content).map(([name, value]) => {
        if (value.type === "directory") {
          return name + "/";
        }
        return name;
      }).filter((name) => name.startsWith(arg));

      if(args.length == 1) {
        // Adding completion for commands
        completions = [...completions, ...Object.entries(commands).map(([key, value]) => {
          return value.name
        }).filter((name) => name.startsWith(arg))];
      }
      console.log("completions", completions);
      if (completions.length === 1) {
        args[args.length - 1] =  beginning + completions[0];
        input = args.join(" ");
        cursorPos = input.length;
        redrawLine();
      } else if (completions.length > 1) {
        // Identify the common prefix
        let commonPrefix = completions[0];
        for (let i = 1; i < completions.length; i++) {
          let j = 0;
          while (j < commonPrefix.length && j < completions[i].length && commonPrefix[j] === completions[i][j]) {
            j++;
          }
          commonPrefix = commonPrefix.slice(0, j);
        }
        if (commonPrefix.length > 0) {
          args[args.length - 1] = beginning + commonPrefix;
          input = args.join(" ");
          cursorPos = input.length;
          redrawLine();
        }
      }
    } else if (key.length === 1 && !ctrlKey && !altKey && !shiftKey) {
      input = input.slice(0, cursorPos) + key + input.slice(cursorPos);
      cursorPos++;
      redrawLine();
    }
    else if (key.length === 1 && !ctrlKey && !altKey) {
      input = input.slice(0, cursorPos) + key + input.slice(cursorPos);
      cursorPos++;
      if(cursorPos == input.length) {
        term.write(key);
      } else {
        redrawLine();
      }
    }
  });
}