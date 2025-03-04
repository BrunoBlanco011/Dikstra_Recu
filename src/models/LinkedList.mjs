import Node from "./Node.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(node, weight = 1) {
        const newNode = new Node({ node, weight });
        if (!this.#head) {
            this.#head = newNode;
        } else {
            let current = this.#head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.#count++;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.getHead();
            for (let i = 0; i < index && node != null; i++)
                node = node.next;
            return node;
        }
        return undefined;
    }

    isEmpty() {
        return this.getHead() === null;
    }

    print() {
        let current = this.getHead();
        let result = '';
        while (current != null) {
            result += `${current.value.node} (peso: ${current.value.weight}) -> `;
            current = current.next;
        }
        console.log(result);
    }

    getHead() {
        return this.#head;
    }
}