import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/lib/api'

interface User {
  id: number
  email: string
  name: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      setLoading(false)
      return
    }
    api.me().then(({ ok, data }) => {
      if (ok) setUser(data.user)
      else api.removeToken()
      setLoading(false)
    })
  }, [])

  const login = async (email: string, password: string) => {
    const { ok, data } = await api.login(email, password)
    if (!ok) return { error: data.error }
    api.setToken(data.token)
    setUser(data.user)
    return {}
  }

  const register = async (email: string, password: string, name: string) => {
    const { ok, data } = await api.register(email, password, name)
    if (!ok) return { error: data.error }
    api.setToken(data.token)
    setUser(data.user)
    return {}
  }

  const logout = () => {
    api.removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
