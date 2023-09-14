#!/bin/bash

# install brew
export HOMEBREW_INSTALL_FROM_API=1
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"

# TODO: install xcode command line tools
# or maybe not - mac installs this the first time you run any git command

# set -x  # this prints commands to screen

CASKS=(
	1password
	boom  # system-wide mac EQ
	brave-browser  # no tracky tracky
	insomnia  # rest client
	iterm2
      # karabiner-elements  # for key mapping my HHKB function keys
	menumeters  # menu bar monitors (cpu, temp, network, etc)
      # pgadmin4
	slack
	spectacle  # window mgmt
	spotify
	visual-studio-code
      # postgresql@14
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

echo "setting up dotfiles and $HOME/src dirs"

if [ -d "$HOME/src" ]; then
  echo "Directory $HOME/src exists."
else
  mkdir $HOME/src
fi

if [-d "$HOME/src/dotfiles"]; then
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
ln -s $HOME/src/dotfiles/keybindings.json $HOME
ln -s $HOME/src/dotfiles/settings.json $HOME

# vscode enable press and hold for key repeat
eval "defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false"

source $HOME/.bash_profile
