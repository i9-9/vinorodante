'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#D4C1A1]">
      <div className="text-[#A83935] text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-[#D4C1A1] p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-[#A83935]">
        <h1 className="text-3xl font-bold mb-6 text-[#A83935] font-pinot uppercase">Welcome, {user.email}!</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#5B0E2D] mb-3">User Information</h2>
            <pre className="bg-[#F9F5F0] p-4 rounded-lg border border-[#A83935] text-[#5B0E2D] overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full bg-[#A83935] text-white py-3 px-6 rounded-lg hover:bg-[#5B0E2D] focus:outline-none focus:ring-2 focus:ring-[#A83935] focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
} 