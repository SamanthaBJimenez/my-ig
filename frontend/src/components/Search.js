import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import '../css/Search.css';

import { Input } from "antd";
import { useCombobox } from "downshift";
import { NavLink } from 'react-router-dom';

const Search = () => {
    const API = apiURL();
    // const { token } = useContext(AuthContext);
    // const [list, setList] = useState([]);
    // const [suggestion, setSuggest] = useState([]);
    // const [search, setSearch] = useState("");
    
  const [inputItems, setInputItems] = useState([])
  const [users, setUsers] = useState([])
  const [singleUser, setSingleUser] = useState("")

  useEffect(() => {
    const getUserInfo = async() => {
      try {
          let res = await axios.get(`${API}/users/`)
          setUsers(res.data.payload);
      } catch(error) {
          setUsers([]);
      }
    }
    getUserInfo();
  }, [])

  console.log(users);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        users.filter((item) =>
          item.username.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

    return(
        <div className="searchDiv">
            <div {...getComboboxProps()}>
                <Input
                {...getInputProps()}
                placeholder="Find your friends..."
                enterbutton="Search"
                size="large"
                className='searchDivInput'
                />
        {/* <input {...getInputProps()} placeholder="Search"></input> */}
            </div>
        <ul className="searchShow" {...getMenuProps()}>
            {isOpen &&
            inputItems.map((item, index) => (
                <span
                    key={item.id}
                    {...getItemProps({ item, index })}
                    onClick={() => setSingleUser(item.username)}
                >
                    <li className="listSearch" style={highlightedIndex === index ? { "background": "rgb(255, 255, 255, 1)", "cursor": "pointer"} : {}} >
                        <NavLink className="navlinkSearch" exact to={`/profile/${item.id}`}><h4 className="searchName">{item.username}</h4></NavLink>
                        
                       
                    </li>
                </span>
            ))}
        </ul>
        </div>
    )
}

export default Search;