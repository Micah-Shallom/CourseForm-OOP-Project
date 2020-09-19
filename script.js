const form = document.getElementById('form')
let student = document.getElementById('studentInput')
let subject = document.getElementById('subjectInput')
let grade = document.getElementById('gradeInput')
const submitBtn = document.getElementById('submit');
const tableList = document.getElementById('table-list');
const container = document.querySelector('.container');
const button =  document.getElementById('btn');


//Book Class : Create a New Book
class Student {
  constructor(student , subject , grade , id){
    this.student = student;
    this.subject = subject;
    this.grade = grade;
    this.id = id;
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
      <td> <a href='#' id='${stud.id}' class='removeLink'><i class="fa text-danger fa-trash" aria-hidden="true"></i></a> </td>
    `;
    tableList.appendChild(tableRow);
    console.log(stud.id);
  }

  static displayStudent(){
    let studentArr;
    if(localStorage.getItem('students')){
      studentArr = JSON.parse(localStorage.getItem('students'));
      studentArr.forEach(stud=>UI.addToStudList(stud))
    }
  }

  static removeStudent(studentEl){
    if(studentEl.classList.contains('fa')){
      let remstudent = studentEl.parentElement.parentElement.parentElement;
      let remStudId = studentEl.parentElement.id;
      tableList.removeChild(remstudent);

      let getStored = JSON.parse(localStorage.getItem('students'));
      let newStored = getStored.filter(item => item.id != remStudId)
      localStorage.setItem('students', JSON.stringify(newStored))
    }
  }
  static clearFormField(){
    student.value='';
    subject= subject.options[0]
    grade = grade.options[0]
  }

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
  }
}

//Storage Class : Controls Local Storage And All
class Storage {
  static loadStudent(stud){
    let studArr;
    if(localStorage.getItem('students')){
      studArr = JSON.parse(localStorage.getItem('students'));
    }else{
      studArr = [];
    }
    studArr.push(stud);
    localStorage.setItem('students',JSON.stringify(studArr));
  }
  
}

//Listen for Submission
form.addEventListener('submit' , e => {
  e.preventDefault();
  stud = student.value;
  subj = subject.options[subject.selectedIndex].text;
  gra = grade.options[grade.selectedIndex].text;
  
  if(stud=='' || subj=='Subjects' || gra=='Grade'){
    UI.showAlertBox('Please Enter All Fields Correctly','danger','&#128394');
  }else{
    //Instantiate A new Student Register From the Students Class
    let studId = Date.now();
    console.log(studId);
    let newStudent = new Student(stud , subj , gra , studId);
    
    //Now Push To UI to be created by the addStudToList function.
    UI.addToStudList(newStudent);
    
    //Add To Student List or LocalStorage
    Storage.loadStudent(newStudent);
    UI.showAlertBox('Student Added','success','&#10004');

    // clearAllFields
    UI.clearFormField()
  }
 
});


//Remove a Student From the List;
tableList.addEventListener('click' , e => {
  UI.removeStudent(e.target);
  UI.showAlertBox('Student Removed','danger','&#x2702')
});

// Remove all items 
button.addEventListener('click', _ => {
  localStorage.removeItem('students');
  document.querySelector('.table-list').remove()
})

//Display List On Content Load
document.addEventListener('DOMContentLoaded', UI.displayStudent())


