import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import {Button, ButtonGroup} from '@mui/material'
import { useNavigate } from 'react-router-dom';
const AllAuthors = (props) => {

    const [allAuthors, setAllAuthors] = useState([]);
    const navigate = useNavigate();
    
    function handleEdit(id) {
        navigate('/authors/edit/' + id)
    }

    // const handleEdit = (id) => {
    //     navigate('/authors/edit/' + id)
    // }

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
        .then((res) => {
            let unsortedAuthors = (res.data.authors);
            const sortedAuthors = unsortedAuthors.sort((a, b) => {
                if(a.lastName < b.lastName) {
                    return -1;
                }
            })
            setAllAuthors(sortedAuthors)
        })
        .catch((err) => {
            console.log(err)
        })
    }) 

    return (
        <div className='all-authors'>
            <h1>All Authors</h1>
            <Link to={`/authors/new/`} className="btn btn-link">Add New Author</Link>
            <div className="list-container">

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {allAuthors.map((author, index) => (
                    <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                        <ButtonGroup>
                            <Button onClick={(e) => handleEdit(author._id)}>Edit</Button>
                            <Button color="error" onClick={(e) => {axios.delete("http://localhost:8000/api/authors/" + author._id)}}>Delete</Button>
                        </ButtonGroup>
                    }
                    >
                    <ListItemText primary={ `${author.lastName}, ${author.firstName}`}/>
                    </ListItem>
                ))}
                </List>
            </div>
        </div>
    )
}
export default AllAuthors;