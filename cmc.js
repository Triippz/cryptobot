/**
 * Author: Mark "Triippz" Tripoli
 * Module Name: cmc.js
 * Function: Provide API references to CoinMarketCap
 * Date 22-FEB-2018
**/


import * as querystring from 'querystring'

/* global fetch */

export async function ticker (opts?: { limit?: number, convert?: string }): Object {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/ticker/?${query}`)
    return res.json()
}

export async function tickerByAsset (asset: string, opts?: { convert?: string }): Object {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/ticker/${asset}/?${query}`)
    const [data] = await res.json()
    return data
}

export async function globalMarket (opts?: { convert?: string }): Object {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/global/?${query}`)
    return res.json()
}