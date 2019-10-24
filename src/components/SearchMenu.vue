<template>
  <div class="selectContainer">
    <!-- 级联选择位置 -->
    <el-cascader
      class="select_input"
      v-model="place"
      size="medium"
      style="width:160px"
      :options="buildings"
      :props="{ checkStrictly: true }"
      clearable
      placeholder="请选择位置"
    ></el-cascader>

    <!-- 选择厂商 -->
    <el-select
      class="select_input"
      size="medium"
      style="width:160px"
      v-model="searchList.factory"
      placeholder="请选择厂商"
      clearable
    >
      <el-option
        v-for="(item,index) in factorys"
        :key="index"
        :label="item.factoryName"
        :value="item.factoryName"
      ></el-option>
    </el-select>

    <!-- 选择设备类型 -->
    <el-select
      class="select_input"
      size="medium"
      style="width:160px"
      v-model="searchList.type"
      placeholder="请选择设备类型"
      clearable
    >
      <el-option
        v-for="(item,index) in types"
        :key="index"
        :label="item.typeName"
        :value="item.typeName"
      ></el-option>
    </el-select>

    <!-- 选择状态 -->
    <el-select
      class="select_input"
      size="medium"
      style="width:160px"
      v-model="searchList.status"
      placeholder="请选择设备状态"
      clearable
    >
      <el-option
        v-for="(item,index) in statusInfo"
        :key="index"
        :label="item.statusName"
        :value="item.statusName"
      ></el-option>
    </el-select>

    <el-button class="mybtn" type="primary" icon="edit" size="small" @click="find()">筛选</el-button>
    <el-button class="mybtn" type="primary" icon="edit" size="small">导入</el-button>
    <el-button class="mybtn" type="primary" icon="edit" size="small" @click="myOutput()">导出</el-button>
  </div>
</template>

<script>
export default {
  props: {
    CmultipleSelection: Array
  },
  data() {
    return {
      place: [],
      buildings: [],
      factorys: [],
      types: [],
      statusInfo: [],
      searchList: {
        building: "",
        classroom: "",
        factory: "",
        type: "",
        status: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getBuildings();
    this.getTypes();
    this.getFactorys();
    this.getStatus();
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
    find() {
      const len = this.place.length;
      const query = {};
      if (this.searchList.factory) query.factory = this.searchList.factory;
      if (this.searchList.type) query.type = this.searchList.type;
      if (this.searchList.status) query.status = this.searchList.status;
      if (len == 1) query.building = this.place[0];
      if (len == 2) {
        query.building = this.place[0];
        query.classroom = this.place[1];
      }
      this.$emit("Csearch", query);
    },
    myOutput() {
      console.log(this.CmultipleSelection);
    }
  }
};
</script>

<style scoped>
.selectContainer {
  margin: 20px 0;
}
.select_input {
  margin-right: 15px;
}
.mybtn {
  margin-right: 15px;
}
</style>