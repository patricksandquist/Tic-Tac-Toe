(function () {
  if (TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    this.$el.on("click", function($event) {
      var square = $($event.target);
      that.makeMove(square);
    });
  };

  View.prototype.parsePos = function(n) {
    var x = n % 3;
    var y = Math.floor(n/3);
    return [x,y];
  };

  View.prototype.makeMove = function ($square) {
    var id = $square.attr('id');
    var pos = this.parsePos(id);
    var mark = this.game.currentPlayer;
    this.game.playMove(pos);

    $square.addClass(mark);
    $square.text(mark);

    var over = this.game.isOver();
    if (over) {
      if (this.game.winner()) {
        var winner = this.game.winner();
        var loserMark = this.game.currentPlayer;
        $("." + loserMark).addClass("loser");
        $("." + winner).addClass("winner");
        $("body").append("<center>It's not a draw!  You won, " + winner +"!</center>");
      }
      else {
        // tie game
        $("li").addClass("draw");
        $("body").append("<center>It's a draw!</center>");
      }
      this.$el.off();
      $("li").addClass("over");
    }
  };

  View.prototype.setupBoard = function () {
    var list = this.$el;
    for (var i = 0; i < 9; i++) {
      list.append($('<li>'));
    }
    console.log(list.children());
    list.children().each(function(index) {
      var item = $(this);
      item.append($('<div>'));
      item.attr('id', index);
      item.children().each(function(index) {
        $(this).addClass('square');
      });
    });

    list.addClass("board");
    return list;
  };
})();
