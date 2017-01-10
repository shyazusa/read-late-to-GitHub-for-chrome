$ ->

  if localStorage['user']
    $('#user').val(localStorage['user'])
  else
    $('#user').val('Enter the GitHub user name')
  if localStorage['repo']
    $('#repo').val(localStorage['repo'])
  else
    $('#repo').val('Enter the GitHub repositori name')
  if localStorage['token']
    $('#token').val(localStorage['token'])
  else
    $('#token').val('Enter the GitHub Personal access token')
  if localStorage['labels']
    $('#labels').val(localStorage['labels'])
  else
    $('#labels').val('readlate, memo')

  $('.milestone').hide()
  $('#save').on 'click', ->
    localStorage['user'] = $('#user').val()
    localStorage['repo'] = $('#repo').val()
    localStorage['token'] = $('#token').val()
    localStorage['labels'] = $('#labels').val()
    # Show Milestones
    setMilestone()
    $('.milestone').show()

  # Set Milestones
  setMilestone = ->
    user = localStorage['user']
    repo = localStorage['repo']
    token = localStorage['token']
    if user == null || user == 'Enter the GitHub user name'
      user = null
    if repo == null || repo == 'Enter the GitHub repositori name'
      repo = null
    console.log user
    console.log repo
    if user && repo
      query = JSON.stringify({
        'state': 'all'
        'sort': 'due_on'
        'direction': 'asc'
      })
      url = "https://api.github.com/repos/#{user}/#{repo}/milestones?access_token=#{token}"
      $.ajax
        'async': false
        'url': url
        'type': 'get'
        'data': query
        'dataType': 'json'
        'success': (res) ->
          # $('.message').text "Create new issue!"
          # $('.message').after "<p><a target=\"_blank\" href=\"#{res.html_url}\">#{issueTitle}</a></p>"
          console.log 'Catch milestones'
