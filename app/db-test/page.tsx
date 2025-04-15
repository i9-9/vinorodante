'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function DBTestPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        setUser(user)

        // Get user's profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single()
        
        if (profileError) throw profileError
        setProfile(profileData)

        // Get products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
        
        if (productsError) throw productsError
        setProducts(productsData || [])

      } catch (err: any) {
        setError(err.message)
      }
    }
    loadData()
  }, [])

  const handleCreateOrder = async () => {
    try {
      // Create an order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: 100.00,
          shipping_address: 'Test Address',
          phone_number: '1234567890',
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Add items to the order
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert([
          {
            order_id: order.id,
            product_id: products[0].id,
            quantity: 1,
            price: products[0].price
          }
        ])

      if (itemsError) throw itemsError

      alert('Order created successfully!')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#D4C1A1] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#A83935]">
          <h1 className="text-3xl font-bold mb-6 text-[#A83935] font-pinot uppercase">User Information</h1>
          {user && (
            <div className="space-y-4">
              <pre className="bg-[#F9F5F0] p-4 rounded-lg border border-[#A83935] text-[#5B0E2D] overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#A83935]">
          <h2 className="text-2xl font-bold mb-6 text-[#A83935] font-pinot uppercase">Profile Information</h2>
          {profile && (
            <div className="space-y-4">
              <pre className="bg-[#F9F5F0] p-4 rounded-lg border border-[#A83935] text-[#5B0E2D] overflow-auto">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#A83935]">
          <h2 className="text-2xl font-bold mb-6 text-[#A83935] font-pinot uppercase">Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-[#F9F5F0] p-4 rounded-lg border border-[#A83935]">
                  <h3 className="text-xl font-semibold text-[#5B0E2D]">{product.name}</h3>
                  <p className="text-[#A83935]">${product.price}</p>
                  <p className="text-[#5B0E2D]">{product.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#A83935]">No products found</p>
          )}
        </div>

        {/* Test Order Creation */}
        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#A83935]">
            <h2 className="text-2xl font-bold mb-6 text-[#A83935] font-pinot uppercase">Test Order Creation</h2>
            <button
              onClick={handleCreateOrder}
              className="w-full bg-[#A83935] text-white py-3 px-6 rounded-lg hover:bg-[#5B0E2D] focus:outline-none focus:ring-2 focus:ring-[#A83935] focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Create Test Order
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  )
} 