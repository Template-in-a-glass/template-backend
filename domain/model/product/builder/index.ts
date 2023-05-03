import {
  Result,
  createFail,
  createSuccess
} from 'common/interface/result';
import { Product } from '..';
import { againstNegative, againstNull, guard } from '../../../common/guard';
import { PRODUCT_ERROR_CODE, ProductError, ProductErrorItem } from '../error';

interface ProductBuilderProxy {
  withId(id: string): ProductBuilderProxy;
  withName(name: string): ProductBuilderProxy;
  withPrice(price: number): ProductBuilderProxy;
  build(): Result<Product, ProductError>;
}

interface BuildProduct {
  id: string;
  name: string;
  price: number;
}

type PartialProduct = Partial<BuildProduct>;

const buildProduct = (partialProduct: PartialProduct): Result<Product, ProductError> => {
  const product = partialProduct as BuildProduct;
  const productErrorItems: ProductErrorItem[] = guard(
    [
      [againstNull(product.id), { code: PRODUCT_ERROR_CODE.PRODUCT_ID_EMPTY }],
      [againstNull(product.name), { code: PRODUCT_ERROR_CODE.PRODUCT_NAME_EMPTY }],
      [againstNull(product.price), { code: PRODUCT_ERROR_CODE.PRODUCT_PRICE_EMPTY }],
      [againstNegative(product.price), { code: PRODUCT_ERROR_CODE.PRODUCT_PRICE_NEGATIVE }]
    ]
  );

  if (productErrorItems.length > 0) {
    return createFail({ errors: productErrorItems });
  }

  return createSuccess({
    getId: () => product.id,
    getName: () => product.name,
    getPrice: () => product.price
  });
};

export const productBuilder = (product: PartialProduct): ProductBuilderProxy => {
  const proxy: ProductBuilderProxy = {
    withId: (id: string) => productBuilder({ ...product, id }),
    withName: (name: string) => productBuilder({ ...product, name }),
    withPrice: (price: number) => productBuilder({ ...product, price }),
    build: () => buildProduct(product)
  };
  return proxy;
};
