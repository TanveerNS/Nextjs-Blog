export function createResponse({ code = 200, status = true, data = null, message = '' }) {
    return new Response(
      JSON.stringify({
        code,
        status,
        data,
        message,
      }),
      { status: code }
    );
  }
  