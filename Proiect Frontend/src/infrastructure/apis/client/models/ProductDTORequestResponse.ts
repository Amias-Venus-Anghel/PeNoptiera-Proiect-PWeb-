/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { ProductDTO } from './ProductDTO';
import {
    ProductDTOFromJSON,
    ProductDTOFromJSONTyped,
    ProductDTOToJSON,
} from './ProductDTO';

/**
 * 
 * @export
 * @interface ProductDTORequestResponse
 */
export interface ProductDTORequestResponse {
    /**
     * 
     * @type {ProductDTO}
     * @memberof ProductDTORequestResponse
     */
    response?: ProductDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ProductDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ProductDTORequestResponse interface.
 */
export function instanceOfProductDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProductDTORequestResponseFromJSON(json: any): ProductDTORequestResponse {
    return ProductDTORequestResponseFromJSONTyped(json, false);
}

export function ProductDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ProductDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ProductDTORequestResponseToJSON(value?: ProductDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ProductDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}
