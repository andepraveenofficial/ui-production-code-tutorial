/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title REST API
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetRoot
   * @request GET:/
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  apiDocs = {
    /**
     * No description
     *
     * @name ApiDocsList
     * @request GET:/api-docs
     */
    apiDocsList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-docs`,
        method: "GET",
        ...params,
      }),
  };
  openapiJson = {
    /**
     * No description
     *
     * @name OpenapiJsonList
     * @request GET:/openapi.json
     */
    openapiJsonList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/openapi.json`,
        method: "GET",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @name V1AuthSignupCreate
     * @request POST:/api/v1/auth/signup
     */
    v1AuthSignupCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/auth/signup`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1AuthSigninCreate
     * @request POST:/api/v1/auth/signin
     */
    v1AuthSigninCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/auth/signin`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1AuthSignoutList
     * @request GET:/api/v1/auth/signout
     */
    v1AuthSignoutList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/auth/signout`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1ProductsList
     * @request GET:/api/v1/products/
     */
    v1ProductsList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/products/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1ProductsCreate
     * @request POST:/api/v1/products/
     */
    v1ProductsCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/products/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1ProductsUpdate
     * @request PUT:/api/v1/products/{id}
     */
    v1ProductsUpdate: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/products/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1ProductsDelete
     * @request DELETE:/api/v1/products/{id}
     */
    v1ProductsDelete: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/products/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1ProductsPartialUpdate
     * @request PATCH:/api/v1/products/{id}
     */
    v1ProductsPartialUpdate: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/products/${id}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetApi
     * @request GET:/api/v1/
     */
    getApi: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/`,
        method: "GET",
        ...params,
      }),
  };
  view = {
    /**
     * No description
     *
     * @name AuthSignupCreate
     * @request POST:/view/auth/signup
     */
    authSignupCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/auth/signup`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthSigninCreate
     * @request POST:/view/auth/signin
     */
    authSigninCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/auth/signin`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthSignoutList
     * @request GET:/view/auth/signout
     */
    authSignoutList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/auth/signout`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsList
     * @request GET:/view/products/
     */
    productsList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/products/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsCreate
     * @request POST:/view/products/
     */
    productsCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/products/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsUpdate
     * @request PUT:/view/products/{id}
     */
    productsUpdate: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/products/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsDelete
     * @request DELETE:/view/products/{id}
     */
    productsDelete: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/products/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name ProductsPartialUpdate
     * @request PATCH:/view/products/{id}
     */
    productsPartialUpdate: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/products/${id}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @name ViewList
     * @request GET:/view/
     */
    viewList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/view/`,
        method: "GET",
        ...params,
      }),
  };
}
