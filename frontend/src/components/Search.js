import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import '../css/Search.css';

const Search = () => {
    const API = apiURL();
    const { token } = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [suggestion, setSuggest] = useState([]);
    const [search, setSearch] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        window.location='../home';
        sessionStorage.searchTerm = e.target.elements[0].value;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        let suggestion = [];
        if(value.length > 0) {
            const regex = new RegExp(`${value}`, `i`);
            suggestion = list.sort().filter(v => regex.test(v));
        }
        setSuggest(suggestion);
        setSearch(value);
    }

    const handleSelected = (value) => {
        setSearch(value);
        setSuggest([]);
    }

    const renderSuggestions = () => {
        if(suggestion.length === 0) {
            return null
        } else {
            return(
                <ul>
                    {suggestion.map((item) => <li key={item} onClick={() => handleSelected(item)}>{item}</li>)}
                </ul>
            )
        }
    }

    const fetchData = async (url, setData) => {
        let res = await axios({
            method: "get",
            url: url,
            headers: {
                'AuthToken': token
            }
        });
        try {
            res.data.payload.map((el) => {
                return setData(prevState => [...prevState, el.tag_name])
            });
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(`${API}/photos/hashtag/all`, setList)
    }, [])

    return(
        <div className="searchDiv">
            <form onSubmit={handleSearch}>
            <input className="searchDivInput" placeholder="Search" value={search} type="text" onChange={handleChange}/>
            </form>
            <div className="resultsDiv">
                {renderSuggestions()}
            </div>
        </div>
    )
}

export default Search;