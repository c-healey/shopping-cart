const Paypal = () => {
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01",
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        // This function captures the funds from the transaction.

        return actions.order.capture().then((details) => {
          console.log(details);
          // This function shows a transaction success message to your buyer.
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      },
      onShippingChange: function (data, actions) {
        if (data.shipping_address.country_code !== "US") {
          return actions.reject();
        }
        console.log(data.shipping_address);

        return actions.resolve();
      },
      onError: (err) => {
        alert("The transaction failed" + err);
      },
      // Show an error page here, when an error occurs
    })
    .render("#paypal-button-container");
  // This function displays Smart Payment Buttons on your web page
  return <div id="paypal-button-container"></div>;
};
export default Paypal;
