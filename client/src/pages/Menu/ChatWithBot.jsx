//import {chatWithGPT} from "@/apis/chatGPTAPI.jsx";
//import ChatContent from "@/components/ChatContent.jsx";
import React, { useState } from 'react';


const ChatWithBot = () => {
    const [userInput, setUserInput] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const handleRecommendation = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/recommend-music', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
          });
    
          if (response.ok) {
            const data = await response.json();
            setRecommendations(data);
            setError('');
          } else {
            throw new Error('Failed to fetch recommendations');
          }
        } catch (error) {
          setError(error.message);
          setRecommendations([]);
        }
      };


    // const chatFunction = async (input) => {
    //     return await chatWithGPT(input)
    // }

    return (
        <div className="h-full">
            <form onSubmit={handleRecommendation} className="flex items-center mb-4">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tell me about your music taste..."
                    className="w-[500px] px-4  py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:border-transparent"
                />
                <button type="submit" className="px-2 py-2 bg-[#74fc9a] text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-opacity-50">
                    Get Recommendations
                </button>
            </form>
            {error && <div className="text-red-500">{error}</div>}

            <ul className="space-y-2">
                {recommendations.map((item, index) => (
                    <li key={index} className="text-gray-700 text-xl">
                        {item.role}: {item.content}
                    </li>
                ))}
            </ul>
        </div>
    )
        
};

export default ChatWithBot;
