import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Firebase Password Reset
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      // Firebase error handling
      let errorMessage = "Failed to send reset email. Please try again.";
      
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please check and try again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <AnimatedDots />
      
      <div className="w-full max-w-[420px] bg-surface-container-lowest rounded-[24px] shadow-card p-8 md:p-10 border border-outline-variant/20 relative z-10">
        
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-[#3DC6E7] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#3DC6E7]/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="text-[#3DC6E7]" size={32} />
          </div>
          <h1
            className="text-[#3DC6E7] text-[28px] font-bold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Forgot Password?
          </h1>
          <p className="text-on-surface-variant text-sm">
            No worries! Enter your email and we'll send you reset instructions 💙
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="text-[#3DC6E7]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-on-surface">
              Email Sent!
            </h3>
            <p className="text-on-surface-variant text-sm">
              We've sent password reset instructions to <br />
              <span className="text-[#3DC6E7] font-semibold">{email}</span>
            </p>
            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setEmail("");
                  setSuccess(false);
                }}
              >
                Send Again
              </Button>
              <Link
                to="/login"
                className="block text-sm text-[#3DC6E7] font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          /* Form */
          <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              name="email"
              type="email"
              icon="email"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              variant="primary"
              size="md"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-outline-variant/20 text-center">
          <p className="text-xs text-on-surface-variant">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#3DC6E7] font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};