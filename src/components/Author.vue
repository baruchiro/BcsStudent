<template>
  <div class="author">
    <g-image
      alt="Author image"
      class="author__image"
      src="~/assets/images/author.jpg"
      width="180"
      height="180"
      blur="5"
    />

    <h1 v-if="showTitle" class="author__site-title">{{ $static.metadata.siteName }}</h1>

    <p class="author__intro">אמנם כבר לא סטודנט, אבל אוהב ללמוד דברים חדשים</p>

    <p class="author__links">
      <social v-for="link in links" :key="link" :link="link" />
    </p>
  </div>
</template>

<static-query>
query {
  metadata: metadata {
    siteName
  },
  links: allSocial(filter: { blog: { eq: false } }) {
    edges {
      node {
        link
      }
    }
  }
}
</static-query>

<script>
import Social from "./Social";

export default {
  props: ["showTitle"],
  components: { Social },
  computed: {
    links() {
      return this.$static.links.edges.map(({ node }) => node.link);
    },
  },
};
</script>

<style lang="scss">
.author {
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  padding: calc(var(--space) / 2) 0;

  &__image {
    border-radius: 100%;
    width: 90px;
    height: 90px;
    margin-bottom: 1em;
  }

  &__intro {
    opacity: 0.8;
  }

  &__site-title {
    font-size: 1.5em;
  }

  &__links {
    height: 2em;
    margin-top: -0.5em;
    > * {
      margin: 0 0.5em;
    }
  }
}
</style>
