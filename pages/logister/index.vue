<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLoginPage ? "Sign In" : "Sign Up" }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLoginPage" to="/register"
              >Register an account</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(errTypes, errSubject) in errors">
              <li v-for="type in errTypes" :key="type">
                {{ errSubject }}: {{ type }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-if="!isLoginPage"
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              {{ isLoginPage ? "Sign In" : "Sign Up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 判断 process 是否在 client（浏览器端）执行，仅在客户端加载 js-cookie
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: ["notAuthenticated"],
  name: "Logister",
  data() {
    return {
      user: { username: "", email: "", password: "" },
      // 错误信息
      errors: {},
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLoginPage
          ? await login({ user: this.user })
          : await register({ user: this.user });
        // await 异步语法 -> 等待上面请求完成获取到 data 后才会执行下一步

        console.log(data);
        // 保存用户登录状态
        this.$store.commit("setUser", data.user);

        // 为了防止刷新页面导致用户登录数据丢失，进行持久化
        Cookie.set("user", data.user);

        // 跳转到首页
        this.$router.push("/");
      } catch (err) {
        // 打印错误{对象}
        console.dir("请求失败 ", err);
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>