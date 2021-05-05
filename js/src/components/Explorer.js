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
          <small>
            <span>
              <i class="las la-file text-primary"></i> {{file.name}}
            </span>
            <i class="las la-times float-end" @click="removeFile(index)"></i>
          </small>
        </li>
        
        <li class="list-group-item" v-show="flag">
          <small>
            <div class="input-group mb-3">
              <span class="input-group-text p-0 border-0 bg-transparent"><i class="las la-file text-primary"></i></span>
              <input maxlength="20" type="text" class="form-control py-0 border-0 bg-transparent" ref="filename" @blur="addFile"
              @keyup.enter.prevent="addFile"
              v-model="filename">
            </div>
          </small>
        </li>
        
      </ul>
      
    </section>
    `,

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
        // let file = e.target.files[0];

        for (let file of e.target.files)
          if (
            file.type == "" ||
            file.type.includes("text") ||
            file.type.includes("sql")
          ) {
            let filename = file.name;
            let content = "";

            let reader = new FileReader();
            reader.onload = (e) => {
              content = e.target.result;
              this.$emit("addFile", { name: filename, content: content });
            };

            reader.readAsText(file);
          }
      }
    },
  },
};
