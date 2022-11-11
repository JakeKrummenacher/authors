import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import AuthorForm from "./AuthorForm";

const CreateAuthor = (props) => {
    const [errors, setErrors] = useState([]);

    const createAuthor = authorParam => {
        axios.post('http://localhost:8000/api/authors', authorParam)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);

            })
    }

    return (
        <div>
            <AuthorForm onSubmitProp={createAuthor} errors={errors} initialFirstName="" initialLastName="" title="Add an Author"></AuthorForm>
        </div>
    )
}

export default CreateAuthor;