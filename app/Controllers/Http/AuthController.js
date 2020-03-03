'use strict'
const User = use('App/Models/User')

class AuthController {
  async register({ request, auth, response }) {
    const user = await User.create(request.all())

    const token = await auth.generate(user)

    Object.assign(user, token)

    return response.json(user)
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all()

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        const token = await auth.generate(user)

        Object.assign(user, token)
        return response.json(user)
      }
    } catch (e) {
      console.log(e)
      return response.json({ message: 'You are not registered!' })
    }
  }
}

module.exports = AuthController
