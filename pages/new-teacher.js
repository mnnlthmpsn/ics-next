import { useState } from "react";
import Link from "next/link";
import { login, signup } from "../api/base";
import { showToast } from "../components/helpers";
import { useRouter } from "next/router";

const NewTeacher = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    user_role: "teacher",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const user_login = async () => {
    const payload = {
      identifier: user.email,
      password: user.password,
    };

    const res = await login(payload);
    res.status === 200
      ? router.push("/dashboard")
      : showToast("error", "Error logging you in. Try again");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(user);
      res.status === 200
        ? (showToast("success", "Teacher created successfully"), user_login())
        : showToast("error", "Error creating Teacher");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-100">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="../assets/img/login-office.jpeg"
                alt="Office"
              />
            </div>
            <div className="flex lg:order-first items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <label className="block text-sm">
                    <span className="text-gray-400 font-semibold">Email</span>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          email: e.target.value,
                          username: e.target.value,
                        })
                      }
                      className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                      placeholder="teacher@teacher.com"
                      required
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="text-gray-400 font-semibold">
                      Password
                    </span>
                    <input
                      type="password"
                      value={user.password}
                      minLength="8"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                      placeholder="***************"
                      required
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="text-gray-400 font-semibold">
                      Firstname
                    </span>
                    <input
                      value={user.firstname}
                      required
                      onChange={(e) =>
                        setUser({ ...user, firstname: e.target.value })
                      }
                      className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                      placeholder="Jane Doe"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="text-gray-400 font-semibold">
                      Lastname
                    </span>
                    <input
                      required
                      value={user.lastname}
                      onChange={(e) =>
                        setUser({ ...user, lastname: e.target.value })
                      }
                      className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                      placeholder="Jane Doe"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="text-gray-400 font-semibold">Phone</span>
                    <input
                      required
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                      placeholder="Jane Doe"
                    />
                  </label>

                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
                  >
                    Create Account
                  </button>
                </form>
                <p className="mt-1 text-center">
                  <Link href="/">
                    <a className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTeacher;
