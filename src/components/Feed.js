import Axios from "axios";
import React, { useState } from 'react';
import "./Post.css"

export default function Feed() {
    const [values, setValues] = useState({linkNoticia: '',description: ''});
    const [noticia, setLinkNoticia] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3001/Feed",{
            linkNoticia: values.linkNoticia,
            description: values.description
        }).then((response) => {
            console.log(response);
        })
    };

    const handleChange = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    return (
        <div id="Feed">
            <form id="Post" className="Publique" onSubmit={handleSubmit}>
                <section>
                    <h2>Publique sua notícia & receba argumentos</h2>
                    <div>
                        <div>
                            <h3>Link notícia</h3>
                            <input type="text" className="inputUser" id="linkNoticia" onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Descrição</h3>
                            <textarea type="text" className="inputUser" id="description"></textarea>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}
