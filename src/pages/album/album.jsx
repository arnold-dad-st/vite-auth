import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Album() {
    const [books, setBooks] = React.useState([]);
    const navigate = useNavigate();

    const reFetch = () => {
        const token = localStorage.getItem('token');
        fetch(`${apiUrl}/api/books`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error(error));
    }

    React.useEffect(() => {
        reFetch()
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Books layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Stack
                            sx={{ pt: 1 }}
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={logout}>Logout</Button>
                            <Button variant="contained" onClick={reFetch}>Update</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {books.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Name: {card.realName}
                                        </Typography>
                                        <Typography>
                                            Company: {card.company}
                                        </Typography>
                                        <Typography>
                                            Alter Ego: {card.alterEgo}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </Fragment>
    );
}