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

    <template v-if="user.username !== article.author.username">
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
    </template>

    <template v-else>
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{ name: 'edit-article', params: { slug: article.slug } }"
        exact
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </nuxt-link>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        @click="onDelete(article.slug)"
      >
        <i class="ion-ios-trash"></i>
        &nbsp; Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "@/api/article";
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
    async onDelete(slug) {
      await deleteArticle(slug);
      this.$router.push("/");
    },
  },
  computed: { ...mapState(["user"]) },
  components: {
    FollowUserBtn,
  },
};
</script>