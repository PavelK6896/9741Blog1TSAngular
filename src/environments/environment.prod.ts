import {Environment} from "./interface";
import {apiKeySetting} from "../../setting";

export const environment: Environment = {
  production: true,
  apiKey: apiKeySetting,
};
