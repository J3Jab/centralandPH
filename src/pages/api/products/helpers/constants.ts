export const PRODUCT_DATA_LENGTH = 20;

interface Website {
  [key: string]: string
}
// Keys = query source value | Values = product source value
export const WEBSITES: Website = {
  facebook: "Facebook", 
  shopee: "Shopee",
  carousell: "Carousell",
  lazada: "Lazada",
  datablitz: "Datablitz"
//   tipicpc: "TipicPc",
//   gilmore: "Gilmore",
}

interface Condition { 
  [key: string]: string
}

export const CONDITIONS: Condition = {
    bNew: "bNew",
    lNew: "lNew",
    sUsed: "sUsed",
    wUsed: "wUsed",
}