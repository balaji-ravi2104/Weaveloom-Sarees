import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    // console.log(cookies);
    const token = cookies.split("=")[1];
    // console.log(token);
  
    if (!token) {
      return res.status(404).json({ message: "No token found" });
    }
  
    jwt.verify(String(token), process.env.JWT_SEC, (err, user) => {
    //   console.log(err);
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }
      req.id = user.id;
      next();
      // console.log(user.id);
    });
  };


export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, next,() => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
};

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, next,() => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

   