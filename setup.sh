#!/bin/bash

set -x  # this prints commands to screen

CASKS=(
	1password
	brave-browser
	insomnia
	karabiner-elements  # for key mapping
	menu-meters  # menu bar monitors (cpu, temp, network, etc)
	pgadmin4
	slack
	spotify
	visual-studio-code
	zoom
)

echo "Installing all of the things via 'brew install --cask <thing>'"

for i in "${CASKS[@]}"; do
  echo "Installing $i"
  brew install --cask "$i"
done

echo "setting up dotfiles and ~/src dirs"
mkdir ~/src
git -C ~/src clone git@github.com:joshbadger/dotfiles.git

echo "sym-linking dotfiles"
cd
ln -s ~/src/dotfiles/.vimrc ~/
ln -s ~/src/dotfiles/.bash_profile ~/
ln -s ~/src/dotfiles/.bash_functions ~/
ln -s ~/src/dotfiles/bin ~/  # for git completion and prompt

source ~/.bash_profile