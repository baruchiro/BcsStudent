<template>
  <div class="post-titles content-box">
    <div class="post-titles__title">{{title}}</div>

    <g-link
      class="post-titles__link"
      v-for="post in posts"
      :key="post.id"
      :to="post.path"
    >{{post.title}}</g-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
.post-titles {
  font-size: 0.8em;

  &__title {
    text-align: center;
    font-weight: bold;
  }

  &__link {
    text-decoration: none;
  }
}
</style>