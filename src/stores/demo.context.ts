import { useState } from 'react';

import constate from 'constate';

const UseCart = () => {
    const [cartData, setCartData] = useState('demo');

    return {
        cartData,
        setCartData,
    };
};

const [CartProvider, useCartContext] = constate(UseCart);

export { CartProvider, useCartContext };
