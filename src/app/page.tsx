"use "
import React from "react"
import AuthProvider from "./Provider"
import { redirect } from "next/navigation"


export default function Component() {
  redirect("/dashboard")
  return (
    <AuthProvider>
      <h1> Hi </h1>
    </AuthProvider>
  )
}