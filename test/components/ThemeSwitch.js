import React from 'react';
import styled from 'styled-components';

const ThemeSwitch = ({ dark, setDark }) => {
  const handleToggle = () => setDark(prev => !prev);

  return (
    <StyledWrapper>
      <label className="theme-switch">
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          checked={dark}
          onChange={handleToggle}
        />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds" />
          <div className="theme-switch__stars-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.889 5.21 135.467 6.24006C136.951 8.81452 136.698 12.0246 134.786 14.3439C132.874 16.6632 129.496 17.5855 126.69 16.6761C125.557 16.3126 124.295 16.6632 123.524 17.5573C122.752 18.4514 122.63 19.7955 123.219 20.8256C124.451 23.0098 124.053 25.8568 122.218 27.6511C120.383 29.4454 117.487 29.9773 115.092 29.0003C113.913 28.5281 112.535 28.9138 111.741 29.9243C110.947 30.9348 110.872 32.3556 111.524 33.4458C112.884 35.7448 112.645 38.7599 110.933 40.8402C109.222 42.9205 106.458 43.8414 103.797 43.0208C102.59 42.6477 101.256 43.0442 100.452 44.0839C99.649 45.1236 99.5911 46.5842 100.311 47.6911C101.81 50.0281 101.498 53.1707 99.5801 55.1527C95.671 56.9763 90.0521 55.1527 87.4817 52.0261C86.1527 50.4497 84.0878 49.7051 81.9817 50.0281C79.8756 50.3511 78.1538 51.7618 77.4083 53.7429L77.4077 53.7443C76.6664 55.7164 74.7975 57.0669 72.7129 57.0669C70.6284 57.0669 68.7594 55.7164 68.0181 53.7443L68.0175 53.7429C67.272 51.7618 65.5502 50.3511 63.4441 50.0281C61.338 49.7051 59.2731 50.4497 57.9441 52.0261C55.3737 55.1527 49.7548 56.9763 45.8457 55.1527C43.9278 53.1707 43.6158 50.0281 45.1149 47.6911C45.835 46.5842 45.7771 45.1236 44.9736 44.0839C44.1701 43.0442 42.8362 42.6477 41.6294 43.0208C38.9685 43.8414 36.2043 42.9205 34.4928 40.8402C32.7814 38.7599 32.542 35.7448 33.902 33.4458C34.5543 32.3556 34.4791 30.9348 33.6851 29.9243C32.8911 28.9138 31.5127 28.5281 30.3337 29.0003C27.9389 29.9773 25.0428 29.4454 23.2078 27.6511C21.3727 25.8568 20.9748 23.0098 22.2065 20.8256C22.7959 19.7955 22.6732 18.4514 21.9016 17.5573C21.1299 16.6632 19.868 16.3126 18.7348 16.6761C15.9291 17.5855 12.5507 16.6632 10.6388 14.3439C8.72699 12.0246 8.47393 8.81452 9.95818 6.24006C10.5366 5.21 10.3706 3.85027 9.59441 3.00688C8.81818 2.16349 7.66475 1.95635 6.58837 2.46546C3.83309 3.79582 0.968628 6.24006 0.968628 11.3346C0.968628 16.4291 4.7629 21.2765 10.7226 21.2765C11.3218 21.2765 11.906 21.2175 12.4697 21.1052C12.0648 22.1844 11.8382 23.3497 11.8382 24.5699C11.8382 30.2934 16.3919 34.9241 22.0105 34.9241C22.9006 34.9241 23.7625 34.8086 24.5828 34.5908C24.0454 35.7595 23.7514 37.0647 23.7514 38.4395C23.7514 43.8386 28.1123 48.2582 33.502 48.2582C34.7436 48.2582 35.9316 48.0161 37.0197 47.5766C36.6386 48.6947 36.4314 49.8975 36.4314 51.1511C36.4314 56.6573 40.8848 61.1419 46.3778 61.1419C47.9832 61.1419 49.4984 60.7565 50.8394 60.0729C52.4215 64.2459 56.4319 67.1916 61.1059 67.1916C65.7849 67.1916 69.7992 64.2411 81.3815 64.2411C92.9638 64.2411 96.9781 67.1916 101.657 67.1916C106.331 67.1916 110.341 64.2459 111.923 60.0729C113.264 60.7565 114.779 61.1419 116.385 61.1419C121.878 61.1419 126.331 56.6573 126.331 51.1511C126.331 49.8975 126.124 48.6947 125.743 47.5766C126.831 48.0161 128.019 48.2582 129.261 48.2582C134.65 48.2582 139.011 43.8386 139.011 38.4395C139.011 37.0647 138.717 35.7595 138.18 34.5908C139 34.8086 139.862 34.9241 140.752 34.9241C146.371 34.9241 150.924 30.2934 150.924 24.5699C150.924 23.3497 150.698 22.1844 150.293 21.1052C150.857 21.2175 151.441 21.2765 152.04 21.2765C157.999 21.2765 161.794 16.4291 161.794 11.3346C161.794 6.24006 158.929 3.79582 156.174 2.46546C155.098 1.95635 153.944 2.16349 153.168 3.00688H135.831Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
              </div>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .theme-switch {
    --toggle-size: 14px;
    --container-width: 5.625em;
    --container-height: 2.5em;
    --container-radius: 6.25em;
    --container-light-bg: #3D7EAE;
    --container-night-bg: #1D1F2C;
    --circle-container-diameter: 3.375em;
    --sun-moon-diameter: 2.125em;
    --sun-bg: #ECCA2F;
    --moon-bg: #C4C9D1;
    --spot-color: #959DB1;
    --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
    --stars-color: #fff;
    --clouds-color: #F3FDFF;
    --back-clouds-color: #AACADF;
    --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
    --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
  }

  .theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: var(--toggle-size);
  }

  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background-color: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0em -0.062em 0.062em rgba(0,0,0,0.25), 0em 0.062em 0.125em rgba(255,255,255,0.94);
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__container::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    box-shadow: 0em 0.05em 0.187em rgba(0,0,0,0.25) inset;
    border-radius: var(--container-radius);
  }

  .theme-switch__checkbox { display: none; }

  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255,255,255,0.1);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    box-shadow: inset 0 0 0 3.375em rgba(255,255,255,0.1), 0 0 0 0.625em rgba(255,255,255,0.1), 0 0 0 1.25em rgba(255,255,255,0.1);
    display: flex;
    transition: var(--circle-transition);
    pointer-events: none;
  }

  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: var(--container-radius);
    background-color: var(--sun-bg);
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254,255,239,0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
    filter: drop-shadow(0.062em 0.125em 0.125em rgba(0,0,0,0.25));
    overflow: hidden;
    transition: var(--transition);
  }

  .theme-switch__moon {
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: var(--moon-bg);
    border-radius: inherit;
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254,255,239,0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__spot {
    position: absolute;
    top: 0.75em;
    left: 0.312em;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--container-radius);
    background-color: var(--spot-color);
    box-shadow: 0em 0.0312em 0.062em rgba(0,0,0,0.25) inset;
  }
  .theme-switch__spot:nth-of-type(2) { width: 0.375em; height: 0.375em; top: 0.937em; left: 1.375em; }
  .theme-switch__spot:nth-last-of-type(3) { width: 0.25em; height: 0.25em; top: 0.312em; left: 0.812em; }

  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }

  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    transition: var(--transition);
  }

  .theme-switch__checkbox:checked + .theme-switch__container { background-color: var(--container-night-bg); }
  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
  }
  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon { transform: translate(0); }
  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds { bottom: -4.062em; }
  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default ThemeSwitch;
