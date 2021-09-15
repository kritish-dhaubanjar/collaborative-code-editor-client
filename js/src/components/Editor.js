export default {
  props: ["files", "active", "mode", "refresh", "theme"],

  data() {
    return {
      editor: null,
      echo: true,
    };
  },

  template: `
    <main class="w-100 overflow-hidden">
        <nav class="nav">
            <a class="nav-link" href="#" :class="{active: index==active}" :key="index" v-for="(file,index) in files" @click="openFile(index)">
            <span v-html="icon(file.name)"></span>&nbsp;{{file.name}}
            </a>
        </nav>
        <section id="editor">
            <textarea id="code"></textarea>
        </section>
    </main>
    `,

  mounted() {
    const textarea = document.querySelector("#code");

    this.editor = CodeMirror.fromTextArea(textarea, {
      mode: "text/x-c++src",
      lineWrapping: true,
      // mode: "javascript",
      theme: this.theme,
      // theme: "material-palenight",
      tabSize: 2,
      lineNumbers: true,
      indentWithTabs: true,
    });

    this.editor.on("change", (e) => {
      this.$emit("cursor", this.editor.getCursor());
      if (this.echo) {
        this.$emit("edit", this.editor.getValue());
      }
      this.echo = true;
    });
  },

  methods: {
    openFile(index) {
      this.$emit("openFile", index);
    },
  },

  watch: {
    active() {
      let cursorPosition = this.editor.getCursor();
      this.editor.setValue(this.files[this.active].content);
      this.editor.setCursor(cursorPosition);
    },
    mode() {
      this.editor.setOption("mode", this.mode);
    },
    files() {
      this.echo = false;
      let cursorPosition = this.editor.getCursor();
      this.editor.setValue(this.files[this.active].content);
      this.editor.setCursor(cursorPosition);
    },
    refresh() {
      this.editor.refresh();
      this.editor.focus();
    },
    theme() {
      this.editor.setOption("theme", this.theme);
    },
  },

  computed: {
    icon() {
      return (filename) => {
        if (filename.includes(".")) {
          filename = filename.split(".");
          if (filename.length >= 2) {
            let ext = filename.pop();

            switch (ext) {
              case "c":
              case "cpp":
                return `<i class="las la-file text-primary"></i>`;
              case "java":
                return `<i class="lab la-java text-primary"></i>`;

              case "py":
                return `<i class="lab la-python text-primary"></i>`;

              case "md":
                return `<i class="lab la-markdown text-primary"></i>`;

              case "sql":
                return `<i class="las la-database text-primary"></i>`;

              case "sh":
                return `<i class="las la-scroll text-primary"></i>`;

              case "jsx":
                return `<i class="lab la-react text-primary"></i>`;

              case "html":
              case "htm":
                return `<i class="las la-file-code text-primary"></i>`;

              case "xml":
                return `<i class="las la-code text-primary"></i>`;

              case "js":
                return `<i class="lab la-js-square text-primary"></i>`;

              case "php":
                return `<i class="lab la-php text-primary"></i>`;

              default:
                return `<i class="las la-file text-primary"></i>`;
            }
          }
        }
      };
    },
  },
};
