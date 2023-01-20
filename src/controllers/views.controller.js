const login = (req, res, next) => {
  try {
    res.render('pages/login')
  }
  catch (error) { next(error) }
}

const signup = (req, res, next) => {
  try {
    res.render('pages/signup')
  }
  catch (error) { next(error) }
}

module.exports = {
  login,
  signup
}