import { Login, Register } from "../../interface/Auth";
import { axiosSingleton } from "../index";
import { SurePromise } from "../../interface/SurePromise";
import { Profile } from "../../interface/Profile";
import { AxiosService } from "../axios/axiosService";

export default class Auth {
  private axiosService: AxiosService<Profile & Register, Login> =
    axiosSingleton<Profile & Register, Login>();

  //private axiosService = new AxiosService<Profile & Register, Login>()

  public async login(userForm: Login): Promise<SurePromise<Profile>> {
    //axiosService<Profile, Login>()
    //return await axiosService<Profile, Login>.instance.postData()(userForm, '/accounts/authenticate')
    return await this.axiosService.postData(userForm, "/accounts/authenticate");
  }

  public async register(registerForm: Register): Promise<SurePromise<Profile>> {
    //const axiosService = axiosService<Login, Register>()
    return await this.axiosService.postData(registerForm, "/accounts/register");
  }
}
