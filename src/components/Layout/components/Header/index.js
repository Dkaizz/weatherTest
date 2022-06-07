import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKeyboard,
  faCircleQuestion,
  faEarthAsia,
  faCircleXmark,
  faEllipsisVertical,
  faSpinner,
  faUser,
  faCoins,
  faGear,
  faSignOut,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import HeaderTippy from '@tippyjs/react/headless';

import Tippy from '@tippyjs/react';
import { InboxIcon, MessageIcon, SearchIcon } from '~/components/Icon';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResults, SetsearchResults] = useState([1, 2, 3]);
  useEffect(() => {
    setTimeout(() => {
      SetsearchResults([]);
    }, 0);
  }, []);
  const handleMenuChange = item => {
    console.log('item', item);
  };

  const currentUser = {};
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];
  return (
    <header className={cx('header')}>
      <div className={cx('content')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <HeaderTippy
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
              <SearchIcon />
            </button>
          </div>
        </HeaderTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button square>
                <FontAwesomeIcon className={cx('icon-upload')} icon={faPlus} />
                Tải lên
              </Button>
              <Tippy offset={[0, 11]} delay={[0, 200]} content="Tin nhắn" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy offset={[0, 9]} delay={[0, 200]} content="Hộp thư" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button rounded>Upload</Button>

              <Button primary>Login</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/18c4cacfa4e5ebc896e01ba37f035704~c5_100x100.jpeg?x-expires=1654693200&x-signature=gJGc7mEknk5x8IpAp6amxRfwvMQ%3D"
                alt="Nguyen Van A"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
