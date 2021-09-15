import Navbar from "./src/components/Navbar.js";
import Explorer from "./src/components/Explorer.js";
import Editor from "./src/components/Editor.js";
import Status from "./src/components/Status.js";

var app = new Vue({
  el: "#app",

  data() {
    return {
      socket: null,
      connected: false,
      files: [{ name: "01 Doubly Linked List.cpp", content: "" }],
      active: 0,
      mode: "text/x-c++src",
      //
      mirror: false,
      cursor: { ch: 0, line: 0 },
      theme: "material-ocean",
      //
      refresh: false,
    };
  },

  template: `
    <div>
        <Navbar :mirror="mirror" @toggle="mirror = !mirror" :connected="connected"/>
        <div class="d-flex">
            <Explorer :files="files" @addFile="addFile" @removeFile="removeFile" @openFile="openFile" :active="active"/>
            <Editor :files="files" @openFile="openFile" :active="active" @edit="edit" :mode="mode" @cursor="setCursor" :refresh="refresh" :theme="theme"/>
        </div>
        <Status :mode="mode" :active="active" :files="files" :cursor="cursor" @setFont="setFont" @setTheme="setTheme"/>
    </div>
  `,
  /* SOCKET */
  created() {
    this.socket = io("https://code-blackboard.herokuapp.com/");
    // this.socket = io("http://localhost:3000/");

    this.socket.on("connect", () => {
      this.connected = true;
      console.log(this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log(this.socket.id);
    });

    this.socket.on("broadcast", (arg) => {
      if (this.mirror) {
        this.active = arg.active;
        this.mode = arg.mode;
      }

      this.files = [...arg.files];
    });
  },

  mounted() {
    this.setMode();
  },

  methods: {
    addFile({ name, content }) {
      this.files = [...this.files, { name: name, content: content }];
      /* SOCKET */
      this.emit();
    },

    removeFile(payload) {
      this.files.splice(payload, 1);
      /* SOCKET */
      this.emit();
    },

    openFile(payload) {
      this.active = payload;
      this.setMode();
      /* SOCKET */
      this.emit();
    },

    edit(payload) {
      this.files[this.active].content = payload;
      /* SOCKET */
      this.emit();
    },

    setMode() {
      let filename = this.files[this.active].name;
      if (filename.includes(".")) {
        filename = this.files[this.active].name.split(".");
        if (filename.length >= 2) {
          let ext = filename.pop();

          switch (ext) {
            case "c":
            case "cpp":
            case "java":
              this.mode = "text/x-c++src";
              break;

            case "py":
              this.mode = "python";
              break;

            case "md":
              this.mode = "markdown";
              break;

            case "sql":
              this.mode = "sql";
              break;

            case "sh":
              this.mode = "shell";
              break;

            case "jsx":
              this.mode = "jsx";
              break;

            case "html":
            case "htm":
              this.mode = "htmlmixed";
              break;

            case "xml":
              this.mode = "xml";
              break;

            case "js":
            case "json":
              this.mode = "javascript";
              break;

            case "php":
              this.mode = "php";
              break;

            default:
              this.mode = "";
              break;
          }
        }
      }
    },

    setCursor(payload) {
      this.cursor = { ...payload };
    },

    emit() {
      this.socket.emit("emit", {
        files: this.files,
        active: this.active,
        mode: this.mode,
        cursor: this.cursor,
      });
    },

    setFont() {
      this.refresh = !this.refresh;
    },

    setTheme(payload) {
      this.theme = payload;
    },
  },

  components: {
    Navbar,
    Explorer,
    Editor,
    Status,
  },
});
