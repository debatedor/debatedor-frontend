import Axios from "axios";
import { useState } from "react";
import { authorizationConfig } from "../../../http/auth/authorization-configuration";
import styles from "./PostForm.module.css"


export default function PostForm(){
    const [values, setValues] = useState({source: '', description: '', question: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3131/create-post", {
            source: values.source,
            description: values.description,
            question: values.question
        }, authorizationConfig).then((response) => {
            if(response.status ===201){
                alert("Postagem criada com sucesso")
            }
        }).catch((error)=>{
            console.error("Houve um problema com a requisição de criar postagem:")
            if(error.response.status === 401) {
                alert('Você não está autenticado')
                }
            if(error.response.data.errors){
                alert(error.response.data.errors.reduce((accumulator, currentValue) => accumulator + '- ' + currentValue.message + '\n', ""))
              }          });
    };

    const handleChange = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };
    return(
    <form id="Post" className="Publique" onSubmit={handleSubmit}>
        <section>
            <h2>Publique sua notícia & receba argumentos</h2>
            <div>
                <div>
                    <h3>Link notícia</h3>
                    <input type="text" className={ styles.inputUser } id="source" name="source" onChange={handleChange} />
                </div>
                <div>
                    <h3>Descrição</h3>
                    <textarea type="text" className= { styles.inputUser } id="description" name="description" onChange={handleChange}></textarea>
                </div>
                <div>
                    <h3>Pergunta de sim ou não</h3>
                    <input type="text" className= { styles.inputUser } id="question" name="question" onChange={handleChange} />
                </div>
            </div>
        </section>
        <button type="submit">Publicar</button>
    </form>
    )
}