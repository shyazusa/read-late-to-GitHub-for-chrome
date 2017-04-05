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
        if localStorage['user']
          user = localStorage['user']
        if localStorage['repo']
          repo = localStorage['repo']
        if localStorage['token']
          token = localStorage['token']
        if localStorage['labels'] isnt ''
          labelStr = localStorage['labels']
        if localStorage['milestone']
          milestone = localStorage['milestone']
        url = tab.url
        title = tab.title
        issueTitle = "Read later #{title}"
        body = "[#{title}](#{url})"
        query = {
          'title': issueTitle
          'body': body
          'assignee': user
        }
        if labelStr
          labels = "#{labelStr}".split ','
          query.labels = labels
        $('.message').text typeof(milestone) + ' : ' + milestone
        if milestone isnt '0'
          query.milestone = milestone
        query = JSON.stringify query
        url = "https://api.github.com/repos/#{user}/#{repo}/issues?access_token=#{token}"
        $.ajax
          'async': false
          'url': url
          'type': 'post'
          'data': query
          'dataType': 'json'
          'success': (res) ->
            $('.message').text("Create new issue!")
            $('.message').after("<p><a target=\"_blank\" href=\"#{res.html_url}\">#{issueTitle}</a></p>")
