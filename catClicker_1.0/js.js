var model= {
currentCat: 0,
cats: [
    {
      clickCount : 0,
      name: 'Newton',
      source: 'http://purrfectcatbreeds.com/wp-content/uploads/2014/05/russian-blue1.jpeg',
      attribution: 'Intelligent blue cat'
    },
    {
      clickCount : 0,
      name: 'Seneca',
      source: 'http://images.all-free-download.com/images/graphiclarge/cat_red_cat_cats_eye_animal_606470.jpg',
      attribution: 'A yellow cat philosophying about life'},
    {
      clickCount : 0,
      name: 'Snowhite',
      source: 'https://catsventure.com/wp-content/uploads/2017/09/grey-and-white-cat.png',
      attribution: 'Snowflake-white cat able to turn invisible in snow'
    },
  {
    clickCount : 0,
    name: 'Blueberry',
    source: 'https://i.pinimg.com/564x/61/b3/0e/61b30eda6ff81d2efe31e33ffcb42dd3.jpg',
    attribution: 'Blueberry is a magic cat'
  },
  {
    clickCount : 0,
    name: 'Cute Paw',
    source: 'http://www.cutestpaw.com/wp-content/uploads/2015/03/Aww-the-beautiful-cat.jpg',
    attribution: 'Cute Paw is a beautiful cat'
  },
  {
    clickCount : 0,
    name: 'Pharaoh Cat',
    source: 'https://www.petfleas.co.uk/blog/wp-content/uploads/2015/12/Egyptian-Mau-620x350.jpg',
    attribution: 'This is an egyptian loved during the pharaoh times'
  },
  {
    clickCount : 0,
    name: 'Manda',
    source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZP89S43FfSK51E8VOkG0J7IhOOzmUt-pl2TjwSWQSup-D2NkcA',
    attribution: 'This is a cat from Stepan Burda'
  }
  ]
};

var controller = {
  //initiates the scene by displaying the first cat in the model: image, name, counter
  init: function(){
    listView.init();
    catView.init();
    adminArea.init();
  },
  //requests re-rendering a cat
  renderCat: function(){
    catView.render();
  },
  //updates the model by a new value of the currently selected cat
  setCurrentCat: function(currentCat){
    model.currentCat = currentCat;
  },
  //reqests increasing of the counter of the currently selected cat
  increaseCounter: function(){
    model.cats[model.currentCat].clickCount++;
    catView.render();
  },
  //requests filling the admin mode controls with details of the currently displayed cat
  autofillAdminArea: function(){
    adminArea.autofillInputs();
  },
  //request hiding the admin control details
  hideAdminControls: function(){
    adminArea.hideAdminControls();
  },
  //requests re-rendering the list of cats
  refreshList: function(){
    listView.clearList();
    listView.init();
  }

};


var catView = {
  init: function(){
    //create easy to refer selectors of DOM items
    this.catName = document.getElementById('catName');
    this.catImage = document.getElementById('catImage');
    this.catCount = document.getElementById('catCount');

    //display the cat from the model as specified by the currectCat attribute value
    this.catName.textContent = model.cats[model.currentCat].name;
    this.catImage.src = model.cats[model.currentCat].source;
    this.catImage.alt = model.cats[model.currentCat].attribution;
    this.catCount.textContent = model.cats[model.currentCat].clickCount;

    //make the cat image clickable and requst increase of the displayed cat counter
    this.catImage.addEventListener('click', function(){
        controller.increaseCounter();
        controller.autofillAdminArea();
    });
  },
  //render the currently selected cat with updated values
  render: function (){
    this.catName.textContent = model.cats[model.currentCat].name;
    this.catImage.src = model.cats[model.currentCat].source;
    this.catImage.alt = model.cats[model.currentCat].attribution;
    this.catCount.textContent = model.cats[model.currentCat].clickCount;
  }
};


var listView = {
      //Create a list of cats available in the model
      init: function(){
        model.cats.forEach(function(item){
          position = model.cats.indexOf(item);
          elem = document.createElement('li');
          elem.textContent = model.cats[position].name;
          document.getElementById('catList').appendChild(elem);
              });
          //Makes every list item clickable and assures it calls for rendering the selected cat
          document.getElementById("catList").addEventListener("click",function(e) {
            //if it happens that a list item gets clicked
        	   if(e.target && e.target.nodeName == "LI") {
                //then ask to get the position of the clicked item
            		clickedItemPosition = listView.getItemPosition(e.target.textContent);
                //tell the model the number of the currently dispayed cat
                controller.setCurrentCat(clickedItemPosition);
                //and call the catView to render the cat selected from the list by its name
                controller.renderCat();
                controller.autofillAdminArea();
        	      }
              });
        },
      //Clear the existing listView
      clearList: function(){
        document.getElementById('catList').innerHTML = "";
      },
      //Get the position of the clicked list item
      getItemPosition: function(searchedName){
        for (i=0; i<model.cats.length; i++){
          if (model.cats[i].name == searchedName){
            return i;
            break;
            }
          }
        }
  }

var adminArea = {
  //Displays the admin mode
  init: function(){
    //create easy to refer selectors of DOM items
    this.adminMode = document.getElementById('adminMode');
    this.adminButton = document.getElementById('adminButton');
    this.adminControls = document.getElementById('adminControls');
    this.cancelButton = document.getElementById('cancelButton');
    this.saveButton = document.getElementById('saveButton');

    this.adminCatName = document.getElementById('admin-CatName');
    this.adminImgUrl = document.getElementById('admin-imgUrl');
    this.adminCounter = document.getElementById('admin-counter');
    //Show the admin button, make the admin-mode controls hiden
    adminArea.showAdminButton();
    adminArea.hideAdminControls();


    //ensure that if the 'Admin' button gets clicked the admin controls get displayed
    this.adminButton.addEventListener('click', function(){
      adminArea.showAdminControls();
    });
    //ensure that if the 'Cancel' button gets clicked the admin controls get hidden
    this.cancelButton.addEventListener('click', function(){
      adminArea.hideAdminControls();
    });

    //ensure that if the 'Save' button gets clicked the model gets updated by the field values
    this.saveButton.addEventListener('click', function(){
      adminArea.saveNewValues();
    })
  },

  //function responsible for showing the admin button
  showAdminButton: function(){
    this.adminButton.style.visibility = "visible";
  },
  //function responsible for hiding the admin button
  hideAdminButton: function(){
    this.adminButton.style.visibility = "hidden";
  },
  //function responsible for showing the admin controls and making sure the fields contain updated values
  showAdminControls: function(){
    this.adminControls.style.visibility = "visible";
    adminArea.autofillInputs();
  },
  //function responsible for hiding the admin controls
  hideAdminControls: function(){
    this.adminControls.style.visibility = "hidden";
  },
  //function responsible for autofilling the admin area fields with the details of the currently displayed cat
  autofillInputs: function(){
    this.adminCatName.value = model.cats[model.currentCat].name;
    this.adminCounter.value = model.cats[model.currentCat].clickCount;
    this.adminImgUrl.value = model.cats[model.currentCat].source;
  },
  /*function responsible for updating the model by values set in the admin mode fields and automatically also:
    -asks for re-rendering the list of cats in the model to display updated names
    -asks for re-rendering the currently displayed cat image in case the image source has changed
    -asks for hiding the admin controls
  */
  saveNewValues: function(){
    model.cats[model.currentCat].name = this.adminCatName.value;
    model.cats[model.currentCat].clickCount = this.adminCounter.value;
    model.cats[model.currentCat].source = this.adminImgUrl.value;
    controller.refreshList();
    controller.renderCat();
    controller.hideAdminControls();
  }

}

//Start the app
controller.init();
