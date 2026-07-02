'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid,
  List,
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { ProductCard } from '@/components/shop/product-card'
import { Button, Slider, Badge } from '@/components/ui'
import { products } from '@/lib/data'
import { useFilterStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

const colorOptions = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Brown', hex: '#5c4033' },
  { name: 'Beige', hex: '#d2b48c' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Green', hex: '#16a34a' },
]

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function FilterSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const {
    categories,
    colors,
    sizes,
    priceRange,
    rating,
    toggleCategory,
    toggleColor,
    toggleSize,
    setPriceRange,
    setRating,
    resetFilters,
  } = useFilterStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-background shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-6">
              <FilterContent
                categories={categories}
                colors={colors}
                sizes={sizes}
                priceRange={priceRange}
                rating={rating}
                toggleCategory={toggleCategory}
                toggleColor={toggleColor}
                toggleSize={toggleSize}
                setPriceRange={setPriceRange}
                setRating={setRating}
                resetFilters={resetFilters}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function FilterContent({
  categories,
  colors,
  sizes,
  priceRange,
  rating,
  toggleCategory,
  toggleColor,
  toggleSize,
  setPriceRange,
  setRating,
  resetFilters,
}: {
  categories: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  rating: number | null
  toggleCategory: (category: string) => void
  toggleColor: (color: string) => void
  toggleSize: (size: string) => void
  setPriceRange: (range: [number, number]) => void
  setRating: (rating: number | null) => void
  resetFilters: () => void
}) {
  const activeFilters =
    categories.length + colors.length + sizes.length + (rating ? 1 : 0)

  return (
    <>
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{activeFilters} active</Badge>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear All
        </Button>
      </div>

      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {['Men', 'Women', 'Accessories', 'Shoes'].map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={categories.includes(category.toLowerCase())}
                onChange={() => toggleCategory(category.toLowerCase())}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={cn(
                'h-8 w-8 rounded-full border-2 transition-all',
                colors.includes(color.name)
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                'h-10 w-10 rounded-lg border text-sm font-medium transition-all',
                sizes.includes(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) =>
            setPriceRange([value[0], value[1]] as [number, number])
          }
          min={0}
          max={3000}
          step={50}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={rating === r}
                onChange={() => setRating(r)}
                className="h-4 w-4"
              />
              <span className="text-sm">{r}+ Stars</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const [filterOpen, setFilterOpen] = React.useState(false)
  const {
    viewMode,
    sort,
    setViewMode,
    setSort,
    categories,
    colors,
    sizes,
    priceRange,
    rating,
  } = useFilterStore()

  const categoryParam = searchParams.get('category')
  const filterParam = searchParams.get('filter')

  const filteredProducts = React.useMemo(() => {
    let result = [...products]

    if (categoryParam) {
      result = result.filter(
        (p) =>
          p.category.slug === categoryParam ||
          p.category.slug.includes(categoryParam)
      )
    }

    if (filterParam === 'new') {
      result = result.filter((p) => p.new_arrival)
    } else if (filterParam === 'bestseller') {
      result = result.filter((p) => p.best_seller)
    } else if (filterParam === 'sale') {
      result = result.filter((p) => p.compare_at_price)
    } else if (filterParam === 'limited') {
      result = result.filter((p) => p.limited_edition)
    } else if (filterParam === 'featured') {
      result = result.filter((p) => p.featured)
    }

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category.slug))
    }

    if (colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => colors.includes(c.name))
      )
    }

    if (sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => sizes.includes(s.name))
      )
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (rating) {
      result = result.filter((p) => p.rating >= rating)
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popularity':
        result.sort((a, b) => b.reviews_count - a.reviews_count)
        break
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
    }

    return result
  }, [categoryParam, filterParam, categories, colors, sizes, priceRange, rating, sort])

  return (
    <>
      <main className="flex-1">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold">
                {categoryParam
                  ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
                  : filterParam
                  ? filterParam === 'new'
                    ? 'New Arrivals'
                    : filterParam === 'bestseller'
                    ? 'Best Sellers'
                    : filterParam === 'sale'
                    ? 'Sale'
                    : filterParam === 'limited'
                    ? 'Limited Edition'
                    : 'Shop'
                  : 'Shop All'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} products
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
              <div className="p-6 rounded-2xl border bg-card">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h2>
                <FilterContent
                  categories={categories}
                  colors={colors}
                  sizes={sizes}
                  priceRange={priceRange}
                  rating={rating}
                  toggleCategory={useFilterStore.getState().toggleCategory}
                  toggleColor={useFilterStore.getState().toggleColor}
                  toggleSize={useFilterStore.getState().toggleSize}
                  setPriceRange={useFilterStore.getState().setPriceRange}
                  setRating={useFilterStore.getState().setRating}
                  resetFilters={useFilterStore.getState().resetFilters}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl border bg-card">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setFilterOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-4 ml-auto">
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) =>
                        setSort(e.target.value as typeof sort)
                      }
                      className="h-10 pl-3 pr-10 rounded-lg border bg-background appearance-none cursor-pointer"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                  </div>

                  <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button
                    onClick={() => useFilterStore.getState().resetFilters()}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 gap-6'
                      : 'space-y-4'
                  )}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FilterSidebar isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  )
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="flex-1">
          <div className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-10 w-48 bg-muted rounded" />
                <div className="h-6 w-24 bg-muted rounded mt-2" />
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-2xl" />
                  <div className="h-4 w-3/4 bg-muted rounded mt-4" />
                  <div className="h-4 w-1/2 bg-muted rounded mt-2" />
                </div>
              ))}
            </div>
          </div>
        </main>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  )
}
