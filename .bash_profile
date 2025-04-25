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
    # commands prepended with a space don't get captured
    HISTCONTROL=ignorespace

    #colored tab completion
    set colored-stats on

    # bash completion
    [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

    # homebrew autocompletion
    if type brew &>/dev/null
    then
      HOMEBREW_PREFIX="$(brew --prefix)"
      if [[ -r "${HOMEBREW_PREFIX}/etc/profile.d/bash_completion.sh" ]]
      then
        source "${HOMEBREW_PREFIX}/etc/profile.d/bash_completion.sh"
      else
        for COMPLETION in "${HOMEBREW_PREFIX}/etc/bash_completion.d/"*
        do
          [[ -r "${COMPLETION}" ]] && source "${COMPLETION}"
        done
      fi
    fi

    # set -o vi

# kube
    #source ~/bin/kubectl-completion.sh

# git
    source ~/bin/git-completion.sh
    source ~/bin/git-prompt.sh

# old prompt
    # old prompt for reference
    # export PS1='${end} \u@ibotta \W$(__git_ps1 " (\[\e[94m\]%s\[\e[39m\])")\$ '
    #
    # export GIT_PS1_SHOWDIRTYSTATE=1
    # export GIT_PS1_SHOWUNTRACKEDFILES=1

    # # end forces prompt to start at the bottom
    # end=$(tput cup 9999 0)
    # blue='\[\e[94m\]'
    # red='\[\e[39m\]'
    # export PS1='${end} jb@ibotta $(basename $(dirname $PWD))/$(basename $PWD) $(__git_ps1)\$ '

    #
 
# Set the prompt #
#

# Select git info displayed, see /usr/share/git/completion/git-prompt.sh for more
export GIT_PS1_SHOWDIRTYSTATE=1           # '*'=unstaged, '+'=staged
export GIT_PS1_SHOWSTASHSTATE=0           # '$'=stashed
export GIT_PS1_SHOWUNTRACKEDFILES=1       # '%'=untracked
# export GIT_PS1_SHOWUPSTREAM="verbose"     # 'u='=no difference, 'u+1'=ahead by 1 commit
export GIT_PS1_STATESEPARATOR=''          # No space between branch and index status
export GIT_PS1_DESCRIBE_STYLE="describe"  # detached HEAD style:
#  contains      relative to newer annotated tag (v1.6.3.2~35)
#  branch        relative to newer tag or branch (master~4)
#  describe      relative to older annotated tag (v1.6.3.1-13-gdd42c2f)
#  default       exactly eatching tag

# Check if we support colours
__colour_enabled() {
    local -i colors=$(tput colors 2>/dev/null)
    [[ $? -eq 0 ]] && [[ $colors -gt 2 ]]
}
unset __colourise_prompt && __colour_enabled && __colourise_prompt=1

__set_bash_prompt()
{
    local exit="$?" # Save the exit status of the last command

    # PS1 is made from $PreGitPS1 + <git-status> + $PostGitPS1
    local PreGitPS1="${debian_chroot:+($debian_chroot)}"
    local PostGitPS1=""

    if [[ $__colourise_prompt ]]; then
        export GIT_PS1_SHOWCOLORHINTS=1

        # Wrap the colour codes between \[ and \], so that
        # bash counts the correct number of characters for line wrapping:
        local Red='\[\e[0;31m\]'; local BRed='\[\e[1;31m\]'
        local Gre='\[\e[0;32m\]'; local BGre='\[\e[1;32m\]'
        local Yel='\[\e[0;33m\]'; local BYel='\[\e[1;33m\]'
        local Blu='\[\e[0;34m\]'; local BBlu='\[\e[1;34m\]'
        local Mag='\[\e[0;35m\]'; local BMag='\[\e[1;35m\]'
        local Cya='\[\e[0;36m\]'; local BCya='\[\e[1;36m\]'
        local Whi='\[\e[0;37m\]'; local BWhi='\[\e[1;37m\]'
        local None='\[\e[0m\]' # Return to default colour

        # No username and bright colour if root
        if [[ ${EUID} == 0 ]]; then
            PreGitPS1+="$BRed\h "
        else
            PreGitPS1+="$Red\u@ibotta$None:"
        fi

        PreGitPS1+="$Blu\W$None"
    else # No colour
        # Sets prompt like: ravi@boxy:~/prj/sample_app
        unset GIT_PS1_SHOWCOLORHINTS
        PreGitPS1="${debian_chroot:+($debian_chroot)}\u@\h:\w"
    fi

    # Now build the part after git's status

    # Highlight non-standard exit codes
    if [[ $exit != 0 ]]; then
        PostGitPS1="$Red[$exit]"
    fi

    # Change colour of prompt if root
    if [[ ${EUID} == 0 ]]; then
        PostGitPS1+="$BRed"'\$ '"$None"
    else
        PostGitPS1+="$Mag"'\$ '"$None"
    fi

    # Set PS1 from $PreGitPS1 + <git-status> + $PostGitPS1
    __git_ps1 "$PreGitPS1" "$PostGitPS1" '(%s)'

    # echo '$PS1='"$PS1" # debug
    # defaut Linux Mint 17.2 user prompt:
    # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[01;34m\] \w\[\033[00m\] $(__git_ps1 "(%s)") \$ '
}

# This tells bash to reinterpret PS1 after every command, which we
# need because __git_ps1 will return different text and colors
PROMPT_COMMAND=__set_bash_prompt


# fix `clear` to keep the cursor on the bottom
__prompt_to_bottom_line() {
    tput cup $LINES
}
alias clear='clear && __prompt_to_bottom_line'

# aws
    export SAML2AWS_SESSION_DURATION=3600
    export AWS_ASSUME_ROLE_TTL=1h
    export AWS_DEFAULT_REGION=us-east-1
    export AWS_REGION=$AWS_DEFAULT_REGION
    alias sam="saml2aws login --skip-prompt --session-duration=43200"
    #alias aws="saml2aws exec --exec-profile=ae -- aws"
    complete -C '/opt/homebrew/bin/aws_completer' aws # aws CLI tab completion

    # granted/assume
    alias assume=". assume"
    export GRANTED_ALIAS_CONFIGURED="true"

    # Local Runner Start
    alias lrs="./mwaa-local-env start sso"


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
    alias funcs='vim ~/.bash_functions'

    # docker
    alias dc='docker-compose'

    #  git
    alias gitv='git log | head -1 | cut -d" " -f2 | cut -c -7'
    alias gitdiff='git diff --ws-error-highlight=new,old'
    alias gdm='git branch | grep \* | cut -d " " -f2 | xargs -I{} sh -cv "git checkout master; git branch -D {}; git push origin :{}"'
    alias gpm='git pull origin master:master'
    alias fff='git push -u origin HEAD'
    alias gds='git diff --staged'
    alias gd='git diff'
    alias gs='git status'
    alias gc='git checkout'
    alias gau='git add -u'
    alias ga='git add'
    alias gcm='git commit -m'
    alias gp='git pull'
    alias ggig='vim ~/.gitignore'

    alias pc='pre-commit run'


    # kube
    # alias k='kubectl'
    # alias kw='${HOME}/bin/kubectl-config.sh'
    # alias kc='kubectl config current-context'

    alias remdeps="pip freeze | grep -v -f requirements.txt - | grep -v '^#' | grep -v '^-e ' | xargs pip uninstall -y"

    alias db="databricks"
    # this needs to be after aliases
    source ~/.bash_functions

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

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
export PATH="$PATH:$HOME/.local/bin/"
export PYTHONPATH="$PYTHONPATH:$HOME/src/*"
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
export BASH_SILENCE_DEPRECATION_WARNING=1

# poetry 
# 1password
export POETRY_HTTP_BASIC_IBOTTA_PYPI_USERNAME=josh.badger
export POETRY_HTTP_BASIC_IBOTTA_PYPI_PASSWORD=$(op item get tthr7u535u7ob6jq4vouqh2u6a --reveal --fields token)

# bitwarden
#BW_JFROG_ITEM_ID=5e7d5baf-defa-4cf0-99ba-b266015da5c1
#export BW_SESSION=$(bw unlock --raw)
#export POETRY_HTTP_BASIC_IBOTTA_PYPI_USERNAME=josh.badger
#export POETRY_HTTP_BASIC_IBOTTA_PYPI_PASSWORD=$(bw get password $BW_JFROG_ITEM_ID)
#bw lock

export PKG_CONFIG_PATH="$(brew --prefix)/opt/mysql-client/lib/pkgconfig"
export PATH="/opt/homebrew/opt/mysql-client/bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export PATH="/opt/homebrew/opt/sqlite/bin:$PATH"


