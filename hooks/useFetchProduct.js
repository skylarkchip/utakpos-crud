import { useState, useEffect } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default function useFetchProduct(slug) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const ref = collection(db, "products");
        const q = query(ref, where("slug", "==", slug));

        const snaps = (await getDocs(q)).docs;
        if (snaps.length > 0) {
          setProduct({ id: snaps[0].id, ...snaps[0].data() });
        }
      }
    };

    fetchData();
  }, [slug]);

  return product;
}
