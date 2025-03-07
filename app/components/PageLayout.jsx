import {Await, Link} from '@remix-run/react';
import {useId, Suspense, lazy} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
// import {HeroSection} from '~/components/Banner';
import React from 'react';
import {HeroSection} from '~/components/HeroSection';
import ScrlItemText from '~/components/ScrlItemText';
import badgePk2White from '../assets/badge-PK-2-white.png';
import group3 from '../assets/group-3.png';
import '../styles/app.css';

// Lazy load the Model3d component with error boundary
const Model3d = lazy(() => 
  import('../components/Model3d').catch(err => {
    console.error('Error loading Model3d:', err);
    return { default: () => <div>Error loading 3D model</div> };
  })
);

import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

/**
 * @param {PageLayoutProps}
 */

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  return (
    // <Aside.Provider>
    //   <CartAside cart={cart} />
    //   <SearchAside />
    //   <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
    //   {header && (
    //     <Header
    //       header={header}
    //       cart={cart}
    //       // isLoggedIn={isLoggedIn}
    //       // publicStoreDomain={publicStoreDomain}
    //     />
    //   )}
    //   {/* <HeroSectiond/> */}
    //   {/* <main>{children}</main> */}
    //   <main>

    // </main>
    //   <Footer
    //     footer={footer}
    //     header={header}
    //     publicStoreDomain={publicStoreDomain}
    //   />
    // </Aside.Provider>
    <div>
      <HeroSection />
      <ScrlItemText />
      <div className="min-h-screen">
        <Suspense fallback={<div className="text-black bg-black p-4">Loading 3D Model...</div>}>
          <Model3d />
        </Suspense>
        <div className="h-screen"></div>
      </div>

      {/* Header Hamburger */}
      {/* Group Icon (Always at the Top-Left) */}
      <div className="fixed w-7 md:w-7 top-6 left-6 z-50">
        <img src={group3} alt="Group Icon" className="w-full h-auto" />
      </div>

      {/* Badge Icon (Always at the Top-Right) */}
      <div className="fixed w-12 md:w-16 top-6 right-6 z-50">
        <img src={badgePk2White} alt="Badge PK" className="w-full h-auto" />
      </div>
    </div>
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   header: PageLayoutProps['header'];
 *   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
 * }}
 */
function MobileMenuAside({header, publicStoreDomain}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
