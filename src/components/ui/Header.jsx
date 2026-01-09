import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false;

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Tours', path: '/tour-catalog', icon: 'Map' },
    { label: 'My Account', path: '/user-dashboard', icon: 'User', authRequired: true }
  ];

  const isActivePath = (path) => {
    if (path === '/homepage') return location?.pathname === path;
    if (path === '/tour-catalog') return location?.pathname === path || location?.pathname === '/tour-package-details';
    if (path === '/user-dashboard') return location?.pathname === path || location?.pathname === '/booking-flow';
    return false;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card shadow-warm transition-smooth">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-12">
            <Link to="/homepage" className="flex items-center gap-3 transition-smooth hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center transition-smooth">
                <Icon name="GraduationCap" size={28} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">EduTours</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => {
                if (item?.authRequired && !isAuthenticated) return null;
                const isActive = isActivePath(item?.path);
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-smooth hover-lift ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                );
              })}
              <Link
                to="/admin-panel"
                className="flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-smooth hover-lift text-foreground hover:bg-muted"
              >
                <Icon name="Settings" size={20} />
                <span>Admin</span>
              </Link>
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted transition-smooth focus-ring"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <span className="font-medium text-foreground">My Profile</span>
                  <Icon name="ChevronDown" size={16} className={`transition-smooth ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-50"
                      onClick={closeUserMenu}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-md shadow-warm-lg z-50 overflow-hidden">
                      <Link
                        to="/user-dashboard"
                        onClick={closeUserMenu}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth"
                      >
                        <Icon name="LayoutDashboard" size={18} />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        to="/booking-flow"
                        onClick={closeUserMenu}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth"
                      >
                        <Icon name="Calendar" size={18} />
                        <span className="font-medium">My Bookings</span>
                      </Link>
                      <div className="border-t border-border my-2" />
                      <button
                        onClick={() => {
                          closeUserMenu();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left"
                      >
                        <Icon name="LogOut" size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" iconName="LogIn" iconPosition="left">
                  Login
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth focus-ring"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background z-50 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed inset-0 z-50 lg:hidden bg-card overflow-y-auto">
            <div className="flex items-center justify-between h-[72px] px-6 border-b border-border">
              <Link to="/homepage" onClick={closeMobileMenu} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="GraduationCap" size={28} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">EduTours</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md hover:bg-muted transition-smooth"
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <nav className="p-6 space-y-2">
              {navigationItems?.map((item) => {
                if (item?.authRequired && !isAuthenticated) return null;
                const isActive = isActivePath(item?.path);
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-6 py-4 rounded-md font-medium transition-smooth ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={22} />
                    <span className="text-lg">{item?.label}</span>
                  </Link>
                );
              })}

              <div className="pt-6 border-t border-border mt-6">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/user-dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-6 py-4 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Icon name="LayoutDashboard" size={22} />
                      <span className="text-lg font-medium">Dashboard</span>
                    </Link>
                    <Link
                      to="/booking-flow"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-6 py-4 rounded-md hover:bg-muted transition-smooth"
                    >
                      <Icon name="Calendar" size={22} />
                      <span className="text-lg font-medium">My Bookings</span>
                    </Link>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-3 px-6 py-4 rounded-md hover:bg-muted transition-smooth text-left"
                    >
                      <Icon name="LogOut" size={22} />
                      <span className="text-lg font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="default" fullWidth iconName="LogIn" iconPosition="left">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;