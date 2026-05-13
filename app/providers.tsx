'use client';

import { ThemeProvider } from '@deliveryhero/cape-core';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme="foodpanda" mode="light" variant="b2b">{children}</ThemeProvider>;
}
