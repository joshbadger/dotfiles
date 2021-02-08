#export JAVA_HOME="`/usr/libexec/java_home -v 1.8`"
#export M2_HOME=/usr/local/Cellar/maven/3.5.2/libexec
#export CLASSPATH=/Library/Java/Extensions/
export GOPATH=$HOME/go:$HOME/src
export GOROOT=$(brew --prefix golang)/libexec # /usr/local/opt/go/libexec
export PYTHON_CONFIGURE_OPTS="--enable-framework"
export NOSE_NOCAPTURE=1 # show stdout in nosetest (availability_serverless)
#export PYTHONPATH=~/Library/Python/2.7/bin/ 
#export DEVAPOLLOPATH=~/src/dev_notes/apollo/
#export SNOWFLAKEPATH=/Applications/SnowSQL.app/Contents/MacOS # added by Snowflake SnowSQL installer v1.0

#[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export PATH=$PATH:$PYTHONPATH:$M2_HOME/bin/:$GOPATH/bin:$GOROOT/bin:$HOME/bin:$SNOWFLAKEPATH


# Python ENV setup (https://github.com/pyenv/pyenv-virtualenv)
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"

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
    alias res='exec -l $SHELL'
    alias ls='ls -G'
    alias tf='terraform'

    # aws
    alias s3='aws --profile eo s3'
    alias ecr='$(aws ecr get-login --profile eo --region us-east-1 --no-include-email)'

    # docker
    alias dc='docker-compose'

    # git
    alias gitdiff='git diff --ws-error-highlight=new,old'
    alias 'gdm'='git branch | grep \* | cut -d " " -f2 | xargs -I{} sh -cv "git checkout master; git branch -D {}; git push origin :{}"'

    # godzilla
    alias de='dep ensure -v'
    alias brg='bazel run //:gazelle'

    # kube
    alias k='kubectl'
    alias kw='${HOME}/bin/kubectl-config.sh'
    alias kc='kubectl config current-context'

    # python
    alias fl='flake8 --ignore E501'

if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
