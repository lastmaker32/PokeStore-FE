import ProductCard from "@/src/components/domain/ProductCard";
// Nota: Ajusta la ruta de importación de catalogService si tu IA lo nombró diferente
import { getProducts } from "@/src/services/catalogService"; 
import { Product } from "@/src/types";

export default async function Home() {
  let products: Product[] = [];
  try {
    const fetchedProducts = await getProducts();
    if (Array.isArray(fetchedProducts)) {
      products = fetchedProducts;
    } else {
      console.error('API returned non-array data for products:', fetchedProducts);
      products = [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    products = [];
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Catálogo Pokémon</h1>
      
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">¡Oh no! No hay Pokémon en stock.</h2>
          <p className="text-gray-400">Asegúrate de que tu backend de .NET esté corriendo en el puerto 5095.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}