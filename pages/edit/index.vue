<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
                :disabled="processing"
              >
                {{
                  processing
                    ? "Processing..."
                    : this.$route.params.slug
                    ? "Update Article"
                    : "Publish Article"
                }}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, getSingleArticle } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "Edit",
  // 在路由匹配组件进行渲染之前，会先执行中间件
  middleware: ["authenticated"],
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      processing: false,
    };
  },
  computed: { ...mapState(["user"]) },
  methods: {
    async onSubmit() {
      try {
        let { slug } = this.$route.params || null;
        this.processing = true;
        if (slug) {
          await updateArticle(slug, { article: this.article });
        } else {
          const {
            data: { article },
          } = await createArticle({ article: this.article });
          slug = article.slug;
        }
        this.processing = false;
        this.$router.push(`/article/${slug}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async beforeMount() {
    const { slug } = this.$route.params;
    if (slug) {
      try {
        const {
          data: { article },
        } = await getSingleArticle(slug);
        if (article.author.username === this.user.username) {
          this.article = article;
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  head() {
    return {
      title: this.$route.params.slug
        ? "Update Article"
        : "Create a New Article",
      meta: [
        {
          hid: "article-crud",
          name: "article-crud",
          content: "edit or update articles",
        },
      ],
    };
  },
};
</script>

<style>
</style>