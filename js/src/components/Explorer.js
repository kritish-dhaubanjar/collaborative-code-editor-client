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
        this.$emit("addFile", this.filename);
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
  },
};
