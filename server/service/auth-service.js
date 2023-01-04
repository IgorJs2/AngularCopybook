const User = require('../models/User')
const ForgotLink = require('../models/ForgotLink')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

class AuthService {
  async auth(userId) {
    const user = await User.findOne({_id: userId})
    const token = jwt.sign({userId: user._id}, config.get('jwtSecret'), {
      expiresIn: '1h',
    })


    if(user){
      return{
        token,
        userId: user.id,
        role: user.role,
        login: user.login
      }
    }

  }

  async login(login, password) {
    const user = await User.findOne({login})

    console.log(login)

    if (!user) {
      return {message: '[INFO] UserModel not found!', flag: '#D1557A', code: 400}
    }

    const isMatchPassword = await bcrypt.compare(password, user.password)

    if (!isMatchPassword) {
      return {
        message: '[INFO] Incorrect login or password please try again!',
        flag: '#EAC15A',
        code: 400,
      }
    }

    const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {
      expiresIn: '10h',
    })

    return {
      token,
      userId: user.id,
      role: user.role,
      login: user.login
    }
  }

  async register(email, password, login, role) {
    try {
      const loginCheck = await User.findOne({login})
      const emailCheck = await User.findOne({email})
      if (emailCheck || loginCheck) {
        return {
          message: '[INFO] Person duplicates!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const nb_of_classes = 0
      const classes = []
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword,
        login,
        role,
        nb_of_classes,
        classes,
      })

      await user.save()
      return {message: '[INFO] UserModel created!', flag: '#66D9BD', code: 200}
    } catch (e) {
      console.log(e)
      return {message: '[INFO] Server error!', code: 500}
    }
  }

  async forgot(email) {
    try {
      const UserDb = await User.findOne({email})
      if (!UserDb) {
        return {
          message: '[INFO] UserModel with this email not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'copybookWeb@gmail.com',
          pass: 'ASDF1234!',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let link = ''

      for (let i = 0; i < 16; i++) {
        link += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      const LinkDb = new ForgotLink({
        link,
        email,
      })

      let info = await transporter.sendMail({
        from: 'copybookWeb@gmail.com',
        to: email,
        subject: 'Відновлення забутого пароля',
        text: `Шановний відвідувач! Відповідно до Вашого запиту для Вас було згенеровано посилання, перейшовши по якому ви зможете змінити свій пароль.\n\n http://localhost:3000/forgot/${link} \n\nЗ повагою, адміністрація сайту http://copybook.ru/`,
      })

      await LinkDb.save()

      return {
        message: '[INFO] Link to restore you password was sended!',
        flag: '#66D9BD',
        code: 200,
      }
    } catch (e) {
      console.log(e)
      return {message: '[INFO] Server error!', code: 500}
    }
  }

  async change_password(password, link) {
    try {
      const LinkDb = await ForgotLink.findOne({link})
      if (!LinkDb) {
        return {
          message: '[INFO] Expired link expiration!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const UserDb = await User.findOne({email: LinkDb.email})

      const hashedPassword = await bcrypt.hash(password, 12)

      UserDb.password = hashedPassword

      await UserDb.save()

      await ForgotLink.deleteOne({link})

      return {
        message: '[INFO] Password changed!',
        flag: '#66D9BD',
        code: 200,
      }
    } catch (e) {
      console.log(e)
      return {message: '[INFO] Server error!', code: 500}
    }
  }
}

module.exports = new AuthService()
