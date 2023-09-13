interface Product {
  cost: number
  discount?: number
}

interface Discount {
  discount: number
}

interface TotalData {
  initialPrice: number
  discountsFromProducts: number
  totalDiscountFromProduct: number
  discountPercentage: number
  priceAddCode: number
  totalDiscountFromCode: number
  totalDiscount: number
  lastPrice: number
}

export const useTotalCalculator = (
  initialCosts: Product[] | number,
  productDiscounts: Discount[] | number
): TotalData => {
  const calculateTotal = (): TotalData => {
    const initialPrice = Array.isArray(initialCosts)
      ? initialCosts.reduce((acc, product) => acc + product.cost, 0)
      : initialCosts

    const discountsFromProducts = Array.isArray(initialCosts)
      ? initialCosts.reduce((acc, orderData) => {
          const discountedPrice = orderData.discount
            ? orderData.cost - (orderData.cost * orderData.discount) / 100
            : orderData.cost

          return acc + discountedPrice
        }, 0)
      : 0

    const totalDiscountFromProduct = discountsFromProducts > 0 ? initialPrice - discountsFromProducts : 0

    const discountPercentage = Array.isArray(productDiscounts)
      ? productDiscounts.reduce((acc, product) => acc + product.discount, 0)
      : productDiscounts

    const priceAddCode = productDiscounts
      ? Array.isArray(productDiscounts)
        ? discountPercentage > 0
          ? discountsFromProducts > 0
            ? discountsFromProducts - (discountsFromProducts * discountPercentage) / 100
            : initialPrice - (initialPrice * discountPercentage) / 100
          : 0
        : initialPrice - (initialPrice * discountPercentage) / 100
      : 0

    const totalDiscountFromCode =
      priceAddCode > 0
        ? discountsFromProducts > 0
          ? discountsFromProducts - priceAddCode
          : initialPrice - priceAddCode
        : 0

    const totalDiscount = priceAddCode > 0 ? totalDiscountFromCode + totalDiscountFromProduct : 0

    const lastPrice =
      totalDiscount > 0 || !Array.isArray(productDiscounts) ? initialPrice - totalDiscount : discountsFromProducts

    return {
      initialPrice,
      discountsFromProducts,
      totalDiscountFromProduct,
      discountPercentage,
      priceAddCode,
      totalDiscountFromCode,
      totalDiscount,
      lastPrice
    }
  }

  const totalData = calculateTotal()
  return totalData
}
