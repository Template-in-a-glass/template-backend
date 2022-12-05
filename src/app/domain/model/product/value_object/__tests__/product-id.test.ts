import { createFailResult, createSuccesResult, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/test/test-expected-result';
import { ProductError, PRODUCT_ERROR_CODE } from '../../error/product-error';
import { createProductId, CreateProductIdInput, ProductId } from '../product-id';

const testExpectedResults: TestExpectedResult<CreateProductIdInput, Result<ProductId, ProductError>>[] = [
  {
    title: 'Empty',
    input: { id: '' },
    expected: createFailResult(
      {
        errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_ID_EMPTY }]
      }
    )
  },
  {
    title: 'With Space',
    input: { id: ' ' },
    expected: createFailResult({
      errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_ID_EMPTY }]
    })
  },
  {
    title: 'Id valid',
    input: { id: 'id' },
    expected: createSuccesResult({
      getValue: () => 'id'
    })
  }
];

describe('ProductId Domain Test', async () => {
  it.each(testExpectedResults)('Create Product id with %p', async (testExpectedResult) => {
    // act
    const createProductIdResult = createProductId(testExpectedResult.input);
    // assert
    expect(createProductIdResult.isSuccess).toStrictEqual(testExpectedResult.expected.isSuccess);
    if (createProductIdResult.isFail && testExpectedResult.expected.isFail) {
      expect(createProductIdResult.error.errors).toIncludeSameMembers(testExpectedResult.expected.error.errors);
    }
    if (createProductIdResult.isSuccess && testExpectedResult.expected.isSuccess) {
      expect(createProductIdResult.data.getValue()).toStrictEqual(testExpectedResult.expected.data.getValue());
    }
  });
});
