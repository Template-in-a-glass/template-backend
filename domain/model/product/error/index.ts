export enum PRODUCT_ERROR_CODE {
  PRODUCT_ID_EMPTY = 'PRODUCT_ID_EMPTY',
  PRODUCT_NAME_EMPTY = 'PRODUCT_NAME_EMPTY',
  PRODUCT_PRICE_EMPTY = 'PRODUCT_PRICE_EMPTY',
  PRODUCT_PRICE_NEGATIVE = 'PRODUCT_PRICE_NEGATIVE',
}

export interface ProductErrorItem {
  code: PRODUCT_ERROR_CODE;
}

export interface ProductError {
  errors: ProductErrorItem[]
}
