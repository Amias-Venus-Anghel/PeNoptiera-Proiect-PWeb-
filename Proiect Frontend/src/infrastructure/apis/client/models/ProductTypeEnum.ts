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


/**
 * 
 * @export
 */
export const ProductTypeEnum = {
    Book: 'Book',
    BoardGame: 'BoardGame',
    Puzzle: 'Puzzle'
} as const;
export type ProductTypeEnum = typeof ProductTypeEnum[keyof typeof ProductTypeEnum];


export function ProductTypeEnumFromJSON(json: any): ProductTypeEnum {
    return ProductTypeEnumFromJSONTyped(json, false);
}

export function ProductTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductTypeEnum {
    return json as ProductTypeEnum;
}

export function ProductTypeEnumToJSON(value?: ProductTypeEnum | null): any {
    return value as any;
}

