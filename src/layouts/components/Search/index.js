import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import HeaderTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icon';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { search } from '~/apiServices/searchServices';
const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();

  const [searchResults, SetsearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounce.trim().length > 0) {
      setLoading(true);
      const fetchApi = async () => {
        const result = await search(debounce);
        SetsearchResults(result);
        setLoading(false);
      };
      fetchApi();
    } else {
      SetsearchResults([]);
    }
  }, [debounce]);

  const handleChange = e => {
    const Value = e.target.value;
    if (!Value.startsWith(' ')) {
      setSearchValue(Value);
    }
  };

  return (
    <HeaderTippy
      interactive={true}
      visible={showResult && searchResults.length > 0}
      render={attrs => {
        return (
          <div className={cx('search_old')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search_title')}> Account</h4>
              {searchResults.map(result => {
                return <AccountItem key={result.id} data={result} onClick={() => setShowResult(false)} />;
              })}
            </PopperWrapper>
          </div>
        );
      }}
      onClickOutside={() => {
        setShowResult(false);
      }}
    >
      <div className={cx('search')}>
        <input
          autoComplete="off"
          ref={inputRef}
          value={searchValue}
          //   onChange={e => setSearchValue(e.target.value)}
          onInput={handleChange}
          type="text"
          name="search"
          placeholder="Tìm kiếm"
          className={cx('input_search')}
          spellCheck={false}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && !loading && (
          <button
            className={cx('clear')}
            onClick={() => {
              setSearchValue('');
              SetsearchResults([]);
              inputRef.current.focus();
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <span className={cx('span')}></span>

        <button type="button" className={cx('btn_search')} onMouseDown={e => e.preventDefault()}>
          <SearchIcon />
        </button>
      </div>
    </HeaderTippy>
  );
}

export default Search;
