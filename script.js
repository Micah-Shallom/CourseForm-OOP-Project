const form = document.getElementById('form')
let student = document.getElementById('studentInput')
let subject = document.getElementById('subjectInput')
let grade = document.getElementById('gradeInput')
const submitBtn = document.getElementById('submit');
const tableList = document.getElementById('table-list');
const container = document.querySelector('.container')


//Book Class : Create a New Book
class Student {
  constructor(student , subject , grade){
    this.student = student;
    this.subject = subject;
    this.grade = grade;
  }
}

//UI Class : Control all UI Activity
class UI {
  static addToStudList(stud){
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${stud.student}</td>
      <td>${stud.subject}</td>
      <td>${stud.grade}</td>
      <td> <a href='#' class='removeLink'><i class="fa text-danger fa-trash" aria-hidden="true"></i></a> </td>
    `;
    tableList.appendChild(tableRow);
  }

  static displayStudent(){

    let student = Storage.loadStudent();

    student.forEach(stud => UI.addToStudList(stud));
  }
  static removeStudent(studentEl){
    if(studentEl.classList.contains('fa')){
      let remstudent = studentEl.parentElement.parentElement.parentElement;
      tableList.removeChild(remstudent);
    }
  }
  // static clearFormField(){
  //   student.value='';
  //   subject= subject.options[0]
  //   grade = grade.options[0]
  // }

  static showAlertBox(msg,color,emoji){
    let div = document.createElement('div');
    div.setAttribute('class',`alert m-0 alert-${color} text-center`)
    div.innerHTML= `
      ${msg} ${emoji}
    `;
    container.insertBefore(div,form)
    setTimeout(() => {
      container.removeChild(div);

    },2000)
    // UI.clearFormField()
  }

}

//Storage Class : Controls Local Storage And All
class Storage {
  static loadStudent(stud){
    let studArr;
    if(localStorage.getItem('students') !== null){
      studArr = JSON.parse(localStorage.getItem('students'));
    }else{
      studArr = [];
    }
    return studArr;
  }

  static storedStudent(){
    let studentArr = 
  }
}

//Listen for Submission
form.addEventListener('submit' , e => {
  e.preventDefault();
  stud = student.value;
  subj = subject.options[subject.selectedIndex].text;
  gra = grade.options[grade.selectedIndex].text;
  console.log(stud,subj,gra)

  if(stud=='' || subj=='Subjects' || gra=='Grade'){
    UI.showAlertBox('Please Enter Field','danger','&#128394');
  }else{
    //Instantiate A new Student Register From the Students Class
    let newStudent = new Student(stud , subj , gra);
    
    //Now Push To UI to be created by the addStudToList function
    UI.addToStudList(newStudent);
    
    //Add To Student List or LocalStorage
    Storage.getStudent(newStudent);
    UI.showAlertBox('Student Added','success','&#10004');
  }
});

//Remove a Student From the List;
tableList.addEventListener('click' , e => {
  UI.removeStudent(e.target);
  UI.showAlertBox('Student Removed','danger','&#x2702')
})

//Display On Content Load
document.addEventListener('DOMContentLoaded', UI.displayStudent)

// subject.addEventListener('change',_=>{
//   console.log(subject.selectedIndex)
// })

console.log(Storage.loadStudent())