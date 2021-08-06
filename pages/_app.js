import { Fragment, useState } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import 'tailwindcss/tailwind.css'

import ModalContextProvider from '../contexts/modalContext'
import { MyLoader } from '../components/loader'


function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(false)

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('auth')
    if (token) { config.headers.Authorization = `Bearer ${token}` }

    setIsLoading(true)
    return config;
  }, function (error) {
    // Do something with request error
    setIsLoading(false)
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    setIsLoading(false)
    return response;
  }, function (error) {
    setIsLoading(false)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return <Fragment>
    <div>
      <Toaster
        position="top-right"
      /></div>
    {isLoading && <MyLoader />}
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  </Fragment>
}

export default MyApp
