import SongComment from '../Modules/comment.model.js';

// get all comments by songID
export async function getCommentsBySongID(req, res) {
    try {
        const comments = await SongComment.find({ songID: req.query.songID });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// save the comment
export async function saveComment(req, res) {
    
    const newComment = new SongComment({
        comment: req.body.comment,
        songID: req.body.songID,
        time: new Date().toISOString(),
        displayName: req.body.displayName,
        userId: req.body.userId
    });
    try {
        
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
}

// delete the comment
export async function deleteComment(req, res) {
    try {
        const deletedComment = await SongComment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
