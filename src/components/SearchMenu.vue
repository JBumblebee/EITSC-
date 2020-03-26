
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
    <el-button class="mybtn" icon="el-icon-search" type="primary" size="small" @click="find()">筛选</el-button>
    <label class="ui-upload">
      导入
      <input
        type="file"
        icon="el-icon-upload"
        style="display: none;"
        @change="importf(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </label>
    <el-button
      class="mybtn"
      type="primary"
      icon="el-icon-download"
      size="small"
      @click="exportExcel()"
    >下载模板</el-button>
    <el-button
      style="margin-left:0px;"
      type="primary"
      icon="el-icon-delete"
      size="small"
      @click="deleteMany()"
    >批量删除</el-button>
    <table border="1" v-show="false" id="out-table">
      <tr>
        <th>通行证</th>
        <th>学校名称</th>
        <th>教学楼</th>
        <th>课室</th>
        <th>设备名称</th>
        <th>设备资产编号</th>
        <th>SN码</th>
        <th>设备类型</th>
        <th>厂商</th>
        <th>品牌</th>
        <th>型号</th>
        <th>设备状态</th>
        <th>备注</th>
        <th>绑定类型</th>
        <th>寻址</th>
      </tr>
      <tr>
        <td>如aaa</td>
        <td>如华南农业大学</td>
        <td>如教一</td>
        <td>如课室101</td>
      </tr>
    </table>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
        })
        .catch(() => {
          this.buildings = [];
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
      query.secret_key = this.user.secret_key;
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
    deleteMany() {
      this.$axios
        .post("/api/equips/deleteMany", this.CmultipleSelection)
        .then(result => {
          // 操作成功
          this.$message({
            message: "批量删除成功！",
            type: "success"
          });
          this.$emit("update");
        });
    },
    importf(obj) {
      //导入模板数据
      let _this = this;
      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader(); //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          } // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); // excel 数据再处理
          let arr = [];
          outdata.map(v => {
            let obj = {};
            obj.secret_key = v.通行证;
            obj.schoolName = v.学校名称;
            obj.building = v.教学楼;
            obj.classroom = v.课室;
            obj.code = v.设备资产编号;
            obj.name = v.设备名称;
            obj.sn = v.SN码;
            obj.type = v.设备类型;
            obj.factory = v.厂商;
            obj.brand = v.品牌;
            obj.model = v.型号;
            obj.status = v.设备状态;
            obj.remark = v.备注;
            obj.bindType = v.绑定类型;
            obj.address = v.寻址;
            arr.push(obj);
          });
          _this.accountList = [...arr];
          _this.$axios
            .post("api/equips/addMany", _this.accountList)
            .then(res => {
              // 操作成功
              _this.$message({
                message: "导入成功！",
                type: "success"
              });
              window.location.reload();
            });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    exportExcel() {
      //导出模板
      const wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "equipmemntList.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
.ui-upload {
  height: 32px;
  width: 55px;
  background-color: #409eff;
  font-size: 12px;
  line-height: 32px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  margin-right: 15px;
  border-color: #409eff;
}
</style>