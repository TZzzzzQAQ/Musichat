import User from "../Modules/user.model.js";

export const saveData = async (req, res, next) => {
    const {display_name,country,email,id,uri} = req.body.profile;
    const newUser = new User({
        id,
        uri,
        display_name,
        country,
        email,
    })
    try {
        await newUser.save();
        res.status(201).json({message: "User saved successfully."});
    } catch (e) {
        next(e);
    } finally {

    }
}
