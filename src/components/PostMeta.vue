<template>
  <div class="post-meta">
    {{ date }}.
    <template v-if="post.timeToRead">
      <strong>{{ minRead }}</strong>
    </template>
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    date() {
      return this.post.language === "en"
        ? "Posted " + this.post.date
        : "פורסם בתאריך " + this.post.date;
    },
    minRead() {
      return this.post.language === "en"
        ? this.post.timeToRead + " min read."
        : this.post.timeToRead + " דקות לקריאה.";
    },
  },
};
</script>

<style lang="scss">
.post-meta {
  font-size: 0.8em;
  opacity: 0.8;
}
</style>