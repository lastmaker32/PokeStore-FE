import { catalogService } from '@/services/catalogService';
import { ProductCard } from '@/components/domain/ProductCard';

export default async function CatalogPage() {
  const products = await catalogService.getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-dark-slate mb-8 text-center">Our Catalog</h1>
      <div classNameName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}