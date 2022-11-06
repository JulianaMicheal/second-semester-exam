module.exports = (error, req, res, next) => {
    if (error.message === 'data and hash arguments needed') {
      return res.status(403).json({
        error: 'get password',
      })
    }
  
    if (error.source === 'jwt middleware error') {
      return res.status(403).json({
        status: false,
        error: 'invalid token',
      })
    }
  
    res.status(400).json({
      error: error.message,
    })
  
    next()
  }