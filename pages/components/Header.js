import Axios from "axios";
import React, { useState } from 'react';
import "./feed.css"

function Header() {
    const openBurger = () => {}

    return (
        <div id="headerMain">
            <rect id="headerRect">
                <rect id="burgerRect" onClick={openBurger()}>

                </rect>
                <h1 id="Title">Debatedor</h1>
            </rect>
        </div>
    );
}

export default Header