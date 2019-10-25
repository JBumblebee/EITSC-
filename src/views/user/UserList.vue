<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="时间筛选:">
          <el-date-picker
            v-model="search_data.startTime"
            type="date"
            placeholder="选择开始时间"
          ></el-date-picker>--
          <el-date-picker
            v-model="search_data.endTime"
            type="date"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            v-if="user.identity == 'manager'"
            type="primary"
            size="small"
            icon="view"
            @click="onAddMoney()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="identity" label="角色" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.identity == 'manager' ? '管理员' :'老师' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="secret_key" label="通行证" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.secret_key }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="user.identity == 'manager'"
          prop="operation"
          align="center"
          label="操作"
          fixed="right"
          width="320"
        >
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
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getUserList"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "../../components/DialogFound";
export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        name: "",
        email: "",
        secret_key: "",
        identity: "",
        password: "",
        id: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: { DialogFound },
  methods: {
    getUserList() {
      this.$axios.get(`/api/users`).then(res => {
        console.log(res.data)
        this.tableData = res.data;
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    onEditMoney(row) {
      (this.dialog = {
        show: true,
        title: "修改用户信息",
        option: "edit"
      }),
        (this.form = {
          name: row.name,
          email: row.email,
          identity: row.identity,
          secret_key: row.secret_key,
          password: row.password,
          id: row._id
        });
    },
    onDeleteMoney(row, index) {
      // 删除
      this.$axios.post(`/api/users/delete/${row._id}`).then(res => {
        this.$confirm("是否永久删除该用户信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUserList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消！"
            });
          });
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
      this.paginations.page_size = 10;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    },
    onAddMoney() {
      //添加
      (this.dialog = {
        show: true,
        title: "添加用户",
        option: "add"
      }),
        (this.form = {
          name: "",
          email: "",
          secret_key: "",
          identity: "",
          password: "123456"
        });
    }
  }
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>