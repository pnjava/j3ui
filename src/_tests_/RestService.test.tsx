/* eslint-disable @typescript-eslint/no-explicit-any */
// --- SET GLOBALS BEFORE ANY IMPORTS ---
// Define global window with AwsWafIntegration and a working sessionStorage.
// Now, set getToken to return a Promise resolving to "fake-token".
(globalThis as any).window = {
  AwsWafIntegration: {
    getToken: () => Promise.resolve("fake-token"),
  },
  sessionStorage: {
    _store: {} as Record<string, string>,
    getItem: (key: string) => globalThis.window.sessionStorage._store[key] || null,
    setItem: (key: string, value: string) => {
      globalThis.window.sessionStorage._store[key] = value;
    },
    clear: () => {
      globalThis.window.sessionStorage._store = {};
    },
    removeItem: (key: string) => {
      delete globalThis.window.sessionStorage._store[key];
    },
  },
};

// Provide a dummy import.meta.env for use in RestService.tsx.
(globalThis as any).import = { meta: { env: { VITE_SESSION_KEY: "testKey" } } };
globalThis.sessionStorage = (globalThis as any).window.sessionStorage;

import MockAdapter from "axios-mock-adapter";
import { describe, it, expect, beforeEach, afterEach, afterAll, beforeAll } from "vitest";
import * as restService from "../services/RestService";
import { axiosInstance, setupInterceptor } from "../services/RestService";
import { isAxiosResponse } from "../lib/utils";

describe("RestService", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    setupInterceptor();
  })

  beforeEach(() => {
    // Create a new mock adapter for the axios instance.
    mock = new MockAdapter(axiosInstance);
    window.sessionStorage.clear();
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should set custom header x-aws-waf-token on GET request", async () => {
    const api = "/test-get";
    let capturedWafHeader: string | undefined;
    let capturedUserAgent: string | undefined;
    mock.onGet(api).reply(async (config) => {
      capturedWafHeader = config.headers?.["x-aws-waf-token"];
      capturedUserAgent = config.headers?.["x-dbhds-user-agent"];
      return [200, { data: "test" }];
    });

    const response = await restService.call("GET", api);
    if (!isAxiosResponse(response)) {
      throw new Error("Response is not a valid AxiosResponse");
    }
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: "test" });
    expect(capturedWafHeader).toEqual("fake-token");
    expect(capturedUserAgent).toEqual("dbhds-dap-useragent");
  });

  it("should set custom header x-aws-waf-token on POST request", async () => {
    const api = "/test-post";
    const payload = { foo: "bar" };
    let capturedWafHeader: string | undefined;
    let capturedUserAgent: string | undefined;
    mock.onPost(api).reply(async (config) => {
      capturedWafHeader = config.headers?.["x-aws-waf-token"];
      capturedUserAgent = config.headers?.["x-dbhds-user-agent"];
      return [200, { success: true }];
    });

    const response = await restService.call("POST", api, payload);
    if (!isAxiosResponse(response)) {
      throw new Error("Response is not a valid AxiosResponse");
    }
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
    expect(capturedWafHeader).toEqual("fake-token");
    expect(capturedUserAgent).toEqual("dbhds-dap-useragent");
  });

  it("should set custom header x-aws-waf-token on PUT request", async () => {
    const api = "/test-put";
    const payload = { foo: "bar" };
    let capturedWafHeader: string | undefined;
    let capturedUserAgent: string | undefined;
    mock.onPut(api).reply(async (config) => {
      capturedWafHeader = config.headers?.["x-aws-waf-token"];
      capturedUserAgent = config.headers?.["x-dbhds-user-agent"];
      return [200, { updated: true }];
    });

    const response = await restService.call("PUT", api, payload);
    if (!isAxiosResponse(response)) {
      throw new Error("Response is not a valid AxiosResponse");
    }
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ updated: true });
    expect(capturedWafHeader).toEqual("fake-token");
    expect(capturedUserAgent).toEqual("dbhds-dap-useragent");
  });

  it("should set custom header x-aws-waf-token on DELETE request", async () => {
    const api = "/test-delete";
    const payload = { foo: "bar" };
    let capturedWafHeader: string | undefined;
    let capturedUserAgent: string | undefined;
    mock.onDelete(api).reply(async (config) => {
      capturedWafHeader = config.headers?.["x-aws-waf-token"];
      capturedUserAgent = config.headers?.["x-dbhds-user-agent"];
      return [200, { deleted: true }];
    });

    const response = await restService.call("DELETE", api, payload);
    if (!isAxiosResponse(response)) {
      throw new Error("Response is not a valid AxiosResponse");
    }
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ deleted: true });
    expect(capturedWafHeader).toEqual("fake-token");
    expect(capturedUserAgent).toEqual("dbhds-dap-useragent");
  });

  it("should handle the JSON call and return the mock forms", async () => {
    const response = await restService.call("json");
    if (!isAxiosResponse(response)) {
      throw new Error("Response is not a valid AxiosResponse");
    }
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  it("should return an error object for unknown protocol", async () => {
    const response = await restService.call("unknown");
    expect(response).toEqual({ name: "Error", message: "bad protocol: unknown" });
  });

  it("isLoggedIn returns the correct value", () => {
    expect(restService.isLoggedIn()).toBe(false);
    window.sessionStorage.setItem("dtoken", "123");
    expect(restService.isLoggedIn()).toBe(true);
  });

  it("setTokenHeader does not throw", () => {
    expect(() => restService.setTokenHeader()).not.toThrow();
  });

  it("should return an error object when axios GET call fails", async () => {
    const api = "/failure-get";
    mock.onGet(api).networkError();
    const response = await restService.call("get", api);
    expect(response).toHaveProperty("error");
  });
});
