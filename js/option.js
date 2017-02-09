$(function() {
  var setMilestone;
  setMilestone = function() {
    var milestone, query, repo, token, url, user;
    user = localStorage['user'];
    repo = localStorage['repo'];
    token = localStorage['token'];
    milestone = localStorage['milestone'];
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
            value: 0,
            text: 'Choose Milestone'
          }));
          for (key in res) {
            value = res[key];
            $('#milestone').append($('<option>', {
              value: value['number'],
              text: value['title']
            }));
          }
          $('#milestone').val(milestone);
          return $('.milestone').show();
        },
        'error': function(res) {
          return console.log(url);
        }
      });
    }
  };
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
  } else if (localStorage['labels'] === '') {
    $('#labels').val('');
  } else {
    $('#labels').val('readlate, memo');
  }
  if (localStorage['milestone'] === '0') {
    $('.milestone').hide();
  } else {
    setMilestone();
  }
  return $('#save').on('click', function() {
    localStorage['user'] = $('#user').val();
    localStorage['repo'] = $('#repo').val();
    localStorage['token'] = $('#token').val();
    localStorage['labels'] = $('#labels').val();
    localStorage['milestone'] = $('#milestone').val();
    return setMilestone();
  });
});
