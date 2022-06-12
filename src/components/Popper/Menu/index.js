import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
const defaultFc = () => {};
function Menu({ children, items = [], onChange = defaultFc, hideOnClick = false }) {
  const [dataMenu, setDataMenu] = useState([{ data: items }]);
  let menu = dataMenu[dataMenu.length - 1];
  function RenderItem() {
    return menu.data.map((item, index) => {
      const isparent = !!item.children;
      return (
        <MenuItem
          key={index}
          item={item}
          onClick={() => {
            if (isparent) {
              setDataMenu(pre => [...pre, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  }
  return (
    <Tippy
      interactive={true}
      offset={[12, 10]}
      placement="bottom-end"
      delay={[0, 700]}
      hideOnClick={hideOnClick}
      render={attrs => {
        return (
          <div className={cx('menu_list')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              {dataMenu.length > 1 && (
                <Header
                  title={menu.title}
                  onBack={() => {
                    setDataMenu(pre => pre.slice(0, pre.length - 1));
                  }}
                />
              )}
              <div className={cx('menu_body')}>{RenderItem()}</div>
            </PopperWrapper>
          </div>
        );
      }}
      onHide={() => {
        setDataMenu(pre => pre.slice(0, 1));
      }}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool,
};

export default Menu;
