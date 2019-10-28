<template>
  <div class="electric_container">
    <FilterSearch @Csearch="Csearch"></FilterSearch>
    <el-row :gutter="20">
      <el-col :span="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="14">
        <div id="myChart"></div>
      </el-col>
      <el-col :span="9">
        <div id="myChart2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterSearch from "../../components/FilterSearch";
export default {
  name: "electricAnalysis",
  data() {
    return {
      myChart: "",
      myChart2: "",
      site: "教一",
      bulidingName: ["教一", "教二", "教三", "教四", "教五", "东区实验楼"],
      buildingPower: [555, 666, 444, 333, 755, 650],
      classRoomsName: [
        "课室101",
        "课室102",
        "课室103",
        "课室201",
        "课室202",
        "课室203"
      ],
      classRoom_errorTimes: [
        { value: 5, name: "课室101" },
        { value: 6, name: "课室102" },
        { value: 8, name: "课室103" },
        { value: 9, name: "课室201" },
        { value: 10, name: "课室202" },
        { value: 3, name: "课室203" }
      ]
    };
  },
  mounted() {
    this.init();
    this.init2();
    //窗口大小变化改变的处理
    window.onresize = () => {
      this.myChart.resize();
      this.myChart2.resize();
    };
  },
  components: {
    FilterSearch
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    init() {
      const yMax = 1000;
      const dataShadow = [];
      for (var i = 0; i < this.buildingPower.length; i++) {
        dataShadow.push(yMax);
      }
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption({
        title: {
          text: "用电量分析/瓦",
          subtext: "Power Consumption Analysis"
        },
        toolbox: {
          orient: "horizontal", //方向
          right: "60", //距左
          show: true,
          feature: {
            // dataView: { show: false, readOnly: false },
            // magicType: { show: true, type: ["bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          data: this.bulidingName,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff"
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
                ])
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

      // Enable data zoom when user click bar.
      var zoomSize = 6;
      this.myChart.on("click", function(params) {
        console.log(
          this.bulidingName[Math.max(params.dataIndex - zoomSize / 2, 0)]
        );
        this.myChart.dispatchAction({
          type: "dataZoom",
          startValue: this.bulidingName[
            Math.max(params.dataIndex - zoomSize / 2, 0)
          ],
          endValue: this.bulidingName[
            Math.min(params.dataIndex + zoomSize / 2, data.length - 1)
          ]
        });
      });
    },
    init2() {
      this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.myChart2.setOption({
        title: {
          text: this.site + "用电量异常分析/次",
          subtext: "Error Analysis",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}次 ({d}%)"
        },
        toolbox: {
          orient: "horizontal", //方向
          show: true,
          right: 20,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          orient: "vertical", //vertical 、horizontal
          left: "left",
          data: this.classRoomsName
        },
        series: [
          {
            name: "用电量异常警报",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.classRoom_errorTimes,
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
    Csearch(query) {
      /**
       * 由于方便测试，而且数据量多，目前采用随机产生数组的方式，
       * 在视觉上实现异步加载的效果。接口并不难，实现很容易
       * 从子组件传过来的搜索内容 ---> console.log(query)
       */
      if (JSON.stringify(query) == "{}") {
        this.bulidingName = [
          "教一",
          "教二",
          "教三",
          "教四",
          "教五",
          "东区实验楼"
        ];
        this.buildingPower = [555, 666, 444, 333, 755, 650];
        this.init();
        this.site = "教一";
        this.init2();
      } else if (query.building === "教一") {
        this.bulidingName = [
          "课室101",
          "课室102",
          "课室103",
          "课室201",
          "课室202",
          "课室203"
        ];
        this.buildingPower = randomArr(6, 100, 200);
        this.init();
        this.site = query.building;
        this.init2();
      } else if (query.building === "教二") {
        this.bulidingName = [
          "课室101",
          "课室102",
          "课室103",
          "课室201",
          "课室202",
          "课室203"
        ];
        this.buildingPower = randomArr(6, 100, 400);
        this.init();
        this.site = query.building;
        this.init2();
      } else if (query.building === "东区实验楼") {
        this.bulidingName = [
          "课室101",
          "课室102",
          "课室103",
          "课室201",
          "课室202",
          "课室203"
        ];
        this.buildingPower = randomArr(6, 100, 300);
        this.init();
        this.site = query.building;
        this.init2();
      } else {
        this.buildingPower = randomArr(6, 100, 800);
        this.init();
      }
      
      function RandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range); //舍去
        return num;
      }
      /** len生成数组的长度，min生成数最小值，max生成数的最大值 **/
      function randomArr(len, min, max) {
        if (max - min < len) {
          //可生成数的范围小于数组长度
          return null;
        }
        var hash = [];
        while (hash.length < len) {
          var num = RandomNum(min, max);
          if (hash.indexOf(num) == -1) {
            hash.push(num);
          }
        }
        return hash;
      }
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
