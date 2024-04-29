import { StyleSheet, View } from 'react-native';
import PencilKitView from 'react-native-pencil-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <PencilKitView style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
