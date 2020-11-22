<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onTargetUpdate">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="updateTarget.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="updateTarget.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="updateTarget.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="updateTarget.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="updateTarget.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="updating"
                type="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo, getCurrentUser } from "@/api/user";

export default {
  name: "Settings",
  // 在路由匹配组件进行渲染之前，会先执行中间件
  middleware: ["authenticated"],
  data() {
    return {
      updateTarget: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      },
      updating: false,
    };
  },
  methods: {
    async onTargetUpdate() {
      try {
        this.updating = true;
        await updateUserInfo({ user: this.updateTarget });
        this.updating = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    const { data } = await getCurrentUser();
    this.updateTarget = data.user;
  },
};
</script>

<style>
</style>