"use client";
import React, { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AuthProvider from "../Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
interface Props {
    children?: ReactNode;
    // any props that come into the component
}

export default function RouteGuard({ children }: Props) {
    return (
        <>
            <Toaster position="top-right"/>
            <Navbar/>

            <AuthProvider>{children}</AuthProvider>
        </>
    );
}
