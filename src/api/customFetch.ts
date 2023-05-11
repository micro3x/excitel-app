export function customFetch(url: string, options: RequestInit = {}) {
  const corsHeaders = {
    ...options.headers,
    'Access-Control-Allow-Origin': '*',
  };

  return fetch(url, { ...options, headers: corsHeaders }).then((res) => {
    return res.json();
  });
}
