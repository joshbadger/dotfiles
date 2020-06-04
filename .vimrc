set nocompatible              " be iMproved, required
filetype off                  " required

"Vundle with self-install
    let iCanHazVundle=1
    let vundle_readme=expand('~/.vim/bundle/Vundle.vim/README.md')
    if !filereadable(vundle_readme)
        echo "Installing Vundle.."
        echo ""
        silent !mkdir -p ~/.vim/bundle
        silent !git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
        let iCanHazVundle=0
    endif
    set rtp+=~/.vim/bundle/Vundle.vim/
    call vundle#rc()

    " let Vundle manage Vundle, required
    Plugin 'VundleVim/Vundle.vim'
    if iCanHazVundle == 0
        echo "Installing Bundles, please ignore key map error messages"
        echo ""
        :PluginInstall
    endif
    call vundle#begin()
        Plugin 'VundleVim/Vundle.vim'
        Plugin 'vim-airline/vim-airline'
        Plugin 'altercation/vim-colors-solarized'
        Plugin 'airblade/vim-gitgutter'
        Plugin 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }
        "Plugin 'derekwyatt/vim-scala'
        Plugin 'scrooloose/nerdtree'
        Plugin 'ruanyl/vim-gh-line'
		Plugin 'mileszs/ack.vim'
        Plugin 'SirVer/ultisnips'
        "Plugin 'stephpy/vim-yaml'
        Plugin 'tpope/vim-surround'
        Plugin 'matchit.zip'
        "Plugin 'JamshedVesuna/vim-markdown-preview'
    call vundle#end()            " required
    filetype plugin indent on    " required
"Vundle Stop

"General
    let mapleader = ","
    set backspace=2   " Backspace deletes like most programs in insert mode
    set nobackup
    set nowritebackup
    set noswapfile    "http://robots.thoughtbot.com/post/18739402579/global-gitignore#comment-458413287
    set history=150
    set ruler         " show the cursor position all the time
    set showcmd       " display incomplete commands
    set incsearch     " do incremental searching
    "set hlsearch     " do highlight searching
    set laststatus=2  " Always display the status line
    set autowrite     " Automatically :write before running commands
    "set wrap!         " don't wrap lines

    autocmd BufWritePre * :%s/\s\+$//e  "auto strip whitespace on save
    nnoremap <leader>c :exe ":silent !chromium-browser %"<CR> "open current file in chro'me

    " wrap long lines in quickfix
    augroup quickfix
        autocmd!
        autocmd FileType qf setlocal wrap
    augroup END

	" tab navigation
    nnoremap th  :tabfirst<CR>
	nnoremap tj  :tabnext<CR>
	nnoremap tk  :tabprev<CR>
	nnoremap tl  :tablast<CR>
	nnoremap tc  :tabclose<CR>

    " buffer navigation
    map <leader>n :bp<CR>
    map <leader>m :bn<CR>
    map <leader>d :bd<CR>

    " Quick edit vimrc
    map <leader>rc :execute "tabnew " . $MYVIMRC<CR>
    map <leader>rs :execute "source " . $MYVIMRC<CR>

    " Switch between the last two files
    nnoremap <leader><leader> <c-^>

    " Get off my lawn
    nnoremap <Left> :echoe "Use h"<CR>
    nnoremap <Right> :echoe "Use l"<CR>
    nnoremap <Up> :echoe "Use k"<CR>
    nnoremap <Down> :echoe "Use j"<CR>

"text control
    " copy paste using system clipboard
    vnoremap <leader>c :w !pbcopy<CR><CR>
    noremap <leader>v :r !pbpaste<CR><CR>

    " trim whitespace func
    fun! TrimWhitespace()
        let l:save = winsaveview()
        keeppatterns %s/\s\+$//e
        call winrestview(l:save)
    endfun

    map <leader>w :call TrimWhitespace()<CR>

"ultisnips
    " Trigger configuration
    let g:UltiSnipsExpandTrigger="<tab>"
    let g:UltiSnipsJumpForwardTrigger="<tab>"
    let g:UltiSnipsJumpBackwardTrigger="<C-b>"

"silver searcher
    if executable('ag')
		let g:ackprg = 'ag --vimgrep'
	endif

"vim-go
    let g:go_fmt_command = "goimports"  " format with goimports instead of gofmt
    let g:go_list_type = "quickfix"     " only use quickfix error lists
    let g:go_def_mode='godef'           " faster than default, guru

    " :GoBuild, :GoTest, etc
    map <C-j> :cnext<CR>
    map <C-k> :cprevious<CR>
    nnoremap <leader>a :cclose<CR>
    autocmd FileType go nmap <leader>r  <Plug>(go-run)
    autocmd FileType go nmap <leader>b  <Plug>(go-build)
    autocmd FileType go nmap <leader>t  <Plug>(go-test)

"colors
    set background=dark
    let g:solarized_termcolors=256
    let g:solarized_termtrans=0
    " solarized options
    let g:solarized_visibility = "high"
    let g:solarized_contrast = "high"

    " Switch syntax highlighting on, when the terminal has colors
    " Also switch on highlighting the last used search pattern.
    if (&t_Co > 2 || has("gui_running")) && !exists("syntax_on")
        syntax on
    endif

    "make it obvious where 80 characters is
    set textwidth=80
    set colorcolumn=+1
    highlight ColorColumn ctermbg=010002

" Numbers
    set number
    set numberwidth=5

" nerdtree
    map <C-p> :NERDTreeFind<CR>
    map <C-n> :NERDTreeToggle<CR>
    let g:NERDTreeNodeDelimiter = "\u00a0" "get rid of ^G characters

" Open new split panes to right and bottom, which feels more natural
    set splitbelow
    set splitright

" Softtabs, 2 spaces
    set tabstop=4
    set shiftwidth=4
    set shiftround
    set expandtab

set clipboard=unnamed " for cross-session copy paste

" airline config
let g:airline#extensions#tabline#enabled = 1 " enable buffer list
let g:airline#extensions#tabline#fnamemod = ':t' " Show just the filename

" auto load vimrc changes
augroup myvimrchooks
    au!
    autocmd bufwritepost .vimrc source ~/.vimrc
augroup END
