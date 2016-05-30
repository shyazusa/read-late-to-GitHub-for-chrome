var c, tbs, ws;

c = chrome;

ws = c.windows;

tbs = c.tabs;

$(function() {
  return $(document).on('click', '#issue-button', function() {
    return ws.getCurrent(function(window) {
      return tbs.getSelected(window.id, function(tab) {
        var body, issueTitle, query, repo, title, token, url, user;
        user = '';
        repo = '';
        token = '';
        url = tab.url;
        title = tab.title;
        issueTitle = title + " を読む";
        body = "[" + title + "](" + url + ")";
        query = JSON.stringify({
          'title': issueTitle,
          'body': body,
          'labels': ['readlate', 'memo']
        });
        url = "https://api.github.com/repos/" + user + "/" + repo + "/issues?access_token=" + token;
        return $.ajax({
          'async': false,
          'url': url,
          'type': 'post',
          'data': query,
          'dataType': 'json',
          'success': function(res) {
            return $('.message').text("Make new issue " + issueTitle + " from " + res.html_url);
          }
        });
      });
    });
  });
});
