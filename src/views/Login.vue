<template>
  <div class="login">
    <!-- 导航 -->
    <header>
      <nav class="navbar">
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
    </header>
    <!-- 首页 -->
    <section id="home" class="home_section">
      <!-- 走马灯 -->
      <!-- <div class="lunbo">
        <el-carousel :interval="5000" type="card" height="400px">
          <el-carousel-item>
            <img src="../assets/bg.jpg" alt />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/showcase.jpg" alt />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/bg.jpg" alt />
          </el-carousel-item>
        </el-carousel>
      </div>-->
      <div class="animated bounceInDown slower">
        <div class="text-center">
          <h1 class="sec_title white">WELCOME TO CONTROL SYSTEM</h1>
          <p class="sec_desc">集控运维服务系统</p>
          <a class="common_btn red_bg" @click="loginBoolean = true">
            <span>立即登录</span>
          </a>
          <a class="common_btn margin_left" @click="open">
            <span>使用须知</span>
          </a>
          
        </div>
      </div>
    </section>
    <!-- 关于我们 -->
    <section id="about" class="about_section commonSection">
      <el-row type="flex" justify="center">
        <el-col :lg="8" :md="12" :sm="12">
          <h4 class="sub_title">公司简介：</h4>
          <h2 class="sec_title">We are the Best</h2>
          <p class="sec_desc">
            银狐教育信息化服务外包产业联盟,
            是由分布在全国各省市专门从事教育信息化业务的公司组成的,
            是一个专门从事教育多媒体移动交互式电教室解决方案研究、
            产品研发及教育服务外包标准服务的组织。其发起者银狐科
            技拥有中国教育服务外包运营管理中心与多年电教服务经验及
            卓越的产业链整合能力,是基于数据提供的服务外包运营管理
            中心的高可用教育服务外包提供商
          </p>
          <a class="common_btn red_bg" href="#">
            <span>了解更多</span>
          </a>
        </el-col>
        <el-col :lg="9" :md="12" :sm="12" :offset="2">
          <div class="ab_img">
            <img src="../assets/img/about/1.jpg" alt />
          </div>
        </el-col>
      </el-row>
    </section>
    <!-- 服务 -->
    <section id="service" class="service_section commonSection">
      <el-row>
        <el-col :span="24" class="text-center">
          <h4 class="sub_title red">智慧课室云平台</h4>
          <h2 class="sec_title white">数据可视化、温室监测、设备监测、预警管理</h2>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="19">
          <p class="sec_desc color_aaa text-center">
            通过业务流程将用户、运维活动、教学设备、服务标准、教学活动、教务系统、
            一卡通系统等多个方面互联、整合，产生强大的服务外包管理功能，并分别面
            向服务外包商、学校、教育主管单位等不同用户的不同需求，提供相应的功能
            模块与应用管理界面。将教学场所、教学设备、教学人员、教学活动等与服务
            标准联系起来，实现信息整合、服务融合、服务监管的目标
          </p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :lg="3" :md="3" :sm="4">
          <div class="icon_box text-center">
            <div class="twoSides">
              <div class="front">
                <i class="fa fa-rss"></i>
                <h3>智能互联</h3>
              </div>
              <div class="back">
                <i class="fa fa-rss"></i>
                <h3>智能互联</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="3" :md="3" :sm="4">
          <div class="icon_box text-center">
            <div class="twoSides">
              <div class="front">
                <i class="fa fa-tv"></i>
                <h3>大屏展示</h3>
              </div>
              <div class="back">
                <i class="fa fa-tv"></i>
                <h3>大屏展示</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="3" :md="3" :sm="4">
          <div class="icon_box text-center">
            <div class="twoSides">
              <div class="front">
                <i class="fa fa-university"></i>
                <h3>关爱学生</h3>
              </div>
              <div class="back">
                <i class="fa fa-university"></i>
                <h3>关爱学生</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="3" :md="3" :sm="4">
          <div class="icon_box text-center">
            <div class="twoSides">
              <div class="front">
                <i class="fa fa-line-chart"></i>
                <h3>提高决策</h3>
              </div>
              <div class="back">
                <i class="fa fa-line-chart"></i>
                <h3>提高决策</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="3" :md="3" :sm="4">
          <div class="icon_box text-center">
            <div class="twoSides">
              <div class="front">
                <i class="fa fa-mobile"></i>
                <h3>配置移动APP</h3>
              </div>
              <div class="back">
                <i class="fa fa-mobile"></i>
                <h3>配置移动APP</h3>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
    <!-- 联系我们 -->
    <section id="contact" class="contact_section">
      <el-row>
        <el-col :span="14" :offset="3">
          <h2 class="sec_title">感激你们信赖我们的产品</h2>
        </el-col>
        <el-col :span="7">
          <a class="common_btn" href="#">
            <span>欢迎联系</span>
          </a>
        </el-col>
      </el-row>
      <!-- 脚跟 -->
      <footer class="footer_1">
        <el-row>
          <el-col :span="6" :offset="3">
            <div class="grid-content">
              <aside class="widget aboutwidget">
                <img src="../assets/img/logo/1.png" alt />
                <p>
                  Men have forgotten this truth. But you must not forget it. You become responsible, forever, for what you
                  have tamed. You are responsible for your rose
                </p>
              </aside>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="grid-content">
              <aside class="widget contact_widgets">
                <h3 class="widget_title">contact</h3>
                <p>大黄蜂工作社</p>
                <p>
                  <i class="fa fa-phone"></i>15813380952
                </p>
                <p>
                  <i class="fa fa-envelope-o"></i>532458665@qq.com
                </p>
              </aside>
            </div>
          </el-col>
          <el-col :span="4" :offset="1">
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
        label-width="85px"
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
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeIndex2: "1",
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
    open() {
      this.$notify({
        title: "使用须知",
        dangerouslyUseHTMLString: true,
        message: `<ul>
            <li>1.使用集控运维服务系统的前提，必须配套我司的智慧课室产品，如有需要请联系我司；</li>
            <li>2.该系统属于附加产品，由我司管理员申请账号；</li>
            <li>3.基础数据由我司管理员辅助输入；</li>
            <li>4.使用过程中，如有问题，请积极联系管理员，以防影响使用；</li>
            <li>5.我司拥有系统使用的解释权；</li>
          </ul>`,
        duration: 0
      });
    },
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
/*----------------------------------------------------
/ 1导航
------------------------------------------------------*/
.navbar {
  position: fixed;
  top: 0;
  z-index: 3;
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
/ 首页
------------------------------------------------------*/
.home_section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #f4f4f4;
  background: url('../assets/img/bg/1.jpg')
    no-repeat center center/cover;
}
/* .lunbo {
  padding: 60px 0 ;
}
.el-carousel {
  overflow: hidden;
}
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-carousel__item img {
  width: 100%;
} */
/*----------------------------------------------------
/ section 基本设置
------------------------------------------------------*/
.commonSection {
  padding: 60px 10px 80px;
}
/* 按钮设置 */
.common_btn {
  border: none;
  font-size: 16px;
  font-weight: 400;
  background: #000000;
  color: #fff;
  text-decoration: none;
  padding: 28px 45.5px;
  display: inline-block;
  line-height: 0.8;
  letter-spacing: 1.6px;
  position: relative;
  transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  -webkit-transition: all 0.4s ease-out;
  -ms-transition: all 0.4s ease-out;
  -o-transition: all 0.4s ease-out;
}
.common_btn span {
  position: relative;
  z-index: 2;
}
.common_btn:after {
  content: "";
  width: 4px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  -webkit-transition: all 0.4s ease-out;
  -ms-transition: all 0.4s ease-out;
  -o-transition: all 0.4s ease-out;
}
.common_btn:hover:after {
  width: 100%;
}
.common_btn:hover {
  color: #000;
}
.common_btn.red_bg {
  padding: 28px 40.5px;
}
.common_btn.red_bg:after {
  background: #e62b4a;
}
.common_btn.red_bg:hover:after {
  width: 100%;
}
.common_btn.red_bg:hover {
  color: #fff;
}
.grays {
  background: #f5f6fa;
}
.sub_title {
  font-size: 16px;
  line-height: 0.8;
  font-weight: 600;
  color: #818181;
  letter-spacing: 1.2px;
  margin: 0 0 24px;
}
.sec_title {
  font-size: 30px;
  line-height: 0.8;
  font-weight: 600;
  color: #000;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 30px;
}
.sec_desc {
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.64px;
  font-weight: 400;
  margin: 0 0 30px;
}
.red {
  color: #e62b4a;
}
.white {
  color: #fff;
}
.color_aaa {
  color: #aaa;
}
.text-center {
  text-align: center;
}
.margin_left {
  margin-left: 25px;
}
/*----------------------------------------------------
/ 关于我们
------------------------------------------------------*/
.about_section .ab_img {
  box-shadow: -2px 4px 30px 0px rgba(0, 0, 0, 0.3);
  margin-top: 100px;
}
.about_section .ab_img img {
  width: 100%;
}
/*----------------------------------------------------
/ 服务
------------------------------------------------------*/
.service_section {
  background: url(../assets/img/bg/2.jpg) no-repeat center center / cover;
}
.icon_box {
  transition: all ease 400ms;
}
.icon_box .back i,
.icon_box .front i {
  font-size: 64px;
  color: #aaaaaa;
  margin-bottom: 17px;
  transition: all ease 400ms;
}
.icon_box .back h3,
.icon_box .front h3 {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #aaaaaa;
  transition: all ease 400ms;
}
.twoSides {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  backface-visibility: hidden;
  transition: 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  position: absolute;
  top: 0;
  left: 0;
}
.front {
  background: transparent;
  z-index: 2;
  border: 2px solid rgba(27, 27, 27, 1);
  padding: 26px 0;
  width: 100%;
}
.back {
  background: #e62b4a;
  transform: rotateY(-180deg);
  position: relative;
  padding: 26px 0;
  border: 2px solid #e62b4a;
  width: 100%;
}
.icon_box:hover .front,
.icon_box.hover .front {
  transform: rotateY(180deg);
}
.icon_box:hover .back,
.icon_box.hover .back {
  transform: rotateY(0deg);
}
.icon_box .back h3,
.icon_box .back i {
  color: #ffffff;
}

/*----------------------------------------------------
/ 联系
------------------------------------------------------*/
.contact_section {
  width: 100%;
  background: url(../assets/img/bg/4.jpg) no-repeat center center / cover;
}
.contact_section .sec_title {
  font-size: 30px;
  font-weight: 400;
  line-height: 250px;
  color: #ffffff;
  letter-spacing: 2px;
  vertical-align: middle;
}
.contact_section .common_btn {
  margin-top: 90px;
}
.footer_1 {
  padding-top: 30px;
  background: url(../assets/img/bg/5.jpg) no-repeat center center / cover;
}
.footer_1 .el-row {
  margin-bottom: 10px;
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
  line-height: 20px;
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
  text-align: center;
  vertical-align: middle;
  color: #aaa;
  padding: 30px 0;
}
.footer_1 .copyright a {
  color: #aaa;
  text-decoration: none;
}
.footer_1 .copyright a:hover {
  color: skyblue;
}

/*----------------------------------------------------
/ 弹框
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


