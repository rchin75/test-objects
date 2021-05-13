export default class Person {
    /** Name of the person. */
    name: string;

    /**
     * Constructor.
     * @param name Name of the person.
     */
    constructor(name : string) {
        this.name = name;
    }

    /**
     * Renames this person.
     * @param name A new name.
     */
    rename(name : string) {
        this.name = name;
    }
}