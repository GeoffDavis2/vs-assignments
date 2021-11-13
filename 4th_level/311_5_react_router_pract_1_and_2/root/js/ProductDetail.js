import React from "react"
import { useParams } from "react-router";
import { ProductsData } from './ProductsData';

function ProductDetail() {
    const params = useParams();
    const product = ProductsData.find(obj => obj.id === parseInt(params.id))
    return (<>
        <h1>Product Detail Page</h1>
        <hr />
        {Object.entries(product).map(([key, val]) => <h2 key={key}>
            {key}: {val}<br /><br />
        </h2>)}
    </>)
}

export default ProductDetail