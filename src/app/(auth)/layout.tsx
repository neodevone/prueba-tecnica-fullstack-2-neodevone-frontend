import RouteGuard from '@/components/auth/RouteGuard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requireAuth={false}>
      {children}
    </RouteGuard>
  );
}