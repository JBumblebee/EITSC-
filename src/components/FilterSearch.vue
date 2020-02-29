<template>
  <!-- 选择教学楼或者课室 -->
  <div class="search_contain">
    <el-col :span="1">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-cascader
      class="select_input"
      v-model="place"
      size="medium"
      style="width:160px;margin-right:20px;"
      :options="buildings"
      :props="{ checkStrictly: true }"
      clearable
      placeholder="请选择位置"
    ></el-cascader>
    <el-date-picker
      class="choose_time"
      v-model="value2"
      align="right"
      type="date"
      size="medium"
      style="width:160px;margin-right:20px;"
      placeholder="选择日期"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <el-button icon="el-icon-search" type="primary" size="small" @click="find()">筛选</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
       value2: "",
      buildings: [],
      place: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
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
    find() {
      const len = this.place.length;
      const query = {};
      if (this.value2) query.time = this.value2;
      if (len == 1) query.building = this.place[0];
      if (len == 2) {
        query.building = this.place[0];
        query.classroom = this.place[1];
      }
      this.$emit("Csearch", query);
    },
  }
};
</script>

<style scoped>
.search_contain {
  margin: 20px 0;
}
</style>