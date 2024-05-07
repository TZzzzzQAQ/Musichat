import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrackDetailAPI} from '@/apis/everyoneDataAPI.jsx';
import {getCommentsAPI, postCommentAPI, deleteCommentAPI} from '@/apis/commentAPI.jsx';

const SongDetail = () => {
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trackResponse = await getTrackDetailAPI(id);
                const commentsResponse = await getCommentsAPI(id); 
                setData(trackResponse);
                setComments(commentsResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleAddComment = async () => {
        try {
            const response = await postCommentAPI(id, newComment);
            setComments([...comments, response]); // 更新评论列表
            setNewComment(''); // 清空输入框
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteCommentAPI(commentId);
            setComments(comments.filter(comment => comment._id !== commentId)); // 更新列表
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="flex">
            <div className="flex-1">
                <h1 className="text-3xl mb-5 font-poppins font-bold">{data && data.name}</h1>
                <img src={data && data.album.images[0].url} alt={data && data.album.name} className='h-[200px]'/>
            </div>
            <div className="flex-1">
                <h2 className="text-2xl mb-3">Comments</h2>
                <div>
                    {comments.map(comment => (
                        <div key={comment._id} className="mb-2">
                            {comment.comment}
                            <button onClick={() => handleDeleteComment(comment._id)} className="bg-red-500 text-white p-2 ml-2">Delete</button>
                        </div>
                    ))}
                </div>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a new comment"
                    className="border p-1 w-full mb-2"
                />
                <button onClick={handleAddComment} className="bg-blue-500 text-white p-2">Add Comment</button>
            </div>
        </div>
    );
};

export default SongDetail;
