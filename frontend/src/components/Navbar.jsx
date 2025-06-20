import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-primary">
        Code 1st Healthcare
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Signup</Link>
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{user?.role?.toUpperCase()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </DropdownMenuItem>
              )}
              {user.role === 'employee' && (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/employee/dashboard">Employee Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/attendance">Attendance</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
