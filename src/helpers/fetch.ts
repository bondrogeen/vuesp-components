const useFetchJson = async <T = any>(useFetch: Promise<Response>): Promise<T | null> => {
  try {
    const res = await useFetch;
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useFetch = {
  get: (url: string, init?: RequestInit) => fetch(url, init),
  post: (url: string, init?: RequestInit) => fetch(url, { method: 'POST', ...init }),
  put: (url: string, init?: RequestInit) => fetch(url, { method: 'PUT', ...init }),
  delete: (url: string, init?: RequestInit) => fetch(url, { method: 'DELETE', ...init }),
  $get: (url: string, init?: RequestInit) => useFetchJson(fetch(url, init)),
  $post: (url: string, init?: RequestInit) => useFetchJson(fetch(url, { method: 'POST', ...init })),
  $put: (url: string, init?: RequestInit) => useFetchJson(fetch(url, { method: 'PUT', ...init })),
  $delete: (url: string, init?: RequestInit) => useFetchJson(fetch(url, { method: 'DELETE', ...init })),
};

export const downloadBinary = async (path: string) => {
  const { body, status }: any = await useFetch.get(path);
  const res: any = await body.getReader().read();
  const data = Array.from(res.value);
  return status === 200 ? data : [];
};

export const uploadBinary = (path: string, buffer: any) => {
  const blob = new Blob([buffer], { type: 'octet/stream' });
  var body = new FormData();
  body.append(`file[0]`, blob, path);
  return useFetch.post('/fs', { body });
};
