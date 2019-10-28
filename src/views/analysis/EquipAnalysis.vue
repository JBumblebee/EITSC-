<template>
  <div class="electric_container">
    <el-row :gutter="20">
      <el-col :span="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="7">
        <div id="myChart"></div>
      </el-col>
      <el-col :span="7">
        <div id="myChart2"></div>
      </el-col>
      <el-col :span="7">
        <div id="myChart3"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="7">
        <div id="myChart4"></div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="15">
        <el-table :data="tableData" border  style="height:350px">
          <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
          <el-table-column prop="userate" label="使用率" width="180" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "equipAnalysis",
  data() {
    return {
      myChart: "",
      myChart2: "",
      myChart3: "",
      myChart4: "",
      tableData: [
        {
          date: "2019-10-28",
          type: "空调",
          userate: "46.5%"
        },
        {
          date: "2019-10-28",
          type: "电脑",
          userate: "55.5%"
        },
        {
          date: "2019-10-28",
          type: "投影仪",
          userate: "50.3%"
        },
        {
          date: "2019-10-28",
          type: "窗帘",
          userate: "85.5%"
        }
      ]
    };
  },
  mounted() {
    this.init();
    this.init2();
    this.init3();
    this.init4();
  },

  methods: {
    init() {
      var dom = document.getElementById("myChart");
      var myChart = this.$echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 46.5, name: "空调" }]
          }
        ]
      };
      // setTimeout(() => {
      //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      //   myChart.setOption(option, true);
      // }, 1000*60);
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      window.onresize = () => {
        myChart.resize();
      };
    },
    init2() {
      var dom = document.getElementById("myChart2");
      var myChart2 = this.$echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 55.5, name: "电脑" }]
          }
        ]
      };
      // setTimeout(() => {
      //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      //   myChart2.setOption(option, true);
      // }, 1000*60);
      if (option && typeof option === "object") {
        myChart2.setOption(option, true);
      }
      window.onresize = () => {
        myChart2.resize();
      };
    },
    init3() {
      var dom = document.getElementById("myChart3");
      var myChart3 = this.$echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50.3, name: "投影仪" }]
          }
        ]
      };
      // setTimeout(() => {
      //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      //   myChart3.setOption(option, true);
      // }, 1000*60);
      if (option && typeof option === "object") {
        myChart3.setOption(option, true);
      }
      window.onresize = () => {
        myChart3.resize();
      };
    },
    init4() {
      var dom = document.getElementById("myChart4");
      var myChart4 = this.$echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 85.5, name: "窗帘" }]
          }
        ]
      };
      // setTimeout(() => {
      //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      //   myChart4.setOption(option, true);
      // }, 1000*60);
      if (option && typeof option === "object") {
        myChart4.setOption(option, true);
      }
      window.onresize = () => {
        myChart4.resize();
      };
    }
  }
};
</script>

<style scoped>
.electric_container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  overflow: hidden;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#myChart,
#myChart2,
#myChart3,
#myChart4 {
  height: 350px;
}
</style>