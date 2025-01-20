import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<null | {
    id?: string
    name?: string
    username?: string
    email?: string
    role?: number
    image?: string
  }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession()
        //console.log(session?.user);
        if (session?.user) {
          setUser({
            id: session?.user?.id,
            name: session?.user?.name,
            username: session?.user?.username,
            email: session?.user?.email,
            role: session?.user?.role,
            image: session?.user?.image,
          })
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { user, loading }
}
