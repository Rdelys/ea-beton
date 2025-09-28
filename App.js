import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Accueil from './screens/Accueil';
import NouvelleFabrication from './screens/NouvelleFabrication';
import ListeFabrication from './screens/ListeFabrication';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <FontAwesome name="home" size={28} color="#f05627" style={{ marginRight: 8 }} />
                <Text style={styles.header}>Accueil</Text>
              </View>
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="NouvelleFabrication"
          component={NouvelleFabrication}
          options={{ title: 'Nouvelle Fabrication' }}
        />
        <Stack.Screen
          name="ListeFabrication"
          component={ListeFabrication}
          options={{ title: 'Liste et status des fabrications' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});
