'use strict'
const User = use('App/Models/User')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class AuthController {
  async me({ auth, response }) {
    const user = await auth.getUser()
    return response.json({
      data: user,
    })
  }

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
        return response.json({
          data: token,
          message: 'Login successfull',
        })
      }
    } catch (e) {
      console.log(e)
      return response.status(400).json({
        status: 'error',
        message: 'Email/Senha inválidos.',
      })
    }
  }

  async update({ request, response, auth }) {
    const user = auth.current.user

    const verifyPassword = await Hash.verify(
      request.input('currentPassword'),
      user.password
    )

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message:
          'Não foi possível verificar a senha atual! Por favor, tente novamente',
      })
    }
    user.merge(request.only(['username', 'email']))
    user.password = request.input('newPassword')

    await user.save()

    return response.status(200).json({
      message: 'atualizado com sucesso',
    })
  }

  async validate({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    if (token) {
      return response.json({
        code: 'jwt_auth_valid_token',
        data: {
          token,
        },
      })
    }
  }
}

module.exports = AuthController
