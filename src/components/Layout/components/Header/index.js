import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);
function Header() {
  const [searchResults, SetsearchResults] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      SetsearchResults([]);
    }, 0);
  }, []);

  return (
    <header className={cx('header')}>
      <div className={cx('content')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <Tippy
          interactive={true}
          visible={searchResults.length > 0}
          render={attrs => {
            return (
              <div className={cx('search_old')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <h4 className={cx('search_title')}> Account</h4>
                  <AccountItem />
                </PopperWrapper>
              </div>
            );
          }}
        >
          <div className={cx('search')}>
            <input type="text" name="search" placeholder="Tìm kiếm" className={cx('input_search')} spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <span className={cx('span')}></span>

            <button type="button" className={cx('btn_search')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={cx('actions')}>
          <Button rounded>Upload</Button>

          <Button text>Login</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
