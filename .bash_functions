function ssm() {
    if [ $# -eq 0 ]; then
        echo -e "Shortcut to 'aws ssm get-parameters-by-path --path / | jq '.Parameters[] | select(.Name | contains(\"<pattern>\")) | {Name}[]'

Usage: ssm <flag> | <pattern>
Flags: [-a, --all] retrieves all ssm parameters. note: must be used without specifying a pattern
"
    else
        PATTERN="$1"
        if [ "$1" == "--all" ] || [ "$1" == "-a" ]; then
            PATTERN=''
        fi
        aws ssm get-parameters-by-path --path / | jq --arg pattern "$PATTERN" '.Parameters[] | select(.Name | contains($pattern)) | {Name}[]'
    fi
}
        
function ssm-copy() {
    if [ $# -eq 0 ]; then
        echo -e "Shortcut to 'aws ssm get-parameter --name <parameter_name> --with-decryption --output text --query Parameter.Value | pbcopy'

Usage: ssm-copy <parameter_name>
"
    else
        aws ssm get-parameter --name "$1" --with-decryption --output text --query Parameter.Value | tr -d "\n" | pbcopy
    fi
}

function ackv() {
    command ack -i --ignore-dir=vendor --color "$@" 2> /dev/null
}

function gcgp() {
    if [ $# -eq 0 ]; then
        echo -e "Shortcut to 'git checkout <branch_name> && git pull'

Usage: gcgp <branch_name>
"
    else
        git checkout $1 && git pull
    fi
}

#
# Shortcut to cd into the working directory for a web project
#
function repo() {
    if [ $# -eq 0 ]; then
        echo -e "Shortcut to cd into the source directory for a dev project.

Usage: repo <repo-pattern>

repo-pattern    Any unique identifier for a project name.
                e.g. 'vegan'
"
    else
        FOUND=0
        SOURCE_DIRS=(~/src)
        for CHECK_DIR in ${SOURCE_DIRS[@]}; do
            PROJECTS=(`find "$CHECK_DIR" -maxdepth 1 -type d -iname "*$1*"`)
            if [ ${#PROJECTS[@]} -gt 0 ]; then
                FOUND=1
                cd "${PROJECTS[0]}"
            fi
        done
        if [ "$FOUND" = 0 ]; then
            echo "No project like '$1' found in ${SOURCE_DIRS[@]}"
        fi
    fi
}

aws-describe() {
    if [ $# -ne 1 ]; then
        echo "Usage: aws-describe <env>"
    else
        command aws ec2 describe-instances --output json --region us-east-1 --filters "'Name=tag:env,Values=${1}'" 'Name=tag:mode,Values=web' --query 'Reservations[*].Instances[*].PublicDnsName'
    fi
}


# Remove any entries from SSH known_hosts file
# that match the specified string.
sshrm () {
  node=$1
  echo "Removing $node from SSH known hosts"
  sed -i '.bak' -e "/^$node/d" ~/.ssh/known_hosts
}

function diff {
    colordiff -u "$@" | less -RF
}


aws-login(){
	saml2aws login --session-duration 43200 --username jbadger --duo-mfa-option='Duo Push' --skip-prompt --force --role='arn:aws:iam::206670668379:role/enterprise-scheduling-engineer'
	# open 'https://kyruus.okta.com/home/amazon_aws/0oac4wn1eFUJ8RivP356/272?fromHome=true'
    # osascript -e "tell application \"/Applications/Tunnelblick.app\"" -e "connect \"Kyruus VPC\"" -e "end tell"
}

function kssh () {
    INSTANCE_ID=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=$1" --query 'Reservations[0].Instances[0].InstanceId' --output text)
    aws ssm start-session --target $INSTANCE_ID
}

function svtest() {
    if [ $# = 1 ]; then
       TARGET=$1 
    fi
    command nosetests "$TARGET"/tests --verbose --with-coverage --cover-branches --cover-package="$TARGET" --cover-erase --logging-level=INFO
}

function asm() {
    if [ -z "$1" ]; then
            echo "Please provide an environment as an argument"
    elif [ "$1" = "dev" ]; then
            otp=$(op item get "DEV janus AWS" --otp)
            awsume dev --mfa-token=$otp ${@:2}
    elif [ "$1" = "app" ]; then
            otp=$(op item get "APP janus AWS" --otp)
            awsume app --mfa-token=$otp ${@:2}
    else
            echo "Unknown Argument: please provide 'app' or 'dev'"
    fi
}

function chaf() {
    if [ -z "$1" ]; then
            echo "Please provide an environment as an argument"
            echo "  app"
            echo "  dev"
            exit
    elif [ "$1" = "dev" ] || [ "$1" = "app" ]; then
            awsume $1; ./airflow-change-env.sh;
    else
            echo "Unknown Argument: please provide 'app' or 'dev'"
            exit
    fi
}

function mwaa() {
    cd data-engineering-mwaa-shared-resources/aws-mwaa-local-runner/$1
}

# run this from the version directory (i.e. .../2.6.3
function rebuild {
    if [ "$1" == "-d" ]; then
        colima delete
    fi
    
    version=${PWD##*/}
    cd ..
    source build.sh $version
    GRANTED_ALIAS_CONFIGURED="true" ./mwaa-local-env start sso
}



# Load credentials from 1Password into the environment.
# Call this manually when you need credentials (avoids fingerprint prompt on every shell load).
function jfrog-auth() {
    echo "Fetching credentials from 1Password..."
    export POETRY_HTTP_BASIC_ARTIFACTORY_USERNAME=josh.badger
    export POETRY_HTTP_BASIC_ARTIFACTORY_PASSWORD=$(op item get tthr7u535u7ob6jq4vouqh2u6a --reveal --fields token)
    echo "Done. Artifactory credentials loaded."
}


# Poll the frontmost app and log changes to ~/Desktop/focus-polled.log
start_focus_log() {
  nohup bash -c '
    prev=""
    while true; do
      # ask macOS which app is frontmost
      now=$(osascript -e "tell application \"System Events\" to get name of (process 1 whose frontmost is true)")
      if [ "$now" != "$prev" ]; then
        # timestamp + app name
        date "+%Y-%m-%d %H:%M:%S" >> ~/Desktop/focus-polled.log
        echo "$now"      >> ~/Desktop/focus-polled.log
        prev="$now"
      fi
      sleep 0.5
    done
  ' >> ~/Desktop/focus-polled.log 2>&1 &
  disown
  echo "Focus logger started (logs → ~/Desktop/focus-polled.log)"
}

# Optional helper to kill the logger
stop_focus_log() {
  pkill -f 'osascript -e tell application "System Events"'
  echo "Focus logger stopped."
}
