import { Outlet, NavLink, useNavigate, useLoaderData } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useAuth } from "../hooks/useAuth";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Root() {
  const user = useLoaderData();
  const { auth, state } = useAuth(user);
  const { logout } = auth;

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const currentUser = state.user;

  const onLogout = () => {
    logout();
    setOpenMenu(false);
  };

  return (
    <AuthContext.Provider value={auth}>
      <UserContext.Provider value={currentUser}>
        <div className="w-full">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>

                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>

                    <svg
                      className="hidden h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink to={"/"}>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </NavLink>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {currentUser == null && (
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          }
                        >
                          Sign In
                        </NavLink>
                      )}
                      {currentUser && (
                        <>
                          <NavLink
                            to="/dashboard/welcome"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            }
                            aria-current="page"
                          >
                            Dashboard
                          </NavLink>
                          <NavLink
                            to="/dashboard/users"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            }
                          >
                            Usuarios
                          </NavLink>
                        </>
                      )}

                      {/*<a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Calendar
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button>
                  {currentUser && (
                    <div className="relative ml-3">
                      <div>
                        <button
                          type="button"
                          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                          onClick={() => setOpenMenu(!openMenu)}
                        >
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </button>
                      </div>
                      {openMenu && (
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                          tabIndex="-1"
                        >
                          {/* <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-0"
                          >
                            Your Profile
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-1"
                          >
                            Settings
                          </a> */}
                          <button
                            onClick={onLogout}
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-2"
                          >
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {openMobileMenu && (
              <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {currentUser && (
                    <>
                      <NavLink
                        to="/dashboard/welcome"
                        className={({ isActive }) =>
                          isActive
                            ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        }
                        aria-current="page"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/dashboard/users"
                        className={({ isActive }) =>
                          isActive
                            ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        }
                      >
                        Users
                      </NavLink>
                    </>
                  )}
                  {currentUser == null && (
                    <NavLink
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Log In
                    </NavLink>
                  )}
                </div>
              </div>
            )}
          </nav>

          <main className="max-w-7xl mx-auto px-6 xl:px-0 py-6">
            <Outlet />
          </main>
        </div>
      </UserContext.Provider>
      <Toaster />
    </AuthContext.Provider>
  );
}
