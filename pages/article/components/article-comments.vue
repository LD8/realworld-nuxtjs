<template>
  <div>
    <form class="card comment-form" @submit.prevent="onPostComment">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          required
        />
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <span>&nbsp;{{ user.username }}</span>
        <button
          class="btn btn-sm btn-primary"
          type="submit"
          :disabled="posting"
        >
          {{ posting ? "Posting" : "Post Comment" }}
        </button>
      </div>
    </form>

    <div class="card" v-for="item in comments" :key="item.id">
      <div class="card-block">
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{ name: 'profile', param: { username: item.author.username } }"
          class="comment-author"
        >
          <img class="comment-author-img" :src="item.author.image" />
          &nbsp;{{ item.author.username }}
        </nuxt-link>
        <span class="date-posted">
          {{ item.createdAt | date("MMM DD, YYYY") }}
        </span>
        <button
          class="btn btn-sm btn-warning"
          style="float: right"
          v-if="user.username === item.author.username"
          :disabled="item.loading"
          @click="onDeleteComment(item)"
        >
          {{ item.loading ? "Loading..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      comment: { body: "" },
      posting: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onPostComment() {
      if (this.comment.body) {
        try {
          this.posting = true;
          const { data } = await addComment(this.article.slug, {
            comment: this.comment,
          });
          this.posting = false;
          this.comment.body = "";
          this.comments.unshift(data.comment);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async onDeleteComment(comment) {
      const deletedComIndex = this.comments.findIndex(
        (c) => c.id === comment.id
      );
      comment.loading = true;
      await deleteComment(this.article.slug, comment.id);
      this.comments.splice(deletedComIndex, 1);
      comment.loading = false;
    },
  },
  // 无需 SEO 服务器渲染的话无需使用 asyncData，而是 mounted 足矣
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments.map((com) => ({ ...com, loading: false }));
  },
};
</script>

<style>
</style>