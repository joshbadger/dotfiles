import datetime
import sys
from decimal import Decimal
from typing import Any, TypeVar, Union, overload

if sys.version_info < (3, 10):
    from typing_extensions import TypeGuard
else:
    from typing import TypeGuard

from django.utils.functional import Promise
from typing_extensions import Literal

class DjangoUnicodeDecodeError(UnicodeDecodeError):
    obj: bytes = ...
    def __init__(self, obj: bytes, *args: Any) -> None: ...

_P = TypeVar("_P", bound=Promise)
_S = TypeVar("_S", bound=str)
_B = TypeVar("_B", bound=bytes)
_PT = TypeVar("_PT", None, int, float, Decimal, datetime.datetime, datetime.date, datetime.time)

@overload
def smart_str(s: _P, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> _P: ...
@overload
def smart_str(s: _S, encoding: str = ..., *, errors: str = ...) -> _S: ...
@overload
def smart_str(s: Any, encoding: str = ..., *, errors: str = ...) -> str: ...
@overload
def smart_str(s: _PT, encoding: str = ..., strings_only: Literal[True] = ..., errors: str = ...) -> _PT: ...
@overload
def smart_str(s: _S, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> _S: ...
@overload
def smart_str(s: Any, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> str: ...

smart_text = smart_str  # Deprecated

def is_protected_type(obj: Any) -> TypeGuard[_PT]: ...
@overload
def force_str(s: _S, encoding: str = ..., *, errors: str = ...) -> _S: ...
@overload
def force_str(s: Any, encoding: str = ..., *, errors: str = ...) -> str: ...
@overload
def force_str(s: _PT, encoding: str = ..., strings_only: Literal[True] = ..., errors: str = ...) -> _PT: ...
@overload
def force_str(s: _S, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> _S: ...
@overload
def force_str(s: Any, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> str: ...

force_text = force_str  # Deprecated

@overload
def smart_bytes(s: _P, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> _P: ...
@overload
def smart_bytes(s: _B, encoding: Literal["utf-8"] = ..., *, errors: str = ...) -> _B: ...
@overload
def smart_bytes(s: Any, encoding: str = ..., *, errors: str = ...) -> bytes: ...
@overload
def smart_bytes(s: _PT, encoding: str = ..., strings_only: Literal[True] = ..., errors: str = ...) -> _PT: ...
@overload
def smart_bytes(s: Any, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> bytes: ...
@overload
def force_bytes(s: _B, encoding: Literal["utf-8"] = ..., *, errors: str = ...) -> _B: ...
@overload
def force_bytes(s: Any, encoding: str = ..., *, errors: str = ...) -> bytes: ...
@overload
def force_bytes(s: _PT, encoding: str = ..., strings_only: Literal[True] = ..., errors: str = ...) -> _PT: ...
@overload
def force_bytes(s: Any, encoding: str = ..., strings_only: bool = ..., errors: str = ...) -> bytes: ...
@overload
def iri_to_uri(iri: None) -> None: ...
@overload
def iri_to_uri(iri: Union[str, Promise]) -> str: ...
@overload
def uri_to_iri(uri: None) -> None: ...  # type: ignore
@overload
def uri_to_iri(uri: Any) -> str: ...
def escape_uri_path(path: str) -> str: ...
def punycode(domain: str) -> str: ...
def repercent_broken_unicode(path: bytes) -> bytes: ...
@overload
def filepath_to_uri(path: None) -> None: ...
@overload
def filepath_to_uri(path: str) -> str: ...
def get_system_encoding() -> str: ...

DEFAULT_LOCALE_ENCODING: str