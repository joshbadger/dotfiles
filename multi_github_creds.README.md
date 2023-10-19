github doesn't allow you to use the same ssh key across accounts, hence each Host entry has a separate IdentifyFile. the name of the Host entry will be used to specify which creds to use when cloning. I think

~/.ssh/config
```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/janus_ed25519
    AddKeysToAgent yes

# personal
Host github.com-joshbadger
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    AddKeysToAgent yes
```

add these keys to your ssh agent:
```
ssh-add --apple-use-keychain ~/.ssh/janus_ed25519 ~/.ssh/id_ed25519
```

to clone repos, use the Host name defined above in your ssh config (not to be confused with the HostName )
```
git clone git@github.com-joshbadger:joshbadger/dotfiles.git

git clone git@github.com:git@github.com-janus:janushealthinc/janus-data-science.git

```

if repos already exist, change the origin to use the new Host:
```
# from the repo dir:
cd ~/src/dotfiles
git remote set-url origin git@github.com-joshbadger:joshbadger/dotfiles.git
```