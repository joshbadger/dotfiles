#!/bin/bash

# change shell to bash
chsh -s /bin/bash

# install brew - UNCOMMENT BELOW IF RUNNING FOR THE FIRST TIME
# export HOMEBREW_INSTALL_FROM_API=1
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# eval "$(/opt/homebrew/bin/brew shellenv)"

# TODO: install xcode command line tools
# or maybe not - mac installs this the first time you run any git command

# set -x  # this prints commands to screen

echo "Brew installing all of the things"
brew bundle install

echo "setting up dotfiles and $HOME/src dirs"

if [ -d "$HOME/src" ]; then
  echo "Directory $HOME/src exists."
else
  mkdir $HOME/src
fi

# use https here since we haven't setup git creds yet
if [ -d "$HOME/src/dotfiles" ]; then
  echo "dotfiles have already been cloned"
else
  git -C $HOME/src clone https://github.com/joshbadger/dotfiles.git
fi

echo "sym-linking dotfiles for:"
echo "  vim"
echo "  bash_profile"
echo "  bash_functions"
echo "  git completion"
echo "  prompt"
echo "  vscode settings + keybindings"

cd
ln -s $HOME/SRC/dotfiles/.vimrc $HOME
ln -s $HOME/src/dotfiles/.bash_profile $HOME
ln -s $HOME/src/dotfiles/.bash_functions $HOME
ln -s $HOME/src/dotfiles/bin $HOME  # for git completion and prompt

# these are for vscode, but i think unneeded if you turn on sync in the app
# ln -s $HOME/src/dotfiles/keybindings.json $HOME/Library/Application\ Support/Code/User/keybindings.json
# ln -s $HOME/src/dotfiles/settings.json $HOME/Library/Application\ Support/Code/User/settings.json

# vscode enable press and hold for key repeat
eval "defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false"

source $HOME/.bash_profile
