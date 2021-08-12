import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../api/base'
import { showToast } from '../components/helpers'

const Home = () => {

  useEffect(() => {
    sessionStorage.clear()  
  }, [])

  const router = useRouter()

  const [user, setUser] = useState({ identifier: '', password: '' })

  const handleLogin = async e => {
    e.preventDefault()
    try {
      if (user.identifier === '' || user.password === '') {
        throw { message: 'Please enter details' }
      }

      const res = await login(user)
      res.status === 200 && (
        router.push('/dashboard'),
        showToast('success', `Welcome ${user.identifier}`)
      )

    } catch (err) {
      showToast('error', err.message)
    }
  }

  return (
    <>
    <div className="flex items-center min-h-screen p-6 bg-gray-100">
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800"
      >
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
              <form onSubmit={handleLogin}>
                <label className="block text-sm">
                  <span className="text-gray-400 font-semibold">Parent Email or Staff ID</span>
                  <input
                    value={user.identifier}
                    onChange={e => setUser({ ...user, identifier: e.target.value })}
                    className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-400 font-semibold">Password</span>
                  <input
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                    placeholder="Password" type="password"
                  />
                </label>

                <button type='submit'
                  className="block w-full px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
                >
                  Log in
                </button>
              </form>

              <p className="mt-4 text-center">
                <a
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  href="./forgot-password.html"
                >
                  Forgot your password?
                </a>
              </p>
              <p className="mt-1 text-center">
                <a
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  href="./create-account.html"
                >
                  Are you a teacher? Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home