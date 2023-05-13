import { Card, Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import FormView from '../views/FormView';
import { AiFillHeart } from "react-icons/ai";


//Vista de datos del home
const Caja = () => {

    //const url = process.env.REACT_APP_API_URL;

    const url = "http://localhost:3001";

    const [datos, setDatos] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${url}/posts`);
                const data = await response.json();
                const sortedPosts = data.sort((a, b) => a.id - b.id);
                setDatos(sortedPosts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, []);

    const handleLike = async (id, like) => {
        const response = await fetch(`${url}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: like + 1 }),
        });
        if (response.ok) {
            // actualizar los datos en la interfaz
            const updatedPosts = datos.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        likes: like + 1,
                    };
                }
                return post;
            });
            setDatos(updatedPosts);
        } else {
            console.log('Error al actualizar el like');
        }
    };

    async function handleDelete(id) {
        const response = await fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {

            const posts = datos.filter((post) => post.id !== Number(id))
            const sortedPosts = posts.sort((a, b) => a.id - b.id);
            setDatos(sortedPosts);
            console.log('Borrado exitoso del id:', id);
            console.log(sortedPosts);
        }
    }
    console.log(datos);
    if (!datos) {
        return <div>Cargando datos...</div>;
    }

    return (
        <Container>
            <Row xs={1} sm={2} md={3} lg={4}>
                <Col key='-1' className="d-flex align-items-stretch mb-3">
                    <FormView />
                </Col>
                {datos.map((post) => (

                    <Col key={post.id} className="d-flex align-items-stretch mb-3" >
                        <Card border="primary">
                            <Card.Img variant="top" src={post.img} />
                            <Card.Body>
                                <Card.Title>{post.titulo}</Card.Title>
                                <Card.Text>
                                    {post.descripcion}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xs={10}>
                                        <button className="btn text-danger no-focus pb-3" onClick={() => handleLike(post.id, post.likes)}>
                                            <AiFillHeart />
                                        </button>{post.likes}
                                    </Col>
                                    <Col xs={2}><button className="btn text-danger no-focus" onClick={() => handleDelete(post.id)}>X</button></Col>
                                </Row>
                            </Card.Footer>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>


    );
};
export default Caja;