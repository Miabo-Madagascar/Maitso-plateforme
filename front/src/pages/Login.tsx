import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // États
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Fonction login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 💡 Ici tu mets ta logique de vérification (appel API etc.)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-white">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 bg-white/80 backdrop-blur-sm min-h-screen lg:min-h-0">
        <div className="max-w-md w-full space-y-6 lg:space-y-8 py-8 lg:py-0 bg-white rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none p-6 lg:p-0 border border-gray-100 lg:border-none">

          {/* Header avec logo */}
          <div className="-mt-10 text-center">
            <img
              src="/logo.png"
              alt="App logo"
              className="w-40 h-40 mx-auto  object-contain"
            />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Welcome back!
            </h2>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="mt-6 lg:mt-8 space-y-5 lg:space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-sm sm:text-base bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a
                    onClick={() => navigate("/forgot-password")}
                    className="cursor-pointer text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-sm sm:text-base bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center pt-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500/20 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-600 font-medium">
                <span className="hidden sm:inline">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 sm:py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Plant Image */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover scale-105 -translate-x-6 transition-transform duration-700"
            src="/public/login-img.png"
            alt="Beautiful monstera plant leaves"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20"></div>
        </div>
      </div>
    </div>
  );
}
