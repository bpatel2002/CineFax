import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (value === 0) {
            navigate('/');
        }
        else if (value === 1) {
            navigate('/movies');
        }
        else if (value === 2) {
            navigate('/tv');
        }
        else if (value === 3) {
            navigate('/search');
        }
    }, [value, navigate])


    return (
        <Box sx={{ width: '100%', position: "fixed", bottom: 0, zIndex: 100, }}>
            <BottomNavigation
                style={{ backgroundColor: "rgb(15, 15, 15)" }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction style={{ color: "rgb(206, 38, 38)" }} label="Popular" icon={<TrendingUpIcon />} />
                <BottomNavigationAction style={{ color: "rgb(206, 38, 38)" }} label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction style={{ color: "rgb(206, 38, 38)" }} label="Tv" icon={<TvIcon />} />
                <BottomNavigationAction style={{ color: "rgb(206, 38, 38)" }} label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box >
    );
}