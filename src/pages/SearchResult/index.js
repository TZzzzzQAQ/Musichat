import React from 'react';
import {useLocation} from "react-router-dom";
import ImageCard from "@/components/ImageCard";
import {useSelector} from "react-redux";


const SearchResult = () => {
    const location = useLocation()
    const dataFromRedux = useSelector(state => state.music.searchResult)
    const items = location.state?.someData?.artists?.items || dataFromRedux?.artists?.items || [];


    return (
        <div className={'grid grid-cols-4 overflow-x-hidden h-[400px] mb-8'}>
            {items === undefined || items.map((item) => {
                return <ImageCard data={item} key={item.id}/>
            })}
        </div>
    );
};

export default SearchResult;