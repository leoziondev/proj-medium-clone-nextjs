import Env from "./Env";

export const SERVER_ENDPOINT: string = Env.SERVER_ENDPOINT
export const API_URL: string = SERVER_ENDPOINT + "/api"
export const LOGIN_URL: string = API_URL + "/auth/login"
export const REGISTER_URL: string = API_URL + "/auth/register"