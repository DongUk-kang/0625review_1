import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const HomeScreen = () => {

    const [products, setProducts] = useState([])

    const getdata = async () => {
        axios.get("/api/products")
            .then(res => {
                setProducts(res.data.products)
                console.log(res.data.products)
            })
            .catch(err => console.log(err))
    }

    // const getData = async () => {
    //     axios.get("/api/products")
    //         .then(res => {
    //             setProducts(res.data.products)
    //             console.log(res.data.products)
    //         })
    //         .catch(err => console.log(err))
    // }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(item => (
                    <ProductCard product={item} />
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;


