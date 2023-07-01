const getID = (id) => {
  return document.getElementById(id);
};

//===================================================//===================================================

function Validation() {
  this.checkEmpty = function (value, spanID, message) {
    if (value === "") {
      getID(spanID).innerHTML = message;
      getID(spanID).style.display = "block";
      return false;
    }
    getID(spanID).innerHTML = "";
    getID(spanID).style.display = "none";
    return true;
  };

  this.checkNumber = function (value, spanID, message) {
    var pattern = /^[a-zA-Z0-9]{4,6}$/;
    if (pattern.test(value)) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };

  this.checkID = function (value, spanID, message, mangPerson) {
    var isExist = mangPerson.some(function (ps, index) {
      return ps.maPs === value;
    });
    if (isExist) {
      getID(spanID).innerHTML = message;
      getID(spanID).style.display = "block";
      return false;
    }
    getID(spanID).innerHTML = "";
    getID(spanID).style.display = "none";
    return true;
  };

  this.checkName = function (value, spanID, message) {
    var pattern =
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;

    if (pattern.test(value)) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };

  this.checkEmail = function (value, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(pattern)) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };

  this.checkScore = function (value, spanID, message) {
    var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;
    if (pattern.test(value) && value >= 0 && value <= 10) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };

  this.checkLuong = function (value, spanID, message) {
    if (100000 <= value && value <= 500000) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };

  this.checkNgayLam = function (value, spanID, message) {
    if (0 < value && value <= 31) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };  

  this.checkHD = function (value, spanID, message) {
    if (value > 0) {
      getID(spanID).innerHTML = "";
      getID(spanID).style.display = "none";
      return true;
    }
    getID(spanID).innerHTML = message;
    getID(spanID).style.display = "block";
    return false;
  };
}

export { Validation };
