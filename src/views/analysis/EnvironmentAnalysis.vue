<template>
  <div class="environment_container">
    <FilterSearch @Csearch="Csearch"></FilterSearch>
    <el-row :gutter="20">
      <!-- <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>-->
      <el-col :span="10">
        <div>
          <el-table :data="tableData">
            <el-table-column prop="date" align="center" label="日期" width="180"></el-table-column>
            <el-table-column prop="type" align="center" label="类型" width="180"></el-table-column>
            <el-table-column prop="errTimes" align="center" label="报警次数" width="90">
              <template slot-scope="scope">
                <span style="color:#f56767">{{ scope.row.errTimes }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="14">
        <div id="myChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterSearch from "../../components/FilterSearch";
export default {
  name: "environmentAnalysis",
  data() {
    return {
      tableData: [
        {
          date: "2019-10-28",
          type: "二氧化碳浓度",
          errTimes: 5
        },
        {
          date: "2019-10-28",
          type: "甲醛",
          errTimes: 6
        },
        {
          date: "2019-10-28",
          type: "pm2.5",
          errTimes: 7
        },
        {
          date: "2019-10-28",
          type: "pm10",
          errTimes: 6
        },
        {
          date: "2019-10-28",
          type: "温度",
          errTimes: 7
        },
        {
          date: "2019-10-28",
          type: "湿度",
          errTimes: 6
        }
      ],
      myChart: ""
    };
  },
  components: {
    FilterSearch
  },
  mounted() {
    this.init();
    window.onresize = () => {
      this.myChart.resize();
    };
  },
  methods: {
    Csearch(query) {
      console.log(query);
    },
    init() {
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption({
        title: {
          text: "警报分析"
        },
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
            { name: "pm2.5", max: 10 },
            { name: "pm10", max: 10 },
            { name: "温度", max: 10 },
            { name: "湿度", max: 10 }
          ]
        },
        series: [
          {
            name: "警报次数",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [5, 6, 7, 6, 7, 6],
                name: "警报次数"
              }
            ]
          }
        ]
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
#myChart {
  height: 550px;
}
</style>