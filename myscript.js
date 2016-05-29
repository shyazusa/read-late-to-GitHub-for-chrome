$(function() {
  console.log('check');
  $(document).on('click', function() {
    var body, issueTitle, query, repo, title, url, user;
    console.log('click');
    user = '';
    repo = '';
    url = '';
    title = $('title').text();
    issueTitle = title + " を読む";
    body = "[" + title + "](" + url + ")";
    query = JSON.stringify({
      'title': issueTitle,
      'body': body,
      'labels': ['readlate', 'memo']
    });
    console.log(title);
    return console.log(query);
  });
  return console.log('end');
});
