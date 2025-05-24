import { ActionResponse} from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

    
  try {
    const response = await fetch(url, config);

    clearTimeout(id);
    if (!response.ok) {
        throw new RequestError(response.status, `HttpError, ${response.statusText}`);
    }

    return await response.json()
  } catch (err) {
    const error = isError(err) ? err : new Error("Error desconocido");

    if (error.name === "AbortError") {
    logger.warn(`La solicitud a ${url} superó el tiempo de espera de ${timeout}ms`);
    } else {
        logger.error(`Error en la solicitud a ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
