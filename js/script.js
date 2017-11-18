$(document).ready(() => {
  let input;
  let math = 0;
  let print = '';
  let dot = false;
  let action = '';
  let lastAction = '';
  let done = false;

  $('button').click(function () {
    input = $(this).val();
    
    // AC
    if (input == 'ac') {
      math = 0;
      print = '';
      action = '';
      lastAction = '';
      dot = false;
      done = false;
      $('#screen').html('0');
    } else if (input === '.' && dot) {
      // only one dot
      $('#screen').html(print);
    } else if (input === '.') {
      dot = true;
      if (print === '') {
        print = '0.';
        $('#screen').html(print);
      } else {
        print += input;
        $('#screen').html(print);
      }
    } else {
      // space on screen
      if (print.length >= 10) {
        $('#screen').html('err0r');
        alert('number too long');
      } else {
        // one 0 at start
        if (
          (print === '0' && input === '0') ||
          (print === '' && input === '0')
        ) {
          $('#screen').html('0');
        } else if (
          (print === '0' && input === '.') ||
          (print === '' && input === '.')
        ) {
          print = '0.';
          dot = true;
          $('#screen').html('0.');
        } else if (input === lastAction && input !== '=') {
          $('#screen').html(input);
        } else {
          if (
            input === '*' ||
            input === '+' ||
            input === '/' ||
            input === '-' ||
            input === '='
          ) {
            if (action === '') {
              action = input;
              lastAction = input;
              math = Number(print);
              print = '';
              dot = false;
            } else if (action === '*') {
              math *= Number(print);
              action = input;
              lastAction = input;
              print = '';
              dot = false;
            } else if (action === '+') {
              math += Number(print);
              action = input;
              lastAction = input;
              print = '';
              dot = false;
            } else if (action === '/') {
              math /= Number(print);
              action = input;
              lastAction = input;
              print = '';
              dot = false;
            } else if (action === '-') {
              math -= Number(print);
              action = input;
              lastAction = input;
              print = '';
              dot = false;
            } else {
              print = '';
              dot = false;
              action = input;
              lastAction = input;
            }
            if (action === '=') {
              done = true;
              if (math.toString().length >= 10 && math.toString().indexOf('.') >= 0) {
                const pos = math.toString().indexOf('.');
                $('#screen').html(math.toFixed(9 - pos));
              } else if (math.toString().length >= 10) {
                $('#screen').html('err0r');
                alert('number too long'); 
              } else {
                $('#screen').html(math);
              }              
            } else {
              done = false;
              $('#screen').html(input);
            }
          } else {
            if (done) {
              action = '';
              lastAction = '';
              dot = false;
              done = false;
              print += input;
              math = Number(print);
              lastAction = '';
              $('#screen').html(print);
            } else {
              print += input;
              lastAction = '';
              $('#screen').html(print);
            }
          }
        }
      }
    }
  });
});
