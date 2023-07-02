import { Person } from "./person.js";
import { ListPerson } from "./danhsachperson.js";
import { Validation } from "./validation.js";

//===================================================//===================================================

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

class Employee extends Person {
  constructor(soNgayLam, luongNgay, ...restPerson) {
    super(...restPerson);
    this.soNgayLam = soNgayLam;
    this.luongNgay = luongNgay;
    this.luongThang = 0;    
  }
  tinhLuong() {
    let tongLuong = this.luongNgay * this.soNgayLam;    
    this.luongThang = VND.format(tongLuong);
    return this.luongThang;
  } 
}

//===================================================//===================================================

const dsps = new ListPerson();
const validation = new Validation();

//===================================================//===================================================

const getID = (id) => {
  return document.getElementById(id);
};

function setLocalStorage() {
  localStorage.setItem("DSGV", JSON.stringify(dsps.mangPerson));
}

function getLocalStorage() {
  let dataLocal = JSON.parse(localStorage.getItem("DSGV"));
  if (dataLocal !== null) {
    hienThiGV(dataLocal);
    dsps.mangPerson = dataLocal;
  }
}
getLocalStorage();

getID("themGV").addEventListener("click", (themGV) => {
  let maGV = getID("maGiangVien").value;
  let tenGV = getID("nameGiangVien").value;
  let emailGV = getID("emailGiangVien").value;
  let addressGV = getID("addressGiangVien").value;
  let soNgayLam = +getID("workingDay").value;
  let luongNgay = +getID("salary1Day").value;

  let isValid = true;

  //! Mã GV
  isValid &=
    validation.checkEmpty(
      maGV,
      "spanMaGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkID(
      maGV,
      "spanMaGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã giảng viên không được trùng!</span>`,
      dsps.mangPerson
    ) &&
    validation.checkNumber(
      maGV,
      "spanMaGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên GV
  isValid &=
    validation.checkEmpty(
      tenGV,
      "spanNameGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenGV,
      "spanNameGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailGV,
    "spanEmailGV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressGV,
    "spanAddressGV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Lương
  isValid &=
    validation.checkEmpty(
      luongNgay,
      "spanLuong",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Lương theo ngày không được để trống!</span>`
    ) &&
    validation.checkLuong(
      luongNgay,
      "spanLuong",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Lương theo ngày từ 100.000 đến 500.000</span>`
    );

  //! Ngày làm
  isValid &=
    validation.checkEmpty(
      soNgayLam,
      "spanDay",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Ngày làm không được để trống!</span>`
    ) &&
    validation.checkNgayLam(
      soNgayLam,
      "spanDay",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Ngày làm không vượt quá 31 ngày</span>`
    );

  if (isValid) {
    let gv = new Employee(
      soNgayLam,
      luongNgay,
      maGV,
      tenGV,
      emailGV,
      addressGV
    );
    gv.tinhLuong();
  
    dsps.themPerson(gv);
    setLocalStorage();
    hienThiGV(dsps.mangPerson);
    resetForm();
  }
});

function hienThiGV(mang) {
  let content = "";
  mang.map(function (ps) {
    content += `
          <tr>
              <td>${ps.maPs}</td>
              <td>${ps.namePs}</td>
              <td>${ps.emailPs}</td>
              <td style="text-align: left;">${ps.addressPs}</td>
              <td>${ps.soNgayLam}</td>
              <td>${ps.luongNgay}</td>
              <td style="font-weight:600;">${ps.luongThang}</td>
              <td>
              <div class="row flex-column">
                <div class="col-12 my-1">
                  <button onclick="xemGV('${ps.maPs}')" style="font-size:10px;" class="btn btn-info ">Xem</button>
                </div>
                <div class="col-12 my-1">
                  <button onclick="xoaGV('${ps.maPs}')" style="font-size:10px;"  class="btn btn-danger ">Xóa</button>  
                </div>
              </div>                          
            </td>                   
          </tr>`;
  });

  getID("tblGV").innerHTML = content;
}

window.xoaGV = function (ma) {
  dsps.xoaPerson(ma);
  hienThiGV(dsps.mangPerson);
  setLocalStorage();
};

window.xemGV = function (ma) {
  let indexFind = dsps.timIndex(ma);
  if (indexFind > -1) {
    let gvFind = dsps.mangPerson[indexFind];

    getID("maGiangVien").value = gvFind.maPs;
    getID("maGiangVien").disabled = true;
    getID("nameGiangVien").value = gvFind.namePs;
    getID("emailGiangVien").value = gvFind.emailPs;
    getID("addressGiangVien").value = gvFind.addressPs;
    getID("workingDay").value = gvFind.soNgayLam;
    getID("salary1Day").value = gvFind.luongNgay;
  }
};

getID("capNhatGV").addEventListener("click", (capNhatGV) => {
  let maGV = getID("maGiangVien").value;
  let tenGV = getID("nameGiangVien").value;
  let emailGV = getID("emailGiangVien").value;
  let addressGV = getID("addressGiangVien").value;
  let soNgayLam = +getID("workingDay").value;
  let luongNgay = +getID("salary1Day").value;

  let isValid = true;

  //! Mã GV
  isValid &=
    validation.checkEmpty(
      maGV,
      "spanMaGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkNumber(
      maGV,
      "spanMaGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên GV
  isValid &=
    validation.checkEmpty(
      tenGV,
      "spanNameGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenGV,
      "spanNameGV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailGV,
    "spanEmailGV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressGV,
    "spanAddressGV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Lương
  isValid &=
    validation.checkEmpty(
      luongNgay,
      "spanLuong",
      "Lương theo ngày không được để trống."
    ) &&
    validation.checkLuong(
      luongNgay,
      "spanLuong",
      "Lương theo ngày từ 100.000 đến 500.000"
    );

  //! Ngày làm
  isValid &=
    validation.checkEmpty(
      soNgayLam,
      "spanDay",
      "Ngày làm không được để trống."
    ) &&
    validation.checkNgayLam(
      soNgayLam,
      "spanDay",
      "Ngày làm không vượt quá 31 ngày"
    );

  if (isValid) {
    let gv = new Employee(
      soNgayLam,
      luongNgay,
      maGV,
      tenGV,
      emailGV,
      addressGV
    );
    gv.tinhLuong();  

    let result = dsps.capNhatPerson(gv);
    if (result) {
      setLocalStorage();
      hienThiGV(dsps.mangPerson);
      alert("Cập nhật thành công");
      resetForm();
    } else {
      alert("Cập nhật thất bại!");
    }
  }
});

function resetForm() {
  getID("maGiangVien").value = "";
  getID("maGiangVien").disabled = false;
  getID("nameGiangVien").value = "";
  getID("emailGiangVien").value = "";
  getID("addressGiangVien").value = "";
  getID("workingDay").value = "";
  getID("salary1Day").value = "";
}

// export {Employee};
