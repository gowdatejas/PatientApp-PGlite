export async function loadPGlite() {
  const originalFetch = window.fetch;

  try{
   window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);
      
      if (typeof input === 'string' && input.includes('pglite.wasm')) {
        const wasmBuffer = await response.arrayBuffer();
        return new Response(wasmBuffer, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }
      return response;
    };

    const { PGlite } = await import('@electric-sql/pglite');
    return PGlite;
  } finally {
    
    window.fetch = originalFetch;
  }
}
