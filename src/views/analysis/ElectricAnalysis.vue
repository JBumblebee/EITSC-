<template>
  <div class="electric_container">
    <FilterSearch @Csearch="Csearch"></FilterSearch>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <div id="myChart"></div>
      </el-col>
      <el-col :span="11">
        <div id="myChart2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterSearch from "../../components/FilterSearch";
export default {
  name: "electricAnalysis",
  components: {
    FilterSearch
  },
  data() {
    return {
      myChart: "",
      myChart2: "",
      site: "",
      buildingName: [],
      buildingPower: [],
      power_err: []
    };
  },
  mounted() {
    this.init1();
    this.init2();
    this.electricity_init();
    //窗口大小变化改变的处理
    window.onresize = () => {
      this.myChart.resize();
      this.myChart2.resize();
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    init1() {
      var yMax = 1000;
      var dataShadow = [];
      for (var i = 0; i < this.buildingPower.length; i++) {
        dataShadow.push(yMax);
      }
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption({
        title: {
          text: "用电量分析/瓦"
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          data: this.buildingName,
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#000",
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ]),
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#188df0",
                    fontSize: 14
                  }
                }
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: this.buildingPower
          }
        ]
      });
    },
    init2() {
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart2.setOption({
        title: {
          text: this.site + "用电量异常分析",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}次 ({d}%)"
        },
        toolbox: {
          orient: "horizontal", //方向
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          orient: "vertical", //vertical 、horizontal
          left: "left",
          data: this.buildingName
        },
        series: [
          {
            name: "用电量异常警报",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.power_err,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    timeFormat(time) {
      var d, YYYY, MM, DD;
      if (time) {
        d = new Date(time);
      } else {
        d = new Date();
      }
      YYYY = d.getFullYear();
      MM = d.getMonth() + 1;
      DD = d.getDate();
      return YYYY + "-" + MM + "-" + DD;
    },
    Csearch(query) {
      if (query.time) {
        var date = this.timeFormat(query.time);
        this.$axios
          .post("/api/analysis/init1", {
            date,
            secret_key: this.user.secret_key
          })
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
            this.buildingName = building;
            this.buildingPower = power;
            this.power_err = power_err;
            this.site = "";
            this.init1();
            this.init2();
            if (query.building) {
              var newArr = [];
              newArr = electricity.find(item => {
                return item.name === query.building;
              });
              this.buildingName = newArr.children.reduce((names, item) => {
                names.push(item.name);
                return names;
              }, []);
              this.buildingPower = newArr.children.reduce((powers, item) => {
                powers.push(item.power);
                return powers;
              }, []);
              this.site = query.building;
              this.power_err = newArr.children;
              this.init1();
              this.init2();
            }
          })
          .catch(() => {
            this.$message.error("抱歉，数据不存在！");
          });
      } else if (query.building) {
        this.site = query.building;
        var date = this.timeFormat();
        this.$axios
          .post("/api/analysis/init1", {
            date,
            secret_key: this.user.secret_key
          })
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
            this.buildingName = building;
            this.buildingPower = power;

            electricity = res.data[0].electricity;
            var newArr = [];
            newArr = electricity.find(item => {
              return item.name === query.building;
            });
            this.buildingName = newArr.children.reduce((names, item) => {
              names.push(item.name);
              return names;
            }, []);
            this.buildingPower = newArr.children.reduce((powers, item) => {
              powers.push(item.power);
              return powers;
            }, []);
            this.power_err = newArr.children;
            this.init1();
            this.init2();
          })
          .catch(() => {
            this.$message.warning("今天没数据！");
          });
      } else {
        this.site = "";
        this.electricity_init();
      }
    },
    electricity_init() {
      // 根据系统时间获取最新的数据
      var date = this.timeFormat();
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
          this.buildingName = building;
          this.buildingPower = power;
          this.power_err = power_err;
          this.site = "";
          this.init1();
          this.init2();
        })
        .catch(() => {
          this.$message.warning("今天没有数据！");
          this.buildingName = ["", "", ""];
          this.buildingPower = [0, 0, 0];
          this.power_err = [
            { value: 0, name: "" },
            { value: 0, name: "" },
            { value: 0, name: "" }
          ];
          this.site = "";
          this.init1();
          this.init2();
        });
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
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#myChart,
#myChart2 {
  height: 500px;
}
</style>
