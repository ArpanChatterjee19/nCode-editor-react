import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen max-h-screen flex flex-wrap content-between bg-[#0F172A] text-center overflow-hidden'>
      {/* <div className='w-full block'> */}
        <Header/>
        <main className='w-full block'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    // </div>
  ) 
  : (
    <div className='min-h-screen max-h-screen flex items-center justify-center'>
      {/* <progress className="progress w-96 h-3 "></progress> */}
      <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon"/>
    </div>
  )

}

export default App
