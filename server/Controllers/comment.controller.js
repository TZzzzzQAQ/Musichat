import SongComment from "../Modules/comment.model.js";

export const saveComment = async (req, res, next) => {
    const {display_name, userID, time, songID, comment, uri} = req.body;
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

export const getCommentsBySongID = async (req, res, next) => {
    const {songID} = req.params; // 从URL参数中获取songID
    try {
        const comments = await SongComment.find({songID}); // 查找所有与songID匹配的评论
        if (comments.length === 0) {
            return res.status(404).json({
                message: "No comments found for this song."
            });
        }
        res.status(200).json({
            message: "Comments retrieved successfully.",
            comments
        });
    } catch (error) {
        next(error); // 传递错误到下一个中间件
    }
}
