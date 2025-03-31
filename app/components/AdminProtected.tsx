'use client';

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true';
    if (!isAuth) {
      document.location.href = '/admin/login';
      return null;
    }
  }

  return <>{children}</>;
} 