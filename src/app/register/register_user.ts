"use server"

import { postUser } from "@/lib/db";

export default async function registerUser(formData: FormData) {
    "use server";
    return await postUser(
      formData.get("email") as string,
      formData.get("password") as string,
      formData.get("firstName") as string,
      formData.get("lastName") as string
    );
}
