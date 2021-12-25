// che do nghiem ngat JS
'user strict';

var students = [
    {
         name: 'Pham Xuan Sang',
         age: 20,
         phone: 0123545,
         address: 'Nam Dinh'
    },
    {
         name: 'Ta Thai Bao',
         age: 20,
         phone: 0123545,
         address: 'Ninh Binh'
    },
];

// khoi tao che do Sua  = False
var editMode = false;

var studentIdtmp;


function enableEditMode() {
     editMode = true;
}

function disableEditMode() {
     editMode = false;
}


// Load code ra ngoai trinh duyet
document.addEventListener('DOMContentLoaded', function() {
     // renderCode
     renderStudents();   

     // tao moi Sv - create SV
     onClickCreateStudent();

});

// render students - view ra trinh duyet 
function renderStudents() {
     var html = '';   // khoi tao <li> la chuoi rong

     // duyet qua dsach svien
    
     for (var index = 0; index < students.length; index++) {
          var student = students[index];
          html += `
               <li class="student">
                    <p><span>Name: </span>${student.name}</p>
                    <p><span>Age: </span>${student.age}</p>
                    <p><span>Phone: </span>${student.phone}</p>
                    <p><span>Address: </span>${student.address}</p>
                    <p><span>Address: </span>${student.address}</p>
                    <i class="student-edit" onclick="onStudentEdit(${index})"> <i class="fas fa-user-edit"></i></i>
                    <i class="student-delete" onclick="onStudentDelete(${index})"><i class="fas fa-backspace"></i></i>
               </li>`;
     }

     // inner <li> vao <ul>
     setHTML('#students-list', html);  //var studentsElement = document.getElementById('students-list').innerHTML = html;
}

//add student
function addStudent(student) {
     students.push(student);
}

// xu ly edit Student
function editStudentHandle() {
     // 1.Bắt sự kiện click vào nút Save

     // 2. Lấy ra những giá trị được nhập tại các inputs
     var name = getInputValue('.student-form .name');
     var age = getInputValue('.student-form .age');
     var phone = getInputValue('.student-form .phone');
     var address = getInputValue('.student-form .address');

      //3. Từ giá trị inputs lấy đc, tạo 1 object mới chứa thông tin sinh viên
      editStudent(studentIdtmp, {
           name, 
           age,
           phone,
           address
      });

      // 4.  render view
      renderStudents();

      // 5. disable editMode
      disableEditMode();

      //6. Thuc hien doi nut Save -> Create
      setHTML('.createStudent', 'Create');

      // 7. Sau khi sửa xong, clean các ô inputs đi
      studentFormReset();

}

// clear value of input form
function studentFormReset() {
     setInputvalue(('.student-form .name'), '');
     setInputvalue(('.student-form .age'), '');
     setInputvalue(('.student-form .phone'), '');
     setInputvalue(('.student-form .address'), '');

}


// tao moi mot Sinh vien - Create Student
function onClickCreateStudent() {

     if(editMode) {
          // neu ma editMode thi goi function
          editStudentHandle();

     } else {
          
          //1. Lấy giá trị của các thẻ input
          var name = getInputValue('.student-form .name');
          var age = getInputValue('.student-form .age');
          var phone = getInputValue('.student-form .phone');
          var address = getInputValue('.student-form .address');

          //2. Từ giá trị trên, tạo 1 object mới chứa thông tin của sinh viên
          var student = { 
               name, 
               age, 
               phone, 
               address 
          };

          //3. Thêm object vừa tạo vào cuối danh sách sinh viên
          addStudent(student);

          //4. goi lai render view
          renderStudents();

          //Sau khi thêm xong, clean các ô inputs đi
          studentFormReset();
     }


}

// Xoa Sinh vien cuoi mang
function studentDelete(index) {
     students.splice(index, 1);
}

// Từ index lấy được, thực hiện xoá sinh viên đó khỏi danh sách sinh viên
function onStudentDelete(index) {
     //confirm
     if(confirm('Are you sure?')) {
          // xoa
          studentDelete(index);

          // goi lai renderview
          renderStudents();
     }
}

// Lấy index của sinh viên vừa click vào
function getStudent(index) {
    return students[index];
}


// Sua va Render lai - on click to delete student button
function onStudentEdit(index) {

     //1. Lấy index của sinh viên vừa click vào
     studentIdtmp = index;

     var student =  getStudent(index);    //var student = students[index];

     //2. fill value to input
     setInputvalue(('.student-form .name'), student.name);
     setInputvalue(('.student-form .age'), student.age);
     setInputvalue(('.student-form .phone'), student.phone);
     setInputvalue(('.student-form .address'), student.address);

     //3.  enable Edit Mode
     enableEditMode();

     //4. Đổi nút Create bằng nút Save
     setHTML('.createStudent', 'Save');
}

// edit Student by Index
function editStudent(index, student) {
     students[index] = student;
}

// innerHTML to inside Element
function setHTML(selector, html) {
     var element = document.querySelector(selector);
     element.innerHTML = html;
}

// get value input from input by selector - lay ra gia tri the input
function getInputValue(selector) {
     var inputElement = document.querySelector(selector);
     return inputElement.value;
}

// set value input to input by Selector - gan vao
function setInputvalue(selector,  value) {
     var element = document.querySelector(selector);
     element.value = value;
}



