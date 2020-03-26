<template>
  <div class="monitor_container">
    <header class="monitor_header">
      <span>设备环境监控平台</span>
    </header>

    <el-main>
      <el-row type="flex" justify="space-between">
        <el-col :span="7">
          <p class="title">设备使用频率</p>
          <el-row v-for="(item,index) in equip" :key="index">
            <el-col :span="6">
              <el-tag
                size="small"
                effect="dark"
                :type="item.type"
                style="font-size:14px"
              >{{item.name}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                :color="item.color"
                :stroke-width="24"
                :percentage="item.usage"
              ></el-progress>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <p class="title">用电量监控</p>
          <div id="myChart1" style="height:230px;"></div>
        </el-col>
        <el-col :span="7">
          <p class="title">环境状态</p>
          <el-row>
            <el-col :span="9">
              <p class="tip">空气质量</p>
              <el-progress
                type="dashboard"
                :percentage="environ.air_quality"
                :format="format"
                :color="color"
              ></el-progress>
            </el-col>
            <el-col :span="9" :offset="6">
              <p class="tip">湿度</p>
              <el-progress type="dashboard" :percentage="environ.humidity" color="#5cb87a"></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <table class="tabel1">
                <thead>
                  <tr>
                    <th>PM10</th>
                    <th>PM2.5</th>
                    <th>二氧化碳</th>
                    <th>甲醛</th>
                    <th>体感温度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{environ.pm10}}</td>
                    <td>{{environ.pm25}}</td>
                    <td>{{environ.co2}}</td>
                    <td>{{environ.meth}}</td>
                    <td>{{environ.temp}}</td>
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
      equip: [],
      environ: {},
      color: "",
      table2_data: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.init1();
    this.init2();
    this.init3();
    this.equip_init();
    this.electricity_init();
    this.environ_init();
    window.onresize = () => {
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
    };
  },
  methods: {
    format(percentage) {
      if (percentage <= 30) {
        this.color = "#5cb87a";
        return "优";
      } else if (percentage > 31 && percentage <= 60) {
        this.color = "#e6a23c";
        return "良";
      } else {
        this.color = "#f56c6c";
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
            barWidth: "60%"
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
            center: ["60%", "45%"],
            color: ["#e72325", "#98e002", "#2ca3fd"],
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            }
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
          }
        },
        series: [
          {
            name: "用电量异常警报",
            type: "pie",
            radius: ["0", "60%"],
            center: ["60%", "45%"],
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
    equip_init() {
      var d = new Date();
      var YYYY = d.getFullYear();
      var MM = d.getMonth() + 1;
      var DD = d.getDate();
      var date = YYYY + "-" + MM + "-" + DD;
      this.$axios
        .post("/api/analysis/init", { date, secret_key: this.user.secret_key })
        .then(res => {
          this.equip = res.data[0].equip;
          var allTotal = 0,
            equip_bad = 0,
            equip_good = 0;
          this.equip.forEach(item => {
            allTotal += item.total;
          });
          equip_bad = res.data[0].errNum;
          equip_good = allTotal - equip_bad;
          var obj = {};
          obj.date = date;
          obj.msg = res.data[0].msg;
          this.table2_data.push(obj);

          this.myChart2.setOption({
            series: [
              {
                data: [
                  {
                    value: equip_bad,
                    name: "故障"
                  },
                  {
                    value: equip_good,
                    name: "正常",
                    selected: true
                  }
                ]
              }
            ]
          });
        })
        .catch(() => {
          this.myChart2.setOption({
            series: [
              {
                data: [
                  {
                    value: 0,
                    name: "故障"
                  },
                  {
                    value: 0,
                    name: "正常",
                    selected: true
                  }
                ]
              }
            ]
          });
          this.equip = [
            {
              name: "空调",
              total: 100,
              usage: 0,
              type: "danger",
              color: "#f56c6c"
            },
            {
              name: "电脑",
              total: 100,
              usage: 0,
              type: "warning",
              color: "#e6a23c"
            },
            {
              name: "窗帘",
              total: 100,
              usage: 0,
              type: "success",
              color: "#5cb87a"
            },
            {
              name: "投影仪",
              total: 100,
              usage: 0,
              type: "primary",
              color: "#1989fa"
            },
            {
              name: "智能灯",
              total: 100,
              usage: 0,
              type: "info",
              color: "#6f7ad3"
            }
          ];
        });
    },
    electricity_init() {
      // 根据系统时间获取最新的数据
      var d = new Date();
      var YYYY = d.getFullYear();
      var MM = d.getMonth() + 1;
      var DD = d.getDate();
      var date = YYYY + "-" + MM + "-" + DD;
      this.$axios
        .post("/api/analysis/init1", { date, secret_key: this.user.secret_key })
        .then(res => {
          var electricity = [],
            power = [],
            err_times = [];
          var sum1 = 0,
            sum2 = 0;
          electricity = res.data[0].electricity;
          electricity.forEach(item => {
            item.children.forEach(obj => {
              sum1 += obj.power;
              sum2 += obj.value;
            });
            power.push(sum1);
            err_times.push(sum2);
            sum1 = 0;
            sum2 = 0;
          });
          var building = electricity.reduce((names, item) => {
            names.push(item.name);
            return names;
          }, []);
          var power_err = err_times.map((value, i) => ({
            value,
            name: building[i]
          }));
           var obj = {};
          obj.date = date;
          obj.msg = res.data[0].msg;
          this.table2_data.push(obj);

          this.myChart1.setOption({
            xAxis: [{ data: building }],
            series: [{ data: power }]
          });
          this.myChart3.setOption({
            legend: { data: building },
            series: [{ data: power_err }]
          });
        })
        .catch(() => {
          this.$message.warning("今天没有数据!");
          this.myChart1.setOption({
            xAxis: [{ data: ["", "", ""] }],
            series: [{ data: [0, 0, 0] }]
          });
          this.myChart3.setOption({
            legend: { data: ["", "", ""] },
            series: [
              {
                data: [
                  { value: 0, name: "" },
                  { value: 0, name: "" },
                  { value: 0, name: "" }
                ]
              }
            ]
          });
        });
    },
    environ_init() {
      // 根据系统时间获取最新的数据
      var d = new Date();
      var YYYY = d.getFullYear();
      var MM = d.getMonth() + 1;
      var DD = d.getDate();
      var date = YYYY + "-" + MM + "-" + DD;
      this.$axios
        .post("/api/analysis/init2", {
          date,
          secret_key: this.user.secret_key
        })
        .then(res => {
          this.environ = res.data[0].environ;
           var obj = {};
          obj.date = date;
          obj.msg = res.data[0].msg;
          this.table2_data.push(obj);
        })
        .catch(() => {
          this.environ = {
            air_quality: 0,
            humidity: 0,
            pm10: 0,
            pm25: 0,
            co2: 0,
            meth: 0,
            temp: 0
          };
        });
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