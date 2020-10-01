import {Environment} from "./interface";
import {apiKeySetting, base} from "../../setting";

export const environment: Environment = {
  production: true,
  apiKey: apiKeySetting,
  fbDbUrl: base
};
