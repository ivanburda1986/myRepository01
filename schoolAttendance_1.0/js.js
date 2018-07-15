var model = {
  ivan: [
    { lesson: 1,
      state: 1,
    },
    { lesson: 2,
      state: 1,
    },
    { lesson: 3,
      state: 1,
    },
    { lesson: 4,
      state: 0,
    },
    { lesson: 5,
      state: 0,
    },
    { lesson: 6,
      state: 0,
    },
    { lesson: 7,
      state: 0,
    },
    { lesson: 8,
      state: 0,
    },
    { lesson: 9,
      state: 0,
    },
    { lesson: 10,
      state: 0,
    },
    { lesson: 11,
      state: 0,
    },
    { lesson: 12,
      state: 0,
    },
    {total: 12},
    {name: "ivan"}
  ],
  stepan: [

      { lesson: 1,
        state: 0,
      },
      { lesson: 2,
        state: 0,
      },
      { lesson: 3,
        state: 0,
      },
      { lesson: 4,
        state: 0,
      },
      { lesson: 5,
        state: 0,
      },
      { lesson: 6,
        state: 0,
      },
      { lesson: 7,
        state: 0,
      },
      { lesson: 8,
        state: 0,
      },
      { lesson: 9,
        state: 0,
      },
      { lesson: 10,
        state: 0,
      },
      { lesson: 11,
        state: 0,
      },
      { lesson: 12,
        state: 0,
      },
      {total: 12},
      {name: "stepan"}
  ],
  zdenek: [
      { lesson: 1,
        state: 0,
      },
      { lesson: 2,
        state: 0,
      },
      { lesson: 3,
        state: 0,
      },
      { lesson: 4,
        state: 0,
      },
      { lesson: 5,
        state: 0,
      },
      { lesson: 6,
        state: 0,
      },
      { lesson: 7,
        state: 0,
      },
      { lesson: 8,
        state: 1,
      },
      { lesson: 9,
        state: 1,
      },
      { lesson: 10,
        state: 0,
      },
      { lesson: 11,
        state: 0,
      },
      { lesson: 12,
        state: 0,
      },
      {total: 12},
      {name: "zdenek"}
  ],
  ivona: [
      { lesson: 1,
        state: 0,
      },
      { lesson: 2,
        state: 0,
      },
      { lesson: 3,
        state: 0,
      },
      { lesson: 4,
        state: 0,
      },
      { lesson: 5,
        state: 0,
      },
      { lesson: 6,
        state: 0,
      },
      { lesson: 7,
        state: 1,
      },
      { lesson: 8,
        state: 1,
      },
      { lesson: 9,
        state: 1,
      },
      { lesson: 10,
        state: 1,
      },
      { lesson: 11,
        state: 1,
      },
      { lesson: 12,
        state: 1,
      },
      {total: 12},
      {name: "ivona"}
  ],
  martina: [
      { lesson: 1,
        state: 1,
      },
      { lesson: 2,
        state: 0,
      },
      { lesson: 3,
        state: 0,
      },
      { lesson: 4,
        state: 0,
      },
      { lesson: 5,
        state: 1,
      },
      { lesson: 6,
        state: 1,
      },
      { lesson: 7,
        state: 0,
      },
      { lesson: 8,
        state: 0,
      },
      { lesson: 9,
        state: 0,
      },
      { lesson: 10,
        state: 0,
      },
      { lesson: 11,
        state: 0,
      },
      { lesson: 12,
        state: 1,
      },
      {total: 12},
      {name: "martina"}
  ]
};


var controller = {
  init: function(){
    checkboxes.init(); //initialize checkboxes by giving them the clickability function
    total.init();

  }
};

var generateHtml = {
  //Take the model and generate the HTML structure based on it
};

var checkboxes = {
  init: function(){
    //get all checkboxes with the class "checkbox"
    var checkboxList = Array.from(document.getElementsByClassName('checkbox'));
    //assign to each of the obtained checbkoxes an on-click event listener
    checkboxList.forEach(function(individualCheckbox){
      individualCheckbox.addEventListener('click',function(){
        //for a checkboxes which gets clicked: get the name of the student this checkbox belongs to by getting the assigned "id"
        var studentName = this.parentNode.parentNode.getAttribute('id');
        //call a function which gets a list of checkboxes related to a specific student
        var individualStudentCheckboxes = checkboxes.getIndividualStudentCheckboxes(studentName);
        //call a function which gets the position of the clicked checkbox out of all checkboxes related to the specific student
        var indexOfIndividualStudentCheckbox = checkboxes.getCheckboxNumber(individualStudentCheckboxes, this);
        //console.log(indexOfIndividualStudentCheckbox);
        checkboxes.changeAttendanceState(studentName, indexOfIndividualStudentCheckbox);
        });
      }),
      //check the checkboxes on start based on the initial model state
      checkboxes.modelBasedChecking();
    },

  modelBasedChecking: function(){
    //Check the checkboxes based on the initial model state
    Object.keys(model).forEach(function(key){ //One by one select an object in the model and iterate through its individual lessons
      for(i=0; i<12; i++){
        if(model[key][i].state == 1){     //If a state of a specific lesson is 1
          var currentCheckboxRow = model[key][13].name; //Select the <tr> with the #id of the currently iterrated model object
          document.getElementById(currentCheckboxRow).children[i+1].children[0].checked = true; //And for the currently checked lesson mark the matching child number <td> as checked
            }
          }
      })
  },

  getIndividualStudentCheckboxes: function(studentName){
    //turn the retrieved student name into lowercase and concatenate with the string "checkbox" to get the studen-specific class name of the checkbox, e.g. "ivanCheckbox"
    var concatenated = studentName.toLowerCase()+"Checkbox";
    //get all checkboxes for the individual student
    var individualStudentCheckboxList = Array.from(document.getElementsByClassName(concatenated));
    //return the list of the checkboxes related to the individual student
    return individualStudentCheckboxList;
  },

  getCheckboxNumber: function(individualStudentCheckboxes, individualCheckbox){
    //take an array of checkboxes of the individual student and get the position of the checkbox which just got clicked;
    return individualStudentCheckboxes.indexOf(individualCheckbox);
  },

  changeAttendanceState: function(studentName,lesson){
    if(model[studentName][lesson].state == 0){
      model[studentName][lesson].state = 1;
    }else{
      model[studentName][lesson].state = 0;
    }
    total.calculateTotals();
    total.render();
  }
};

var total = {
  init: function(){
    //??? Could there be a function instaed which would create the selector of DOM elements dynamically based on the model?
    this.ivanTotal = document.getElementById('ivanTotal');
    this.stepanTotal = document.getElementById('stepanTotal');
    this.zdenekTotal = document.getElementById('zdenekTotal');
    this.ivonaTotal = document.getElementById('ivonaTotal');
    this.martinaTotal = document.getElementById('martinaTotal');
    total.calculateTotals(); //calculate the attendence total for each students based on the initial state of the app
    total.render(); //display updated totals based on the calculatedTotals

  },
  calculateTotals: function(){
    //calculate updated totals for all model objects
    Object.keys(model).forEach(function (key) { //selects the "model" and for each key in the model perform an action
      var summary = 12;    //locally-held summary
            for (i=0; i<12; i++){ //for each of the model's keys individually go through its elements, take their individual state value and add it to the locally-held summary
              summary = summary-model[key][i].state ///
              }
            model[key][12].total = summary; //for each of the model's keys individually take the calculated summary and assign its value to the "total" of the specific object
            summary = 0; //set the locally-held summary to zero, so that the next key of the model starts with the calculations from scratch
          })
    },
    //display the updated totals onscreen
  render: function(){
    //??? Could there be a function which would do the rendering for all objects dynamically based on the model?
    this.ivanTotal.textContent = model.ivan[12].total;
    this.stepanTotal.textContent = model.stepan[12].total;
    this.zdenekTotal.textContent = model.zdenek[12].total;
    this.ivonaTotal.textContent = model.ivona[12].total;
    this.martinaTotal.textContent = model.martina[12].total;
    }
  }





controller.init();
