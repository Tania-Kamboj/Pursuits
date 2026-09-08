const API_URL = 'http://localhost:5000/api/v1'

export const authService = {
  // 1. Register User
  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Registration failed')
    return data
  },

  // 2. Login User
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    const data = await response.json()

    console.log('Login response:', data)
  console.log('User data:', data.user)

    if (!response.ok) throw new Error(data.message || 'Login failed')
    
    // ✅ Token aur User data ko localStorage me save karo (Session maintain karne ke liye)
    if (data.token) {
      localStorage.setItem('token', data.token)

      const userData = {
        id: data._id,
        name: data.name,
        email: data.email
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('User data saved:', userData)
    
    }
    return data
  },

  // 3. Logout User
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // 4. Check if user is logged in
  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }
}