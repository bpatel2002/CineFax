import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const theme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: 'rgb(150, 150, 150)',
            },
        },
    });

    const fetchSearch = async () => {

        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page])




    return (
        <div>
            <ThemeProvider theme={theme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField sx={{
                        "& .MuiFormLabel-root": {
                            color: 'rgb(200, 200, 200)'
                        }, input: { color: 'rgb(200, 200, 200)' }
                    }}
                        style={{ flex: 1, background: "rgb(40, 40, 40)" }}
                        className="searchBox"
                        label="Search..."
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <Button variant='contained' style={{ marginLeft: 10 }} onClick={fetchSearch}>
                        <SearchIcon />

                    </Button>
                </div>

                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="rgb(150, 150, 150)"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}
                >
                    <Tab style={{ width: "50%" }} label="Movies" />
                    <Tab style={{ width: "50%" }} label="TV Shows" />
                </Tabs>

            </ThemeProvider>
            <div className="popular">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div >
    )
}

export default Search