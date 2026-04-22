BUILD_DIR=`mktemp -d -p "/tmp/"`
NVIM_VERSION="v0.9.0"
(cd $BUILD_DIR && git clone https://github.com/neovim/neovim.git)
(cd $BUILD_DIR/neovim && git checkout $NVIM_VERSION)
make -j $(nproc) -C $BUILD_DIR/neovim
sudo make -C $BUILD_DIR/neovim install
