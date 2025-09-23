import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Simulation API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (email) {
        setMessage("If this email is registered, a reset link has been sent.");
      } else {
        setMessage("Please enter your email address.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email address and we'll send you a reset link.
          </p>
        </div>

        {message && (
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
                         text-gray-900 placeholder-gray-400 focus:outline-none 
                         focus:ring-2 focus:ring-emerald-500/30 
                         focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-lg 
                       text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 
                       hover:from-emerald-600 hover:to-emerald-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-emerald-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        <div className="pt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
