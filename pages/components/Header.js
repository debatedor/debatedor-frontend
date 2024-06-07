import Axios from "axios";
import React, { useState } from 'react';
import "./feed.css"

function Header() {
    const openBurger = () => {}

    return (
        <div id="headerMain">
            <rect id="burgerRect" onClick={openBurger()}>
                <svg class="burgerLine" id="one"></svg>
                <svg class="burgerLine" id="two"></svg>
                <svg class="burgerLine" id="three"></svg>
            </rect>
            <input id="searchBar">buscar</input>
            <span id="Title">Debatedor</span>
        </div>
    );
}

export default Header