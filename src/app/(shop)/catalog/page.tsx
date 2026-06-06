import { getProducts } from '../../../services/catalogService';
import { Product } from '../../../types';
import ProductCard from '../../../components/domain/ProductCard';

const CatalogPage = async () => {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // You might want to display an error message to the user
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-poke-red mb-8">Pokémon Catalog</h1>
      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">No products found. Please check the API server.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;