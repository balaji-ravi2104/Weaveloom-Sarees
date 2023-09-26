import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: "Cookies Not Found" });
  }
};


export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  // console.log(cookies);
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SEC, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication faild" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
      expiresIn: "1hr",
    });

    // console.log("Regenerated Token\n",token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};