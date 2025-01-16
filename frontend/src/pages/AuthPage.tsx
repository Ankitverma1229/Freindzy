import { Typewriter } from "react-simple-typewriter";
import FriendImage from "../assets/friends-group.svg";
import FriendZyLogo from "../assets/bird.svg";
import AuthForm from "../components/auth/AuthForm";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Section - Scrollable Form */}
      <div className="w-full md:w-[60%] shadow-md shadow-gray-400 text-white  overflow-y-auto h-screen">
        <div className="w-full px-5 md:px-0 md:max-w-[70%] mx-auto flex flex-col space-y-5 md:space-y-10 py-5 md:py-8">
          {/* Logo Section */}
          <div className="flex gap-3 items-center">
            <img
              src={FriendZyLogo}
              alt="Logo"
              className="h-14 w-14 md:h-20 md:w-20"
            />
            <h2 className="text-lg md:text-3xl font-bold tracking-widest">
              <span className="text-[#24AE7C]">
                <Typewriter
                  words={[`Friendʑy`, "Where friendship begins"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">Hi there, ...</p>
            <p className="text-sm text-[#ABB8C4]">
              Get started connecting with new friends
            </p>
          </div>
          {/* Login Form */}
          <AuthForm />
        </div>
      </div>
      {/* Right Section - Fixed Image */}
      <div className="hidden md:block w-[40%] fixed  right-0 p-5 h-screen">
        <div></div>
        <img
          src={FriendImage}
          alt="Friend Illustration"
          className="h-full w-full object-contain "
        />
      </div>
    </div>
  );
};

export default AuthPage;
