import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagnation from "../../components/Pagination/CustomPagnation";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    console.log("SearchText: ", searchText);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=fffc3e3fba16ce8cd773b79090617958&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {searchText &&
        !content &&
        (type ? <h2>No Series Found</h2> : <h2>No Movies Found.</h2>)}
      {numOfPages > 1 && (
        <CustomPagnation setPage={setPage} setNumOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
