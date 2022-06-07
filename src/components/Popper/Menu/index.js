import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFc = () => {};
function Menu({ children, items, onChange = defaultFc }) {
  const [dataMenu, setDataMenu] = useState([{ data: items }]);
  let menu = dataMenu[dataMenu.length - 1];
  console.log('menu', menu);
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
              console.log(onChange);
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
              {RenderItem()}
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

export default Menu;
