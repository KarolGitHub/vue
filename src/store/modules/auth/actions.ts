import mutations from "./mutations";
import router from "../../../router";
import { loadingStore, notifications } from "../../index";
import { AuthService } from "../../../services";
import { LogIn, Register } from "../../../interface/Auth";
import { Toast } from "../../../interface/Toast";

const authService = new AuthService();

export default {
  async logIn(loginForm: LogIn): Promise<void> {
    const response = await authService.logIn(loginForm);
    console.log("response login", response);
    if (response.success) {
      mutations.setAuth(true, response.data);
      await router.push({
        name: "Dashboard",
      });
      return;
    }
    const toast: Toast = {
      body: "Incorrect email or password",
      tittle: "Error",
      type: "error",
      show: true,
    };
    notifications.actions.presentToast(toast);
    // if (response.data.data)
  },

  async register(registerForm: Register): Promise<void> {
    const response = await authService.register(registerForm);
    console.log("response register", response);
    if (!response.success) {
      const toast: Toast = {
        body: "Error",
        tittle: "Error",
        type: "error",
        show: true,
      };
      notifications.actions.presentToast(toast);
      return;
    }

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
  },
};
