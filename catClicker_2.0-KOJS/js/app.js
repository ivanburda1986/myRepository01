var cats = [
    {
      clickCount : 0,
      name: 'Newton',
      imgSrc: 'http://purrfectcatbreeds.com/wp-content/uploads/2014/05/russian-blue1.jpeg',
      attribution: 'Intelligent blue cat',
      nicknames:['Bluey']
    },
    {
      clickCount : 0,
      name: 'Seneca',
      imgSrc: 'http://images.all-free-download.com/images/graphiclarge/cat_red_cat_cats_eye_animal_606470.jpg',
      attribution: 'A yellow cat philosophying about life'},
    {
      clickCount : 0,
      name: 'Snowhite',
      imgSrc: 'https://catsventure.com/wp-content/uploads/2017/09/grey-and-white-cat.png',
      attribution: 'Snowflake-white cat able to turn invisible in snow',
      nicknames:['Whitey']
    },
  {
    clickCount : 0,
    name: 'Blueberry',
    imgSrc: 'https://i.pinimg.com/564x/61/b3/0e/61b30eda6ff81d2efe31e33ffcb42dd3.jpg',
    attribution: 'Blueberry is a magic cat',
    nicknames:['Blueberrish']
  },
  {
    clickCount : 0,
    name: 'Cute Paw',
    imgSrc: 'http://www.cutestpaw.com/wp-content/uploads/2015/03/Aww-the-beautiful-cat.jpg',
    attribution: 'Cute Paw is a beautiful cat',
    nicknames:['Pawie']
  },
  {
    clickCount : 0,
    name: 'Pharaoh Cat',
    imgSrc: 'https://www.petfleas.co.uk/blog/wp-content/uploads/2015/12/Egyptian-Mau-620x350.jpg',
    attribution: 'This is an egyptian loved during the pharaoh times',
    nicknames:['Egyptian']
  },
  {
    clickCount : 0,
    name: 'Manda',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZP89S43FfSK51E8VOkG0J7IhOOzmUt-pl2TjwSWQSup-D2NkcA',
    attribution: 'This is a cat from Stepan Burda',
    nicknames:['Mandik']
  }
  ]



var Cat = function(data){
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.nicknames = ko.observableArray(data.nicknames);
  this.title = ko.computed(function(){
    var title;
    var clicks = this.clickCount();
    if(clicks<10){
      title = "Newborn";
    } else if(clicks<5){
      title = "Infant";
    } else if(clicks<10){
      title = "Child";
    } else if(clicks<20){
      title = "Teen";
    } else if(clicks<30){
      title = "Adult";
    } else{
      title = "Ninja";
    };
    return title;
  }, this);

};



var ViewModel = function (){
var self = this;
this.catList = ko.observableArray([]);
cats.forEach(function(catItem){
  self.catList.push(new Cat(catItem));
});

this.currentCat = ko.observable(this.catList()[0]);

this.incrementCounter = function(){
  self.currentCat().clickCount(self.currentCat().clickCount()+1);
  };

this.setCat = function(clickedCat){
  self.currentCat(clickedCat);
}

};

ko.applyBindings(new ViewModel());
