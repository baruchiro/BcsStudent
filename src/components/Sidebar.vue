<template>
  <div class="sidebar">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sidebar {
  // Relative
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  padding: 0 0.5em;
  align-items: center;
  margin-bottom: 1vh;
  flex-wrap: wrap;

  > div {
    margin: 1vw;
  }

  @media screen and (min-width: 1300px) {
    // Fixed Sidebar
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    width: calc((100% - var(--content-width)) / 2);
    align-items: stretch;
    flex-direction: column;

    > div {
      margin: 1vh 0;
    }
  }
}
</style>