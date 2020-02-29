<template>
  <div class="block">
    <!-- <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>-->
    <el-row :gutter="24" style="padding-top:50px;">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">课室用电量/KW:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-input-number v-model="warning.power" :precision="2" :step="0.1"></el-input-number>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">甲醛:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.methanal" show-input :format-tooltip="formatTooltip"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">二氧化碳:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.carbon" show-input :format-tooltip="formatTooltip"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">PM2.5:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.pm25" show-input :format-tooltip="formatTooltip"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">PM10:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.pm10" show-input :format-tooltip="formatTooltip"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">温度:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.temperature" range :marks="marks"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">湿度:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-slider v-model="warning.humidity" show-input :format-tooltip="formatTooltip"></el-slider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content title">监控时段:</div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-time-select
            placeholder="起始时间"
            v-model="warning.startTime"
            :picker-options="{
                start: '07:15',
                step: '00:30',
                end: '22:30'
                }"
          ></el-time-select>至
          <el-time-select
            placeholder="结束时间"
            v-model="warning.endTime"
            :picker-options="{
                start: '07:15',
                step: '00:30',
                end: '22:30',
                minTime: warning.startTime
                }"
          ></el-time-select>
        </div>
      </el-col>
    </el-row>
    <div class="box">
      <div class="center-box2">
        <el-button icon="el-icon-edit" @click="restart()">重置</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="submit()">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "warningManage",
  data() {
    return {
      //   temperature: [],
      _id: "",
      warning: {},
      marks: {
        0: "0°C",
        18: "18°C",
        26: "26°C",
        37: {
          style: { color: "red" },
          label: this.$createElement("strong", "警戒线")
        }
      }
    };
  },
  created() {
    this.getWarning();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    getWarning() {
      this.$axios
        .get("/api/others/getWarningSetings/" + this.user.secret_key)
        .then(res => {
          this._id = res.data[0]._id;
          // "[10,20]" json 传过来的带有双引号 使用eval转变成arry
          this.warning = res.data[0];
          this.warning.temperature = eval(res.data[0].temperature);
        });
    },
    submit() {
      this.$axios
        .post("/api/others/editWarning/" + this.warning._id, this.warning)
        .then(() => {
          this.$message({
            message: "设置成功！",
            type: "success"
          });
        });
    },
    restart() {
      return (this.warning = {
        secret_key: this.user.secret_key,
        _id: this._id,
        power: 0.3,
        methanal: 10,
        carbon: 6,
        pm25: 8,
        pm10: 8,
        temperature: [10, 30],
        humidity: 60,
        endTime: "22:30",
        startTime: "7:15"
      });
    }
  }
};
</script>

<style scoped>
.block {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bg/9.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.title {
  height: 36px;
  line-height: 36px;
  font-size: 100%;
  text-align: right;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
.el-row {
  margin-bottom: 30px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box {
  width: 100%;
  display: flex;
}
.center-box2 {
  margin: auto;
}
</style>