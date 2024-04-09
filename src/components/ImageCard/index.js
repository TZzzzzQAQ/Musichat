import React from 'react';

const ImageCard = ({data: {name, images}}) => {
    const imageUrl = images[0]?.url || 'https://via.placeholder.com/160';

    return (
        <div
            className='group w-48 h-52 flex flex-col items-center place-content-between rounded-lg mb-4'>
            <div className='w-48 h-48 mt-6 flex-center rounded-lg flex-col'>
                <img src={imageUrl} alt={name}
                     className='transition-all duration-150 transform group-hover:scale-150
                     group-hover:-translate-y-2 w-32 h-32 object-cover rounded-lg'/>
                <p className='transition-all duration-150 transform group-hover:scale-125 group-hover:translate-y-10'>
                    {name}
                </p>
            </div>
        </div>
    );
};

export default ImageCard;
