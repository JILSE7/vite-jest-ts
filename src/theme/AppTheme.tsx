import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { FC, ReactNode } from 'react';

import { purpleTheme } from './';


export const AppTheme: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}