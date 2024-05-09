const API_URL = 'http://localhost:3000/comment'; // Adjust this to match your server's URL

// Fetch all comments for a specific song
export const getCommentsAPI = async (songId) => {
    const response = await fetch(`${API_URL}/comments?songID=${songId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return await response.json();
};

// Post a new comment to a specific song
export const postCommentAPI = async (songId, comment, displayname, id) => {
    const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songID: songId, comment: comment, displayName: displayname, userId: id})
    });
    if (!response.ok) {
        throw new Error('Failed to post comment');
    }
    return await response.json();
};

// Delete a comment
export const deleteCommentAPI = async (commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
    return await response.json();
};
