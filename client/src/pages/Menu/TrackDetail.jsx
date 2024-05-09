import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrackDetailAPI } from '@/apis/everyoneDataAPI.jsx';
import { getCommentsAPI, postCommentAPI, deleteCommentAPI } from '@/apis/commentAPI.jsx';
import { useDispatch, useSelector } from "react-redux";

const TrackDetail = () => {
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    const userState = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();

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
            const response = await postCommentAPI(id, newComment, userState.display_name, userState.id);
            setComments([...comments, response]);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteCommentAPI(commentId);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="flex  h-full">
            <div className="flex-1">
                <h1 className="text-3xl mb-5 font-poppins font-bold">{data && data.name}</h1>
                <img src={data && data.album.images[0].url} alt={data && data.album.name} className='h-[200px]' />
            </div>
            <div className="flex-1 p-5  rounded-lg shadow-md overflow-y-auto">
                <h2 className="text-2xl mb-3 font-semibold">Comments</h2>
                <div className="mt-5">
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a new comment"
                        className="border p-2 w-full mb-2 rounded text-black"
                    />
                    <button onClick={handleAddComment} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-150 ease-in-out">Add Comment</button>
                </div>
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment._id} className="p-3  rounded-lg shadow-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-black">{comment.displayName || userState.display_name}</span>
                                <span className="text-sm text-gray-600">{comment.time}</span>
                            </div>
                            <p className="text-gray-800 mt-1">{comment.comment}</p>

                            {comment.userId === userState.id && (
                                <button onClick={() => handleDeleteComment(comment._id)}
                                    className="bg-red-500 text-white p-2 mt-2 rounded hover:bg-red-700 transition duration-150 ease-in-out">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TrackDetail;
