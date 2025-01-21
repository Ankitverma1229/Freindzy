import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendLoginDetails,
  sendRegistrationDetails,
} from "../../services/authServices";
import { UserType } from "../../types/Friends";
import PageLoadingAnimation from "../animation/PageLoadingAnimation";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<UserType>({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for showing animation during form submission

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: UserType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true); // Set loading state when form submission starts

      if (isRegister) {
        // For registration, call sendRegistrationDetails and navigate on success
        await sendRegistrationDetails(formData, navigate);
      } else {
        // For login, call sendLoginDetails and navigate on success
        await sendLoginDetails(formData, navigate);
      }
    } catch (error) {
      console.log("Error during submission:", error);
    } finally {
      setLoading(false); // Stop loading when request finishes
    }
  };

  const handleFormChange: () => void = () => {
    setIsRegister(!isRegister);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full rounded-lg">
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* UserName Field */}
          <div className={`${isRegister ? "block" : "hidden"} w-full`}>
            <label htmlFor="userName" className="text-sm text-gray-400">
              UserName
            </label>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 mt-1 rounded-md">
              <User className="text-gray-400" strokeWidth={1} />
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter your name"
                value={formData.userName}
                onChange={handleInputChange}
                className="bg-transparent text-white w-full border-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm text-gray-400">
              Email address
            </label>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 mt-1 rounded-md">
              <MailIcon className="text-gray-400" strokeWidth={1} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent text-white w-full border-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 mt-1 rounded-md">
              <LockIcon className="text-gray-400" strokeWidth={1} />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-transparent text-white w-full border-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className={`${isRegister ? "block" : "hidden"} w-full`}>
            <label htmlFor="confirmPassword" className="text-sm text-gray-400">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 mt-1 rounded-md">
              <LockIcon className="text-gray-400" strokeWidth={1} />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-transparent text-white w-full border-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="text-gray-400 focus:outline-none"
              >
                {confirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 text-xl flex justify-center items-center bg-[#24AE7C] py-3 rounded-md text-white font-semibold hover:bg-[#1E9B6B] transition"
          >
            {loading ? (
              <div>
                <PageLoadingAnimation />
              </div>
            ) : (
              `${isRegister ? "Register" : "Login"}`
            )}
          </button>
        </form>
        <button
          onClick={handleFormChange}
          className="text-sm text-center text-[#24AE7C] mt-4"
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
};

export default AuthForm;
