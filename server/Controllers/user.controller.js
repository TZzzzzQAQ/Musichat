import User from "../Modules/user.model.js";

export const saveData = async (req, res, next) => {
    const {display_name, country, email, id, uri} = req.body.profile;

    try {
        const user = await User.findOneAndUpdate(
            {id},
            {id, uri, display_name, country, email},
            {
                new: true,
                upsert: true
            }
        );
        res.status(201).json({message: "User saved successfully.", user});
    } catch (e) {
        next(e);
    }
}
