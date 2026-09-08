import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Globe2, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { authService } from "@/services/authService";
import { signInWithGoogle } from "@/config/firebase";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(formData.email, formData.password);
      // Login successful! Home page par redirect karo
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/"); // Home page par redirect
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-surface-container-lowest rounded-[24px] shadow-card p-8 md:p-10 border border-outline-variant/20">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1
            className="text-[#3DC6E7] text-[32px] font-bold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Claritii
          </h1>
          <p className="text-on-surface-variant text-sm">
            Welcome back 💜 <br />
            Your next step starts with Claritii.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            icon="email"
            placeholder="student@university.edu"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-label-md text-on-surface font-semibold block">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-label-md text-[#3DC6E7] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                icon="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-outline-variant/30" />
          <span className="text-label-md text-outline-variant">
            or continue with
          </span>
          <div className="flex-1 h-px bg-outline-variant/30" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            type="button"
            onClick={handleGoogleLogin}
          >
            <Globe2 size={20} /> Google
          </Button>
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            type="button"
          >
            <Smartphone size={20} /> Apple
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-on-surface-variant mt-8">
          New to Claritii?{"  "}
          <Link
            to="/register"
            className="text-[#3DC6E7] font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
