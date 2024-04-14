"use client";
import { signIn } from "next-auth/react";

export default async function login(formData: FormData) {
    await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl: "/dashboard",
    });
}