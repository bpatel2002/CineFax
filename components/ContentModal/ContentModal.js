import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_1280, unavailable, unavailableLandscape } from '../../Config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: "90%",
    height: "80%",
    backgroundColor: "rgb(24, 24, 24)",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = React.useState();
    const [video, setVideo] = React.useState();

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=c4da9d21a471918ebddb861b813edd23&language=en-US`)

        setContent(data);

    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=c4da9d21a471918ebddb861b813edd23&language=en-US`)

        if (data.results[0]) {
            setVideo(data.results[0].key);
        }
    }


    React.useEffect(() => {
        fetchData();
        fetchVideo();
    }, [])


    return (
        <>
            <div className='media' style={{ cursor: "pointer" }} onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (<Box sx={style}>
                        <div className='ContentModal'>
                            <img alt={content.name || content.title} className='Content_Portrait' src={content.poster_path ? `${img_1280}/${content.poster_path}` : unavailable} />

                            <img className='ContentModal_landscape' alt={content.name || content.title} src={content.backdrop_path ? `${img_1280}/${content.backdrop_path}` : unavailableLandscape} />

                            <div className='ContentModal_about'>
                                <span className='ContentModal_title'>
                                    {content.name || content.title} (
                                    {(
                                        content.first_air_date || content.release_date || "-----"
                                    ).substring(0, 4)}
                                    )
                                </span>
                                {content.tagline && (
                                    <i className="tagline">{content.tagline}</i>
                                )}
                                <span className='ContentModal_description'>{content.overview}</span>
                                <div></div>
                                <Button
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color="error"
                                    target="_blank"
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch Trailer
                                </Button>
                            </div>
                        </div>
                    </Box>
                    )}
                </Fade>
            </Modal>
        </>
    );
}
