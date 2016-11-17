import angular from 'angular';

class RandomNames {
  constructor() {
    this.names = ['John', 'Kim', 'Mark', 'Anna'];
  }

  getName() {
    const totalNames = this.names.length;
    const rand = Math.floor(Math.random() * totalNames);
    return this.names[rand];
  }
}

export default angular.module('services.randomNames', [])
  .service('randomNames', RandomNames)
  .name;