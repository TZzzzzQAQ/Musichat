import SongComment from "../Modules/comment.model.js";
export const saveComment = async (req, res, next) => {
    const { display_name, userID, time, songID, comment, uri } = req.body;
    try {
        const newComment = new SongComment({
            display_name,
            userID,
            time,
            songID,
            comment,
            uri
        });
        const savedComment = await newComment.save();
        res.status(201).json({
            message: "Comment saved successfully.",
            comment: savedComment
        });
    } catch (error) {
        next(error);
    }
}
