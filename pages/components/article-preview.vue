<template>
  <div>
    <!-- Article-preview  -->
    <div
      class="article-preview"
      v-for="article of articles"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
        >
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{
            article.createdAt | date("MMM DD, YYYY")
          }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: article.favorited }"
          @click="onFav(article)"
          :disabled="article.favoriteDisabled"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{
          name: 'article',
          params: {
            slug: article.slug,
          },
        }"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list" v-for="tag of article.tagList" :key="tag">
          <li class="tag-default tag-pill tag-outline">
            {{ tag }}
          </li>
        </ul>
      </nuxt-link>
      <TagList :tags="article.tagList" />
    </div>
    <!-- /Article-preview  -->
  </div>
</template>

<script>
import { favOrUnfavArticle } from "@/utils/methods";
import TagList from "./tag-list";

export default {
  name: "ArticlePreview",
  props: { articles: { type: Array, required: true } },
  methods: {
    async onFav(article) {
      await favOrUnfavArticle(article);
    },
  },
  components: { TagList },
};
</script>

<style>
</style>