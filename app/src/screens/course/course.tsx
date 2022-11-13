import { View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@core/routes/utils/types';
import Video from 'react-native-video';
import styled from 'styled-components/native';
import Typography from '@core/ut-kit/typography';

import Icon from 'react-native-vector-icons/Octicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Course'>;

const Course = ({ route }: Props) => {
  const { course } = route.params;

  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<Video>(null);

  const onPause = () => setPaused(prev => !prev);

  return (
    <View>
      <PauseControllerContainer onPress={onPause}>
        <StyledVideo
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          resizeMode="cover"
          ref={ref}
          paused={paused}
        />
        {paused && <StyledIcon name="play" size={44} color="#000" />}
      </PauseControllerContainer>
      <Body>
        <Typography variant="mediumBold">{course.title}</Typography>
        <Typography variant="medium">Teacher: {course.teacher}</Typography>
        <Typography variant="medium" marginY="xl">
          Description: {'\n'}
          {'\n'}
          {course.description}
        </Typography>
      </Body>
    </View>
  );
};

export default Course;

const StyledVideo = styled(Video)`
  flex-grow: 1;
`;

const PauseControllerContainer = styled.Pressable`
  width: 100%;
  height: 300px;
`;

const Body = styled.ScrollView`
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  align-self: center;
`;
