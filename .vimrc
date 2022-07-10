set nocompatible            " be iMproved, required
filetype off                " required
set path+=**                " recurse

" Python jedi - apparently this has to happen before you load the plugin.
    let g:jedi#goto_command = "<leader>d"
    let g:jedi#goto_assignments_command = "<leader>g"
    let g:jedi#goto_stubs_command = "<leader>s"
    let g:jedi#goto_definitions_command = ""
    let g:jedi#documentation_command = "K"
    let g:jedi#usages_command = "<leader>u"
    let g:jedi#completions_command = "<C-Space>"
    let g:jedi#rename_command = "<leader>r"
    let g:jedi#use_tabs_not_buffers = 0  " use buffers instead of tabs
    " let g:jedi#show_call_signatures = '1'

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
        echo "Installing Plugins, please ignore key map error messages"
        echo ""
        :PluginInstall
    endif
    call vundle#begin()
        Plugin 'VundleVim/Vundle.vim'
        Plugin 'airblade/vim-gitgutter'                         " show per line git status
        Plugin 'andviro/flake8-vim'                             " linter
        Plugin 'davidhalter/jedi'                               " LSP server for linting, etc
        " Plugin 'dense-analysis/ale'                             " async linter
        " Plugin 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }   " for Golang development
        " Plugin 'JamshedVesuna/vim-markdown-preview'             " markdown preview
        " Plugin 'jeetsukumaran/vim-pythonsense'                  " python specific text
        " Plugin 'jiangmiao/auto-pairs'                           " autoclose parens + quotes
        Plugin 'joshdick/onedark.vim'                           " atom colors, yay
        " Plugin 'junegunn/fzf.vim'                               " fuzzy finder  ******** DOESNT WORK AS IS
		" Plugin 'mileszs/ack.vim'                                " easy acking in vim
        " Plugin 'neoclide/coc.nvim', {'branch': 'release'}       "
        " Plugin 'numirias/semshi'                                " syntax highlighting
        Plugin 'ruanyl/vim-gh-line'                             " open line in github/gitlab/bitbucket
        Plugin 'scrooloose/nerdtree'                            " tree view
        Plugin 'tpope/vim-commentary'                           " easy line commenting
        " Plugin 'tpope/vim-surround'                             " mgmt of parens/quotes
        " Plugin 'tweekmonster/wstrip.vim'                       "
        Plugin 'vim-airline/vim-airline'                        " status bar / tab line
        Plugin 'Vimjas/vim-python-pep8-indent'                  " indentz
        Plugin 'Xuyuanp/nerdtree-git-plugin'                    " nerdtree git status
        " Plugin 'VundleVim/Vundle.vim'
        " Plugin 'ludovicchabant/vim-gutentags'                   " tag management... we'll see
    call vundle#end()            " required
    filetype plugin indent on    " required
"Vundle Stop

"General
    let mapleader = " "
    let maplocalleader = "\\"

    " vertically help docs via ':h <topic>'
    :cabbrev h vert h

    "find and replaze
    noremap ;; :%s///g<Left><Left><Left>
    noremap ;' :%s///cg<Left><Left><Left><Left>
    noremap "" :%s/\(\)//c<Left><Left><Left><Left><Left><Left>
    " noremap mc /\(===\|>>>\|<<<\)<CR>

   "inoremap jk <ESC>
    set backspace=2   " Backspace deletes like most programs in insert mode
    set nobackup
    set nowritebackup
    set noswapfile    "http://robots.thoughtbot.com/post/18739402579/global-gitignore#comment-458413287
    set history=150
    set ruler         " show the cursor position all the time
    set showcmd       " display incomplete commands
    set incsearch     " do incremental searching

    set hlsearch!     " toggle highlight search
    nnoremap <leader>3 :set hlsearch!<CR>

    set laststatus=2  " Always display the status line
    set autowrite     " Automatically :write before running commands
    "set wrap!         " don't wrap lines

    " autocmd BufWritePre * :%s/\s\+$//e  "auto strip whitespace on save
    "nnoremap <leader>c :exe ':silent !chromium-browser %'<CR> "open current file in chro'me

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
    map <leader>bd :bd<CR>

    " Quick edit vimrc
    map <leader>re :execute "tabnew " . $MYVIMRC<CR>
    map <leader>rs :execute "source " . $MYVIMRC<CR>

    map <leader>rv :execute "tabnew /Users/jbadger/.vimrc"<CR>
    map <leader>ss :execute "source /Users/jbadger/.vimrc"<CR>

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

    " find and replace selection
    vnoremap <C-r> "hy:%s/<C-r>h//gc<left><left><left>

    " trim whitespace func
    fun! TrimWhitespace()
        let l:save = winsaveview()
        keeppatterns %s/\s\+$//e
        call winrestview(l:save)
    endfun

    map <leader>w :call TrimWhitespace()<CR>

""ultisnips
"    " Trigger configuration
"    let g:UltiSnipsExpandTrigger="<tab>"
"    let g:UltiSnipsJumpForwardTrigger="<tab>"
"    let g:UltiSnipsJumpBackwardTrigger="<C-b>"

"silver searcher
    if executable('ag')
		let g:ackprg = 'ag --vimgrep'
	endif

""vim-go
"    let g:go_fmt_command = 'goimports' format with goimports instead of gofmt
"    let g:go_list_type = ''quickfix' only use quickfix error lists
"    let g:go_def_mode='godef'           " faster than default, guru

"    " :GoBuild, :GoTest, etc
"    "  quickfix pane nav
    " map <C-j> :cnext<CR>
    " map <C-k> :cprevious<CR>
"    nnoremap <leader>a :cclose<CR>
"    autocmd FileType go nmap <leader>r  <Plug>(go-run)
"    autocmd FileType go nmap <leader>b  <Plug>(go-build)
"    autocmd FileType go nmap <leader>t  <Plug>(go-test)

" Python
    " set tags=tags
    " autocmd BufWritePost *.py silent! !ctags -R --python-kinds=-i --languages=python 2&gt; /dev/null &amp; " rewrite tags on every save

    " let g:ale_linters = {'python': ['flake8']}
    " let g:ale_fixers = {'python': ['remove_trailing_lines', 'trim_whitespace']}

    let g:PyFlakeOnWrite = 1
    let g:PyFlakeCheckers = 'flake8,pep8'
    let g:PyFlakeDisabledMessages = 'E501,E402'
    let g:PyFlakeSigns = 0

    " " F10 to format
    " nmap <F10> :ALEFix<CR>
    " let g:ale_fix_on_save = 1

    "  quickfix pane nav
    map <C-j> :cnext<CR>
    map <C-k> :cprevious<CR>


" CoC
    " " GoTo code navigation.
    " nmap <silent> gd <Plug>(coc-definition)
    " nmap <silent> gy <Plug>(coc-type-definition)
    " nmap <silent> gi <Plug>(coc-implementation)
    " nmap <silent> gr <Plug>(coc-references)

"colors
    syntax on
    colorscheme onedark

    "make it obvious where 80 characters is
    set textwidth=200
    set colorcolumn=+1
    highlight ColorColumn ctermbg=010002

" Numbers
    set number
    set numberwidth=5

" nerdtreej
    " " open by default
    " autocmd StdinReadPre * let s:std_in=1
    " autocmd VimEnter * if argc() == 0 && !exists(“s:std_in”) | NERDTree | endif

    " " auto close tabs if nerdtree is last one open
    " autocmd bufenter * if (winnr(“$”) == 1 && exists(“b:NERDTreeType”) && b:NERDTreeType == “primary”) | q | endif

    map <C-p> :NERDTreeFind<CR>
    map <C-n> :NERDTreeToggle<CR>

    let NERDTreeQuitOnOpen = 1 "close nerdtree when you open a file
    let g:NERDTreeNodeDelimiter = "\u00a0" "get rid of ^G characters
    let NERDTreeShowHidden=1 " show dot files

"Open new split panes to right and bottom, which feels more natural
    set splitright

" Softtabs, 4 spaces
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
