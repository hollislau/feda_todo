$(function() {

  var todoList = {
    listItems: ["Submit the code challenge for the Code Fellows FEDA",
                "Pass the interview with flying colors",
                "Kick ass in the DA class",
                "Get an awesome coding job"],

    renderItem: function(index) {
      $("#add-field")
        .before("<div id='display-" + index + "' class='remove-" + index +
          "'><li id='item-" + index + "'>" + this.listItems[index] + "</li>")
        .before("<div id='modify-" + index + "' class='remove-" + index +
          "'><input id='input-" + index + "'><button id='edit-" + index +
          "' class='edit-button'>Edit</button><button id='remove-" +
          index + "' class='remove-button'>Remove</button></div></div>");
      $("#modify-" + index).hide();
    },

    renderList: function() {
      for (var i = 0; i < this.listItems.length; i++) {
        this.renderItem(i);
      }
    },

    addFadeIn: function() {
      $("#add-field").fadeOut(200, function() {
        $("#add-item").fadeIn(0, function() {
          $("#add-input").val("");
          $("#add-input").focus();
        })
      })
    },

    addFadeOut: function() {
      $("#add-input").val("");
      $("#add-item").fadeOut(0, function() {
        $("#add-field").fadeIn(200);
      })
    },

    modifyFadeIn: function(index) {
      var self = this;
      $("#display-" + index).fadeOut(200, function() {
        $("#modify-" + index).fadeIn(0, function() {
          $("#input-" + index).val(self.listItems[index]);
          $("#input-" + index).focus();
        })
      })
    },

    modifyFadeOut: function() {
      for (var i = 0; i < this.listItems.length; i++) {
        $("#modify-" + i).fadeOut(0, function() {
          $("#display-" + i).fadeIn(200);
        })
      }
    },

    addItem: function() {
      this.listItems.push($("#add-input").val());
      this.renderItem(this.listItems.length - 1);
      $("#add-input").val("");
    },

    editItem: function(index) {
      this.listItems[index] = $("#input-" + index).val();
      $("#item-" + index).text(this.listItems[index]);
    },

    removeItem: function(index) {
      for (var i = index; i < this.listItems.length; i++) {
        $(".remove-" + i).remove();
      }
      this.listItems.splice(index, 1);
      for (var i = index; i < this.listItems.length; i++) {
        this.renderItem(i);
      }
    },

    clickListener: function() {
      var self = this;
      $(document).on("click", function(e) {
        var target = $(e.target);
        var targetIndex = "";
        if (target.attr("id")) {
          var idArray = target.attr("id").split("-");
          targetIndex = idArray[idArray.length - 1];
        }
        if (target.is("#add-text, li")) {
          if (target.is("#add-text")) {
            self.modifyFadeOut();
            self.addFadeIn();
          } else {
            self.modifyFadeOut();
            self.addFadeOut();
            self.modifyFadeIn(targetIndex);
          }
        } else if (target.is("input")) {
          return;
        } else if (target.is("#add-button")) {
          if ($("#add-input").val()) {
            self.addItem();
          }
          self.addFadeOut();
        } else if (target.is(".edit-button")) {
          self.editItem(targetIndex);
          self.modifyFadeOut();
        } else if (target.is(".remove-button")) {
          self.removeItem(targetIndex);
        } else {
          self.addFadeOut();
          self.modifyFadeOut();
        }
      })
    },

    keyListener: function() {
      var self = this;
      $(document).on("keydown", function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        var target = $(e.target);
        var targetIndex = "";
        if (target.attr("id")) {
          var idArray = target.attr("id").split("-");
          targetIndex = idArray[idArray.length - 1];
        }
        if (target.is("input")) {
          if (code == 13) {
            e.preventDefault();
            if (target.is("#add-input")) {
              if ($("#add-input").val()) {
                self.addItem();
              }
            } else {
              self.editItem(targetIndex);
            }
            self.addFadeOut();
            self.modifyFadeOut();
          } else if (code == 27) {
            self.addFadeOut();
            self.modifyFadeOut();
          }
        } else if (code == 13) {
          self.addFadeIn();
        }
      })
    }
  }

  todoList.renderList();
  todoList.clickListener();
  todoList.keyListener();

});
