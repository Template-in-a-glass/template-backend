import { createFailResult, createSuccesResult, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/test/test-expected-result';
import { createProduct, CreateProductInput, Product } from '..';
import { ProductError, PRODUCT_ERROR_CODE } from '../error/product-error';
import { createProductId, CreateProductIdInput } from '../value_object/product-id';


const testExpectedResults: TestExpectedResult<CreateProductIdInput & Omit<CreateProductInput, "id">, Result<Product, ProductError>>[] = [
  {
    title: 'Product Name Empty',
    input: { id: 'id', name: '', price: 22 },
    expected: createFailResult(
      {
        errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_NAME_EMPTY }]
      }
    )
  },
  {
    title: 'Product Name With Space',
    input: { id: 'id', name: '  ', price: 22 },
    expected: createFailResult({
      errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_NAME_EMPTY }]
    })
  },
  {
    title: 'Product price negative',
    input: { id: 'id', name: 'Book', price: -1 },
    expected: createFailResult({
      errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_PRICE_NEGATIVE }]
    })
  },
  {
    title: 'Product name empty and price negative',
    input: { id: 'id', name: '', price: -1 },
    expected: createFailResult({
      errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_NAME_EMPTY }, { code: PRODUCT_ERROR_CODE.PRODUCT_PRICE_NEGATIVE }]
    })
  },
  {
    title: 'Product valid',
    input: { id: 'id', name: 'Book', price: 22 },
    expected: createSuccesResult({
      getId: () => ({ getValue: () => 'id' }),
      getName: () => 'Book',
      getPrice: () => 22,
    })
  }
];

describe('Product Domain Test', async () => {
  it.each(testExpectedResults)('Create Product with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const createProductIdResult = createProductId({ id: input.id });
    if (createProductIdResult.isFail) {
      throw new Error('Error Creating Product Id');
    }

    // act
    const createProductResult = createProduct({
      id: createProductIdResult.data,
      name: input.name,
      price: input.price
    });
    // assert
    expect(createProductResult.isSuccess).toStrictEqual(expected.isSuccess);
    if (createProductResult.isSuccess && expected.isSuccess) {
      expect(createProductResult.data.getId().getValue()).toStrictEqual(expected.data.getId().getValue());
      expect(createProductResult.data.getName()).toStrictEqual(expected.data.getName());
      expect(createProductResult.data.getPrice()).toStrictEqual(expected.data.getPrice());
    }
    expect(createProductResult.isFail).toStrictEqual(expected.isFail);
    if (createProductResult.isFail && expected.isFail) {
      expect(createProductResult.error).toStrictEqual(expected.error);
    }
  });
});
