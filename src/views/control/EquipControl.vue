
<template>
  <div class="equipControl">
    <!-- 选择教学楼或者课室 -->
    <div class="search">
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
      <el-button
        class="mybtn"
        icon="el-icon-search"
        type="primary"
        size="small"
        @click="search()"
      >筛选</el-button>
    </div>
    <!-- 课室设备控制 -->
    <div class="controling"></div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="expand" label="查看详情" width="160">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="智能灯">
              <el-switch v-model="props.row.lamp" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="窗帘">
              <el-switch
                v-model="props.row.curtain"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="电脑">
              <el-switch
                v-model="props.row.computer"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="抽风机">
              <el-switch v-model="props.row.fan" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="空调">
              <el-switch v-model="props.row.air" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="投影仪">
              <el-switch
                v-model="props.row.projector"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="温度">
              <el-input-number
                v-model="props.row.temperature"
                size="small"
                controls-position="right"
                :min="16"
                :max="30"
                :disabled="!props.row.air"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column label="教学楼" prop="building" align="center"></el-table-column>
      <el-table-column label="课室" align="center">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.classroom }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="props">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(props.row)"
          >设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="pagination">
          <el-pagination
            v-if="paginations.total > 0"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync="paginations.page_index"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 设备控制
  name: "equipControl",
  data() {
    return {
      place: [],
      buildings: [],
      tableData: [],
      multipleSelection: [],
      allTableData: [],
      filterTableData: [],
      paginations: {
        page_index: 1, //当前位于那页
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      }
    };
  },
  created() {
    this.getBuildings();
    this.getInit();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getInit() {
      this.$axios
        .post("/api/controls/init/" + this.user.secret_key)
        .then(res => {
          this.tableData = res.data;
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        });
    },
    getBuildings() {
      //获取教学楼课室的基本信息
      this.$axios
        .post("/api/place/getBySchool/" + this.user.secret_key)
        .then(res => {
          this.buildings = res.data[0].buildings;
        })
        .catch(() => {
          this.buildings = [];
        });
    },
    search() {
      // 条件筛选
      const len = this.place.length;
      const query = {};
      query.secret_key = this.user.secret_key;
      if (len == 1) query.building = this.place[0];
      if (len == 2) {
        query.building = this.place[0];
        query.classroom = this.place[1];
      }
      this.$axios.post("/api/scenes/search", query).then(res => {
        this.allTableData = res.data;
        //分页数据
        this.setPaginations();
      });
    },
    handleEdit(row) {
      // 更改课室设备状态
      this.$axios.post("/api/controls/edit/" + row._id, row).then(() => {
        this.$message({
          message: "设置成功",
          type: "success"
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    }
  }
};
</script>

<style scoped>
.equipControl {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.search {
  margin-top: 20px;
}
.mybtn {
  margin-left: 15px;
}
.controling {
  margin-top: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 80px;
  color: #4984d8;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.pagination {
  margin-top: 10px;
}
</style>