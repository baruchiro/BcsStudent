import VueDisqus from "vue-disqus";
import FontAwesome from "./font-awesome";
import mixpanel from "mixpanel-browser";

// Import main css
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  FontAwesome(Vue);
  mixpanel.init("22234dc68dcb1a4bab3e17c2af2b181e", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });

  FontAwesome(Vue);

  head.htmlAttrs = { lang: "he" };
  head.bodyAttrs = { dir: "rtl" };

  Vue.use(VueDisqus, {
    shortname: "bcsstudent",
  });

  if (isClient) {
    Vue.use(router);
  }

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
