note over browser:
add note to notes array
end note
note over browser:
clear currently rendered notes and
render notes on screen
end note
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/now_note_spa
server-->browser: "{"message":"note created"}"
