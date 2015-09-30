(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
    
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var list = this.$el;
    for (var i = 0; i < 9; i++) {
      var item = list.append($('<li>'));
      var square = item.append($('<div>'));
      square.addClass('square');
    }
    list.addClass("board");
    return list;
  };
})();
