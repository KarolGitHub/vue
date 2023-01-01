import { ref } from "vue";
import { auth } from "../../../store";
import { Login } from "../../../interface/Auth";
import { Form as VForm, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Field,
    VForm,
    ErrorMessage,
  },

  setup() {
    const github = ref<string>("@/assets/img/github.svg");
    const google = ref<string>("@/assets/img/google.svg");

    const schema = {
      email: "required|email",
      password: "required|min:6",
    };

    const login = async (data: Login): Promise<void> => {
      console.debug(data);
      await auth.actions.login(data);
    };

    return {
      github,
      google,
      login,
      schema,
    };
  },
};
