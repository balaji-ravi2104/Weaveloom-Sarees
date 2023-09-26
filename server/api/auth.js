import User from '../model/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    let existingUser;
    // Checking the Existing User
    try {
        existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).send("User Already Exists!! Login Instead");
        }
        //  Creating new User
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hash,
        });
        // Saving new User
        await newUser.save();
        return res.status(200).send(newUser);
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // if user not exists 
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(404).send("User Not Found! Please Register...");
        }
        // Checking password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).send("Wrong email or password!");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
            expiresIn: "1hr",
        });

        if (req.cookies[`${user._id}`]) {
            req.cookies[`${user._id}`] = "";
        }

        res.cookie(String(user._id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        return res
            .status(200)
            .json({ message: "Logged In SuccessFully!!!", user: user, token: token });
    } catch (error) {
        console.log(error);
    }
}


export const logout = async (req, res) => {
    try {
        const cookies = req.headers.cookie;
        const prevToken = cookies.split("=")[1];
        if (!prevToken) {
            return res.status(400).json({ message: "Couldn't find token" });
        }
        jwt.verify(String(prevToken), process.env.JWT_SEC, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "Authentication failed" });
            }
            res.clearCookie(`${user.id}`);
            req.cookies[`${user.id}`] = "";
            return res.status(200).json({ message: "Successfully Logged Out" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Cookies Not Found" });
    }
}




