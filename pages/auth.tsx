import Input from "@/components/input";
import { SetStateAction, useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface authProps {}

const Auth: React.FC<authProps> = ({}) => {
  //const Router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPasswrord] = useState("");
  const [variant, setVariant] = useState("Login");

  const toggle = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "Login" ? "Register" : "Login"));
  }, []);

  const login = useCallback(async () => {
    try {
      const response = await signIn("Credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log();
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });

      await login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black bg-opacity-70 p-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full mt-16">
            <h2 className="text-white text-4xl mb-8 font-semibold">{variant}</h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" && (
                <Input
                  labelp="Username"
                  type={"text"}
                  id={"username"}
                  value={name}
                  onChange={(ev: any) => {
                    setName(ev.target.value);
                  }}
                />
              )}

              <Input
                labelp="Email"
                type={"email"}
                id={"email"}
                value={email}
                onChange={(ev: any) => {
                  setEmail(ev.target.value);
                }}
              />

              <Input
                labelp="Password"
                type={"Password"}
                id={"password"}
                value={password}
                onChange={(ev: any) => {
                  setPasswrord(ev.target.value);
                }}
              />
            </div>

            <button
              className="
                bg-red-600
                py-3
                text-white
                rounded-md
                w-full
                mt-10
                hover:bg-red-700
                transition                
                "
              onClick={variant === "Login" ? login : register}
            >
              {variant}
            </button>
            <div
              className="
                flex
                flex-row
                items-center
                gap-4
                mt-8
                justify-center
            "
            >
              <div
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
              "
                onClick={() => {
                  signIn("google", { callbackUrl: "/profiles" });
                }}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
              "
                onClick={() => {
                  signIn("github", { callbackUrl: "/profiles" });
                }}
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">{variant === "Login" ? "First time?" : "Already have an account?"}</p>
            <span onClick={toggle} className="text-white ml-1 hover:underline cursor-pointer">
              {variant === "Login" ? "Create an account" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
