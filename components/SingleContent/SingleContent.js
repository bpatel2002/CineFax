import { Badge } from '@mui/material'
import React from 'react'
import { img_1280, unavailable } from "../../Config/config"
import ContentModal from '../ContentModal/ContentModal'
import "./SingleContent.css"

const SingleContent = ({ id, poster, title, date, media_type, vote_average }) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 30 } }} badgeContent={vote_average.toFixed(1)} color={vote_average > 6 ? 'success' : 'error'} />
            <img className="poster" src={poster ? `${img_1280}/${poster}` : unavailable} alt={title} />
            <b className='title'>
                {title}
            </b>
            <span className='subtitle'>
                {media_type === 'tv' ? "TV Show" : "Movie"}
                <span className='subtitle'>
                    {date}
                </span>
            </span>
        </ContentModal>
    )
}

export default SingleContent