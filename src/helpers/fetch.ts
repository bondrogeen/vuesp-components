const useFetchJson = async <T = unknown>(useFetch: Promise<Response>): Promise<T | null> => {
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
  const { body, status }: Response = await useFetch.get(path);
  if (!body) return [];
  const res: ReadableStreamReadResult<Uint8Array<ArrayBuffer>> = await body.getReader().read();
  const data = res.value ? Array.from(res.value) : [];
  return status === 200 ? data : [];
};

export const uploadBinary = (path: string, buffer: BlobPart) => {
  const body = new FormData();
  body.append(`file[0]`, new Blob([buffer], { type: 'octet/stream' }), path);
  return useFetch.$post('/fs', { body });
};

export const uploadJson = (path: string, data: object) => {
  const body = new FormData();
  body.append('file[0]', new Blob([JSON.stringify(data)], { type: 'application/json' }), path);
  return useFetch.$post('/fs', { body });
};
