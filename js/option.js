$(function() {
  if (localStorage['user']) {
    $('#user').val(localStorage['user']);
  } else {
    $('#user').val('Enter the GitHub user name');
  }
  if (localStorage['repo']) {
    $('#repo').val(localStorage['repo']);
  } else {
    $('#repo').val('Enter the GitHub repositori name');
  }
  if (localStorage['token']) {
    $('#token').val(localStorage['token']);
  } else {
    $('#token').val('Enter the GitHub Personal access token');
  }
  return $('#save').on('click', function() {
    localStorage['user'] = $('#user').val();
    localStorage['repo'] = $('#repo').val();
    return localStorage['token'] = $('#token').val();
  });
});
