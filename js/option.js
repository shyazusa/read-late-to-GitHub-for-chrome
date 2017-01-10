$(function() {
  var setMilestone;
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
  if (localStorage['labels']) {
    $('#labels').val(localStorage['labels']);
  } else {
    $('#labels').val('readlate, memo');
  }
  $('.milestone').hide();
  $('#save').on('click', function() {
    localStorage['user'] = $('#user').val();
    localStorage['repo'] = $('#repo').val();
    localStorage['token'] = $('#token').val();
    localStorage['labels'] = $('#labels').val();
    return setMilestone();
  });
  return setMilestone = function() {
    var query, repo, token, url, user;
    user = localStorage['user'];
    repo = localStorage['repo'];
    token = localStorage['token'];
    if (user === null || user === 'Enter the GitHub user name') {
      user = null;
    }
    if (repo === null || repo === 'Enter the GitHub repositori name') {
      repo = null;
    }
    if (user && repo) {
      query = JSON.stringify({
        'state': 'all',
        'sort': 'due_on',
        'direction': 'asc'
      });
      url = "https://api.github.com/repos/" + user + "/" + repo + "/milestones?access_token=" + token;
      return $.ajax({
        'async': false,
        'url': url,
        'type': 'get',
        'data': query,
        'dataType': 'json',
        'success': function(res) {
          var key, value;
          $('#milestone option').remove();
          $('#milestone').append($('<option>', {
            value: null,
            text: 'Choose Milestone'
          }));
          for (key in res) {
            value = res[key];
            $('#milestone').append($('<option>', {
              value: value['number'],
              text: value['title']
            }));
          }
          return $('.milestone').show();
        },
        'error': function(res) {
          return console.log(url);
        }
      });
    }
  };
});
