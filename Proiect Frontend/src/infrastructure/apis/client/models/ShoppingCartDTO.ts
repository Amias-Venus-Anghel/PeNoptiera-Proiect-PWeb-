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
import type { CartProductDTO } from './CartProductDTO';
import {
    CartProductDTOFromJSON,
    CartProductDTOFromJSONTyped,
    CartProductDTOToJSON,
} from './CartProductDTO';

/**
 * 
 * @export
 * @interface ShoppingCartDTO
 */
export interface ShoppingCartDTO {
    /**
     * 
     * @type {string}
     * @memberof ShoppingCartDTO
     */
    id?: string;
    /**
     * 
     * @type {Array<CartProductDTO>}
     * @memberof ShoppingCartDTO
     */
    products?: Array<CartProductDTO> | null;
    /**
     * 
     * @type {string}
     * @memberof ShoppingCartDTO
     */
    clientId?: string;
}

/**
 * Check if a given object implements the ShoppingCartDTO interface.
 */
export function instanceOfShoppingCartDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ShoppingCartDTOFromJSON(json: any): ShoppingCartDTO {
    return ShoppingCartDTOFromJSONTyped(json, false);
}

export function ShoppingCartDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShoppingCartDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'products': !exists(json, 'products') ? undefined : (json['products'] === null ? null : (json['products'] as Array<any>).map(CartProductDTOFromJSON)),
        'clientId': !exists(json, 'clientId') ? undefined : json['clientId'],
    };
}

export function ShoppingCartDTOToJSON(value?: ShoppingCartDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'products': value.products === undefined ? undefined : (value.products === null ? null : (value.products as Array<any>).map(CartProductDTOToJSON)),
        'clientId': value.clientId,
    };
}

