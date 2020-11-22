<template>
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
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>

    <!-- <follow-user-btn :article="article" /> -->
    <follow-user-btn :article="article" />

    &nbsp;&nbsp;
    <button
      class="btn btn-sm"
      :class="{
        'btn-outline-secondary': article.favorited,
        'btn-outline-primary': !article.favorited,
      }"
      @click="onFav(article)"
      :disabled="article.favoriteDisabled"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ article.favorited ? "Unfavorite Post" : "Favorite Post" }}
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { favOrUnfavArticle } from "@/utils/methods";
import FollowUserBtn from "./follow-user-btn";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onFav(article) {
      await favOrUnfavArticle(article);
    },
  },
  components: {
    FollowUserBtn,
  },
};
</script>