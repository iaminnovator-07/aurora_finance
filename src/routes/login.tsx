import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { ArrowRight, Lock, Mail, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !fullName)) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, fullName);
      }
      
      // Wait for auth context to update, then redirect
      setTimeout(() => {
        router.navigate({ to: "/dashboard" });
      }, 500);
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[color:var(--primary)]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[color:var(--ai)]/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-14 w-14 mx-auto rounded-2xl grid place-items-center mb-6 shadow-xl" style={{ background: "var(--gradient-aurora)" }}>
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome</h1>
          <p className="text-muted-foreground text-sm">
            {isLogin ? "Sign in to access the Aurora TIA platform." : "Create a new account to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-border/50 shadow-2xl relative z-10">
          
          <div className="flex bg-muted p-1 rounded-xl mb-6">
            <button type="button" onClick={() => {setIsLogin(true); setError("");}} className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${isLogin ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Log In</button>
            <button type="button" onClick={() => {setIsLogin(false); setError("");}} className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${!isLogin ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Register</button>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition hover-glow flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>{isLogin ? "Log In" : "Register"} <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
