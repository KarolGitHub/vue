import { defineComponent, ref } from "vue";
import config from "@/config";

export default defineComponent({
  name: "FooterAdmin",
  setup() {
    const date = ref<number>(new Date().getFullYear());
    const {
      blogLink,
      contactLink,
      githubLink,
      linkedinLink,
      portfolioLink,
      aboutLink,
    } = config;
    return {
      date,
      blogLink,
      contactLink,
      githubLink,
      linkedinLink,
      portfolioLink,
      aboutLink,
    };
  },
});
