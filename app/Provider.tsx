"use client"
import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
function Provider({ children } : { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  )
}

export default Provider