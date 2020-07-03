<template>
  <Layout :show-logo="false">

    <!-- Author intro -->
    <Author :show-title="true" />

    <Sidebar>
      <PostTitles title="טיוטות" :posts="drafts" />
    </Sidebar>

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  },
  meta: metadata {
    siteName
  },
  drafts: allPost(filter: { published: { eq: false }}) {
    edges {
      node {
        id
        title
        path
      }
    }
  },
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";
import PostTitles from "~/components/PostsTitles.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  components: {
    Author,
    PostCard,
    PostTitles,
    Sidebar,
  },
  metaInfo() {
    title: this.$page.meta.siteName;
  },
  computed: {
    drafts() {
      return this.$page.drafts.edges.map(e => e.node);
    }
  }
};
</script>
