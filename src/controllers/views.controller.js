const signup = (req, res, next) => {
  try {
    res.render('pages/signup')
  }
  catch (error) { next(error) }
}

const login = (req, res, next) => {
  try {
    res.render('pages/login')
  }
  catch (error) { next(error) }
}

const main = (req, res, next) => {
  try {
    res.render('pages/main')
  }
  catch (error) { next(error) }
}

module.exports = {
  signup,
  login,
  main
}