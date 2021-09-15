export default {
  props: ["mirror", "connected"],

  template: `
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="/assets/logo.png" width="30" class="mr-3">
                <h6 class="ms-2 mb-0">Project Blackboard</h6>
            </a>
            
            <div v-show="!connected" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

            <div class="form-check form-switch">
                <label class="form-check-label text-white small">Mirror</label>
                <input class="form-check-input" type="checkbox" :checked="mirror" @click="$emit('toggle')">
                <a target="_blank" href="https://github.com/kritish-dhaubanjar/collaborative-code-editor-client"><img src="/assets/github.svg" class="ms-3"></a>
            </div>
        </div>
    </nav>
    `,
};
