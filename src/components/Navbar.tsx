import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-red-500 shadow mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <Link
            to="/"
            className={
              'font-semibold text-lg ' +
              (location.pathname === '/' 
                ? 'text-black font-bold underline' 
                : 'text-gray-800 hover:text-blue-600')
            }
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={
              'font-semibold text-lg ' +
              (location.pathname === '/favorites' 
                ? 'text-black font-bold underline' 
                : 'text-gray-800 hover:text-blue-600')
            }
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
} 