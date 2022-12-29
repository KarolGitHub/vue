import mutations from "./mutations";
import router from "../../../router";
import { loadingStore, notifications } from "../../index";
// import { AuthService } from "../../../services";
import Auth from "@/server/firebase/auth";
import { LogIn, Register } from "../../../interface/Auth";
import { Toast } from "../../../interface/Toast";
// const authService = new AuthService();

export default {
  async logIn(loginForm: LogIn): Promise<void> {
    try {
      const response = await Auth.login(loginForm);
      if (response.user) {
        mutations.setAuth(true, response.user);
        await router.push({
          name: "Dashboard",
        });
      }
    } catch (e: any) {
      const toast: Toast = {
        body: "Incorrect email or password",
        tittle: "Error",
        type: "error",
        show: true,
      };
      notifications.actions.presentToast(toast);
    }
  },

  async register(registerForm: Register): Promise<void> {
    try {
      const response = await Auth.register(registerForm);
      const toast: Toast = {
        body: "Registration completed successfully",
        tittle: "Success",
        type: "success",
        show: true,
      };
      notifications.actions.presentToast(toast);

      await router.push({
        name: "login",
      });
    } catch (e: any) {
      const toast: Toast = {
        body: e.message,
        tittle: e.code,
        type: "error",
        show: true,
      };
      notifications.actions.presentToast(toast);
    }
  },
};
