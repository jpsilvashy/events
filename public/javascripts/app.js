
// Sound for when events occur
var eventSound = new Audio("audio/recieve.wav");

function insertIntoStream(data) {
  var data = JSON.parse(data);

  console.log(data);

  var html = '<div class="event">' +
    '<div class="content">' +
      '<time class="timeago date" datetime=' + data.timestamp + '>' + data.timestamp + '</time>' +
      '<div class="summary">' + data.message.message + '</div>' +
      '<pre class="extra text params">' + prettyPrintJson(data) + '</pre>' +
    '</div>' +
  '</div>'

  $('#events').prepend(html).find('time').timeago();
  eventSound.play();
}

function updateStatus(status, color) {
  console.log({ status: status });
  $('#status').html("<span class='ui " + color + " label'>" + status + "</span>");
  $('#transport').html(io.transports.join(", "));
}

function prettyPrintJson(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2);
  }

  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }

    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function toggleParams() {
  $('.ui.feed .extra').toggle();
}

$(function(){

  $("time.timeago").timeago();

  $('.ui.checkbox').checkbox();

  // $('.ui.checkbox input:checkbox').click(function() {
  //   if ($(this).is(':checked')) {
  //     toggleParams()
  //   } else {
  //     toggleParams()
  //   }
  // });

  $("#send-event").submit(function(event) {
    event.preventDefault();

    var eventData = $(this).serialize();

    console.log(eventData);
    console.log($("#send-event"));

    $.ajax({
      type: "POST",
      url: "/",
      data: eventData,
      dataType: "json",
      success: function(data) {
        console.log(jQuery.parseJSON(data));
      },
      error: function(data){
        console.log('error sending event: ', data);
      }
    });
  })

  var socket = io.connect(window.location.hostname);

  $('#transport').html(io.transports.join(", "));

  socket.on('event', function(data) {
    insertIntoStream(data);
  });

  socket.on('error', function(event) {
    updateStatus('error', 'red');
  });

  socket.on('connect', function(event) {
    updateStatus('connected', 'green');

  });

  socket.on('disconnect', function(event) {
    updateStatus('disconnected', 'red');
  });

  socket.on('newListener', function(event) {
    console.log('newListener');
  });

});
