import AuthService from "./Auth";
import TransactionService from "./Transaction";
import axios, { AxiosRequestConfig } from "axios";

export const SANDBOX_URL = "https://devapi.mvola.mg";
export const PRODUCTION_URL = "https://api.mvola.mg";

class Client {
  transaction: TransactionService;
  auth: AuthService;

  constructor(baseURL: string = SANDBOX_URL) {
    const options: AxiosRequestConfig = { baseURL };
    const client = axios.create(options);
    this.auth = new AuthService(axios.create(options));
    this.transaction = new TransactionService(client);
  }
}

export default Client;
