import qs from "qs";
import { Buffer } from "buffer";
import { Service } from "./Service";
import { AuthResponse } from "./Types";

class AuthService extends Service {
  async generateToken(
    consumerKey: string,
    consumerSecret: string,
    deviceUUID?: string,
  ): Promise<AuthResponse> {
    let scope = 'EXT_INT_MVOLA_SCOPE';
    if (deviceUUID) {
      scope += ` device_${deviceUUID}`;
    }
    const params = qs.stringify({
      grant_type: "client_credentials",
      scope
    });

    const { data } = await this.client.post<AuthResponse>("/token", params, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${consumerKey}:${consumerSecret}`
        ).toString("base64")}`,
      },
    });

    return data;
  }
}

export default AuthService;
