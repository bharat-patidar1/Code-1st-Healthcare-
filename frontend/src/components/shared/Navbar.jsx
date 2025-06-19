import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const Navbar = () => {
   const user = false

  
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 h-16">
        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Code 1st <span className="text-[#6A38C2]">Healthcare</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-12">
          <ul className="flex items-center gap-6 text-gray-700 font-medium text-sm">
            <li>
              <Link to="/" className="hover:text-[#6A38C2] transition">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#6A38C2] transition">Employee</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#6A38C2] transition">Attendance</Link>
            </li>
          </ul>

          {/* Auth or Profile */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="outline" className="text-sm px-4 py-2">Sign In</Button>
              </Link>
              <Link to="/">
                <Button className="bg-[#6A38C2] hover:bg-[#572aa1] text-white text-sm px-4 py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage  alt="User avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage  alt="User avatar" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-gray-700 text-sm">
                  <Link to="/" className="flex items-center gap-2 hover:text-[#6A38C2] transition">
                    <User2 size={16} />
                    <span>My Profile</span>
                  </Link>
                  <button  className="flex items-center gap-2 text-left hover:text-[#F83002] transition">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
