"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClassName =
    "background-dark400_light900 body-medium rounded-2 text-dark200_light800 min-h-12 flex-1 px-4 py-3.5 cursor-pointer";
    
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    toast("Ocurrió un error al iniciar sesión", {
      description:
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error durante el inicio de sesión",
    });
  }
};

//   try {
//     const res = await signIn(provider, {
//       redirect: false,
//       callbackUrl: ROUTES.HOME,
//     });

//     if (res?.ok && res.url) {
//       window.location.href = res.url;
//     } else {
//       toast("No se pudo iniciar sesión");
//     }
//   } catch (error) {
//     toast("Ocurrió un error al iniciar sesión", {
//       description:
//         error instanceof Error
//           ? error.message
//           : "Ha ocurrido un error durante el inicio de sesión",
//     });
//   }
// };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClassName}
        onClick={() => handleSignIn("github")}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Ingresa con Github</span>
      </Button>
      <Button
        className={buttonClassName}
        onClick={() => handleSignIn("google")}
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Ingresa con Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
