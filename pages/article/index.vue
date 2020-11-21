<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <!-- meta -->
        <article-meta :article="article" />
        <!-- /meta -->
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <!-- meta -->
        <article-meta :article="article" />
        <!-- /meta -->
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingleArticle } from "@/api/article";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments";
import MarkdownIt from "markdown-it";

export default {
  name: "Article",
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getSingleArticle(params.slug);
    const mdRender = new MarkdownIt();
    article.body = mdRender.render(article.body);

    // console.log(article);
    return { article };
  },
  // 引入组件，使 template 可以使用
  components: {
    ArticleMeta,
    ArticleComments,
  },
  // SEO 优化 head
  head() {
    return {
      title: `${this.article.title} - RealWorld Yikes`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>