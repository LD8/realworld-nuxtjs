<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">Yikes</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/edit" exact>
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{ name: 'profile', params: { username: user.username } }"
              >
                <img class="user-pic" :src="user.image" />&nbsp;{{
                  user.username
                }}
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">
                <i class="ion-archive"></i>&nbsp;Sign up
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">
                <i class="ion-log-in"></i>&nbsp;Login
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- Pages live here -->
    <Nuxt />

    <!-- Footer -->
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">Yikes</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DefaultLayout",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>