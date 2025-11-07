import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <Link href="/">
        <a className="font-bold text-lg">MyApp</a>
      </Link>
      <nav>
        <Link href="/dashboard">
          <a className="mr-4">Dashboard</a>
        </Link>
        <Link href="/(auth)/login">
          <a>Login</a>
        </Link>
      </nav>
    </header>
  );
}
