import React, {useState, useEffect} from 'react';

import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import OutlinedCard from '../../components/card/Card';

const HomePage = () => {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch('/api/drive')
        .then(res => res.json())
        .then(res => setItems(res))
        .catch(err=>console.log(err))
    }, [])

    return (
        <Container maxWidth='lg'>
        {console.log(items)}
            <Grid container >
                <Grid item xs={12} sm={6} >
                </Grid>
                <Grid item xs={12} sm={6} >
                    <OutlinedCard />
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomePage;
