import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView, useWindowDimensions, Animated } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Accueil({ navigation }) {
  const { width } = useWindowDimensions();

  const ButtonCompact = ({ title, description, iconName, color, onPress }) => {
    const animation = new Animated.Value(1);

    const pressIn = () => {
      Animated.spring(animation, { toValue: 0.97, useNativeDriver: true }).start();
    };

    const pressOut = () => {
      Animated.spring(animation, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: animation }], marginVertical: 6 }}>
        <TouchableWithoutFeedback
          onPress={onPress}
          onPressIn={pressIn}
          onPressOut={pressOut}
        >
          <View style={[styles.card, { backgroundColor: color }]}>
            <FontAwesome name={iconName} size={20} color="#fff" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{title}</Text>
              {description ? <Text style={styles.cardDesc}>{description}</Text> : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  const isLargeScreen = width > 600;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Fabrications</Text>
        <View style={[styles.grid, isLargeScreen && { flexDirection: "row", flexWrap: "wrap" }]}>
          <ButtonCompact 
            title="Nouveau" 
            description="Lancer une nouvelle fabrication" 
            iconName="plus-circle" 
            color="#28a745" 
            onPress={() => navigation.navigate('NouvelleFabrication')} 
            />

          <ButtonCompact 
            title="Liste des fabrications" 
            description="Consulter les fabrications sauvegardées" 
            iconName="list" 
            color="#f05627" 
            onPress={() => navigation.navigate('ListeFabrication')} 
          />
          <ButtonCompact 
            title="Gérer les fabrications" 
            description="Gérer les fabrications existantes" 
            iconName="cogs" 
            color="#f05627" 
            onPress={() => alert("Gérer")} 
          />
        </View>

        <Text style={styles.sectionTitle}>Serveur SQL</Text>
        <View style={[styles.grid, isLargeScreen && { flexDirection: "row", flexWrap: "wrap" }]}>
          <ButtonCompact 
            title="Paramètres du serveur SQL" 
            description="Configurer le serveur SQL" 
            iconName="server" 
            color="#f05627" 
            onPress={() => alert("Paramètres SQL")} 
          />
          <ButtonCompact 
            title="Tester la connexion" 
            description="Tester la connexion au serveur" 
            iconName="plug" 
            color="#f05627" 
            onPress={() => alert("Tester connexion")} 
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  scroll: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "column",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardDesc: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
  },
});
