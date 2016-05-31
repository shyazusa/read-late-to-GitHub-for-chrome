c = chrome
ws = c.windows
tbs = c.tabs
$ ->
  $(document).on 'click', '#issue-button', ->
    ws.getCurrent (window) ->
      tbs.getSelected window.id, (tab) ->
        user = ''
        repo = ''
        token = ''
        url = tab.url
        title = tab.title
        issueTitle = "#{title} を読む"
        body = "[#{title}](#{url})"
        query = JSON.stringify({
          'title': issueTitle
          'body': body
          'assignee': user
          'labels': ['readlate', 'memo']
        })
        url = "https://api.github.com/repos/#{user}/#{repo}/issues?access_token=#{token}"
        $.ajax
          'async': false
          'url': url
          'type': 'post'
          'data': query
          'dataType': 'json'
          'success': (res) ->
            $('.message').text("Make new issue #{issueTitle} from #{res.html_url}")
