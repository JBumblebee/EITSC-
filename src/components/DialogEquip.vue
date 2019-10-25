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
            <el-input type="building" v-model="form.building" placeholder="例如:教一"></el-input>
          </el-form-item>
          <el-form-item prop="classroom" label="课室名称:">
            <el-input type="classroom" v-model="form.classroom" placeholder="例如:课室101"></el-input>
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
            <!-- 选择设备类型 -->
            <el-select
              style="width:206.4px;height:40px;"
              v-model="form.type"
              placeholder="请选择设备类型 "
            >
              <el-option
                v-for="(item,index) in types"
                :key="index"
                :label="item.typeName"
                :value="item.typeName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="factory" label="厂商:">
            <!-- 选择厂商 -->
            <el-select
              style="width:206.4px;height:40px;"
              v-model="form.factory"
              placeholder="请选择厂商"
            >
              <el-option
                v-for="(item,index) in factorys"
                :key="index"
                :label="item.factoryName"
                :value="item.factoryName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="brand" label="品牌:">
            <el-input type="brand" v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item prop="model" label="型号:">
            <el-input type="model" v-model="form.model"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态:">
            <!-- 选择状态 -->
            <el-select
              style="width:206.4px;height:40px;"
              v-model="form.status"
              placeholder="请选择设备状态"
            >
              <el-option
                v-for="(item,index) in statusInfo"
                :key="index"
                :label="item.statusName"
                :value="item.statusName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input type="remark" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item prop="bindType" label="绑定类型:">
            <el-input type="bindType" v-model="form.bindType" placeholder="中控/网关"></el-input>
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
  created() {
    this.getTypes();
    this.getFactorys();
    this.getStatus();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      form_rules: {
        building: [{ required: true, message: "教学楼不能为空！", trigger: "blur" }],
        classroom: [{ required: true, message: "课室不能为空！", trigger: "blur" }],
        code: [{ required: true, message: "设备资产编号不能为空！", trigger: "blur" }],
        name: [{ required: true, message: "设备名称不能为空！", trigger: "blur" }],
        factory: [{ required: true, message: "厂商不能为空！", trigger: "blur" }],
        sn: [{ required: true, message: "SN码不能为空！", trigger: "blur" }],
        type: [{ required: true, message: "设备类型不能为空！", trigger: "blur" }],
        status: [{ required: true, message: "设备状态不能为空！", trigger: "blur" }],
        brand: [{ required: true, message: "品牌不能为空！", trigger: "blur" }],
      },
      buildings: [],
      factorys: [],
      types: [],
      statusInfo: []
    };
  },
  methods: {
    getBuildings() {
      //获取级联的数据信息
      this.$axios
        .post("/api/place/getBySchool/" + this.user.secret_key)
        .then(res => {
          this.buildings = res.data[0].buildings;
        });
    },
    getTypes() {
      this.$axios.get("/api/others/getType").then(res => {
        this.types = res.data[0].types;
      });
    },
    getFactorys() {
      this.$axios.get("/api/others/getFactory").then(res => {
        this.factorys = res.data[0].factorys;
      });
    },
    getStatus() {
      this.$axios.get("/api/others/getStatus").then(res => {
        this.statusInfo = res.data[0].statusInfo;
      });
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
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

