export default {
  props: ["mode", "active", "files", "cursor"],

  data() {
    return {
      font: 13,
    };
  },
  template: `
    <section>
        <div class="container-fluid bg-danger text-white" id="status">
            <div class="row">
                <div class="col-12 d-flex justify-content-end flex-end">
                
                <div class="dropdown">
                    <button class="btn btn-danger dropdown-toggle py-0 border-0 me-3 rounded-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                        <small class="fw-bold">{{font}}px</small>
                    </button>
                    <ul class="dropdown-menu rounded-0 bg-dark">
                        <li @click="setFont(11)"><a class="dropdown-item text-white" href="#"><small class="fw-bold">11px</small></a></li>
                        <li @click="setFont(13)"><a class="dropdown-item text-white" href="#"><small class="fw-bold">13px</small></a></li>
                        <li @click="setFont(15)"><a class="dropdown-item text-white" href="#"><small class="fw-bold">15px</small></a></li>
                        <li @click="setFont(17)"><a class="dropdown-item text-white" href="#"><small class="fw-bold">17px</small></a></li>
                    </ul>
                </div>

                <small class="mb-0 small fw-bold">{{files[active].name}} &nbsp;&nbsp;&nbsp; Ln {{cursor.line + 1}}, Col {{cursor.ch}} &nbsp;&nbsp;&nbsp; {{mode}}</small>
                </div>
            </div>
        </div>
    </section>
      `,

  methods: {
    setFont(size) {
      this.font = size;
      let css = `.CodeMirror * {font-family: 'Fira Code', monospace;font-size: ${size}px;}`;

      let style = document.querySelector("head style");
      if (style) {
        document.querySelector("head").removeChild(style);
      }
      style = document.createElement("style");
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.querySelector("head").appendChild(style);
    },
  },
};
