git diff kafka/
vim kafka/helpers
vim kafka/helpers_test.go 
git status
git diff
git status
git add -A
git status
git commit -m "adds templates with tests"
go test ./...
vim go/consumer/consumer_test.go 
ack applyTemplate
ack BuildEmailbody
vim go/consumer/consumer.go 
go test ./...
git status
git log
git status
git diff
git add -A
git commit --amend
git status
git diff
git log
git push -f
vim templates/default_with_body.html 
git status
git diff
vim .
tidy
which tidy
vim .
vim .
go test ./...
vim .
go test ./...
vim .
git status
git diff
git status
git status
git diff
git status
git diff
git status
git add -A
git commit -m "add default templates"
git status
git checkout master
git pull
git checkout jb/headers_footers_MC-2896 
git merge master
git status
git status
git diff
git checkout --theirs
git checkout --theirs go/consumer/
git status
git diff go/consumer/consumer
git diff go/consumer
git add go/consumer
git status
git merge --abort
git log master
git log -p master
git cherry-pick 93049f95f08d2865eddfd98390ac0b9dc9044a77
git status
vim go/consumer/
vim go/consumer/
git status
git diff go/consumer/consumer/
git diff go/consumer/consumer.
git diff go/consumer/consumer.go
git add go/consumer/consumer.go
git diff go/
vim go/consumer/consumer_test.go 
git cherry-pick --abort
git status
git rebase >>>>>>> 93049f95... MC-3169: increased producer timeout and added friendly from (#33)
git rebase 93049f95f08d2865eddfd98390ac0b9dc9044a77
git status
git reset
git status
git diff go/consumer/consumer.go
vim go/consumer/consumer.go
vim go/consumer/consumer.go
git add go/consumer/
git status
git diff kafka/helpers
git diff kafka/
git add kafka/
git stat5us
git status
git diff templates/default
git diff templates/default.html
git status
git add templates/default.html
git diff
git diff --staged templates/
git status
git add templates/
git status
git add -A
git rebase --continue
git status
git status
git diff master
vim go/consumer/consumer.go 
git status
git diff 
git add -A
git commit --amend
git push -f
go test ./...
vim go/consumer/consumer.go 
repo god
vim go/
man ack
ack *_test.go "= func"

ack "= func"
cd go/apollo/
ack "= func"
vim service/subscriberfilter/subscriptions_test.go
repo not
vim .
repo not
vim .
aqaws
kops 1 prod apollo
k get po
k logs -f esp-service-producer-6bddcbbc8c-8rk4s
k logs -f esp-service-producer-6bddcbbc8c-8rk4s sfmc-handler
repo god
ack  Initiated tracking fetch
ack "tracking fetch"
cd go/esp_service/
ack "tracking fetch"
vim go/esp_service/handlers/sfmc/client/sfmc.go
vim handlers/sfmc/client/sfmc.go
ack fetchWithConfig(
ack fetchWithConfig
vim handlers/sfmc/client/sfmc.go
ack Fetch(
ack "Fetch("
vim handlers/sfmc/client/sfmc.go
ack "fetch("
ack "fetch("*
ack "fetch(*"
ack fetch
vim .
ack fetch
vim coordinator/
vim coordinator/
vim coordinator/
ack handlepipeline
vim handlers/sfmc/service/service.go
ack liveoffset
vim handlers/sfmc/manager/manager.go
ack liveoffset
cd ..
ack liveoffset
vim esp_service/handlers/sfmc/manager/manager.go 
ack "Manage"
ack "Manage("
ack "manage("
ack manage\(
ack Manage\(
cd esp_service/]
cd esp_service/
ack manage
vim handlers/sfmc/service/service.go
k get po
k describe po esp-service-consumer-7455b89d7d-4tlm9
k get services
aqaws
aws ec2 describe-network-interfaces
aws ec2 describe-network-interfaces --filters Name=description,Values="ELB internal-a12aa54a1143c11e994f00a119c45db3-1078821311.us-east-1.elb.amazonaws.com"
aws ec2 describe-network-interfaces --help
aws ec2 describe-network-interfaces help
aws ec2 describe-network-interfaces --filters addresses.private-ip-address=description,Values="ELB internal-a12aa54a1143c11e994f00a119c45db3-1078821311.us-east-1.elb.amazonaws.com"
aws ec2 describe-network-interfaces help
aws ec2 describe-network-interfaces --filters Name=addresses.private-ip-address,Values="internal-a12aa54a1143c11e994f00a119c45db3-1078821311.us-east-1.elb.amazonaws.com"
aws ec2 describe-network-interfaces help
aws ec2 describe-network-interfaces --filters Name=addresses.primary,Values="internal-a12aa54a1143c11e994f00a119c45db3-1078821311.us-east-1.elb.amazonaws.com"
aws ec2 describe-network-interfaces help
aws ec2 describe-network-interfaces --filters Name=private-dns-name,Values="internal-a12aa54a1143c11e994f00a119c45db3-1078821311.us-east-1.elb.amazonaws.com"
aws ec2 list-network-interfaces 
aws ec2 describe-network-interfaces
k get services
repo note
repo not
git status
vim .
repo us
git status
git diff alert/api_test.go
repo not
vim .
repo usa
git diff alert/api_test.go
repo god
git status
vim 
vim .
repo god
vim .
vim .
vim .
vim .
k get po
"q

repo god
ack "/go/esp_service/api"
vim go/esp_service/
vim .
k get po
aqaws
kops 1 prod apollo
k get po
k get po
k exec -it esp-service-api-7db85d8c89-x7zwr bash
vim .
k exec -it esp-service-api-7db85d8c89-x7zwr bash
k get po
k exec -it apollo-esp-consumer-66547bf6bc-nq299 bash
vim .
vim .
k exec -it apollo-esp-consumer-66547bf6bc-nq299 bash
k get po
repo notes
ls apollo
ls apo
ls apo*
ls -la
vim apollo_shutdown.MD 
aqaws
kops 1 prod apollo
k get po 
k exec -it esp-service-producer-6bddcbbc8c-qjvq4 bash
kubectl describe pod/esp-service-producer-6bddcbbc8c-qjvq4 -n apollo
k exec -it esp-service-producer-6bddcbbc8c-qjvq4 sfmc-handler bash
k exec -it esp-service-producer-6bddcbbc8c-qjvq4 bash sfmc-handler
k exec -it esp-service-producer-6bddcbbc8c-qjvq4 -c sfmc-handler bash
k get po
k get po | cut -d
k get po | cut -f1
k get po | cut -d" " -f1
repo god
vim .
cd go/esp_service/
ack Producer
vim .
cd ..
vim .
:wq
repo god
vim go/
cd go/apollo/
cd delivery/
ack deliveryEvents
vim manager.go
git pull
vim .
ack apollo-web
vim .
cd ../../
cd ..
vim .
htop
aqaws
kops 1 prod apollo
k get po
k exec -it apollo-delivery-0 bash
k exec -it apollo-delivery-0 bash
k exec -it apollo-delivery-0 bash
aqaws
kops 1 prod apollo
k get po
k exec -it apollo-api-547d899f75-7dfmn bash
aqaws
kops 1 prod apollo
k get po
k get po
 k exec -it apollo-api-547d899f75-7dfmn bash
repo surili
vim .
ack /v1/eointegrations/status/{integration_partner}
vim .
vim postman/eo-surili-internal.postman_collection.json
git log master
git checkout master
git pull
git checkout jb/apollo-sunset 
git log master
git rebase 63c59c003feb16d7e5fc8fc17ea3e2e04fa2d268
git status
git log
git push -f
vim start.sh 
./start.sh 
./start.sh --build
cat /tmp/eo-surili.log
aqaws
aws ecr get-login --no-include-email
./start.sh --build
cat /tmp/eo-surili.log
$(aws ecr get-login --profile eo --no-include-email --region us-east-1)
./start.sh --build
repo not
vim .
cd ..
git clone git@github.com:ReturnPath/eo-mtools.git
repo mtoo
git checkout master
git pull
ack apollo
vim include/apollo.class.php 
vim documentroot/assurance/accounts/company_products.include.php 
ack playbook
vim documentroot/assurance/accounts/company_account.include.php 
ack playbook
ack apollo
vim documentroot/assurance/accounts/company_products.include.php
git diff
git add -A
git checkout -b jb/sunset_apollo
git push -u origin jb/sunset_apollo 
ls
git status
git commit -m "remove apollo/playbooks logic"
git push
repo suril
git status
vim README.md 
vim .
./runTests.sh 
vim runTests.sh 
vim .
repo mtool
vim .
git push
kops 4 prod eo
k get po | grep mto
watch -n3 "kubectl get po | grep mto"
repo not
vim go/consumer/metrics.go 
repo god
vim go
repo not
vim .
repo god
vim 
vim .
cd helm/apollo
ack region
cd ..
ack region
cd ../terraform/
ack region
vim apollo/resources.tf 
vim apollo/resources.tf 
cd ..
vim .
cd go/apollo/
ack sagemakerRequests
vim service/subscriberfilter/recommendations
vim service/subscriberfilter/recommendations.go 
vim metrics/
ack countervec
vim scheduler/metrics.go
ack subscriptionCount
vim scheduler/metrics.go
im service/subscriberfilter/metrics.go
vim service/subscriberfilter/metrics.go
vim service/subscriberfilter/metrics.go
ack string{"
ack "string{
"
ack string\{\"status\"
vim populator/metrics.go
ack messagesHandled
ack withlabelvalues
vim service/subscriberfilter/metrics.go
repo not
vim .
repo god
repo not
git checkout master
git pull
vim .
vim .
vim .
vim .
repo surili
git checkout master
git pull
git log
git branch -D jb/apollo-sunset 
git push origin :jb/apollo-sunset 
ack ingest
ack --ignore-dir vendor ingest
ack --ignore-dir=vendor ingest
ack --exclude-dir vendor ingest
man ack
repo not
vim docker-compose.yml 
dc up consumer
vim docker-compose.yml 
dc up consumer
vim docker-compose.yml 
git reset --hard HEAD
vim docker-compose.yml 
cd ..
git clone git@github.com:ReturnPath/eo-preview.git
repo prev
git checkout MC-3104 
vim .
vim .
vim .
reop god
repo god
cd go/apollo/
ack producer
vim cmd/esp-consumer/main.go
cd ../esp_service/
ack producer
vim api/cmd/api/main.go
repo terra
git pull
repo not
vi m.
vim .
ack applyTemplate
vim kafka/helpers.go 
ack buildemailbody
vim go/consumer/consumer.
vim go/consumer/consumer.go 
repo us
git status
git diff
ack ApplyTeimplate
ack ApplyTemplate
vim alert/api.go 
vim alert/api.go 
vim .
ack Productname
vim alert/alert.go
ack build
ack applytemplate
vi alert/api.go 
git status
git add alert/alert.go
git status
git commit -m "set product name:
git commit -m "set product name"
git checkout -b jb/prod_fix_product_name
git status
git log
git status
git log
git status
git push -u origin jb/prod_fix_product_name 
vim .
ack validity-logo-light
ack logo
ack --exclude-dir=vendor logo
ack --ignore-dir=vendor logo
man ack
ack --ignore-dir=./vendor logo
ack --ignore-dir=./vendor validity
ack --ignore-dir=./vendor validity
ack --ignore-dir=vendor validity
vim .
vim .
tunnel test
tunnel prod
aqaws
cprod1


type cprod1
type ctst1
type aqaws
type cprod1
type ctst1
source ~/.bash_profile
type tunnel
tunnel test
tunnel prod
source ~/.bash_profile
tunnel prod
ping www.google.com
ping www.google.com
ping www.google.com
ping www.google.com
reop us
repo us
repo usa
repo db
git checkout master
git pull
vim .
~~~
vim SELECT * FROM REALM_PRODUCT_T~~~
vim db_patch/2020/20200316_MC-3134_earthlink-seeds-2/main.sql~
vim aws/master_owner/das_admin.pkb
ack aws/as_owner/eo_integrations.pkb
vim aws/as_owner/eo_integrations.pkb
ack track_change
ack db_patch/ track
ack db_patch/ change
ack db_patch/ history_t
cd db_patch/
ack history_t
vim 2020/20200221_MC-2964_add_inbox_monitor_ui/main.sql
git pull
vim .
git checkout -b jb/mc-2976_do_sunset
git status
git add -A
git diff --staged
git status
vim 2020/20200413_MC-2976_do-sunset/main.sql
git add -A
git status
git diff --staged
vim 2020/20200413_MC-2976_do-sunset/main.sql
git status
git diff
git add -A
git diff --staged
im .
vim .
ack dELETE
vim 2020/20200319_MC-2968_enable-im/main.sql
vim 2020/20200413_MC-2976_do-sunset/main.sql
git status
git add -A
git diff --staged
git commit -m "do permissions cleanup"
git push -u origin jb/mc-2976_do_sunset 
cd
ls -la
ls
head -20 DO_product_realms_04-13-2020.csv 
vim /Users/jbadger/.bash_functions 
kops 1 prod eo
k get po
repo ter
git pull
vim .
git pull
vim .
git status
repo auth
git pull
git checkout master
git pull
ack s3
vim .
cd helm/
ack s3
vim .
cd ../
ls -la
repo terr
git add -A
git stash
git pull
git stash pop
cd rp-eo/rp-auth/
vim .
repo web
git pull
vim .
repo terr
vim .
ping www.google.com
ping returnpath.net
repo exa
git pull
vim .
repo god
vim .
ack TerminatedAt
vim go/esp_service/coordinator/cmd/api/main.go
docker system prune --all
docker system prune --all
vim .
aqaws
s3 ls drc*
s3 ls | grep drc
s3 ls | grep drc
s3 ls | grep drc
type s3

type s3
aws --profile eo
aws --profile eo s3
aws --profile eo s3 ls
s3 ls
s3 ls | grep drc
s3 ls | grep sparkpost
s3 ls | grep rp-eo-rep
s3 ls | grep report
s3 ls | grep monitor
s3 ls | grep slo
s3 ls eo-slo-prod
s3 ls eo-slo
s3 ls | grep mtools
s3 ls | grep mission
s3 ls | grep metrics
s3 ls | grep preview
s3 ls | grep demo
s3 ls | grep dashboard
s3 ls | grep conv
s3 ls | grep im
s3 ls | grep b2b
s3 ls | grep ecm
s3 ls | grep drc
s3 ls | grep complaint
repo not
git add -A
git stash
git pull
git checkout tuna-nil-fix 
vim test/
git checkout master 
git pull
ack failed to produce message onto kafk
ack "failed to produce message onto kafk"
vim rpc/v2.go 
vim rpc/v2.go 
k get secrets
repo god
cd go/apollo/
ack maintools
cd ../esp_service/
ack maintools
repo exa
vim .
ack context
vim .
repo god
cd go/apollo/
ack newConsumerMetrics
cd ..
ack newConsumerMetrics
repo not
vim .
repo us
repo mtoo
git pull
git log
git status
git log -p 85aed47710bc7d4dd1e077bba31f6b362e3f0789
vim usage
repo usage
vim .
git diff
vim alert/apo
vim alert/api.go 
vim alert/api.go 
git diff
vim alert/api.go 
git diff
git add -A
git push
git commit -m "moar logging"
git push
type tunnel
tunnel prod
tunnel prod
tunnel test
tunnel test
aquaduck auth ssh eo-test
tunnel test
tunnel prod
tunnel dev
kops 1 prod eo
k get po
k get po
kops 2 prod eo
kops 3 prod eo
kops 1 prod eo
kops 1 prod eo
k get po
k get po
kpeonot
k logs -f eo-notification-api-6c946dbd46-tlvwm
/404
k get secrets
k get secret blacklist-parser-domains-secrets -o yaml
cd ..
git clone git@github.com:ReturnPath/eo-blacklist-backend.git
repo banck
repo back
git checkout master
git pull
vim .
k get secret blacklist-parser-domains-secrets -o yaml
base64 --decode "el1RJlpBYGYoNz5XTjU/OQ=="
b64
base64
base64 --decode << el1RJlpBYGYoNz5XTjU/OQ==
printf el1RJlpBYGYoNz5XTjU/OQ== | base64 --decode
vim . 
k 1 test eo
kops 1 test eo
k get secret blacklist-parser-domains-secrets -o yaml
vim .
vim .
repo not
vim .
helm lint
vim .
repo web
repo eo_we
repo eo-we
git pull
kops 2 prod apollo
kops 2 prod eo
k get po
k get po
cd 
cd Downloads/
ls -la
unzip 10476712393_1580972400.csv.zip
repo not
vim .
ack "usr/local
"
ack "usr/local"
ack --ignore-dir=vendor "usr/local"
ack --ignore-dir=vendor "usr/local"
ack --ignore-dir=ops --ignore-dir=vendor "usr/local"
ack --ignore-dir=ops --ignore-dir=vendor "usr/local"
vim .
vim .
vim .
vim .
vim .
ack 8081
ty[e acl
type ack
vim /Users/jbadger/.bash_functions 
source /Users/jbadger/.bash_functions
ackv 8081
git status
git diff
git checkout helm/eo-notification/values.yaml
ackv 8081
vim go/cmd/consumer/main.go
ackv 8080
vim compose.yml
vim docker-compose.yml
repo usage
git checkout master
git pull
vim .
vim .
:q
git status
git diff
vim alert/api.go 
go test ./...
git checkout -b jb/swap_templates
git status
git diff
git add -A
git commit -m "use the correct template per alert, doh"
git push
git push -u origin jb/swap_templates 
git checkout master 
repo not
vim .
vim .
repo usage
git checkout jb/swap_templates 
vim .
git log
git log -name-only
git log -name-only
git log --name-only
vim alert/api.go 
git add -A
git status
git diff
git diff --staged
git commit -m "drop the extraneous comparison"
git push
repo not
git status
git diff
vim .
git status
git add kafka/producer.go
git diff --staged
vim kafka/producer.go 
ack WithTimeout
ackv WithTimeout
ackv WithDeadline
vim rpc/v2.go
git status
git reset kafka/
git checkout kafka/
git status
git add kafka/
git status
vim .
git status
git diff kafka/
git add kafka/
git status
git dif
git diff --staged
git diff
git checkout -b jb/add_before_wait
git status
git diff --staged
git commit -m "add before wait"
git push
git push -u origin jb/add_before_wait 
go test ./...
vim kafka/producer.go 
repo usage
vim .
go test ./...
git status
git stash
git checkout master
git checkout -b "jb/abs_val"
git stash pop
git status
git diff
git add -A
git commit -m "absolute val remaining campaigns"
vim .
git push -u origin jb/abs_val 
repo not
git status
git stash
git log -p
go test ./...
repo not
vim .
repo infr
repo exa
vim .
kops 1 prod eo
k get deployment
k get deployments
k get deployments -n defaut
k get deployments -n default
kops 1 prod eo
k get po | grep pdt
k get deployments | pdt
k get deployments | grep pdt
kops 4 prod eo
k get deployments | grep pdt
k get deployments | grep dbl
k get deployments | grep dbl
kops 1 test eo
k get deployments | grep dbl
kops 4 test eo
k get po | grep dbl
k get deployments  | grep db
k describe deployment eo-dbl-consumer
k get replicasset
k get replicas
k get replica
repo black
git stash
git pull
vim .
$(aws ecr get-login --profile eo --no-include-email --region us-east-1)
$(aws ecr get-login --profile eo --no-include-email --region us-east-1)
aws ecr --help
aws ecr list-images --repository=eo/eo-dbl-consumer
aqaws 
aws ecr list-images --repository=eo/eo_dbl_consumer
k get secret
repo us
git pull
vi .
type vim
ls -la /usr/local/bin/vim
vim .
type vi
vim .
vim .
git status
git diff
vim alert/api
vim alert/api.go 
ack Newsurili
ack newsurili
ack NewSurili
vim main.go 
git duff
git diff
repo api-infr
repo ex
git pull
vim .
repo blacklist
git pull
git checkout PDT-2561-dbl-common-consumer
vim .
vim docker-compose.yml 
dc run --build dbl-consumer
dc --help
dc up --build dbl-consumer
tunnel prod
tunnel test
tunnel prod
tunnel prod
kops 1 prod eo
k get po
kgponot
kgpeonot
kpeonot
k logs -f eo-notification-consumer-5cfb9b4fc-24zht
kpeonot
k logs -f eo-notification-api-6c946dbd46-tlvwm
repo exa
git pull
vi m.
vim .
vim .
vim .
ack --ignore-dir=vendor liveness
vim helm/api-infrastructure-example/templates/deployment.yaml
vim README.md
vim .
k get secret
k get secret | grep black
repo usa
git checkout master && git pull
git checkout jb/abs_val 
git diff master -- alert/api.go
git rebase master
git diff master -- alert/api.go
git checkout master
git pull
git log -p
vim .
ack queryinbox
vim main.go 
kops 1 test eo
kops 1 test eo
k get po | seed
k get po | grep seed
kops 1 prod eo
k get po
k get po | grep seed
k get po | grep pixel
k get po | grep ecm
k describe pod -l app=ecm-pixel-server -n eo | grep "Node: " | sort | uniq -c
k describe pod -l app=ecm-pixel-server
k describe pod -l app=ecm-pixel-server -n eo
kc
kops 4 prod eo

k get po | grep ecm
kops 2 prod eo
k get po | grep ecm
kops 3 prod eo
k get po | grep ecm
k describe pod -l app=ecm-pixel-server -n eo
k describe pod -l app=ecm-pixel-server -n eo | grep "Node: " | sort | uniq -c
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed | awk '{print $10}' | sort | uniq -c
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed | awk '{print $10}' | sort | uniq -c
kubectl cordon ip-10-252-30-110.ec2.internal
k get user
kc
k config
k config view
kubectl cordon ip-10-252-30-110.ec2.internal
k delete po ip-10-252-30-110.ec2.internal
k describe pod -l app=ecm-pixel-server -n eo | grep "Node: " | sort | uniq -c
k cordon ip-10-252-30-110.ec2.internal/10.252.30.110
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed | awk '{print $10}' | sort | uniq -c
k cordon ip-10-252-30-110.ec2.internal
k get po | grep pixel-server
k get po | grep pixel-server | wc -l
k describe po ecm-pixel-server-67dc99988d-46z62
k describe pod -l app=ecm-pixel-server -n eo
k get po ecm-pixel-server-67dc99988d-tjmcw 
k describe po ecm-pixel-server-67dc99988d-tjmcw
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed | awk '{print $10}' | sort | uniq -c
k describe pod -l app=ecm-pixel-server -n eo
k get po | grep pixel-server
k describe po ecm-pixel-server-67dc99988d-tjmcw
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed | awk '{print $10}' | sort | uniq -c
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed |
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed
k get po | grep seed
aws iam --help
aws iam help
aws iam list-roles help
aws iam list-roles
aqaws
aws iam list-roles
aws iam list-accounts
aws iam list-account-aliases
aws iam list-roles
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed
kops 3 prod eo
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed
k logs -f ecm-pixel-server-67dc99988d-vw2nn.
kubectl get event -n eo --sort-by=lastTimestamp
kubectl get event -n eo --sort-by=lastTimestamp | grep ecm-pixel-server | grep failed
k get po | grep pixel-server
k logs ecm-pixel-server-67dc99988d-vw2nn
k logs ecm-pixel-server-67dc99988d-72bwx
repo us
git diff
git diff
git diff
git diff
vim .
git diff
git diff
its tatus
git status
git diff
git status
vim main.go 
go test ./...
go build ./...
git status
git checkout -b jb/csv
git add -A
git diff --staged
vim .
ack sumChildUsage
vi alert/api.go 
go test ./...
git add -A
git diff
git diff --staged
vim .
git commit -m "build CSVs with same data as alerts"
git push -u origin jb/csv 
vi m.
vim .
go test ./...
go build ./...
git status
git diff
git add -A
git commit -m "use monitor endpoint for monitor csv"
git push
git push
repo blacklist
git checkout master
git pull
vim ddl
