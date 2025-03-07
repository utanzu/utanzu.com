import { getSession } from 'next-auth/react'
import { useEffect, useState, useRef } from 'react'

export function useAuth() {
  const [user, setUser] = useState<null | {
    id?: string
    name?: string
    username?: string
    email?: string
    role?: string
    image?: string
  }>(null)
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession()
        if (session?.user) {
          setUser({
            id: session?.user?.id,
            name: session?.user?.name ?? '',
            username: session?.user?.username ?? '',
            email: session?.user?.email ?? '',
            role: session?.user?.role ?? 'user',
            image: session?.user?.image ?? '',
          })
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!hasFetched.current) {
      fetchData()
      hasFetched.current = true
    }
  }, [])

  return { user, loading }
}
