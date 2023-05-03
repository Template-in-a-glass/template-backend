import { productBuilder } from '../builder';

describe('Product Builder', () => {
  it('Product Builder with nothing', () => {
    const builder = productBuilder({}).build();
    expect(builder.error).toStrictEqual({
      errors: [
        {
          code: 'PRODUCT_ID_EMPTY'
        },
        {
          code: 'PRODUCT_NAME_EMPTY'
        },
        {
          code: 'PRODUCT_PRICE_EMPTY'
        }
      ]
    });
  });
});
