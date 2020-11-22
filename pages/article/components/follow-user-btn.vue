<template>
  <button
    class="btn btn-sm"
    :class="{
      'btn-outline-secondary': article.author.following,
      'btn-outline-primary': !article.author.following,
    }"
    @click="onFollow(article)"
    :disabled="onFollowing"
  >
    <template v-if="onFollowing">
      <span>Processing...</span>
    </template>
    <template v-else>
      <i
        :class="{
          'ion-minus-round': article.author.following,
          'ion-plus-round': !article.author.following,
        }"
      ></i
      >&nbsp;
      {{ article.author.following ? "Unfollow" : "Follow" }}
      {{ article.author.username }}
    </template>
  </button>
</template>

<script>
import { followUser, unfollowUser } from "@/api/user";
export default {
  name: "FollowUserBtn",
  props: { article: { type: Object, required: true } },
  data() {
    return {
      onFollowing: false,
    };
  },
  methods: {
    async onFollow(article) {
      this.onFollowing = true;
      if (article.author.following) {
        // to unfollow
        await unfollowUser(article.author.username);
        article.author.following = false;
      } else {
        // to follow
        await followUser(article.author.username);
        article.author.following = true;
      }
      this.onFollowing = false;
    },
  },
};
</script>

<style>
</style>