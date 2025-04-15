import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import readline from 'readline'

// Load environment variables
dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function createAdmin() {
  return new Promise((resolve, reject) => {
    rl.question('Enter admin email: ', async (email) => {
      rl.question('Enter admin password: ', async (password) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                role: 'admin'
              }
            }
          })

          if (error) throw error

          console.log('Admin user created successfully!')
          console.log('Please check your email to confirm your account.')
          console.log('User ID:', data.user?.id)

          resolve(data)
        } catch (error) {
          console.error('Error creating admin user:', error)
          reject(error)
        } finally {
          rl.close()
        }
      })
    })
  })
}

createAdmin()
  .catch(console.error)
  .finally(() => process.exit(0)) 