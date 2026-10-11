import baseUrl from "@/services/baseUrl";
import Hero from "@/components/Hero/hero";
import ProductCard from "@/components/ProductsCard/productsCard";
import AllProducts from "@/components/AllProducts/allProducts";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const products = await getProducts();
  const downProducts = products.filter((p) => p.today < p.yesterday);
  const upProducts = products.filter((p) => p.today > p.yesterday);
 
  

  return (
    <div className="container mx-auto px-4 py-1 space-y-2">
      <Hero />
      <div>
        <p className="text-2xl font-bold">আজ দাম কমেছে</p>
        <div className= "grid grid-cols-4 gap-4 mt-2"> 
          {downProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">আজ দাম বেড়েছে</p>
        <div className= "grid grid-cols-4 gap-4 mt-2"> 
          {upProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <div>
        <p>All Products</p>
        <div>
          <AllProducts key={products.id} products={products} />
        </div>
      </div>
    </div>
  );
}
