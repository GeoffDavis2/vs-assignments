import React from "react"
import { Link } from "react-router-dom";
import { ProductsData } from "./ProductsData"

// ProductsData.map(obj => console.log(obj))

function Products() {
    return (<>
        <h1>Products Page</h1>
        {ProductsData.map(obj => <h3 key={obj.id} className='product'>
            <Link to={`/products/${obj.id}`}>{obj.name}</Link>
        </h3>)}
    </>)
}

export default Products