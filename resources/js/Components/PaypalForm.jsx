import React from 'react';

const PaypalForm = () => {
  return (
    <div>
      <h2>Product: Laptop</h2>
      <h3>Price: $5</h3>
      <form action="/paypal" method="post">
        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
        <input type="hidden" name="price" value="20" />
        <input type="hidden" name="product_name" value="Laptop" />
        <input type="hidden" name="quantity" value="1" />
        <button type="submit">Pay with PayPal</button>
      </form>
    </div>
  );
};

export default PaypalForm;
