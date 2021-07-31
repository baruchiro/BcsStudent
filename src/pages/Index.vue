<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <Sidebar>
      <PostTitles title="רעיונות שצריך לפתח" :posts="ideas" tag="Idea" />
      <PostTitles title="טיוטות" :posts="drafts" />
      <div class="blog-links">
        <div class="blog-links-title">עקבו אחרי הבלוג</div>
        <social class="blog-links-icon" v-for="link in socialLinks" :key="link" :link="link" />
      </div>
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
        date (format: "D MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        author { title }
        tags {
          id
          title
          path
        }
        language
      }
    }
  },
  meta: metadata {
    siteName, siteDescription, siteUrl
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
  ideas: tag (id: "Idea") {
    belongsTo {
      edges {
        node {
          ...on Post {
            id
            title
            path,
            published
          }
        }
      }
    }
  },
  socialLinks: allSocial(filter: { blog: { eq: true } }) {
    edges {
      node {
        link
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";
import PostTitles from "~/components/PostsTitles.vue";
import Sidebar from "~/components/Sidebar.vue";
import getMeta from "~/meta";
import Social from "~/components/Social";

export default {
  components: {
    Author,
    PostCard,
    PostTitles,
    Sidebar,
    Social,
  },
  metaInfo() {
    const {siteName, siteUrl, siteDescription} = this.$page.meta
    return {
      title: siteName,
      meta: getMeta(siteUrl, {
        title: siteName,
        description: siteDescription,
        image: {
          path: "/logo/og-image.png",
          width: 1200,
          height: 630
        }
      }),
    };
  },
  computed: {
    drafts() {
      return this.$page.drafts.edges.map((e) => e.node);
    },
    socialLinks() {
      return this.$page.socialLinks.edges.map(({ node }) => node.link);
    },
    ideas() {
      return this.$page.ideas
        ? this.$page.ideas.belongsTo.edges
            .map((e) => e.node)
            .filter((p) => p.published)
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-links {
  text-align: center;
  width: 100%;

  &-title {
    font-size: medium;
    margin-bottom: 0.5em;
  }

  &-icon {
    margin: 0 0.5em;
  }
}
</style>
