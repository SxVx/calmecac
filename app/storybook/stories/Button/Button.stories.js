import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import Button from '.';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator((Story, context) => <CenterView><Story /></CenterView>)
  .add('with text', context => {
    const theme = useTheme();

    // console.log(theme);
    {console.log(context.hooks)}

    return (
    <Button onPress={action('clicked-text', {
      allowFunction: true,
    })}
      disabled={boolean('disabled', true)}
    >
      <Text>{text('Button text2222222222222222', 'Hello Button')}</Text>
    </Button>
  )})
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
