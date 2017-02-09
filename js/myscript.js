var c, tbs, ws;

c = chrome;

ws = c.windows;

tbs = c.tabs;

$(function() {
  return $(document).on('click', '#issue-button', function() {
    return ws.getCurrent(function(window) {
      return tbs.getSelected(window.id, function(tab) {
        var body, issueTitle, labelStr, labels, milestone, query, repo, title, token, url, user;
        user = '';
        repo = '';
        token = '';
        if (localStorage['user']) {
          user = localStorage['user'];
        }
        if (localStorage['repo']) {
          repo = localStorage['repo'];
        }
        if (localStorage['token']) {
          token = localStorage['token'];
        }
        if (localStorage['labels'] !== '') {
          labelStr = localStorage['labels'];
        }
        if (localStorage['milestone']) {
          milestone = localStorage['milestone'];
        }
        url = tab.url;
        title = tab.title;
        issueTitle = "Read later " + title;
        body = "[" + title + "](" + url + ")";
        query = {
          'title': issueTitle,
          'body': body,
          'assignee': user
        };
        if (labelStr) {
          labels = ("" + labelStr).split(',');
          query.labels = labels;
        }
        $('.message').text(typeof milestone + ' : ' + milestone);
        if (milestone !== '0') {
          query.milestone = milestone;
        }
        query = JSON.stringify(query);
        url = "https://api.github.com/repos/" + user + "/" + repo + "/issues?access_token=" + token;
        return $.ajax({
          'async': false,
          'url': url,
          'type': 'post',
          'data': query,
          'dataType': 'json',
          'success': function(res) {
            $('.message').text("Create new issue!");
            return $('.message').after("<p><a target=\"_blank\" href=\"" + res.html_url + "\">" + issueTitle + "</a></p>");
          }
        });
      });
    });
  });
});
