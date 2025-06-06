import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Inicio' },
    { path: '/blog', label: 'Blog' },
    { path: '/trabajos', label: 'Trabajos' },
    { path: '/about', label: 'About' }
  ];

  return (
    <>
      {/* Navegación de escritorio - minimalista y discreta */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="relative">
          {/* Trigger area para mostrar navegación */}
          <div className="absolute top-0 left-0 right-0 h-20 group">
            <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-8 py-2 shadow-lg">
                <div className="flex space-x-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-sm tracking-wide transition-all duration-300 hover:text-gray-900 ${
                        location.pathname === item.path
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navegación móvil */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" className="text-xl font-light tracking-wider">
              φ
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          {/* Menú móvil */}
          {isOpen && (
            <div className="border-t border-gray-100 bg-white">
              <div className="px-6 py-4 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm tracking-wide transition-colors ${
                      location.pathname === item.path
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
