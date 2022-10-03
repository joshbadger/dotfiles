# Python ENV setup (https://github.com/pyenv/pyenv-virtualenv)
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"


#export GOPATH=$HOME/go:$HOME/src
#export GOROOT=$(brew --prefix golang)/libexec # /usr/local/opt/go/libexec
export PYTHON_CONFIGURE_OPTS="--enable-framework"
export NOSE_NOCAPTURE=1 # show stdout in nosetest (availability_serverless)
export HOMEBREW_NO_AUTO_UPDATE=1

#[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export PATH=/usr/local/opt/openssl@1.1/bin:$PATH:$PYTHONPATH:$M2_HOME/bin/:$GOPATH/bin:$GOROOT/bin:$HOME
PATH=$PATH:/Users/jbadger/src/ents/scripts


alias brew='env PATH="${PATH//$(pyenv root)\/shims:/}" brew'

# iterm2 enable colors

# bash things
    # colors
    export CLICOLOR=1
    export LSCOLORS=ExFxBxDxCxegedabagacad

    # history
    shopt -s histappend # always append to history so we preserve bash history between sessions
    HISTSIZE=10000000 # embiggen history size

    #colored tab completion
    set colored-stats on

    # custom bash functions
    source ~/.bash_functions

    # bash completion
    [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

# kube
    #source ~/bin/kubectl-completion.sh

# git
    source ~/bin/git-completion.sh
    source ~/bin/git-prompt.sh

    # prompt
    export PS1='\u@kyruus \W$(__git_ps1 " (\[\e[94m\]%s\[\e[39m\])")\$ '
    export GIT_PS1_SHOWDIRTYSTATE=1
    export GIT_PS1_SHOWUNTRACKEDFILES=1

# aws
    complete -C '/usr/local/bin/aws_completer' aws # aws CLI tab completion

# Aliases
    # bash
    alias res='exec -l $SHELL'
    alias ls='ls -G'
    alias tf='terraform'
    alias rc='vim ~/.bash_profile'
    alias sourcerc='source ~/.bash_profile'
    alias funcs='vim ~/.bash_functions'
    alias vimrc='vim ~/.vimrc'
    alias flushcache='sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'

    # aws
    alias ecr='$(aws ecr get-login --profile eo --region us-east-1 --no-include-email)'
    alias awsl="aws --profile local --endpoint-url='http://localhost:4566'"

    # docker
    alias dc='docker-compose'

    # git
    alias gitv='git log | head -1 | cut -d" " -f2 | cut -c -7'
    alias gitdiff='git diff --ws-error-highlight=new,old'
    alias gdm='git branch | grep \* | cut -d " " -f2 | xargs -I{} sh -cv "git checkout master; git branch -D {}; git push origin :{}"'
    alias gpm='git pull origin master:master'

    # godzilla
    alias de='dep ensure -v'
    alias brg='bazel run //:gazelle'

    # kube
    alias k='kubectl'
    alias kw='${HOME}/bin/kubectl-config.sh'
    alias kc='kubectl config current-context'

    # python
    alias fl='flake8 --ignore E501'
    alias pa='pyenv acticvate'
    alias spot='spotify-terminal.py -u joshuabadger'
    alias remdeps="pip freeze | grep -v -f requirements.txt - | grep -v '^#' | grep -v '^-e ' | xargs pip uninstall -y"
    alias installdeps='pip install -r requirements.txt -r requirements-test.txt'
    alias redeps='remdeps && installdeps'

if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

export NVM_DIR="/Users/jbadger/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
