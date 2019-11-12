import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import store from "../store";

export const BASE_URL = "https://api.spotify.com/v1";

type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const api = {
  fetchAndDispatch: async <T>(
    method: HTTPMethods,
    endpoint: string,
    reducerType: string,
    data: object | null = null,
    external: boolean = false,
    includeToken: boolean = true,
    forcePayload?: object
  ): Promise<AxiosResponse<T>> => {
    const { user } = store.getState();
    const token = "Bearer " + (user && user.token) || null;

    const request: AxiosRequestConfig = {
      method,
      url: !external
        ? `${BASE_URL}${endpoint[0] === "/" ? "" : "/"}${endpoint}`
        : endpoint,
      responseType: "json"
    };

    if (data) {
      request[method === "GET" || method === "DELETE" ? "data" : "data"] = data;
    }

    if (token && includeToken) {
      request.headers = { Authorization: token };
    }

    store.dispatch({
      request,
      type: `api/${method}_${reducerType.toUpperCase()}_REQUESTED`
    });

    try {
      const response = await axios(request);
      store.dispatch({
        type: `api/${method}_${reducerType.toUpperCase()}_SUCCESSFUL`,
        payload: response.data ? response.data : forcePayload
      });
      return response;
    } catch (err) {
      store.dispatch({
        type: `api/${method}_${reducerType.toUpperCase()}_FAILED`,
        payload: err
      });

      //   if (err.response.status === 401) {
      //     store.dispatch({ type: "api/TOKEN_EXPIRED" });
      //     await api.refreshToken();
      //     return await Api.fetchAndDispatch<T>(method, endpoint, data);
      //   }

      //   if (err.response.status >= 400) {
      //     alert(`${err.response.data.message}`);
      //   }
      throw err;
    }
  }
};

export default api;
