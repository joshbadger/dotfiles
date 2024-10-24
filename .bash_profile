export PYTHON_CONFIGURE_OPTS="--enable-framework"
# export HOMEBREW_NO_AUTO_UPDATE=1

export PATH=/usr/local/opt/openssl@1.1/bin:$PATH:$PYTHONPATH:$M2_HOME/bin/:$GOPATH/bin:$GOROOT/bin:$HOME

 # Set PATH, MANPATH, etc., for Homebrew.
eval "$(/opt/homebrew/bin/brew shellenv)"

export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# bash things
    # colors
    export CLICOLOR=1
    export LSCOLORS=ExFxBxDxCxegedabagacad

    # history
    shopt -s histappend # always append to history so we preserve bash history between sessions
    HISTSIZE=10000000 # embiggen history size

    #colored tab completion
    set colored-stats on

    # bash completion
    [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

    # set -o vi

# kube
    #source ~/bin/kubectl-completion.sh

# git
    source ~/bin/git-completion.sh
    source ~/bin/git-prompt.sh

# prompt
    # end forces prompt to start at the bottom
    end=$(tput cup 9999 0)
    export PS1='${end} \u@ibotta \W$(__git_ps1 " (\[\e[94m\]%s\[\e[39m\])")\$ '
    export GIT_PS1_SHOWDIRTYSTATE=1
    export GIT_PS1_SHOWUNTRACKEDFILES=1

    # fix `clear` to keep the cursor on the bottom
    __prompt_to_bottom_line() {
        tput cup $LINES
    }
    alias clear='clear && __prompt_to_bottom_line'

# aws
    complete -C '/usr/local/bin/aws_completer' aws # aws CLI tab completion

# Aliases
    # bash
    alias res='exec -l $SHELL'
    alias ls='ls -G'
    # alias tf='terraform'
    alias flushcache='sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'
    alias spot='spotify-terminal.py -u joshuabadger'

    # rc related
    alias rc='vim ~/.bash_profile'
    alias sourcerc='source ~/.bash_profile'
    alias vimrc='vim ~/.vimrc'
    # alias zrc='vim ~/.zshrc'
    # alias zenv='vim ~/.zshenv'
    alias funcs='vim ~/.bash_functions'

    # aws
    # alias ecr='$(aws ecr get-login --profile eo --region us-east-1 --no-include-email)'
    # alias awsl="aws --profile local --endpoint-url='http://localhost:4566'"
    # alias awsume="source \$(pyenv which awsume)" # AWSume alias to source the AWSume script

    # docker
    alias dc='docker-compose'

    #  git
    alias gitv='git log | head -1 | cut -d" " -f2 | cut -c -7'
    alias gitdiff='git diff --ws-error-highlight=new,old'
    alias gdm='git branch | grep \* | cut -d " " -f2 | xargs -I{} sh -cv "git checkout master; git branch -D {}; git push origin :{}"'
    alias gpm='git pull origin master:master'
    alias fff='git push -u origin HEAD'

    # kube
    # alias k='kubectl'
    # alias kw='${HOME}/bin/kubectl-config.sh'
    # alias kc='kubectl config current-context'

    # alias remdeps="pip freeze | grep -v -f requirements.txt - | grep -v '^#' | grep -v '^-e ' | xargs pip uninstall -y"

    # this needs to be after aliases
    source ~/.bash_functions

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Makefile autocomplete
complete -W "\`grep -oE '^[a-zA-Z0-9_.-]+:([^=]|$)' ?akefile | sed 's/[^a-zA-Z0-9_.-]*$//'\`" make

#Auto-Complete function for AWSume
_awsume() {
    local cur prev opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    opts=$(awsume-autocomplete)
    COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    return 0
}
complete -F _awsume awsume

# Created by `pipx` on 2023-09-22 14:02:17
export PATH="$PATH:/Users/josh/.local/bin"
export PYTHONPATH="$PYTHONPATH:/Users/josh/src/*"
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
export BASH_SILENCE_DEPRECATION_WARNING=1
