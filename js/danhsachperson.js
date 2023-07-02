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
    return indexFind;
  };
  this.xoaPerson = function (ma) {
    let index = this.timIndex(ma);  
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
