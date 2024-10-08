"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { SignInFlow } from "../types";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <>
      <Card className="h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Login to continue</CardTitle>
          <CardDescription>
            User your email or another service to continue
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
            <Input
              disabled={pending}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Email"
              type="email"
              required
            />
            <Input
              disabled={pending}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={pending}
            >
              Continue
            </Button>
          </form>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("google")}
              variant="outline"
              size="lg"
              className="relative w-full"
            >
              <FcGoogle className="absolute left-2.5 top-3 size-5" />
              Continue with Google
            </Button>
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("github")}
              variant="outline"
              size="lg"
              className="relative w-full"
            >
              <FaGithub className="absolute left-2.5 top-3 size-5" />
              Continue with Github
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account? &nbsp;
            <span
              onClick={() => setState("signUp")}
              className="cursor-pointer text-sky-700 hover:underline"
            >
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
