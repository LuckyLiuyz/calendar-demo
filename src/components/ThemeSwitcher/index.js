import React, { useState } from 'react';
import styled from 'styled-components';

const themes = {
  light: {
    background: 'rgba(255, 255, 255, 0.8)',
    text: '#333',
    primary: '#61dafb',
  },
  dark: {
    background: 'rgba(40, 44, 52, 0.9)',
    text: '#fff',
    primary: '#61dafb',
  },
  pink: {
    background: 'rgba(255, 192, 203, 0.8)',
    text: '#333',
    primary: '#ff69b4',
  },
};

const ThemeButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 10001;
  background: ${props => props.color};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ThemeSwitcherContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10001;
`;

export default function ThemeSwitcher({ onChangeTheme }) {
  const [showThemes, setShowThemes] = useState(false);
  
  const handleThemeChange = (themeName) => {
    onChangeTheme(themes[themeName]);
    setShowThemes(false);
  };

  return (
    <>
      <ThemeButton 
        color={themes.light.primary} 
        onClick={() => setShowThemes(!showThemes)}
      />
      {showThemes && (
        <ThemeSwitcherContainer>
          {Object.keys(themes).map(theme => (
            <ThemeButton 
              key={theme}
              color={themes[theme].primary}
              onClick={() => handleThemeChange(theme)}
            />
          ))}
        </ThemeSwitcherContainer>
      )}
    </>
  );
}