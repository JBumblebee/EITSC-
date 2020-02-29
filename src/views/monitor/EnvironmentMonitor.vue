<template>
  <div class="monitor_container">
    <header class="monitor_header">
      <span>设备环境监控平台</span>
    </header>

    <el-main>
      <el-row type="flex" justify="space-between">
        <el-col :span="7">
          <p class="title">设备使用频率</p>
          <el-row>
            <el-col :span="6">
              <el-tag size="small" effect="dark" type="warning" style="font-size:14px">空调</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                status="warning"
                :stroke-width="24"
                :percentage="useage[0].air"
              ></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-tag size="small" effect="dark" type="danger" style="font-size:14px">电脑</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                status="exception"
                :stroke-width="24"
                :percentage="useage[1].computer"
              ></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-tag size="small" effect="dark" type="info" style="font-size:14px">窗帘</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                color="#909399"
                :stroke-width="24"
                :percentage="useage[3].curtain"
              ></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-tag size="small" effect="dark" type="success" style="font-size:14px">投影仪</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                status="success"
                :stroke-width="24"
                :percentage="useage[2].projector"
              ></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-tag size="small" effect="dark" style="font-size:14px">智能灯</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                color="bluesky"
                :stroke-width="24"
                :percentage="useage[4].lamp"
              ></el-progress>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="7">
          <p class="title">总用电量监控</p>
          <div id="myChart1" style="height:230px;"></div>
        </el-col>

        <el-col :span="7">
          <p class="title">环境状态</p>
          <el-row>
            <el-col :span="9">
              <p class="tip">空气质量</p>
              <el-progress
                type="dashboard"
                :percentage="envior_state[0].air_quality"
                :format="format"
              ></el-progress>
            </el-col>
            <el-col :span="9" :offset="6">
              <p class="tip">湿度</p>
              <el-progress type="dashboard" :percentage="envior_state[1].humidity" color="#5cb87a"></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <table class="tabel1">
                <thead>
                  <tr>
                    <th>{{table1_data[0].name}}</th>
                    <th>{{table1_data[1].name}}</th>
                    <th>{{table1_data[2].name}}</th>
                    <th>{{table1_data[3].name}}</th>
                    <th>{{table1_data[4].name}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{table1_data[0].value}}</td>
                    <td>{{table1_data[1].value}}</td>
                    <td>{{table1_data[2].value}}</td>
                    <td>{{table1_data[3].value}}</td>
                    <td>{{table1_data[4].value}}</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <!-- 下面 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="7">
          <p class="title">设备状态监控</p>
          <div id="myChart2" style="height:300px;"></div>
        </el-col>

        <el-col :span="7">
          <p class="title">用电量异常监控</p>
          <div id="myChart3" style="height:300px;"></div>
        </el-col>

        <el-col :span="7">
          <p class="title">警报推送</p>
          <table class="table2">
            <thead>
              <tr>
                <th>日期</th>
                <th>警报信息</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in table2_data" :key="index">
              <tr>
                <td>{{item.date}}</td>
                <td>{{item.msg}}</td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "environmentMonitor",
  data() {
    return {
      myChart1: "",
      myChart2: "",
      myChart3: "",
      useage: [
        { air: 30 },
        { computer: 45 },
        { projector: 65 },
        { curtain: 75 },
        { lamp: 85 }
      ],
      air_quality: 30,
      humidity: 58,
      envior_state: [{ air_quality: 30 }, { humidity: 58 }],
      building: ["教一", "教二", "教三", "东区实验楼"],
      power: [334, 390, 330, 720],
      equip_state: { good: 100, bad: 10 },
      power_error: [
        { value: 10, name: "教一", power: 334 },
        { value: 12, name: "教二", power: 390 },
        { value: 9, name: "教三", power: 330 },
        { value: 5, name: "东区实验楼", power: 720 }
      ],
      table1_data: [
        { name: "PM10", value: "62" },
        { name: "PM2.5", value: "26" },
        { name: "二氧化碳", value: "15" },
        { name: "甲醛", value: "16" },
        { name: "体感温度", value: "22" }
      ],
      table2_data: [
        { date: "2019-10-20", msg: "用电量异常" },
        { date: "2019-10-20", msg: "用电量异常" },
        { date: "2019-10-20", msg: "用电量异常" },
        { date: "2019-10-20", msg: "用电量异常" },
        { date: "2019-10-20", msg: "用电量异常" },
        { date: "2019-10-20", msg: "用电量异常" }
      ]
    };
  },
  mounted() {
    this.init1();
    this.init2();
    this.init3();
    window.onresize = () => {
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
    };
  },
  methods: {
    format(percentage) {
      if (percentage <= 30) {
        return "优";
      } else if (percentage > 31 && percentage <= 60) {
        return "良";
      } else {
        return "差";
      }
    },
    init1() {
      this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      this.myChart1.setOption({
        color: ["#1AA1FD"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "13%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            data: this.building,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "用电量/瓦",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF"
              },
              symbol: ["none", "arrow"]
            }
          }
        ],
        series: [
          {
            name: "实时用电量",
            type: "bar",
            barWidth: "60%",
            data: this.power
          }
        ]
      });
    },
    init2() {
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: -5,
          top: 0,
          data: ["故障", "正常"],
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "设备状态",
            type: "pie",
            radius: ["0", "60%"],
            center: ["68%", "40%"],
            color: ["#e72325", "#98e002", "#2ca3fd"],
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            },
            data: [
              {
                value: this.equip_state.bad,
                name: "故障"
              },
              {
                value: this.equip_state.good,
                name: "正常",
                selected: true
              }
            ]
          }
        ]
      });
    },
    init3() {
      this.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      this.myChart3.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}次 ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: -5,
          top: 0,
          textStyle: {
            color: "#fff"
          },
          data: this.building
        },
        series: [
          {
            name: "用电量异常警报",
            type: "pie",
            radius: ["0", "60%"],
            center: ["68%", "40%"],
            data: this.power_error,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    cut(){
      
    }
  }
};
</script>

<style scoped>
.monitor_container {
  width: 100%;
  height: 100%;
  background-color: #0c1b2d;
  background: url(../../assets/img/bg/7.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.monitor_header {
  width: 100%;
  height: 80px;
  background: url("../../assets/img/bg/8.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.monitor_header span {
  color: #fff;
  font-size: 25px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 9%;
}
.title {
  color: #fff;
  font-size: 18px;
  position: relative;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.el-row {
  margin-bottom: 20px;
}
.tip {
  width: 126px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.tabel1 {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-spacing: 0;
}
.tabel1 td {
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px 10px 0 0;
}
.table2 {
  font-size: 16px;
  color: #fff;
  width: 100%;
  border-spacing: 0;
  text-align: center;
  box-sizing: border-box;
}
.table2 tr {
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
}
.table2 thead tr {
  background: #053a98;
}
.table2 tbody tr td:first-child {
  border-left: 1px solid #053a98;
}
.table2 td {
  border-bottom: 1px solid #053a98;
  border-right: 1px solid #053a98;
  color: #df3d3d;
}
</style>