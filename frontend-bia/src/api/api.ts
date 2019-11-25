import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import store from "../store";

export const BASE_URL = "http://ec2-3-83-147-131.compute-1.amazonaws.com";

type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const api = {
  fetchAndDispatch: async <T>(
    method: HTTPMethods,
    endpoint: string,
    reducerType: string,
    data: object | null = null,
    external: boolean = false,
    includeToken: boolean = false,
    forcePayload?: object
  ): Promise<AxiosResponse<T>> => {
    const { user } = store.getState();
    const token = user && user.token;

    const request: AxiosRequestConfig = {
      method,
      url: !external
        ? `${BASE_URL}${endpoint[0] === "/" ? "" : "/"}${endpoint}`
        : endpoint,
      responseType: "json",
      headers:
        token && includeToken
          ? { Authorization: token, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" }
    };

    if (data) {
      request[method === "GET" || method === "DELETE" ? "data" : "data"] = data;
    }

    // if (token && includeToken) {
    //   request.headers = { Authorization: token };
    // }

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
