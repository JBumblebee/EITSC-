<template>
  <div class="container">
    <nav class="navbar">
      <!-- 导航 -->
      <ul>
        <li>
          <a href="#home">首页</a>
        </li>
        <li>
          <a href="#about">关于我们</a>
        </li>
        <li>
          <a href="#service">服务</a>
        </li>
        <li>
          <a href="#contact">联系我们</a>
        </li>
        <li>
          <a @click="loginBoolean = true">登录</a>
        </li>
        <li>
          <a @click="registerBoolean = true">账号激活</a>
        </li>
      </ul>
    </nav>

    <!-- 弹框 用户登录 -->
    <el-dialog title="用户登录" :visible.sync="loginBoolean" width="400px" center>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toLogin('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？请联系管理员申请账号</p>
        </div>
      </el-form>
    </el-dialog>
    <!-- 弹框 用户激活 -->
    <el-dialog title="账号激活" :visible.sync="registerBoolean" width="400px" center>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            v-model="registerUser.password2"
            placeholder="请确认密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="通行证" prop="secret_key">
          <el-input v-model="registerUser.secret_key" placeholder="请输入通行证"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="老师" value="teacher"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="toRegister('registerForm')">注 册</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>已有账号?立即登录</p>
        </div>
      </el-form>
    </el-dialog>
    <!-- 内容 -->
    <section id="home">
      <h1>欢迎大家</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis animi porro, obcaecati iure
        magni vitae a culpa
        corporis totam, dignissimos dolore possimus sapiente rem molestiae in ea iste officiis repudiandae.
      </p>
    </section>
    <section id="about">
      <h1>欢迎大家</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis animi porro, obcaecati iure
        magni vitae a culpa
        corporis totam, dignissimos dolore possimus sapiente rem molestiae in ea iste officiis repudiandae.
      </p>
    </section>
    <section id="service">
      <h1>欢迎大家</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis animi porro, obcaecati iure
        magni vitae a culpa
        corporis totam, dignissimos dolore possimus sapiente rem molestiae in ea iste officiis repudiandae.
      </p>
    </section>
    <section id="contact">
      <footer class="footer_1">
        <el-row>
          <el-col :span="8" :offset="4">
            <div class="grid-content">
              <aside class="widget aboutwidget">
                <img src="../assets/foo_logo.png" alt />
                <p>
                  Welcome to our web design agency. Lorem ipsum is simply free text dolor sit amet consectetur adipisicing elit.
                  Tempore corrupti temporibus fuga earum asperiores, alias excepturi sit mpedit fugit laudantium.
                </p>
              </aside>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="grid-content">
              <aside class="widget contact_widgets">
                <h3 class="widget_title">contact</h3>
                <p>华南农业大学数学与信息学院</p>
                <p>
                  <i class="fa fa-phone"></i>15813380952
                </p>
                <p>
                  <i class="fa fa-envelope-o"></i>532458665@qq.com
                </p>
              </aside>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <aside class="widget social_widget">
                <h3 class="widget_title">social</h3>
                <ul>
                  <li>
                    <a href="https://wx.qq.com/">
                      <i class="fa fa-wechat"></i>微信
                    </a>
                  </li>
                  <li>
                    <a href="https://im.qq.com/">
                      <i class="fa fa-qq"></i>QQ
                    </a>
                  </li>
                  <li>
                    <a href="https://weibo.com/">
                      <i class="fa fa-weibo"></i>微博
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <div class="copyright">
                © copyright 2020 by
                <a href="https://github.com/JBumblebee">JBumblebee</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </footer>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginBoolean: false,
      registerBoolean: false,
      loginUser: {
        email: "",
        password: ""
      },
      registerUser: {
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
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
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
        ],
        secret_key: [
          { required: true, message: "通行证不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    toLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            // 登录成功
            const { token } = res.data;
            localStorage.setItem("eleToken", token);

            // 解析token
            const decode = jwt_decode(token);

            // 存储数据
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);

            // 页面跳转
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              this.$router.push("/login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #333;
  color: #fff;
  height: 100vh;
  line-height: 1.6;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
  /* 使用css实现全图滚动 */
  overflow-y: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}
/* concat */
.footer_1 {
  position: relative;
  top: 70%;
  height: 230px;
  padding: 15px 30px 0;
  background: url(../assets/5.jpg) no-repeat center center / cover;
}
.footer_1 .el-row {
  margin-bottom: 15px;
}
.footer_1 .el-row:last-child {
  margin-bottom: 0;
}
.footer_1 .widget .widget_title {
  font-size: 18px;
  letter-spacing: 0.72px;
  color: #fff;
  margin: 0 0 50px;
  text-transform: uppercase;
}
.footer_1 .aboutwidget img {
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
}
.footer_1 .aboutwidget p {
  font-size: 14px;
  letter-spacing: 0.72px;
  color: #aaaaaa;
  margin: 0;
}
.footer_1 .contact_widgets p {
  font-size: 14px;
  letter-spacing: 0.72px;
  color: #aaaaaa;
  padding-bottom: 10px;
}
.footer_1 .contact_widgets p i {
  font-size: 16px;
  color: #fff;
  margin-right: 12px;
}
.footer_1 .social_widget ul li {
  padding-bottom: 10px;
  list-style: none;
  display: block;
}
.footer_1 .social_widget ul li a {
  font-size: 14px;
  letter-spacing: 0.56px;
  color: #aaaaaa;
  margin: 0;
  display: block;
  text-align: left;
  text-decoration: none;
}
.footer_1 .social_widget ul li a i {
  font-size: 16px;
  color: #fff;
  margin-right: 12px;
}
.footer_1 .social_widget ul li a:hover {
  color: skyblue;
}
.footer_1 .copyright {
  border-top: 1px solid #1a1a1a;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 36px;
  text-align: center;
  vertical-align: middle;
  color: #aaa;
}
.footer_1 .copyright a {
  color: #aaa;
}
.footer_1 .copyright a:hover {
  color: skyblue;
}
/*----------------------------------------------------
/ 1导航
------------------------------------------------------*/
.navbar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  background: rgb(0, 0, 0, 0.7);
}
.navbar ul {
  display: flex;
  list-style: none;
  width: 100%;
  justify-content: center;
}
.navbar ul li {
  margin: 0 1rem;
  padding: 1rem;
}
.navbar ul li a {
  text-decoration: none;
  color: #f4f4f4;
}
.navbar ul li a:hover {
  color: skyblue;
}
/*----------------------------------------------------
/ 2内容块
------------------------------------------------------*/
section {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; */
  width: 100%;
  height: 100vh;
  color: #f4f4f4;
  /* scroll snap */
  scroll-snap-align: center;
}
section#home {
  background: url("https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center/cover;
}
section#about {
  background: url("https://images.pexels.com/photos/114907/pexels-photo-114907.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center/cover;
}
section#service {
  background: url("https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center/cover;
}
section#contact {
  background: url("https://images.pexels.com/photos/1591057/pexels-photo-1591057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    no-repeat center center/cover;
}
/*----------------------------------------------------
/ 3弹框
------------------------------------------------------*/
.loginForm,
.registerForm {
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(185, 185, 185, 0.8);
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
</style>