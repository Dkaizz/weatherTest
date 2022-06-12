import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('content')}>
        <h1>Đây là header</h1>
      </div>
    </header>
  );
}

export default Header;
