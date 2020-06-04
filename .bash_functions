ackv() {
    command ack -i --ignore-dir=vendor --color "$@" 2> /dev/null
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


kops() {
    if [ $# -lt 3 ]; then
        echo "usage: kops <cluster_number> <env> <namespace> <role>"
        echo "       if no role is given, role defaults to the namespace"
    else
        ENV=""
        if [ "${2}" != "prod" ]; then
            ENV=".tst"
        fi

        ROLE="${4}"
        if [ -z "${4}" ]; then
            ROLE="${3}"
        fi
        command eval $(aquaduck auth kube workload${1}.k8s$ENV.returnpath.net --k8s-auth-type kops -n ${3} -p $ROLE)
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

ackg() {
  find . -name '${2}' | ack -x -i '${1}'
}

# kube PDT funcs
kprod1() {
    kops 1 prod eo
}

gateway() {
    if [ $# -lt 2 ]; then
        echo "usage: gateway <env> <namespace> <role>"
        echo "       if no role is given, role defaults to the namespace"
    else
        ENV="prod"
        HOST=""
        if [ "${1}" != "prod" ]; then
            ENV="test"
            HOST=".tst"
        fi

        ROLE="${3}"
        if [ -z "${3}" ]; then
            ROLE="${2}"
        fi

        CMD1="aquaduck auth ssh eo-${ENV}"
        echo $CMD1
        command $CMD1

        CMD2="ssh ec2-user@eo-gateway${HOST}.returnpath.net"
        echo $CMD2
        command $CMD2
    fi

}

tunnel() {
    if [ $# -lt 1 ]; then
        echo "usage: tunnel <env>"
    else
        PORT="11521"
        LB="ctst1"
        HOST="tst."
        ENV="test"


        if [ "${1}" == "prod" ]; then
            PORT="21521"
            LB="cprod1"
            HOST=""
            ENV="prod"
        fi

        CMD1="aquaduck auth ssh eo-${ENV}"
        echo $CMD1
        command $CMD1

        CMD2="ssh -N -p 22 ec2-user@eo-gateway.${HOST}returnpath.net -L 127.0.0.1:${PORT}:tf-${LB}-${ENV}.ch3aslfv4t7y.us-east-1.rds.amazonaws.com:${PORT}"
        echo $CMD2
        command $CMD2
    fi

}

