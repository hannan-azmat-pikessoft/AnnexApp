import { actionTypes } from '../services/actionTypes';

export default function bookServiceReducer(
    state = {
        serviceInCart: {
            service: {},
            quantity: 0
        },
        totalServicePriceWithoutVAT: 0,
        totalServicePriceWithVAT: 0,
        totalServiceVAT: 0,
    },
    action
) {
    switch (action.type) {

        case actionTypes.ADD_SERVICE_INTO_CART_METHOD:
            {
                let serviceInCartTemp = {
                    service: action.payload.service,
                    quantity: 1
                }
                let totalServicePriceWithVATTemp = parseFloat(action.payload.service.price_with_vat).toFixed(2) * 1
                let totalServicePriceWithoutVATTemp = parseFloat(action.payload.service.price).toFixed(2) * 1
                let totalServiceVATTemp = totalServicePriceWithVATTemp - totalServicePriceWithoutVATTemp

                return {
                    ...state,
                    serviceInCart: serviceInCartTemp,
                    totalServicePriceWithVAT: totalServicePriceWithVATTemp,
                    totalServicePriceWithoutVAT: totalServicePriceWithoutVATTemp,
                    totalServiceVAT: totalServiceVATTemp
                };
                break;
            }

        /////////////////////////////////////////////////////////////////////

        case actionTypes.REMOVE_SERVICE_FROM_CART_METHOD:
            {
                let serviceInCartTemp = { service: {}, quantity: 0 }

                return {
                    ...state,
                    serviceInCart: serviceInCartTemp,
                    totalServicePriceWithVAT: 0,
                    totalServicePriceWithoutVAT: 0,
                    totalServiceVAT: 0
                };
                break;
            }

        /////////////////////////////////////////////////////////////////////

        case actionTypes.PLUS_SERVICE_QUANTITY_IN_CART_METHOD:
            {
                let serviceInCartTemp = {
                    service: action.payload.service,
                    quantity: state.serviceInCart.quantity + 1
                }
                let totalServicePriceWithVATTemp = parseFloat(action.payload.service.price_with_vat).toFixed(2) * serviceInCartTemp.quantity
                let totalServicePriceWithoutVATTemp = parseFloat(action.payload.service.price).toFixed(2) * serviceInCartTemp.quantity
                let totalServiceVATTemp = totalServicePriceWithVATTemp - totalServicePriceWithoutVATTemp

                return {
                    ...state,
                    serviceInCart: serviceInCartTemp,
                    totalServicePriceWithVAT: totalServicePriceWithVATTemp,
                    totalServicePriceWithoutVAT: totalServicePriceWithoutVATTemp,
                    totalServiceVAT: totalServiceVATTemp
                };
                break;
            }

        /////////////////////////////////////////////////////////////////////

        case actionTypes.MINUS_SERVICE_QUANTITY_IN_CART_METHOD:
            {
                let serviceInCartTemp = {
                    service: action.payload.service,
                }
                if (state.serviceInCart.quantity > 1) {
                    serviceInCartTemp.quantity = state.serviceInCart.quantity - 1
                }
                else {
                    serviceInCartTemp = { service: {}, quantity: 0 }
                }
                let totalServicePriceWithVATTemp = parseFloat(action.payload.service.price_with_vat).toFixed(2) * serviceInCartTemp.quantity
                let totalServicePriceWithoutVATTemp = parseFloat(action.payload.service.price).toFixed(2) * serviceInCartTemp.quantity
                let totalServiceVATTemp = totalServicePriceWithVATTemp - totalServicePriceWithoutVATTemp

                return {
                    ...state,
                    serviceInCart: serviceInCartTemp,
                    totalServicePriceWithVAT: totalServicePriceWithVATTemp,
                    totalServicePriceWithoutVAT: totalServicePriceWithoutVATTemp,
                    totalServiceVAT: totalServiceVATTemp
                };
                break;
            }

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}