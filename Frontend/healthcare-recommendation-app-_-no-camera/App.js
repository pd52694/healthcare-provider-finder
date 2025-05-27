// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/InputScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hides the top nav bar for a cleaner home screen
        />
        <Stack.Screen name="Recommendations" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
