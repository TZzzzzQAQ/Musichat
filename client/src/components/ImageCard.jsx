const ImageCard = ({ data: { name, images }, showname = true }) => {
    const imageUrl = images[0]?.url || 'https://via.placeholder.com/160';

    return (
        <div
            className='group w-48 h-52 flex flex-col items-center place-content-between rounded-lg mt-10'>
            <div className='w-48 h-48 flex-center rounded-lg flex-col'>
                <img src={imageUrl} alt={name}
                    className='transition-all duration-150 transform group-hover:scale-150 group-hover:cursor-pointer
                     group-hover:-translate-y-2 w-32 h-32 object-cover rounded-lg'/>
                {showname ?
                    <p className='font-poppins w-32 text-center transition-all duration-150 transform group-hover:scale-125 group-hover:translate-y-8 group-hover:cursor-pointer truncate overflow-hidden'>
                        {name}
                    </p>
                    : null
                }


            </div>
            <br />
            <br />
        </div>
    );
};

export default ImageCard;
