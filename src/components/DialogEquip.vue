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
          :inline="true"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="building" label="教学楼:">
            <el-input type="building" v-model="form.building"></el-input>
          </el-form-item>
          <el-form-item prop="classroom" label="课室名称:">
            <el-input type="classroom" v-model="form.classroom"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="设备资产编号:">
            <el-input type="code" v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="设备名称:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="sn" label="SN码:">
            <el-input type="sn" v-model="form.sn"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="设备类型:">
            <el-input type="type" v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item prop="factory" label="厂商:">
            <el-input type="factory" v-model="form.factory"></el-input>
          </el-form-item>
          <el-form-item prop="brand" label="品牌:">
            <el-input type="brand" v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item prop="model" label="型号:">
            <el-input type="model" v-model="form.model"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态:">
            <el-input type="status" v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input type="remark" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item prop="bindType" label="绑定类型:">
            <el-input type="bindType" v-model="form.bindType"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="寻址:">
            <el-input type="address" v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="box">
          <div class="center-box2">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogEquip",
  props: {
    dialog: Object,
    form: Object
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      // format_type_list: ["用户名", "邮箱", "角色", "通行证"],
      form_rules: {
        name: [{ required: true, message: "用户名不能为空！", trigger: "blur" }]
        // ,
        // identity: [
        //   { required: true, message: "角色不能为空！", trigger: "blur" }
        // ],
        // secret_key: [
        //   { required: true, message: "通行证不能为空！", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          // console.log(this.form);
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/equips/${url}`, this.form).then(res => {
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

<style scoped>
.box {
  width: 100%;
  display: flex;
}
.center-box2 {
  margin: auto;
}
</style>

