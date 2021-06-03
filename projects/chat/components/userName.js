export default class UserName {
  constructor(element, onLogin) {
    this.element = element;
  }

  set(name) {
    this.name = name;
    this.element.textContent = name;
  }

  get() {
    return this.name;
  }
}
