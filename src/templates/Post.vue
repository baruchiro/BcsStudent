<template>
  <Layout>
    <div :dir="dir">
      <div class="post-title">
        <h1 class="post-title__text">
          {{ $page.post.title }}
        </h1>

        <p v-if="$page.post.author" class="post-title__author">
          פוסט מאת <span>{{ $page.post.author.title }}</span>
        </p>
        <PostMeta :post="$page.post" />
      </div>

      <div class="post content-box__main">
        <div class="post__header">
          <g-image
            alt="Cover image"
            v-if="$page.post.cover_image"
            :src="$page.post.cover_image"
          />
        </div>

        <div class="post__content" v-html="$page.post.content" />

        <div class="post__footer">
          <PostTags :post="$page.post" />
        </div>
      </div>

      <div class="content-box__main">
        <Disqus :identifier="$page.post.title" />
      </div>

      <Author class="post-author" />
    </div>
  </Layout>
</template>

<script>
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import Author from "~/components/Author.vue";
import getMeta from "~/meta";

export default {
  components: {
    Author,
    PostMeta,
    PostTags,
  },
  computed: {
    dir() {
      return this.$page.post.language === "en" ? "ltr" : undefined;
    },
  },
  metaInfo() {
    const { path, title, description, og_cover_image } = this.$page.post;
    return {
      title,
      meta: getMeta(this.$page.meta.siteUrl, {
        path,
        title,
        description,
        image: {
          path: og_cover_image?.src || "/logo/og-image.png",
          width: 1200,
          height: 630,
        },
        htmlAttrs: {
          lang: this.$page.post.language,
        },
      }),
    };
  },
};
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    author { title }
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (width: 860, blur: 10)
    og_cover_image: cover_image (width: 1200, height: 630),
    language
  },
  meta: metadata {
    siteUrl
  },
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;

  &__author {
    font-size: 0.8em;
    opacity: 0.8;

    span {
      font-weight: bold;
    }
  }
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-right: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
