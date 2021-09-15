export default {
  props: ["files", "active"],

  data() {
    return {
      flag: false,
      filename: "",
    };
  },

  template: `
    <section id="file-explorer" class="text-white py-3">
      <small class="px-2">File Explorer</small>
      <i class="las la-file-medical float-end me-2" @click="newFile"></i>

      <input type="file" @change="uploadFile" accept="text/plain|.c|.cpp|.java|.html|.py|.js" multiple>
      <i class="las la-file-upload float-end me-2"></i>

      <hr class="mb-0"/>

      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(file,index) in files" :key="index" :class="{active: index==active}" @click="openFile(index)">
          <small class="d-flex align-items-center">
            <span v-html="icon(file.name)"></span>&nbsp;<span class="filename">{{file.name}}</span>
            <i class="las la-times float-end" @click="removeFile(index)"></i>
          </small>
        </li>
        
        <li class="list-group-item" v-show="flag">
          <small>
            <div class="input-group mb-3">
              <span class="input-group-text p-0 border-0 bg-transparent"><i class="las la-file text-primary"></i></span>
              <input maxlength="100" type="text" class="form-control py-0 border-0 bg-transparent" ref="filename" @blur="addFile"
              @keyup.enter.prevent="addFile"
              v-model="filename">
            </div>
          </small>
        </li>
        
      </ul>
      
    </section>
    `,

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

  methods: {
    newFile() {
      this.flag = true;
      setTimeout(() => {
        this.$refs.filename.focus();
      }, 0);
    },

    addFile() {
      if (this.filename.length > 0) {
        this.$emit("addFile", { name: this.filename, content: "" });
      }
      this.filename = "";
      this.flag = false;
    },

    removeFile(index) {
      this.$emit("removeFile", index);
    },

    openFile(index) {
      this.$emit("openFile", index);
    },

    uploadFile(e) {
      if (e.target.files.length > 0) {
        for (let file of e.target.files)
          try {
            let filename = file.name;
            let content = "";

            let reader = new FileReader();
            reader.onload = (e) => {
              content = e.target.result;
              this.$emit("addFile", { name: filename, content: content });
            };

            reader.readAsText(file);
          } catch (error) {
            console.log(error);
          }
      }
    },
  },
};
