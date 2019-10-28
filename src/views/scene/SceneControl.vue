<template>
  <div class="sceneControl">
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
      <el-button class="mybtn" icon="el-icon-search" type="primary" size="small" @click="find()">筛选</el-button>
    </div>
    <div class="selectContainer">
      <el-table :data="tableData" height="500px" border style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="building" label="教学楼" width="180" align="center"></el-table-column>
        <el-table-column prop="classroom" label="课室" width="180" align="center"></el-table-column>
        <el-table-column label="场景" align="center">
          <template slot-scope="prop">
            <el-radio-group v-model="prop.row.sceneName">
              <el-radio
                :label="i+1"
                v-for="(item,i) in scenes "
                :key="i"
                :disabled="prop.row.choice"
              >{{item.sceneName}}</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="prop">
            <el-switch
              v-model="prop.row.choice"
              :disabled="prop.row.sceneName === 0 "
              active-color="#13ce66"
              active-text="开"
              inactive-text="关"
              @change="send(prop.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "scenemControl",
  data() {
    return {
      place: [],
      buildings: [],
      scenes: [],
      tableData: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getBuildings();
    this.getScenes();
    this.getInit();
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
    getScenes() {
      this.$axios
        .get("/api/scenes/getScenes/" + this.user.secret_key)
        .then(res => {
          this.scenes = res.data;
        });
    },
    getInit() {
      //获取每个课室场景的初始状态
      this.$axios
        .get("/api/scenes/getSceneStatus/" + this.user.secret_key)
        .then(res => {
          return (this.tableData = res.data);
        });
    },
    find() {
      const len = this.place.length;
      const query = {};
      query.secret_key = this.user.secret_key;
      if (len == 1) query.building = this.place[0];
      if (len == 2) {
        query.building = this.place[0];
        query.classroom = this.place[1];
      }
      this.$axios.post("/api/scenes/search", query).then(res => {
        return (this.tableData = res.data);
      });
    },
    send(row) {
      if (row.choice) {
        this.$axios.post("/api/scenes/send/" + row._id, row).then(() => {
          this.$message({
            message: "已打开",
            type: "success"
          });
        });
      } else {
        const newChoice = {};
        newChoice.building = row.building;
        newChoice.classroom = row.classroom;
        newChoice.secret_key = row.secret_key;
        newChoice.sceneName = 0;
        newChoice.choice = false;
        this.$axios.post("/api/scenes/send/" + row._id, newChoice).then(() => {
          this.$message({
            message: "已关闭",
            type: "warning"
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.sceneControl {
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

.selectContainer {
  margin-top: 20px;
}
</style>