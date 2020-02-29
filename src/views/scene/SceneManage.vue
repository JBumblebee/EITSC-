<template>
  <div class="scene">
    <div class="scene_container">
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
              <el-form-item label="场景名称">
                <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="请输入内容"
                  v-model="props.row.sceneName"
                ></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="props.row.desc"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
        <el-table-column label="场景名称" prop="sceneName" align="center"></el-table-column>
        <el-table-column label="描述" prop="desc" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="props">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(props.row)"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  // 场景设置
  name: "sceneManage",
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getScenes();
  },
  methods: {
    getScenes() {
      this.$axios
        .get("/api/scenes/getScenes/" + this.user.secret_key)
        .then(res => {
          this.tableData = res.data;
        });
    },
    handleEdit(row) {
      this.$axios.post("/api/scenes/edit/" + row._id, row).then(() => {
        this.$message({
          message: "设置成功",
          type: "success"
        });
      });
    }
  }
};
</script>
<style>
.scene {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  margin: 20px 0;
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
</style>
