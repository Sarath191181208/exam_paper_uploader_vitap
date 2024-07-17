SESSIONNAME="$(pwd)"

# check for session 
tmux has-session -t "$SESSIONNAME" &> /dev/null
if [ $? != 0 ] 
 then
  # start the new session 
  tmux new-session -d -s "$SESSIONNAME"

  # Window 1: Open nvim on the current project root
  tmux new-window -t "$SESSIONNAME":1 -n 'nvim'
  tmux send-keys -t "$SESSIONNAME":1 'nvim' C-m

  # Window 2: Command line window
  tmux new-window -t "$SESSIONNAME":2 -n 'cmd'

fi

tmux attach -t "$SESSIONNAME"
