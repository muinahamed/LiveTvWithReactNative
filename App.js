import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import API from './API';
import axios from 'axios';
import Child from './Child';
import Video from 'react-native-video';

const App = () => {
  const [chennel, setChannel] = useState();
  const [play, setPlay] = useState(false);

  const parseM3UPlaylist = m3uData => {
    const lines = m3uData.split('\n');
    const channels = [];
    let currentChannel = null;

    lines.forEach(line => {
      line = line.trim();

      if (line.startsWith('#EXTINF:')) {
        // Extract channel information from #EXTINF line
        const parts = line.split(',');
        const channelInfo = parts[1].trim();
        currentChannel = {name: channelInfo};
      } else if (line.startsWith('http')) {
        // Extract stream URL
        if (currentChannel) {
          currentChannel.url = line.trim();
          channels.push(currentChannel);
          currentChannel = null;
        }
      }
    });

    return channels;
  };

  // Output:
  // [
  //   { name: 'Channel 1', url: 'http://streaming-url-for-channel1' },
  //   { name: 'Channel 2', url: 'http://streaming-url-for-channel2' }
  // ]

  const data = async () => {
    const response = await axios.get(
      'https://iptv-org.github.io/iptv/index.m3u',
    );

    const channels = parseM3UPlaylist(response.data);

    setChannel(channels);
  };

  useEffect(() => {
    data();
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => setPlay(item?.url)}>
      <Child item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={chennel}
        renderItem={renderItem}
        maxToRenderPerBatch={30}
        initialNumToRender={30}
        keyExtractor={(item, index) => index}
      />
      <Button title="Click" onPress={() => setPlay()} />

      {play && (
        <View style={styles.container}>
          <Video
            source={{uri: play, type: 'm3u8'}}
            style={{width: '100%', height: 300}}
            controls={true}
            resizeMode="contain"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  video: {
    flex: 1,
  },
});
