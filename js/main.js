$(function() {

  var todoList = {
    listItems: ["Submit the code challenge for the Front End Dev Accelerator",
                "Successfully pass the interview",
                "Learn to code in class",
                "Get an awesome web development job"],
    eventTarget: "",
    targetIndex: "",

    renderItem: function(index) {
      $("#add-field")
        .before("<div id='display-" + index + "' class='remove-" + index +
          " display'><li id='item-" + index + "'>" + this.listItems[index] + "</li>")
        .before("<div id='modify-" + index + "' class='remove-" + index +
          " modify'><input id='input-" + index + "'><button id='edit-" + index +
          "' class='edit-button'>Edit</button><button id='remove-" + index +
          "' class='remove-button'>Remove</button></div></div>");
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
      $("#add-item:visible").fadeOut(0, function() {
        $("#add-field:hidden").fadeIn(200);
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
      $(".modify:visible").fadeOut(0, function() {
        $(".display:hidden").fadeIn(200);
      })
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
      this.listItems.splice(index, 1);
      for (var i = index; i < this.listItems.length; i++) {
        $("#item-" + i).text(this.listItems[i]);
      }
      $(".remove-" + this.listItems.length).remove();
    },

    setTargetRefs: function(event) {
      this.eventTarget = $(event.target)
      if (this.eventTarget.attr("id")) {
        var idArray = this.eventTarget.attr("id").split("-");
        this.targetIndex = idArray[idArray.length - 1];
      }
    },

    loadListData: function() {
      var listData = JSON.parse(localStorage.getItem("listData"));
      if (listData) {
        this.listItems = listData;
      }
    },

    storeListData: function() {
      var self = this;
      $(window).on("unload", function() {
        localStorage.setItem("listData", JSON.stringify(self.listItems));
      })
    },

    addClickListener: function() {
      var self = this;
      $(document).on("click", function(e) {
        self.setTargetRefs(e);
        if (self.eventTarget.is("#add-text, li")) {
          if (self.eventTarget.is("#add-text")) {
            self.modifyFadeOut();
            self.addFadeIn();
          } else {
            self.modifyFadeOut();
            self.addFadeOut();
            self.modifyFadeIn(self.targetIndex);
          }
        } else if (self.eventTarget.is("input")) {
          return;
        } else if (self.eventTarget.is("#add-button")) {
          if ($("#add-input").val()) {
            self.addItem();
          }
          self.addFadeOut();
        } else if (self.eventTarget.is(".edit-button")) {
          self.editItem(self.targetIndex);
          self.modifyFadeOut();
        } else if (self.eventTarget.is(".remove-button")) {
          self.removeItem(self.targetIndex);
          self.modifyFadeOut();
        } else {
          self.addFadeOut();
          self.modifyFadeOut();
        }
      })
    },

    addKeyListener: function() {
      var self = this;
      $(document).on("keydown", function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        self.setTargetRefs(e);
        if (self.eventTarget.is("input")) {
          if (code == 13) {
            e.preventDefault();
            if (self.eventTarget.is("#add-input")) {
              if ($("#add-input").val()) {
                self.addItem();
              }
            } else {
              self.editItem(self.targetIndex);
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

  todoList.loadListData();
  todoList.renderList();
  todoList.addClickListener();
  todoList.addKeyListener();
  todoList.storeListData();

});
