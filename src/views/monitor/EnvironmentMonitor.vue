<template>
  <div class="t_container">
    <header class="t_header">
      <span>设备环境监控平台</span>
    </header>
    <el-main>
      <el-row :gutter="40">
        <el-col :span="7">
          <div>
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
                  :percentage="70"
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
                  :percentage="80"
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
                  :percentage="56"
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
                  :percentage="63"
                ></el-progress>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="9" style="margin-top:-38px;">
          <!-- <p class="title">本月设备状态统计</p> -->
          <div id="myChart1" style="height:243px;"></div>
        </el-col>
        <el-col :span="8" style="margin-top:-38px;">
          <div id="myChart2" style="height:243px;top:30px;left:-30px"></div>
        </el-col>
      </el-row>
      <!-- 下面 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="4">
              <div
                style="width:126px; line-height: 20px;height:30px;text-align: center;color:#fff; "
              >
                <p>空气质量</p>
              </div>
              <el-progress type="dashboard" :percentage="30" :format="format"></el-progress>
            </el-col>
            <el-col :span="10">
              <table class="tabel2">
                <tbody>
                  <tr>
                    <td>PM10</td>
                    <td>62</td>
                  </tr>
                  <tr>
                    <td>PM2.5</td>
                    <td>26</td>
                  </tr>
                  <tr>
                    <td>CO<sub>2</sub></td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>甲醛</td>
                    <td>15</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div
                style="width:126px; line-height: 20px;height:30px;text-align: center;color:#fff; "
              >
                <p>湿度</p>
              </div>
              <el-progress type="dashboard" :percentage="59" color="#5cb87a"></el-progress>
            </el-col>
            <el-col :span="10">
              <table class="tabel2">
                <tbody>
                  <tr>
                    <td>体感温度</td>
                    <td>24</td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <p class="title">警报信息</p>
          <table width="100%" class="t_table">
            <thead>
              <tr>
                <th>日期</th>
                <th>警报信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2019-10-28</td>
                <td>用电量警报用电量警报用电量警报</td>
              </tr>
              <tr>
                <td>2019-10-28</td>
                <td>用电量警报用电量警报用电量警报</td>
              </tr>
              <tr>
                <td>2019-10-28</td>
                <td>用电量警报用电量警报用电量警报</td>
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
      tableData: [
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
    window.onresize = () => {
      this.myChart1.resize();
      this.myChart2.resize();
    };
  },
  methods: {
    format(percentage) {
      return percentage === 30 ? "良" : `${percentage}%`;
    },
    init1() {
      this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      this.myChart1.setOption({
        title: {
          text: "本月设备状态统计",
          top: 35,
          left: 20,
          textStyle: {
            fontSize: 18,
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: 20,
          top: 150,
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
            center: ["50%", "60%"],
            color: ["#e72325", "#98e002", "#2ca3fd"],
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            },
            data: [
              {
                value: 6,
                name: "故障"
              },
              {
                value: 50,
                name: "正常",
                selected: true
              }
            ]
          }
        ]
      });
    },
    init2() {
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));

      var data = {
        id: "multipleBarsLines",
        title: "用电量统计",
        legendBar: ["正面占比", "中立占比", "负面占比"],
        symbol: "", //数值是否带百分号        --默认为空 ''
        legendLine: ["同期对比"],
        xAxis: ["一月", "二月", "三月", "四月", "五月", "六月"],
        yAxis: [[8, 10, 10, 11, 4, 13]],
        lines: [[10, 10, 9, 11, 7, 4]],
        barColor: ["#3FA7DC", "#7091C4", "#5170A2"], //柱子颜色 必填参数
        lineColor: ["#D9523F"] // 折线颜色
      };

      /////end/////
      var myData = (function test() {
        var yAxis = data.yAxis || [];
        var lines = data.lines || [];
        var legendBar = data.legendBar || [];
        var legendLine = data.legendLine || [];
        var symbol = data.symbol || " ";
        var seriesArr = [];
        var legendArr = [];
        yAxis &&
          yAxis.forEach((item, index) => {
            legendArr.push({
              name: legendBar && legendBar.length > 0 && legendBar[index]
            });
            seriesArr.push({
              name: legendBar && legendBar.length > 0 && legendBar[index],
              type: "bar",
              barGap: "0.5px",
              data: item,
              barWidth: data.barWidth || 12,
              label: {
                normal: {
                  show: true,
                  formatter: "{c}" + symbol,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontStyle: "normal",
                    fontFamily: "微软雅黑",
                    textAlign: "left",
                    fontSize: 11
                  }
                }
              },
              itemStyle: {
                //图形样式
                normal: {
                  barBorderRadius: 4,
                  color: data.barColor[index]
                }
              }
            });
          });

        lines &&
          lines.forEach((item, index) => {
            legendArr.push({
              name: legendLine && legendLine.length > 0 && legendLine[index]
            });
            seriesArr.push({
              name: legendLine && legendLine.length > 0 && legendLine[index],
              type: "line",
              data: item,
              itemStyle: {
                normal: {
                  color: data.lineColor[index],
                  lineStyle: {
                    width: 3,
                    type: "solid"
                  }
                }
              },
              label: {
                normal: {
                  show: false, //折线上方label控制显示隐藏
                  position: "top"
                }
              },
              symbol: "circle",
              symbolSize: 10
            });
          });

        return {
          seriesArr,
          legendArr
        };
      })();

      this.myChart2.setOption({
        title: {
          show: true,
          top: 5,
          left: 20,
          text: data.title,
          textStyle: {
            fontSize: 18,
            color: "#fff"
          },
          subtext: data.subTitle,
          link: ""
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var time = "";
            var str = "";
            for (var i of params) {
              time = i.name.replace(/\n/g, "") + "<br/>";
              if (i.data == "null" || i.data == null) {
                str += i.seriesName + "：无数据" + "<br/>";
              } else {
                str += i.seriesName + "：" + i.data + "%<br/>";
              }
            }
            return time + str;
          },
          axisPointer: {
            type: "none"
          }
        },
        legend: {
          right: data.legendRight || "30%",
          top: 36,
          right: 20,
          itemGap: 20,
          itemWidth: 10,
          itemHeight: 10,
          data: myData.legendArr,
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 14
          }
        },
        grid: {
          x: 30,
          y: 80,
          x2: 30,
          y2: 60
        },
        xAxis: {
          type: "category",
          data: data.xAxis,
          axisTick: {
            show: false
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "#1AA1FD"
            },
            symbol: ["none", "arrow"]
          },
          axisLabel: {
            show: true,
            interval: "0",
            textStyle: {
              lineHeight: 16,
              padding: [2, 2, 0, 2],
              height: 50,
              fontSize: 12
            },
            rich: {
              Sunny: {
                height: 100,
                width: 60,
                padding: [0, 5, 0, 5],
                align: "center"
              }
            },
            formatter: function(params, index) {
              var newParamsName = "";
              var splitNumber = 5;
              var paramsNameNumber = params && params.length;
              if (paramsNameNumber && paramsNameNumber <= 4) {
                splitNumber = 4;
              } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                splitNumber = 4;
              } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                splitNumber = 5;
              } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                splitNumber = 5;
              } else {
                params = params && params.slice(0, 15);
              }

              var provideNumber = splitNumber; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              params = newParamsName;
              return "{Sunny|" + params + "}";
            },
            color: "#1AA1FD"
          }
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#1AA1FD"
            },
            symbol: ["none", "arrow"]
          },
          type: "value",
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#1AA1FD",
              type: "solid"
            }
          }
        },
        series: myData.seriesArr
      });
    }
  }
};
</script>

<style scoped>
.t_container {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/true.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.t_header {
  width: 100%;
  height: 80px;
  background: url("../../assets/img/linx.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.t_header span {
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
.el-col {
  border-radius: 4px;
}

.t_table {
  font-size: 16px;
  color: #fff;
  width: 100%;
  margin: 0 auto;
  border-spacing: 0;
  text-align: center;
  box-sizing: border-box;
}
.t_table tr {
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
}
.t_table thead tr {
  background: #053a98;
}
.t_table tbody tr td:first-child {
  border-left: 1px solid #053a98;
}
.t_table td {
  border-bottom: 1px solid #053a98;
  border-right: 1px solid #053a98;
  color: #df3d3d;
}

.tabel2 {
  font-size: 16px;
  color: #fff;
  width: 70%;
  margin: 0 auto;
  border-spacing: 0;
  text-align: center;
  box-sizing: border-box;
  margin-top:35px;
}
.tabel2 tr {
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
}
</style>