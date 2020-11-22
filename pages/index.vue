<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Yikes</h1>
        <p>A place to practise your nuxtjs.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- tabs  -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'index', query: { tab: 'your_feed' } }"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'index', query: { tab: 'global_feed' } }"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'index', query: { tab: 'tag' } }"
                  :class="{ active: tab === 'tag' }"
                  exact
                >
                  # {{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- /tabs  -->

          <!-- Article-preview  -->
          <article-preview :articles="articles" />
          <!-- /Article-preview  -->

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: page === num,
                }"
                v-for="num in totalPage"
                :key="num"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'index',
                    query: {
                      page: num,
                      tag,
                      tab,
                    },
                  }"
                >
                  {{ num }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <!-- Popular Tags -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="t of tags"
                :key="t"
                :to="{ name: 'index', query: { tag: t, tab: 'tag' } }"
                class="tag-pill tag-default"
              >
                {{ t }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- /Popular Tags -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getQueriedArticles,
  getFeeds,
  favorite,
  unfavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
import ArticlePreview from "./components/article-preview";

export default {
  name: "HomeIndex",
  // 在asyncData中使用，是SEO的关键
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 5;
    const { tag } = query;
    const tab = query.tab || "global_feed";
    const getArticles =
      store.state.user && tab === "your_feed" ? getFeeds : getQueriedArticles;
    // const { data: { articles, articlesCount } } = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit,
    // });

    // const {
    //   data: { tags },
    // } = await getTags();

    // 将上面的两个请求优化成一个请求
    const [getArticlesResponse, getTagsResponse] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = getArticlesResponse.data;
    const { tags } = getTagsResponse.data;

    // 点赞请求期间禁用点赞按钮（开关）
    articles.forEach((a) => (a.favoriteDisabled = false));

    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    };
  },

  // 被监听的 传入 query 的信息，如果变化则重新调用 asyncData 方法
  watchQuery: ["page", "tag", "tab"],

  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },

  components: { ArticlePreview },

  head() {
    return {
      title: "RealWorld Yikes",
      meta: [
        {
          hid: "realworld-yikes",
          name: "realworld-yikes",
          content: "realworld-yikes",
        },
      ],
    };
  },
};
</script>

<style>
</style>