export type Position = {
  x: number;
  y: number;
};

export class ListNode {
  value: Position;
  next: ListNode | null;

  constructor(value: Position, next: ListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  length: number;

  constructor(initialPosition: Position) {
    const node = new ListNode(initialPosition);
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  addToHead(value: Position): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.length++;
  }

  removeTail(): Position | null {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }

    let currentNode = this.head;
    while (currentNode.next && currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }

    const value = this.tail!.value;
    this.tail = currentNode;
    this.tail.next = null;
    this.length--;
    return value;
  }

  getHeadPosition(): Position | null {
    return this.head ? this.head.value : null;
  }

  toArray(): Position[] {
    const positions: Position[] = [];
    let currentNode = this.head;
    while (currentNode) {
      positions.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return positions;
  }

  collidesWithSelf(): boolean {
    if (!this.head || !this.head.next) {
      return false;
    }
    const headPosition = this.head.value;
    let currentNode = this.head.next;
    while (currentNode) {
      if (currentNode.value.x === headPosition.x && currentNode.value.y === headPosition.y) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }
}
