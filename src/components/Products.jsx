import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
// import { popularProducts } from "../data";
import { mobile } from "../responsive";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	${mobile({ padding: 0, margin: 0 })}
`;

const Products = ({ category, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(
					category
						? "https://shopapi-iish.onrender.com/api/product/?category=" +
								category
						: "https://shopapi-iish.onrender.com/api/product"
				);
				setProducts(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		const filteringProducts = () => {
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
		};

		if (filters) {
			const filterValues = Object.values(filters);

			if (filterValues[0] === "All" && filterValues[1] === "All") {
				setFilteredProducts(products);
			} else if (filterValues[0] !== "All" && filterValues[1] === "All") {
				delete filters[Object.keys(filters)[1]];
				filteringProducts();
			} else if (filterValues[1] !== "All" && filterValues[0] === "All") {
				delete filters[Object.keys(filters)[0]];
				filteringProducts();
			} else {
				filteringProducts();
			}
		} else {
			setFilteredProducts(products.slice(0, 6));
		}
	}, [products, category, filters]);

	useEffect(() => {
		if (filteredProducts.length !== 0) {
			if (sort === "latest") {
				setFilteredProducts(
					filteredProducts.sort((a, b) => a.createdAt - b.createdAt)
				);
			} else if (sort === "asc") {
				setFilteredProducts(filteredProducts.sort((a, b) => a.price - b.price));
			} else if (sort === "dsc") {
				setFilteredProducts(filteredProducts.sort((a, b) => b.price - a.price));
			}
		}
	}, [sort]);

	return (
		<Container>
			{filteredProducts.map((item) => (
				<Product item={item} key={item.id} />
			))}
		</Container>
	);
};

export default Products;
