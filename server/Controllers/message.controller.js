import Message from '../Modules/comment.model.js';

// get all comments by songID
export async function getMessage(req, res) {
    try {
        const comments = await Message.findAll();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// save the comment
export async function saveMessage(req, res) {
    const newMessage = new Message({
        message: req.body.message,
        displayName: req.body.displayName,
        userId: req.body.userId
    });
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
}

// delete the comment
// export async function deleteComment(req, res) {
//     try {
//         const deletedComment = await SongComment.findByIdAndDelete(req.params.id);
//         if (!deletedComment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }
//         res.json({ message: 'Comment deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
