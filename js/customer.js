import { Person } from "./person.js";
import { ListPerson } from "./danhsachperson.js";
import { Validation } from "./validation.js";

//===================================================//===================================================

class Customer extends Person {
  constructor(tenCompany, triGiaHD, danhGia, ...restPerson) {
    super(...restPerson);
    this.tenCompany = tenCompany;
    this.triGiaHD = triGiaHD;
    this.danhGia = danhGia;
    this.chiTiet = "";
  }
  getDetail() {
    this.chiTiet = `
    - TÊN CTY: <b>${this.tenCompany}</b><br>
    - TRỊ GIÁ HÓA ĐƠN: <b>${this.triGiaHD}</b><br>
    - ĐÁNH GIÁ: <b>${this.danhGia}</b>`;
    return this.chiTiet;
  }
}

//===================================================//===================================================

const dsps = new ListPerson();
const validation = new Validation();

//===================================================//===================================================

const getID = (id) => {
  return document.getElementById(id);
};

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function setLocalStorage() {
  localStorage.setItem("DSKH", JSON.stringify(dsps.mangPerson));
}

function getLocalStorage() {
  let dataLocal = JSON.parse(localStorage.getItem("DSKH"));
  if (dataLocal !== null) {
    hienThiKH(dataLocal);
    dsps.mangPerson = dataLocal;
  }
}
getLocalStorage();

getID("themKH").addEventListener("click", (themKH) => {
  let maKH = getID("maKhachHang").value;
  let tenKH = getID("nameKhachHang").value;
  let emailKH = getID("emailKhachHang").value;
  let addressKH = getID("addressKhachHang").value;
  let tenCty = getID("nameCongTy").value;
  let triGiaHD = +getID("tienHoaDon").value;
  let danhGiaKH = getID("danhGia").value;

  let isValid = true;

  //! Mã KH
  isValid &=
    validation.checkEmpty(
      maKH,
      "spanMaKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkID(
      maKH,
      "spanMaKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã khách hàng không được trùng!</span>`,
      dsps.mangPerson
    ) &&
    validation.checkNumber(
      maKH,
      "spanMaKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên KH
  isValid &=
    validation.checkEmpty(
      tenKH,
      "spanNameKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenKH,
      "spanNameKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailKH,
    "spanEmailKH",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressKH,
    "spanAddressKH",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Tên Cty
  isValid &=
    validation.checkEmpty(
      tenCty,
      "spanTenCty",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tên công ty không được để trống!</span>`
    ) &&
    validation.checkNameCompany(
      tenCty,
      "spanTenCty",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tên công ty không được chứa các ký tự đặc biệt!</span>`
    );

  //! Trị giá HD
  isValid &=
    validation.checkEmpty(
      triGiaHD,
      "spanHDon",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Trị giá hóa đơn không được để trống!</span>`
    ) &&
    validation.checkHD(
      triGiaHD,
      "spanHDon",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Trị giá hóa đơn lớn hơn 0 và không chứa ký tự đặc biệt</span>`
    );

  //! Đánh giá
  isValid &= validation.checkEmpty(
    danhGiaKH,
    "spanDanhGia",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Đánh giá không được để trống!</span>`
  );

  if (isValid) {
    let kh = new Customer(
      tenCty,
      VND.format(triGiaHD),
      danhGiaKH,
      maKH,
      tenKH,
      emailKH,
      addressKH
    );
    kh.getDetail();
    dsps.themPerson(kh);
    setLocalStorage();
    hienThiKH(dsps.mangPerson);
    resetForm();
  }
});

function hienThiKH(mang) {
  let content = "";
  mang.map(function (ps) {
    content += `
          <tr>
              <td>${ps.maPs}</td>
              <td>${ps.namePs}</td>
              <td>${ps.emailPs}</td>
              <td style="text-align: left;">${ps.addressPs}</td>
              <td style="text-align: left;">${ps.chiTiet}</td>             
              <td>
              <div class="row flex-column">
                <div class="col-12 my-1">
                  <button onclick="xemKH('${ps.maPs}')" style="font-size:10px;" class="btn btn-info ">Xem</button>
                </div>
                <div class="col-12 my-1">
                  <button onclick="xoaKH('${ps.maPs}')" style="font-size:10px;"  class="btn btn-danger ">Xóa</button>  
                </div>
              </div>                          
            </td>                      
          </tr>`;
  });

  getID("tblKH").innerHTML = content;
}

window.xoaKH = function (ma) {
  dsps.xoaPerson(ma);
  hienThiKH(dsps.mangPerson);
  setLocalStorage();
};

window.xemKH = function (ma) {
  let indexFind = dsps.timIndex(ma);
  if (indexFind > -1) {
    let khFind = dsps.mangPerson[indexFind];
    // console.log(khFind);
    getID("maKhachHang").value = khFind.maPs;
    getID("maKhachHang").disabled = true;
    getID("nameKhachHang").value = khFind.namePs;
    getID("emailKhachHang").value = khFind.emailPs;
    getID("addressKhachHang").value = khFind.addressPs;
    getID("nameCongTy").value = khFind.tenCompany;
    getID("tienHoaDon").value = khFind.triGiaHD;
    // let tien = khFind.triGiaHD;
    // let tienCN = tien.split('.',' ','₫').join(''); 
    // console.log(tienCN)  
    // getID("tienHoaDon").value = tienCN;
    getID("danhGia").value = khFind.danhGia;
  }
};

getID("capNhatKH").addEventListener("click", (capNhatKH) => {
  let maKH = getID("maKhachHang").value;
  let tenKH = getID("nameKhachHang").value;
  let emailKH = getID("emailKhachHang").value;
  let addressKH = getID("addressKhachHang").value;
  let tenCty = getID("nameCongTy").value;
  let triGiaHD = +getID("tienHoaDon").value;
  let danhGiaKH = getID("danhGia").value;

  let isValid = true;

  //! Mã KH
  isValid &=
    validation.checkEmpty(
      maKH,
      "spanMaKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkNumber(
      maKH,
      "spanMaKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên KH
  isValid &=
    validation.checkEmpty(
      tenKH,
      "spanNameKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenKH,
      "spanNameKH",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailKH,
    "spanEmailKH",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressKH,
    "spanAddressKH",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Tên Cty
  isValid &=
    validation.checkEmpty(
      tenCty,
      "spanTenCty",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tên công ty không được để trống!</span>`
    ) &&
    validation.checkNameCompany(
      tenCty,
      "spanTenCty",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tên công ty không được chứa các ký tự đặc biệt!</span>`
    );

  //! Trị giá HD
  isValid &=
    validation.checkEmpty(
      triGiaHD,
      "spanHDon",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Trị giá hóa đơn không được để trống!</span>`
    ) &&
    validation.checkHD(
      triGiaHD,
      "spanHDon",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Trị giá hóa đơn lớn hơn 0</span>`
    );

  //! Đánh giá
  isValid &= validation.checkEmpty(
    danhGiaKH,
    "spanDanhGia",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Đánh giá không được để trống!</span>`
  );

  if (isValid) {
    let kh = new Customer(
      tenCty,
      VND.format(triGiaHD),
      danhGiaKH,
      maKH,
      tenKH,
      emailKH,
      addressKH
    );
    kh.getDetail();
    let result = dsps.capNhatPerson(kh);
    if (result) {
      setLocalStorage();
      hienThiKH(dsps.mangPerson);
      alert("Cập nhật thành công");
      resetForm();
    } else {
      alert("Cập nhật thất bại!");
    }
  }
});

function resetForm() {
  getID("maKhachHang").value = "";
  getID("maKhachHang").disabled = false;
  getID("nameKhachHang").value = "";
  getID("emailKhachHang").value = "";
  getID("addressKhachHang").value = "";
  getID("nameCongTy").value = "";
  getID("tienHoaDon").value = "";
  getID("danhGia").value = "";
}

// export {Employee};
