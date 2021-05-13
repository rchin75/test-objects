/**
 * An item that can be ordered.
 */
export default class Item {
    /** Name of the item. */
    name : string;

    /** Price of the item. */
    price : number;

    /**
     * Constructor.
     * @param name Name of the item.
     * @param price Price of the item.
     */
    constructor(name : string, price : number) {
        this.name = name;
        this.price = price;
    }
}