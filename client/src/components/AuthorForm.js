import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGroup } from "@mui/material";
import axios from 'axios';

const AuthorForm = (props) => {
    const navigate = useNavigate();
    const {initialFirstName, initialLastName, id, errors, isUpdate, title, onSubmitProp} = props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp({firstName, lastName});
        if(firstName <= 0 || lastName <= 0) {
            console.log("there are errors")
        } else {
            navigate('/')
        }
    }


    const handleDelete = (e) => {
        axios.delete('http://localhost:8000/api/authors/' + id)
        navigate('/')
    }

    const goBack = (e) => {
        navigate(-1)
    }

    return (
        <div className="author-form">
            <Button onClick={(e)=>goBack()}>Go Back</Button>
            <Typography variant="h4">{title}</Typography>
            <form id="authorForm" onSubmit={handleSubmit}>
                <TextField id="outlined-basic" name="firstname" value={firstName} label="First Name" variant="outlined" onChange={(e)=>setFirstName(e.target.value)}/>
                {errors.firstName ? 
                <p>{errors.firstName.message}</p> :
                null}
                <TextField id="outlined-basic" name="lastName" value={lastName} label="Last Name" variant="outlined" onChange={(e)=>setLastName(e.target.value)}/>
                {errors.lastName ? 
                <p>{errors.lastName.message}</p> :
                null}

                {isUpdate ? 
                <ButtonGroup id="submit-or-delete">
                    <Button variant="contained" type="submit" value="submit">Submit</Button>
                    <Button variant="outlined" color="error" onClick={(e) => handleDelete()}>Delete</Button>
                </ButtonGroup>
                : 
                <Button variant="contained" type="submit" value="submit">Submit</Button>
                }
            </form>
        </div>
    )
}

export default AuthorForm;