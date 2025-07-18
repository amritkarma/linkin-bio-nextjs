"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiLoader4Fill } from "react-icons/ri";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.detail || "Login failed");
      }

      await login();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d132f] via-[#1a237e] to-[#0f172a] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login to Linkify</h1>

        {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 flex items-center justify-center rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (<><RiLoader4Fill className="w-6 h-6 animate-spin duration-200" /> {' Login'}</>) : "Login"}
          </button>
        </form>

        <p className="text-sm text-white/50 mt-6 text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
