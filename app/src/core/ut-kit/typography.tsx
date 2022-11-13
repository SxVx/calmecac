import { Theme } from '@core/theme/theme';
import React from 'react';
import { Text, TextProps } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  align?: 'left' | 'center' | 'right';
  variant?: keyof Theme['typography'];
} & TextProps &
  SpacingProps;

const Typography = (props: Props) => (
  <StyledText<React.ComponentType<TextProps>>
    {...props}
    allowFontScaling={false}
  />
);

export default Typography;

const StyledText = styled.Text<Omit<Props, 'children'>>`
  ${({ theme, variant = 'medium' }) => theme.typography[variant]};
  font-family: Poppins;
  ${({ align = 'auto' }) => `text-align: ${align}`}
  color: ${({ theme }) => theme.colors.font.primary};
  ${({ theme, variant = 'small' }) => theme.typography[variant]}
  ${({ theme, ...rest }) => theme.utils.getMargin(rest)}
`;
