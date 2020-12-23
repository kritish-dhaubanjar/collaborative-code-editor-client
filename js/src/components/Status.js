export default {
  props: ["mode", "active", "files", "cursor"],
  template: `
        <div class="container-fluid bg-danger text-white" id="status">
            <div class="row">
                <div class="col-12 text-end">
                    <small class="mb-0 small fw-bold">{{files[active].name}} &nbsp;&nbsp;&nbsp; Ln {{cursor.line + 1}}, Col {{cursor.ch}} &nbsp;&nbsp;&nbsp; {{mode}}</small>
                </div>
            </div>
        </div>
      `,
};
