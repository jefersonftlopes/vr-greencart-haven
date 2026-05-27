import { lazy, Suspense } from 'react';
import { RemoteBoundary } from '../components/RemoteBoundary';
import { Hero } from '../sections/Hero';
import { Categories } from '../sections/Categories';
import { FeaturedBanners } from '../sections/FeaturedBanners';

const ProductList = lazy(() => import('cards/ProductList'));

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedBanners />
      <RemoteBoundary name="Cards">
        <Suspense
          fallback={<div className="py-20 text-center text-ink-muted">Carregando produtos…</div>}
        >
          <ProductList />
        </Suspense>
      </RemoteBoundary>
    </>
  );
}
