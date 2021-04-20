import { useContext } from 'react'
import AuthContext from './context'
import authStorage from  './storage'

export default useAuth = () => {
  const {user, setUser} =  useContext(AuthContext);

  const logIn = (user,authToken) => {
    setUser(user)
    authStorage.storeToken(authToken)
    authStorage.storeUser(user)

  }

  const logOut = () => {
    setUser(null)
    authStorage.removeToken()
    authStorage.removeUser()

  }


  return { user, logOut, setUser, logIn }
}