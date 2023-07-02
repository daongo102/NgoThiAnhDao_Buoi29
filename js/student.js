import { Person } from "./person.js";
import { ListPerson } from "./danhsachperson.js";
import { Validation } from "./validation.js";

//===================================================//===================================================

class Student extends Person {
  constructor(diemToan, diemLy, diemHoa, ...restPerson) {
    super(...restPerson);
    this.diemToan = diemToan;
    this.diemHoa = diemHoa;
    this.diemLy = diemLy;
    this.diemTB = 0;
    this.chiTiet = "";
  }
  tinhDTB() {
    this.diemTB = ((this.diemToan + this.diemLy + this.diemHoa) / 3).toFixed(2);
    return this.diemTB;
  }
  getDetail(){
    this.chiTiet = `
    - Toán: ${this.diemToan} <br>
    - Lý: ${this.diemLy} <br>
    - Hóa: ${this.diemHoa}`;  
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

function setLocalStorage() {
  localStorage.setItem("DSSV", JSON.stringify(dsps.mangPerson));
}

function getLocalStorage() {
  let dataLocal = JSON.parse(localStorage.getItem("DSSV"));
  if (dataLocal !== null) {
    hienThiSV(dataLocal);
    dsps.mangPerson = dataLocal;
  }
}
getLocalStorage();

getID("themSV").addEventListener("click", (themSV) => {
  let maSV = getID("maSinhVien").value;
  let tenSV = getID("nameSinhVien").value;
  let emailSV = getID("emailSinhVien").value;
  let addressSV = getID("addressSinhVien").value;
  let toan = +getID("diemToan").value;
  let ly = +getID("diemLy").value;
  let hoa = +getID("diemHoa").value;

  let isValid = true;

  //! Mã SV
  isValid &=
    validation.checkEmpty(
      maSV,
      "spanMaSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkID(
      maSV,
      "spanMaSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã sinh viên không được trùng!</span>`,
      dsps.mangPerson
    ) &&
    validation.checkNumber(
      maSV,
      "spanMaSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên SV
  isValid &=
    validation.checkEmpty(
      tenSV,
      "spanNameSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenSV,
      "spanNameSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailSV,
    "spanEmailSV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressSV,
    "spanAddressSV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Điểm
  isValid &= validation.checkScore(
    toan,
    "spanToan",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  isValid &= validation.checkScore(
    ly,
    "spanLy",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  isValid &= validation.checkScore(
    hoa,
    "spanHoa",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  if (isValid) {
    let sv = new Student(toan, ly, hoa, maSV, tenSV, emailSV, addressSV);
    sv.tinhDTB();
    sv.getDetail();
  
    dsps.themPerson(sv);
    setLocalStorage();
    hienThiSV(dsps.mangPerson);
    resetForm();
  }
});

function hienThiSV(mang) {
  let content = "";
  mang.map(function (ps) {
    content += `
          <tr>
              <td>${ps.maPs}</td>
              <td>${ps.namePs}</td>
              <td>${ps.emailPs}</td>
              <td style="text-align: left;">${ps.addressPs}</td>
              <td style="text-align: left;">${ps.chiTiet}</td>
              <td style="font-weight:600;">${ps.diemTB}</td>
              <td>
                <div class="row flex-column">
                  <div class="col-12 my-1">
                    <button onclick="xemSV('${ps.maPs}')" style="font-size:10px;" class="btn btn-info ">Xem</button>
                  </div>
                  <div class="col-12 my-1">
                    <button onclick="xoaSV('${ps.maPs}')" style="font-size:10px;"  class="btn btn-danger ">Xóa</button>  
                  </div>
                </div>                          
              </td>                 
          </tr>`;
  });
  getID("tblSV").innerHTML = content;
}

window.xoaSV = function (ma) {
  dsps.xoaPerson(ma);
  hienThiSV(dsps.mangPerson);
  setLocalStorage();
};

window.xemSV = function (ma) {
  let indexFind = dsps.timIndex(ma);
  if (indexFind > -1) {
    let svFind = dsps.mangPerson[indexFind];
   
    getID("maSinhVien").value = svFind.maPs;
    getID("maSinhVien").disabled = true;
    getID("nameSinhVien").value = svFind.namePs;
    getID("emailSinhVien").value = svFind.emailPs;
    getID("addressSinhVien").value = svFind.addressPs;
    getID("diemToan").value = svFind.diemToan;
    getID("diemLy").value = svFind.diemLy;
    getID("diemHoa").value = svFind.diemHoa;
  }
};

getID("capNhatSV").addEventListener("click", (capNhatSV) => {
  let maSV = getID("maSinhVien").value;
  let tenSV = getID("nameSinhVien").value;
  let emailSV = getID("emailSinhVien").value;
  let addressSV = getID("addressSinhVien").value;
  let toan = +getID("diemToan").value;
  let ly = +getID("diemLy").value;
  let hoa = +getID("diemHoa").value;

  let isValid = true;

  //! Mã SV
  isValid &=
    validation.checkEmpty(
      maSV,
      "spanMaSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Mã không được để trống!</span>`
    ) &&
    validation.checkNumber(
      maSV,
      "spanMaSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Tài khoản không đúng định dạng! Gồm 4 - 6 ký số, không bao gồm ký tự đặc biệt.</span>`
    );

  //! Tên SV
  isValid &=
    validation.checkEmpty(
      tenSV,
      "spanNameSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên không được để trống!</span>`
    ) &&
    validation.checkName(
      tenSV,
      "spanNameSV",
      `<span><i class="fa-solid fa-circle-exclamation"></i> Họ và tên chỉ được chứa ký tự chữ.</span>`
    );

  //! Email
  isValid &= validation.checkEmail(
    emailSV,
    "spanEmailSV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Email chưa đúng định dạng!</span>`
  );

  //! Địa chỉ
  isValid &= validation.checkEmpty(
    addressSV,
    "spanAddressSV",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Địa chỉ không được để trống!</span>`
  );

  //! Điểm
  isValid &= validation.checkScore(
    toan,
    "spanToan",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  isValid &= validation.checkScore(
    ly,
    "spanLy",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  isValid &= validation.checkScore(
    hoa,
    "spanHoa",
    `<span><i class="fa-solid fa-circle-exclamation"></i> Điểm phải từ 0 đến 10!</span>`
  );

  if (isValid) {
    let sv = new Student(toan, ly, hoa, maSV, tenSV, emailSV, addressSV);
    sv.tinhDTB();
    sv.getDetail();

    let result = dsps.capNhatPerson(sv);
    if (result) {
      setLocalStorage();
      hienThiSV(dsps.mangPerson);
      alert("Cập nhật thành công");
      resetForm();
    } else {
      alert("Cập nhật thất bại!");
    }
  }
});

function resetForm() {
  getID("maSinhVien").value = "";
  getID("maSinhVien").disabled = false;
  getID("nameSinhVien").value = "";
  getID("emailSinhVien").value = "";
  getID("addressSinhVien").value = "";
  getID("diemToan").value = "";
  getID("diemLy").value = "";
  getID("diemHoa").value = "";
}

// export {Student};
