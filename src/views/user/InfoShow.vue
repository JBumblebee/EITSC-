<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <div class="user">
          <img :src="user.avatar" class="avatar" alt />
        </div>
        <div class="user-item">
          <i class="fa fa-user"></i>
          <span>{{user.name}}</span>
        </div>
        <div class="user-item">
          <i class="fa fa-cog"></i>
          <span>{{user.identity == 'manager' ? '管理员' : '老师'}}</span>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="userinfo">
          <div class="userinfo_form">
            <el-form
              :model="userForm"
              status-icon
              :rules="rules"
              ref="userForm"
              label-width="100px"
            >
              <el-form-item label="邮箱:" prop="email">
                <el-input type="email" v-model="user.email" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名:" prop="name">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="修改密码:" prop="password">
                <el-input type="password" v-model="userForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="password2">
                <el-input type="password" v-model="userForm.password2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "infoshow",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        name: "",
        email: "",
        password: "",
        password2: "",
        secret_key: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userForm.id = this.user.id;
          this.userForm.email = this.user.email;
          this.userForm.identity = this.user.identity;
          this.userForm.secret_key = this.user.secret_key;
          this.$axios
            .post("/api/users/edit/" + this.userForm.id, this.userForm)
            .then(res => {
              this.$confirm("是否继续更改个人信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "修改成功，请重新登录！!"
                  });
                  // 清除token
                  localStorage.removeItem("eleToken");
                  this.$store.dispatch("clearCurrentState");
                  // 页面跳转
                  this.$router.push("/login");
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消提交"
                  });
                });
            });
        } else {
          this.$message.error("提交失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  position: relative;
  top: 30%;
  padding: 5% 20%;
}
.user img {
  width: 110px;
  border-radius: 50%;
}
.user span {
  display: block;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 5% 20%;
  color: #333;
}
.user-item span {
  padding-left: 8px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.userinfo_form {
  width: 500px;
  padding: 15% 20%;
}
</style>
