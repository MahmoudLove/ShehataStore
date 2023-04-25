export default function OrdersInfo({ user }) {
  console.log(user);
  if (!user) return <div>log in to continue</div>;
  if (!user.orders.length) return <div>Your didnot make and order before</div>;
  return (
    <div>
      <h2>You Made {user.orders.length} orders</h2>
      <div className="flex flex-col gap-4">
        {user.orders.map((order) => {
          return (
            <div key={order.id} className="bg-white p-4">
              <p>{new Date(order.orderTime).toDateString()}</p>
              {order.details.map((detail) => {
                return (
                  <div key={detail.id} className="border border-red-100/50">
                    <p>{detail.name}</p>
                    <p>Total Price : {detail.itemTotal} EGP</p>
                  </div>
                );
              })}

              <p>State : {order.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
