

$( document ).ready(function() {
  
  var i4s = new Array();
  
  $(".i4").each(function(){
    
    var thisi4 = new i4($(this).attr("id"));

    i4s.push(i4);
    
    thisi4.init();

  });
  
          
  for (var i=0; i < i4s.length; i++) {
    i4s[i].init();

  }  
  
});


var i4 = function(id){
  this.id = id;
  this.sel = "#" + id;
  this.closedWidth = 10;
  this.numItems = 1;
  this.currentPos = 0;
};

i4.prototype.init = function(){
  var sel = this.sel;
  var self = this;

  this.numItems = $(sel).children(".item").length;
  this.openWidth = 100 - ((this.numItems - 1) * this.closedWidth);
  console.log("init " + this.id + " / " + this.numItems);

  var i = 0;
  var offset = 0;
  $(sel).children(".item").each(function(){

    if($(this).hasClass('open')){
      var thisWidth = self.openWidth;
    }else{
      var thisWidth = self.closedWidth;
    }
    $(this).css("left",offset + "%");
    $(this).css("right",(offset + thisWidth) + "%");
    $(this).attr("data-pos",i).attr("id",self.id + "-" + i);
    
    offset += thisWidth;
    
    i++;
  });      
  $(sel).children(".item.open").width(this.openWidth + "%");
  $(sel).find(".item.open .content").show();
  
  $(sel).children().click(function(){
    self.open($(this).data('pos'));
  });
    
};
i4.prototype.open = function(pos){
  var sel = this.sel;
  var self = this;
  if(pos != this.currentPos){
 
    this.currentPos = pos;
 
    var openId = "#" + this.id + "-" + pos;
    
    $(sel).children().each(function(){
    
      if($(this).data('pos') != pos){
        if (pos < $(this).data('pos')){
          var leftOffset = self.openWidth + (($(this).data('pos') - 1) * self.closedWidth);
        }else{
          var leftOffset = $(this).data('pos') * self.closedWidth;
        }
        
      
        $(this).animate({
          width: self.closedWidth + "%",
          left: leftOffset + "%"
        },1000).removeClass("open").addClass("closed");
      
      }else{
        $(this).animate({
          left: (self.closedWidth * pos) + "%",
          width: self.openWidth + "%"
        },1000).removeClass("closed").addClass("open");
      }
    });
 
  
    
  }
}



