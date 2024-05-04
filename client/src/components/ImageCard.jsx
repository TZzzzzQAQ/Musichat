const ImageCard = ({data: {name, images}, artist = true, showname = true}) => {
    const imageUrl = images[0]?.url || 'https://via.placeholder.com/160';

    return (
        <div className='group w-48 h-48 flex flex-col items-center place-content-between rounded-lg mt-10 relative'>
            <div className='w-40 h-40 flex-center rounded-lg flex-col relative'>
                {artist ?
                    <img src={imageUrl} alt={name}
                         className='transition-all duration-150 transform group-hover:scale-150 group-hover:cursor-pointer
                     group-hover:-translate-y-2 w-32 h-32 object-cover rounded-full'/> :
                    <div
                        className="absolute inset-0 flex items-center justify-center group-hover:cursor-pointer group-hover:translate-y-2 transition-all duration-300">
                        <img
                            src="https://ouch-cdn2.icons8.com/NIfGgJPt6qA57P50frKHZ1YBnmofAsLcO0-MnBsGqlM/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjI2/LzVlOGU2ZmZmLWYz/OWQtNGJhZC1hMTcy/LTE0ZWQ5N2IxNGM1/NC5wbmc.png"
                            alt="Large Image" className="w-40 h-40 absolute"/>
                        <img src={imageUrl} alt="Large Image" className="w-20 h-20 absolute rounded-full"/>
                    </div>}
                {showname ? (artist ?
                            <p className='font-poppins w-32 text-center transition-all duration-150 transform group-hover:scale-125 group-hover:translate-y-8 group-hover:cursor-pointer truncate overflow-hidden'>
                                {name}
                            </p> :
                            <p className={`font-poppins absolute text-center text-white  rounded-b-lg text-sm top-0 left-0 w-full transition-all duration-300 group-hover:-translate-y-8 font-style: italic font-bold`}>
                                {name}
                            </p>
                    ) :
                    null
                }
            </div>

        </div>
    );
};

export default ImageCard;
