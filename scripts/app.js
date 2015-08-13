/**
 * Created by Mortoni on 12/08/2015.
 */
function edit() {
    $('.view').hide()
    $('.edit').show()
}

function cancel() {
    $('.view').show()
    $('.edit').hide()
}

function save(username) {
    $.ajax('/' + username, {
          method: 'PUT',
          data: {
              street: $('#street').val(),
              city: $('#city').val(),
              state: $('#state').val(),
              zip: $('#zip').val()
          },
      complete: function () {
            cancel()
            location.reload()
          }
    })
}

function del(username) {
    $.ajax('/' + username, {
        method: 'DELETE',
        complete: function () {
            location = '/'
        }
    })
}
