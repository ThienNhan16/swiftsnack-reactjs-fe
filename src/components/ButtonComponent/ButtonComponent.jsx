import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled = false, onClick, ...rests }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : (styleButton && styleButton.background),
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      size={size}
      onClick={handleClick}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponent