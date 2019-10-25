<template>
  <div cla class="equipInfo">
    <div>
      <SearchMenu :CmultipleSelection="multipleSelection" @Csearch="search" @update="getEquips"></SearchMenu>
    </div>
    <el-button
      class="mybtn"
      type="primary"
      icon="edit"
      size="small"
      @click="onAddMoney()"
      style="float:right;margin-top:-54px;"
    >添加</el-button>
    <div class="table_container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand" label="展开" width="70px">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="校区名称:">
                <span>{{ scope.row.schoolName }}</span>
              </el-form-item>
              <el-form-item label="教学楼:">
                <span>{{ scope.row.building }}</span>
              </el-form-item>
              <el-form-item label="课室:">
                <span>{{ scope.row.classroom }}</span>
              </el-form-item>
              <el-form-item label="设备资产编号:">
                <span>{{ scope.row.code }}</span>
              </el-form-item>
              <el-form-item label="设备名称:">
                <span>{{ scope.row.name }}</span>
              </el-form-item>
              <el-form-item label="SN码:">
                <span>{{ scope.row.sn }}</span>
              </el-form-item>
              <el-form-item label="类型:">
                <span>{{ scope.row.type }}</span>
              </el-form-item>
              <el-form-item label="厂商:">
                <span>{{ scope.row.factory }}</span>
              </el-form-item>
              <el-form-item label="品牌:">
                <span>{{ scope.row.brand }}</span>
              </el-form-item>
              <el-form-item label="型号:">
                <span>{{ scope.row.model }}</span>
              </el-form-item>
              <el-form-item label="状态:">
                <span>{{ scope.row.status }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ scope.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
        <el-table-column label="创建时间" align="center" width="160">
          <template slot-scope="scope">{{ scope.row.date |dateFormat }}</template>
        </el-table-column>
        <el-table-column label="设备资产编号" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" align="center"></el-table-column>
        <el-table-column prop="factory" label="厂商" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              :disabled="scope.row.identity == 'manager'"
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
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
    <!-- 弹框页面---父向子传值 -->
    <DialogEquip  :dialog="dialog" :form="form" @update="getEquips"></DialogEquip>
  </div>
</template>

<script>
import SearchMenu from "../../components/SearchMenu";
import DialogEquip from "../../components/DialogEquip";
export default {
  name: "equipList",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      form: {
        secret_key: "",
        schoolName: "",
        building: "",
        classroom: "",
        code: "",
        name: "",
        sn: "",
        type: "",
        factory: "",
        brand: "",
        model: "",
        status: "",
        remark: "",
        bindType: "",
        address: "",
        id: ""
      },
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
    this.getEquips();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: { SearchMenu, DialogEquip },
  methods: {
    onEditMoney(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "编辑设备信息",
        option: "edit"
      };
      this.form = {
        secret_key: row.secret_key,
        schoolName: row.schoolName,
        building: row.building,
        classroom: row.classroom,
        code: row.code,
        name: row.name,
        sn: row.sn,
        type: row.type,
        factory: row.factory,
        brand: row.brand,
        model: row.model,
        status: row.status,
        remark: row.remark,
        bindType: row.bindType,
        address: row.address,
        id: row._id
      };
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加设备信息",
        option: "add"
      };
      this.form = {
        secret_key: this.user.secret_key,
        schoolName: "",
        building: "",
        classroom: "",
        code: "",
        name: "",
        sn: "",
        type: "",
        factory: "",
        brand: "",
        model: "",
        status: "",
        remark: "",
        bindType: "",
        address: "",
        id: ""
      };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getEquips() {
      this.$axios
        .post("/api/equips/getEquips/" + this.user.secret_key)
        .then(res => {
          this.tableData = res.data;
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        });
    },
    search(query) {
      this.$axios.post("/api/equips/search", query).then(res => {
        this.allTableData = res.data;
        //分页数据
        this.setPaginations();
      });
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
.equipInfo {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.table_container {
  margin-top: 25px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 180px;
  color: #4984d8;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>