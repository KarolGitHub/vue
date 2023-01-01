import { reactive } from "vue";

const storageTheme = reactive({
  theme: "",
});

const setTheme = (theme: string): void => {
  storageTheme.theme = theme;
  localStorage.setItem("dark", theme);
};

export { storageTheme, setTheme };
