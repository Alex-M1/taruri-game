export default class ControllEvents {
  up: boolean;
  left: boolean;
  right: boolean;
  down: boolean;
  fire: boolean;
  keyMap: Map<number, string>;
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.fire = false;
    this.keyMap = new Map([
      [37, 'left'], [39, 'right'], [38, 'up'], [40, 'down'], [32, 'fire'],
    ]);

    document.addEventListener('keydown', (event) => this.update(event, true));
    document.addEventListener('keyup', (event) => this.update(event, false));
  }
  update(event: KeyboardEvent, pressed: boolean) {
    if (this.keyMap.has(event.keyCode)) {
      event.preventDefault();
      event.stopPropagation();
      this[this.keyMap.get(event.keyCode)] = pressed;
    }
  }
}
