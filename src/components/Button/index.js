import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);
function Button({
  to,
  disabled = false,
  primary = false,
  text = false,
  outline = false,
  small = false,
  large = false,
  rounded = false,
  href,
  className,
  children,
  onClick,
  ...passprops
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passprops,
  };
  if (disabled) {
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export default Button;
