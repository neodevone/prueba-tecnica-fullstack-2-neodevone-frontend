'use client';

export function useApi() {
  async function get<T = any>(url: string) {
    const res = await fetch(url);
    return (await res.json()) as T;
  }

  async function post<T = any>(url: string, body: any) {
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
    return (await res.json()) as T;
  }

  return { get, post };
}

export default useApi;
