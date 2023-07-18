<template>
  <a class="nostyle" :href="link" :rel="rel" :target="target">
    <font-awesome :icon="icon" size="lg" />
  </a>
</template>

<script>
const linkToIcon = {
  github: ["fab", "github"],
  twitter: ["fab", "twitter"],
  linkedin: ["fab", "linkedin"],
  facebook: ["fab", "facebook"],
  stackoverflow: ["fab", "stack-overflow"],
  mailto: ["fas", "envelope"],
  feed: ["fas", "rss"],
  medium: ["fab", "medium"],
  "dev.to": ["fab", "dev"],
  "t.me": ["fab", "telegram"],
};

export default {
  props: ["link"],
  computed: {
    icon() {
      const keyword = Object.keys(linkToIcon).find((key) =>
        this.link.toLowerCase().includes(key),
      );
      return linkToIcon[keyword];
    },
    rel() {
      return this.link.startsWith("http") ? "noreferrer noopener" : "";
    },
    target() {
      return this.link.startsWith("http") ? "_blank" : "";
    },
  },
};
</script>

<style lang="scss">
.nostyle {
  color: inherit !important;
}
</style>
