import app from "./app";

/* components */
import MainLayout from "@/layout/MainLayout/MainLayout.vue";
import Skeleton from "@/components/shared/SkeletonLoading/Skeleton.vue";
import DetailItem from "@/components/shared/Modals/DetailItem/DetailItem.vue";
import Toast from "@/components/shared/Toast/Toast.vue";
import SpinnerLoading from "@/components/Loaders/SpinnerLoading/SpinnerLoading.vue";

/* npm packages */
import DOMPurify from "dompurify";

/* components */
app.component("Skeleton", Skeleton);
app.component("MainLayout", MainLayout);
app.component("DetailItem", DetailItem);
app.component("Toast", Toast);
app.component("SpinnerLoading", SpinnerLoading);

/* directives */
app.directive("sane-html", (el, binding) => {
  el.innerHTML = DOMPurify.sanitize(binding.value);
});
