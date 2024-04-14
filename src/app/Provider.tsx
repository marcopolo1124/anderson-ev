"use client"
import React from "react"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function AuthProvider({children}: Props) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}