export interface FirebaseProduct  {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  quantity: number;
  image: string;
}

export class Product implements FirebaseProduct {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  quantity: number;
  image: string;
  
  constructor(data: FirebaseProduct) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.sellPrice = data.sellPrice
    this.quantity = data.quantity
    this.image = data.image
  }

  matchesSearchTerm(searchTerm: string): boolean {
    return this.description.includes(searchTerm) ||
    this.name.includes(searchTerm) ||
    this.sellPrice.toString().includes(searchTerm)
  }
}
