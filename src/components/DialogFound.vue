<template>
  <div class="logFund">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="name" label="用户名:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="identity">
            <el-select v-model="form.identity" placeholder="请选择用户角色" type="identity">
              <el-option label="老师" value="teacher"></el-option>
              <el-option label="管理员" value="manager"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="secret_key" label="通行证:">
            <el-input type="secret_key" v-model="form.secret_key"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      format_type_list: ["用户名", "邮箱", "角色", "通行证"],
      form_rules: {
        name: [
          { required: true, message: "用户名不能为空！", trigger: "blur" }
        ],
        identity: [
          { required: true, message: "角色不能为空！", trigger: "blur" }
        ],
        secret_key: [
          { required: true, message: "通行证不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit1/${this.form.id}`;
          this.$axios.post(`/api/users/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>

