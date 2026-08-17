export const config = {
  matcher: '/__clerk/:path*',
};

const CLERK_TARGET = 'https://frontend-api.clerk.services';
const PROXY_URL = 'https://whofy.vercel.app/__clerk';

export default async function middleware(request) {
  const url = new URL(request.url);
  const forwardedPath = url.pathname.replace(/^\/__clerk/, '') + url.search;
  const target = `${CLERK_TARGET}${forwardedPath}`;

  const headers = new Headers(request.headers);
  headers.set('Clerk-Proxy-Url', PROXY_URL);
  headers.set('Clerk-Secret-Key', process.env.CLERK_SECRET_KEY ?? '');
  headers.delete('host');

  return fetch(target, {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  });
}
