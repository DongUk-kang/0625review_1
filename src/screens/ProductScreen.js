import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Image, Card, Button, ListGroup} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {

    console.log(match.params.id)

    const [product, setProduct] = useState({})

    const getdata = async () => {
        await axios.get(`/api/products/${match.params.id}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getdata()
    }, {})

    return (
        <>
            <Link to={"/"}>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                    />
                </Col>
                <Col md={3}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                text={`${product.numReviews} reviews`}
                                value={product.rating}
                                color={"blue"}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description.slice(0, 100)}...
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className={'btn-block'}
                                    type={"button"}
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
