// import { Person } from "./person.js";

function ListPerson() {
  this.mangPerson = [];
  this.themPerson = function (ps) {
    this.mangPerson.push(ps);
  };
  this.timIndex = function (ma) {
    let indexFind = -1;
    this.mangPerson.map(function (ps, index) {
      if (ps.maPs === ma) {
        indexFind = index;
      }
    });
    console.log(indexFind);
    return indexFind;
  };
  this.xoaPerson = function (ma) {
    let index = this.timIndex(ma);
    console.log(index);
    if (index > -1) {
      this.mangPerson.splice(index, 1);
    }
  };
  this.capNhatPerson = function (ps) {
    let indexFind = this.timIndex(ps.maPs);
    if (indexFind > -1) {
      this.mangPerson[indexFind] = ps;
      return true;
    }
  };
}

export { ListPerson };
