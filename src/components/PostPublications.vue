<template>
  <div class="post-publications">
    {{ text }}:
    <social
      class="blog-links-icon"
      v-for="link in publications"
      :key="link"
      :link="link"
    />
  </div>
</template>

<script>
import Social from "./Social";

export default {
  props: ["publications", "lang"],
  components: { Social },
  computed: {
    text() {
      return this.lang === "en" ? "Also on" : "פורסם בנוסף ב";
    },
  },
};
</script>

<style lang="scss" scoped>
.post-publications {
  margin-top: 1em;
}

.blog-links-icon {
  margin: 0 0.5em;
}
</style>