<template>
  <div
    :dir="dir"
    class="post-card content-box__main"
    :class="{ 'post-card--has-poster': post.poster }"
  >
    <div class="post-card__header">
      <g-image
        alt="Cover image"
        v-if="post.cover_image"
        class="post-card__image"
        :src="post.cover_image"
      />
    </div>
    <div class="post-card__content">
      <h2 class="post-card__title" v-html="post.title" />
      <p class="post-card__description" v-html="description" />

      <p v-if="post.author" class="post-card__author">
        פוסט מאת <span>{{ post.author.title }}</span>
      </p>
      <PostMeta class="post-card__meta" :post="post" />
      <PostTags class="post-card__tags" :post="post" />

      <g-link class="post-card__link" :to="post.path">Link</g-link>
    </div>
  </div>
</template>

<script>
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";

export default {
  components: {
    PostMeta,
    PostTags,
  },
  props: ["post"],
  computed: {
    description() {
      return this.post.description.replace(/\r?\n/g, "<br/>");
    },
    dir() {
      return this.post.language === "en" ? "ltr" : undefined;
    },
  },
};
</script>

<style lang="scss">
.post-card {
  margin-bottom: var(--space);
  position: relative;

  &__header {
    margin-left: calc(var(--space) * -1);
    margin-right: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    margin-top: calc(var(--space) * -1);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    &:empty {
      display: none;
    }
  }

  &__image {
    min-width: 100%;
  }

  &__title {
    margin-top: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 10px 30px 0 rgba(0, 0, 0, 0.1);
  }

  &__tags {
    z-index: 1;
    position: relative;
  }

  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }

  &__author {
    font-size: 0.8em;
    opacity: 0.8;

    span {
      font-weight: bold;
    }
  }
}
</style>
