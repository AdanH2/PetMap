import { render, waitFor, screen } from '@testing-library/react';
import ProductList from '../components/ProductList.js';
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('axios');

const dummyProducts = [
    {
        title: "product 12",
        price: 54
    },
    {
        title: "product 13",
        price: 78
    },
    {
        title: "product 14",
        price: 65
    },
    {
        title: "product 15",
        price: 43
    }
];

test("product list", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: dummyProducts });

    render(<Router><ProductList /></Router>);

    const productList = await waitFor(() => screen.findAllByTestId("product"));

    expect(productList).toHaveLength(4);
});