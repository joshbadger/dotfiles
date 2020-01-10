export JAVA_HOME="`/usr/libexec/java_home -v 1.8`"
export M2_HOME=/usr/local/Cellar/maven/3.5.2/libexec
export CLASSPATH=/Library/Java/Extensions/
export GOPATH=$HOME/go
export GOROOT=/usr/local/opt/go/libexec
export PYTHONPATH=~/Library/Python/2.7/bin/
export DEVAPOLLOPATH=~/src/dev_notes/apollo/
export PATH=$PATH:$PYTHONPATH:$M2_HOME/bin/:$GOPATH/bin:$GOROOT/bin:$HOME/bin:$DEVAPOLLOPATH
export PATH=/Applications/SnowSQL.app/Contents/MacOS:$PATH # added by Snowflake SnowSQL installer v1.0
source ~/.bash_secrets # npm tokens, etc

# bash things
    #prompt
    export PS1='\u@rpco \W$(__git_ps1 " (\[\e[94m\]%s\[\e[39m\])")\$ '
    export GIT_PS1_SHOWDIRTYSTATE=1
    export GIT_PS1_SHOWUNTRACKEDFILES=1
    export CLICOLOR=1
    #export LSCOLORS=GxFxCxDxBxegedabagaced

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
    export KUBECONFIG="${HOME}/.kube/eo-test/config"
    source ~/bin/kubectl-completion.sh

# git
    source ~/bin/git-completion.sh
    source ~/bin/git-prompt.sh

# aws
    complete -C '/usr/local/bin/aws_completer' aws # aws CLI tab completion

# Aliases
    alias ls='ls -G'
    alias avt='java -jar ~/bin/avro-tools-1.8.1.jar'
    alias tf='terraform'

    # aws
    alias s3='aws --profile eo s3'
    alias aqaws='eval $(aquaduck aws -p eo)'
    alias ecr='$(aws ecr get-login --profile eo --region us-east-1 --no-include-email)'

    # docker
    alias dc='docker-compose'

    # git
    alias gitdiff='git diff --ws-error-highlight=new,old'
    alias 'gdm'='git branch | grep \* | cut -d " " -f2 | xargs -I{} sh -cv "git checkout master; git branch -D {};"'

    # godzilla
    alias de='dep ensure -v'
    alias brg='bazel run //:gazelle'

    # kube
    alias k='kubectl'
    alias kw='${HOME}/bin/kubectl-config.sh'
    alias kc='kubectl config current-context'
    alias keot='eval $(aquaduck auth kube eo-test -n eo -p eo)'
    alias keo='eval $(aquaduck auth kube eo-prod -n eo -p eo)'
    alias kpeonot='kubectl get po | grep eo-notification'

    # Aquaduck
    alias aq='aquaduck'

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting. Make sure this is the last PATH variable change.

