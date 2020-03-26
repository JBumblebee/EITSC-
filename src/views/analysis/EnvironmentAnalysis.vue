<template>
  <div class="environment_container">
    <div class="block">
      <el-date-picker
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        size="medium"
        style="width:160px;margin-right:20px;"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button icon="el-icon-search" type="primary" size="small" @click="search(value)">筛选</el-button>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <p class="title">警报分析</p>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" width="180">{{date}}</el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="errTimes" label="报警次数" width="180">
              <template slot-scope="scope">
                <span style="color:#f56767">{{ scope.row.errTimes }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="11">
        <p class="title">警报雷达图</p>
        <div id="myChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "environmentAnalysis",
  data() {
    return {
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
      },
      date: "",
      value: "",
      tableData: [],
      errTimes: [],
      myChart: ""
    };
  },
  mounted() {
    this.init();
    this.environ_init();
    window.onresize = () => {
      this.myChart.resize();
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    search(value) {
      if (value) {
        var d = new Date(value);
        var YYYY = d.getFullYear();
        var MM = d.getMonth() + 1;
        var DD = d.getDate();
        var date = YYYY + "-" + MM + "-" + DD;
        this.date = date;
        this.$axios
          .post("/api/analysis/init2", {
            date,
            secret_key: this.user.secret_key
          })
          .then(res => {
            this.tableData = res.data[0].tableData;
            this.errTimes = this.tableData.reduce((times, obj) => {
              times.push(obj.errTimes);
              return times;
            }, []);
            this.init();
          })
          .catch(err => {
            this.$message.error("抱歉，没有该天的数据");
          });
      } else {
        this.environ_init();
      }
    },
    init() {
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption({
        tooltip: {},
        legend: {
          data: ["警报次数"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "二氧化碳", max: 10 },
            { name: "甲醛", max: 10 },
            { name: "PM2.5", max: 10 },
            { name: "PM10", max: 10 },
            { name: "温度", max: 10 },
            { name: "湿度", max: 10 }
          ]
        },
        series: [
          {
            name: "警报次数",
            type: "radar",
            data: [
              {
                value: this.errTimes,
                name: "警报次数"
              }
            ]
          }
        ]
      });
    },
    environ_init() {
      var d = new Date();
      var YYYY = d.getFullYear();
      var MM = d.getMonth() + 1;
      var DD = d.getDate();
      var date = YYYY + "-" + MM + "-" + DD;
      this.date = date;
      this.$axios
        .post("/api/analysis/init2", {
          date,
          secret_key: this.user.secret_key
        })
        .then(res => {
          this.tableData = res.data[0].tableData;
          this.errTimes = this.tableData.reduce((times, obj) => {
            times.push(obj.errTimes);
            return times;
          }, []);
          this.init();
        })
        .catch(() => {
          this.$message.warning("今天没有数据！");
        });
    }
  }
};
</script>

<style scoped>
.environment_container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.block {
  margin: 20px 0;
}
#myChart {
  height: 450px;
}
.title {
  font-size: 18px;
  position: relative;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-row {
  margin-bottom: 20px;
}
</style>