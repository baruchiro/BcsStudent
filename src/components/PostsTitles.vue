<template>
  <div class="post-titles content-box">
    <div class="post-titles__title">
      <g-link v-if="tag" :to="`/tag/${tag}/`">{{title}}</g-link>
      <span v-else>{{title}}</span>
    </div>

    <g-link
      class="post-titles__link"
      v-for="post in posts"
      :key="post.id"
      :to="post.path"
    >{{post.title}}</g-link>

    <div v-if="posts.length === 0">אין {{title}} כרגע</div>
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
    },
    tag: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="scss">
.post-titles {
  font-size: 0.8em;
  padding: 1vh 1vw;

  a {
    text-decoration: none;
  }

  &__title {
    text-align: center;
    font-weight: bold;
    
    a {
      color: inherit;
    }
  }
}
</style>