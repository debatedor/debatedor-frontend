import Axios from "axios";
import React, { useState } from 'react';
import "./Header.css"

function Header() {
    return (
        <div id="headerMain">
            <div id="burgerRect"></div>
            <input type="search" name="search" id="searchBar" placeholder="search"/>
            <span id="Title">Debatedor</span>
        </div>
    );
}

export default Header;
