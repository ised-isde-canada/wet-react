import React from 'react';
import '../../style.css';

export interface InputGroupTextProps
  extends React.HTMLAttributes<HTMLLabelElement> {
  /** Content of text label */
  children?: React.ReactNode;
  /** Sets the id of the label */
  id?: string;
  /** Additional custom classNames */
  className?: string;
}

const InputGroupText = ({
  children,
  id,
  className = '',
  ...rest
}: InputGroupTextProps) => (
  <span className={`input-group-addon ${className}`} id={id} {...rest}>
    {children}
  </span>
);

export default InputGroupText;
