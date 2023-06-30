import { Student } from "./student.js";

const getID = (id) => {
  return document.getElementById(id);
};

getID("themSV").addEventListener("click", () => {
  let maSV = getID("maSinhVien").value;
  let tenSV = getID("nameSinhVien").value;
  let emailSV = getID("emailSinhVien").value;
  let addressSV = getID("addressSinhVien").value;
  let toan = getID("diemToan").value;
  let ly = getID("diemLy").value;
  let hoa = getID("diemHoa").value;

  const student = new Student(toan, ly, hoa, tenSV, addressSV, maSV, emailSV);

  console.log(student);
});

const hienThiBang = (mang) => {
  let content = "";
  mang.map();
};


