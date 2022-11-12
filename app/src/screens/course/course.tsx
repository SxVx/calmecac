import { View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@core/routes/utils/types';
import Video from 'react-native-video';
import styled from 'styled-components/native';
import Typography from '@core/ut-kit/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Course'>;

const Course = ({ route, navigation }: Props) => {
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
      </PauseControllerContainer>
      <Typography variant="mediumBold">{course.title}</Typography>
      <Typography variant="medium">Teacher: {course.teacher}</Typography>
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
  background-color: red;
`;
