import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './screens/Home';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}/>
              <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={Home}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
