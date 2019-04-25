<template>
  <el-form
    :model="ruleForm2"
    status-icon
    :rules="rules2"
    ref="ruleForm2"
    label-width="100px"
    class="demo-ruleForm login"
  >
    <div class="title">淘宝后台管理系统</div>

    <el-form-item label="账号" prop="uname">
      <el-input v-model.number="ruleForm2.uname"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="upwd">
      <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handlerLogin">登录</el-button>
      <el-button>注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var usernameCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm2.username !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm2: {
        uname: "",
        upwd: ""
      },
      rules2: {
        upwd: [{ validator: validatePass, trigger: "blur" }],
        uname: [{ validator: usernameCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    handlerLogin() {
      console.log(this.ruleForm2);
      //使用ref找到表单元素，做出表单验证
      this.$refs.ruleForm2.validate(valid => {
        //不通过则返回提示
        if (!valid) return this.$message.error("请输入账号密码");
        //如果通过则传递用户账号密码
        this.$axios({

          url: "http://localhost:8899/admin/account/login",

          method: "POST",
          
          data: this.ruleForm2,

          withCredentials: true
          
        }).then(res => {
          console.log(res);
          const {status,message} = res.data
          if (status == 0) {
            // this.$message({
            //   message: message,
            //   type: "success"
            // });
          // setTimeout(() => {
            this.$router.push('/admin')
          // }, 3000);
          }else {
            this.$message.error(message);
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 25%;
  min-width: 400px;
  margin: 10% auto;
  background-image: linear-gradient(180deg, pink, #eee);
  padding: 20px 80px 10px 0;
  .title {
    height: 30px;
    line-height: 10px;
    text-indent: 5em;
    color: #f0f;
  }
}
</style>

