import { Person } from "./person.js";
class Student extends Person{
    constructor(diemToan,diemLy, diemHoa, ...restPerson){
        super(...restPerson);
        this.diemToan = diemToan;
        this.diemHoa = diemHoa;
        this.diemLy = diemLy;
        this.diemTB = 0;
    }
    tinhDTB (){
        this.diemTB = (this.diemToan + this.diemLy + this.diemHoa)/3;
        return this.diemTB;
    }
  
    
}


export {Student};