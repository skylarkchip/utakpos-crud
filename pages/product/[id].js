import React from "react";
import { useRouter } from "next/router";

function ProductPage() {
  const router = useRouter();
  console.log(router.query.id);
  return <div>ProductPage</div>;
}

export default ProductPage;
