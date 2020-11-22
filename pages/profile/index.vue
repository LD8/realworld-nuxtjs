<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <!-- If this is NOT your profile -->
            <template v-if="user.username !== profile.username">
              <button
                class="btn btn-sm action-btn"
                :class="{
                  'btn-outline-secondary': profile.following,
                  'btn-outline-primary': !profile.following,
                }"
                @click="onFollow(profile)"
                :disabled="onFollowing"
              >
                <template v-if="onFollowing">
                  <span>Processing...</span>
                </template>
                <template v-else>
                  <i
                    :class="{
                      'ion-minus-round': profile.following,
                      'ion-plus-round': !profile.following,
                    }"
                  ></i
                  >&nbsp;
                  {{ profile.following ? "Unfollow" : "Follow" }}
                  {{ profile.username }}
                </template>
              </button>
            </template>
            <!-- If this is your own profile -->
            <template v-else>
              <nuxt-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-finger-print-outline"></i>
                &nbsp; Edit your profile
              </nuxt-link>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my_articles' }"
                  :to="{
                    name: 'profile',
                    params: { username: profile.username },
                    query: { tab: 'my_articles' },
                  }"
                  exact
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'fav_articles' }"
                  :to="{
                    name: 'profile',
                    params: { username: profile.username },
                    query: { tab: 'fav_articles' },
                  }"
                  exact
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Article-preview  -->
          <article-preview :articles="articles" />
          <!-- /Article-preview  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getProfile } from "@/api/profile";
import { getQueriedArticles } from "@/api/article";
import { followUser, unfollowUser } from "@/api/user";
import ArticlePreview from "../components/article-preview";

export default {
  name: "Profile",
  // 在路由匹配组件进行渲染之前，会先执行中间件
  middleware: ["authenticated"],
  data() {
    return {
      onFollowing: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onFollow(profile) {
      this.onFollowing = true;
      if (profile.following) {
        // to unfollow
        await unfollowUser(profile.username);
        profile.following = false;
      } else {
        // to follow
        await followUser(profile.username);
        profile.following = true;
      }
      this.onFollowing = false;
    },
  },
  async asyncData({ query, params }) {
    const { username } = params;
    const [
      {
        data: { profile },
      },
      {
        data: { articles: myArticles },
      },
      {
        data: { articles: favArticles },
      },
    ] = await Promise.all([
      getProfile(username),
      getQueriedArticles({ author: username }),
      getQueriedArticles({ favorited: username }),
    ]);
    const tab = query.tab || "my_articles";
    const articles = tab === "my_articles" ? myArticles : favArticles;
    return { profile, articles, tab };
  },
  watchQuery: ["tab"],
  components: { ArticlePreview },
};
</script>

<style>
</style>