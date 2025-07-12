"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={4000}
      expand={true}
    />
  )
} 