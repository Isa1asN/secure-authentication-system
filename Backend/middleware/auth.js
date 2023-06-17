import jwt  from "jsonwebtoken";

export const verifyUserToken = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string
  
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);   
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; 
        // console.log(verifiedUser);
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}

export const IsUser =  (req, res, next) => {
    if (req.user.role == 'learner') {
       return next();
    }
    return res.status(401).send("Unauthorized!");   
}
export const IsAdmin =  (req, res, next) => {
    if (req.user.role == "admin") {
       return next();
    }

    return res.status(401).send("Unauthorized!");
}
export const IsModerator =  (req, res, next) => {
    if (req.user.role == "moderator") {
       return next();
    }

    return res.status(401).send("Unauthorized!");
}
export const IsNotUser =  (req, res, next) => {
    if (req.user.role !== 'learner') {
       return next();
    }
    return res.status(401).send("Unauthorized!");   
}
