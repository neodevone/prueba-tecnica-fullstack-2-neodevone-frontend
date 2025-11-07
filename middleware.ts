import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar si hay token
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  console.log('🛡️ Middleware - Ruta:', pathname, 'Token:', !!token);

  // Si no hay token y no está en login/register, redirigir a login
  if (!token && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y está en login/register, redirigir según rol
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    // Necesitaríamos decodificar el JWT para saber el rol
    // Por ahora redirigimos a una página de redirección
    return NextResponse.redirect(new URL('/redirect', request.url));
  }

  // Proteger rutas de admin
  if (pathname.startsWith('/dashboard') && token) {
    // En una app real, verificaríamos el rol del JWT
    // Por ahora permitimos el acceso
    console.log('🛡️ Acceso a dashboard permitido');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};