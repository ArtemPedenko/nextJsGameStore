
export default function ProductPage({ params }) {
  console.log(params.product)
  return (
    <div>
      <h1>Product ID: {params.product}</h1>
    </div>
  );
} 