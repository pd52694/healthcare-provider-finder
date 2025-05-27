import { Text, View, StyleSheet, Image, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
      <Text style={styles.title}>Welcome to HealthAid</Text>
      <Text style={styles.paragraph}>
        Enter your condition and ZIP code to instantly get nearby healthcare provider suggestions.
      </Text>
      <Button 
        title="Next" 
        onPress={() => navigation.navigate('Recommendations')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
