$ ->
  console.log('check')
  $(document).on 'click', ->
    console.log('click')
    user = ''
    repo = ''
    url = ''
    title = $('title').text()
    issueTitle = "#{title} を読む"
    body = "[#{title}](#{url})"
    query = JSON.stringify({
      'title': issueTitle
      'body': body
      'labels': ['readlate', 'memo']
    })
    console.log(title)
    console.log(query)
    # url = "https://api.github.com/repos/#{user}/#{repo}/issues?access_token=#{token}"
    # $.ajax(
    #   'async': false
    #   'url': url
    #   'data': 'post'
    #   'dataType': 'json'
    # )
  console.log('end')
