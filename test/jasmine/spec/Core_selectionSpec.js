describe('Core_selection', function () {
  var $container,
    id = 'testContainer';

  beforeEach(function () {
    $container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if($container) {
      $container.remove();
    }
  });

  it('should call onSelection callback', function () {
    var output = null;

    runs(function () {
      $container.handsontable({
        onSelection: function (r, c) {
          output = [r, c];
        }
      });
      $container.handsontable('selectCell', 1, 2);
    });

    waitsFor(function () {
      return (output != null)
    }, "onSelection callback called", 100);

    runs(function () {
      expect(output[0]).toEqual(1);
      expect(output[1]).toEqual(2);
    });
  });

  it('this should point to handsontable rootElement', function () {
    var output = null;

    runs(function () {
      $container.handsontable({
        onSelection: function () {
          output = this;
        }
      });
      $container.handsontable('selectCell', 0, 0);
    });

    waitsFor(function () {
      return (output != null)
    }, "onChange callback called", 100);

    runs(function () {
      expect(output).toEqual($container.get(0));
    });
  });
});