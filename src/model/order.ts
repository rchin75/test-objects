import Item from "@/model/item";
import Person from "@/model/person";

export default class Order {
    /** Name of the order. */
    name: string;

    /** Ordered items. */
    items: Item[];

    /** The buyer */
    buyer: Person;

    /**
     * Constructor.
     * @param name Name of the order.
     */
    constructor(name: string, buyer: Person) {
        this.name = name;
        this.items = [];
        this.buyer = buyer;
    }
}