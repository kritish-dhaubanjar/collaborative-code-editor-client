export default {
  props: ["files", "active", "mode"],

  data() {
    return {
      editor: null,
      echo: false,
    };
  },

  template: `
    <main class="w-100">
        <nav class="nav">
            <a class="nav-link" href="#" :class="{active: index==active}" :key="index" v-for="(file,index) in files" @click="openFile(index)">
                {{file.name}}
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
      //   mode: "javascript",
      theme: "material-darker",
      tabSize: 2,
      lineNumbers: true,
      indentWithTabs: true,
    });

    this.editor.setValue(
      `#include<iostream>
using namespace std;

int main(){
  return 0;
}`
    );

    this.editor.on("change", (e) => {
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
  },
};
