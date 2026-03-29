"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if already logged in
  if (user) {
    router.push("/");
    return null;
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("確認メールを送信しました。メールを確認してください。");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
  }

  return (
    <div className="px-6 pt-16 pb-32 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-headline font-bold tracking-tight text-3xl text-primary-container italic">
          Wine Traveler's Journal
        </h1>
        <p className="text-[10px] font-label tracking-widest text-primary opacity-60 uppercase mt-1">
          ワインで世界を旅しよう
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-surface-container-low rounded-2xl p-8 shadow-sm border border-secondary/10">
        <h2 className="text-lg font-headline font-bold text-primary text-center mb-6">
          {isSignUp ? "アカウント作成" : "ログイン"}
        </h2>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58z"
              fill="#EA4335"
            />
          </svg>
          Googleでログイン
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-secondary/10" />
          <span className="text-[10px] font-label text-on-surface-variant tracking-widest">
            または
          </span>
          <div className="flex-1 h-px bg-secondary/10" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="text-xs font-label text-on-surface-variant block mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-secondary/20 bg-transparent py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-label text-on-surface-variant block mb-1">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border-b border-secondary/20 bg-transparent py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="6文字以上"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 rounded-lg p-2">
              {error}
            </p>
          )}
          {message && (
            <p className="text-xs text-green-700 bg-green-50 rounded-lg p-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-label text-sm font-bold tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {loading
              ? "処理中..."
              : isSignUp
              ? "アカウント作成"
              : "ログイン"}
          </button>
        </form>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          {isSignUp ? "すでにアカウントをお持ちの方は" : "アカウントをお持ちでない方は"}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setMessage("");
            }}
            className="text-primary font-bold ml-1 hover:underline"
          >
            {isSignUp ? "ログイン" : "新規登録"}
          </button>
        </p>
      </div>
    </div>
  );
}
