import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import rtlPlugin from '@mui/stylis-plugin-rtl';

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Rtl({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
}
