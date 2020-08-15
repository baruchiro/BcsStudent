<template>
  <Layout>
    <h1 class="tag-title text-center"># {{ $page.tag.title }}</h1>

    <p class="tag-description" v-if="description" v-html="description" />

    <div class="posts">
      <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
    </div>
  </Layout>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title,
    description,
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    Author,
    PostCard,
  },
  metaInfo() {
    return {
      title: `# ${this.$page.tag.title}`,
    };
  },
  computed: {
    description() {
      return this.$page.tag.description?.replace(/\r?\n/g, "<br/>");
    },
  },
};
</script>

<style lang="scss">
.tag-description {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space);
}
</style>

