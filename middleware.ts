import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  console.log('🛡️ Middleware - Ruta:', pathname, 'Token:', !!token);

  // Rutas públicas - acceso libre siempre (con o sin token)
  const publicPaths = [
    '/login', 
    '/register', 
    '/forgot-password', 
    '/api/auth',
    '/_next',
    '/public'
  ];

  // Si es una ruta pública, PERMITIR SIEMPRE (tu RouteGuard manejará las redirecciones)
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Si no hay token y es una ruta protegida, redirigir a login
  if (!token) {
    console.log('🔐 No hay token, redirigiendo a login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, permitir acceso a todas las rutas protegidas
  // Tu RouteGuard se encargará de las redirecciones basadas en roles
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};