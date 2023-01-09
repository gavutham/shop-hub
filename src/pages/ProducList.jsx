import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: white;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ margin: 0 })}
`;

const Select = styled.select`
  margin-right: 20px;
  padding: 5px;
  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

const ProducList = () => {
  const category = useLocation().pathname.split("/")[2];

  const [filters, setFilter] = useState({color: "All", size: "All"});
  const handleFilters = (e) => {
    setFilter({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const [sort, setSort] = useState("latest");
  const handleSort = (evt) => {
    setSort(evt.target.value);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products: </FilterText>
          <FilterText>Color:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option>
              All
            </Option>
            <Option>Black</Option>
            <Option>White</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
          </Select>
          <FilterText>Size:</FilterText>
          <Select name="size" onChange={handleFilters}>
            <Option>
              All
            </Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products: </FilterText>
          <Select onChange={handleSort}>
            <Option value="latest">Latest</Option>
            <Option value="dsc">Price: (dsc)</Option>
            <Option value="asc">Price: (asc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProducList;
