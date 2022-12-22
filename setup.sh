#!/bin/bash

# install brew
export HOMEBREW_INSTALL_FROM_API=1
eval "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"

# TODO: install xcode command line tools

# set -x  # this prints commands to screen

CASKS=(
	1password
	boom  # system-wide mac EQ
	brave-browser  # no tracky tracky
	insomnia  # rest client
    iterm2
	karabiner-elements  # for key mapping my HHKB function keys
	menumeters  # menu bar monitors (cpu, temp, network, etc)
	pgadmin4
	slack
	spectacle  # window mgmt
	spotify
	visual-studio-code
    postgresql@14
)

NOT_CASKS=(
    pyenv
    pyenv-virtualenv
    colordiff
    awscli
    jq
    wget
)

echo "Installing all of the things via 'brew install --cask <thing>'"

for i in "${CASKS[@]}"; do
  echo ""
  echo "Installing $i"
  brew install --cask "$i" || true
done

for i in "${NOT_CASKS[@]}"; do
  echo ""
  echo "Installing $i"
  brew install "$i" || true
done

echo "setting up dotfiles and ~/src dirs"
mkdir ~/src
git -C ~/src clone https://github.com/joshbadger/dotfiles.git

echo "sym-linking dotfiles"
cd
ln -s ~/src/dotfiles/.vimrc ~
ln -s ~/src/dotfiles/.bash_profile ~
ln -s ~/src/dotfiles/.bash_functions ~
ln -s ~/src/dotfiles/bin ~  # for git completion and prompt

source ~/.bash_profile
