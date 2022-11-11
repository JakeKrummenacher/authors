import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import AuthorForm from "./AuthorForm";
import { CircularProgress } from "@mui/material";

const UpdateAuthor = (props) => {
    const {id} = useParams();
    const [author, setAuthor] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
            .then( response => {
                console.log(response);
                setAuthor(response.data.author);
                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, []);

    const updateAuthor = authorParam => {
        axios.put('http://localhost:8000/api/authors/' + id, authorParam)
            .then(res => console.log(res))
            .catch(err=>{
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div>
            {
                loaded ? <AuthorForm onSubmitProp={updateAuthor} errors={errors} initialFirstName={author.firstName} initialLastName={author.lastName} id={author._id} isUpdate="true" title="Edit Author"></AuthorForm>
                : <div id="progress"><CircularProgress></CircularProgress></div>
            }
        </div>
    )
}

export default UpdateAuthor;