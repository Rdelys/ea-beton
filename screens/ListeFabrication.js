import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

export default function ListeFabrication({ navigation }) {
  const [client, setClient] = useState(null);
  const [commande, setCommande] = useState(null);
  const [machine, setMachine] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [showFilterDatePicker, setShowFilterDatePicker] = useState(false);
  const [showDatePickerId, setShowDatePickerId] = useState(null);

  const initialData = [
    {
      id: 1,
      client: "Client A",
      dateFab: null,
      article: "Article A",
      qteCommande: 100,
      machine: "M1",
      site: "Site 1",
      qteAFabriquer: 100,
      qteProduite: 0,
      status: "Nouveau",
      tempsEcoule: 0,
      qteRestante: 100,
      casse: 0,
    },
    {
      id: 2,
      client: "Client B",
      dateFab: null,
      article: "Article B",
      qteCommande: 50,
      machine: "M2",
      site: "Site 2",
      qteAFabriquer: 50,
      qteProduite: 0,
      status: "En cours",
      tempsEcoule: 0,
      qteRestante: 50,
      casse: 0,
    },
  ];

  const [data, setData] = useState(initialData);

  const statusColor = (status) => {
    switch (status) {
      case "Nouveau": return "#3498db";
      case "Terminé": return "#e74c3c";
      case "En cours": return "#2ecc71";
      case "Planifié": return "#f39c12";
      default: return "#000";
    }
  };

  const handleDateChange = (event, selectedDate, id) => {
    setShowDatePickerId(null);
    if (selectedDate) {
      setData((prev) =>
        prev.map((row) => (row.id === id ? { ...row, dateFab: selectedDate } : row))
      );
    }
  };

  const handleFilterDateChange = (event, selectedDate) => {
    setShowFilterDatePicker(false);
    if (selectedDate) setFilterDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.buttonHeader}
            onPress={() => navigation.navigate("NouvelleFabrication")}
          >
            <Text style={styles.buttonHeaderText}>Nouveau</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRetour}
            onPress={() => navigation.goBack && navigation.goBack()}
          >
            <Text style={styles.buttonRetourText}>Retour Accueil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtres */}
      <View style={styles.filtres}>
        <Text style={styles.label}>Client :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setClient}
            items={[{ label: "Client A", value: "A" }, { label: "Client B", value: "B" }]}
            placeholder={{ label: "Sélectionner client", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Commande n° :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setCommande}
            items={[{ label: "Commande 1", value: 1 }, { label: "Commande 2", value: 2 }]}
            placeholder={{ label: "Sélectionner commande", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Machine :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setMachine}
            items={[{ label: "M1", value: "M1" }, { label: "M2", value: "M2" }]}
            placeholder={{ label: "Sélectionner machine", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Status :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setStatus}
            items={[
              { label: "Nouveau", value: "Nouveau" },
              { label: "En cours", value: "En cours" },
              { label: "Terminé", value: "Terminé" },
              { label: "Planifié", value: "Planifié" },
            ]}
            placeholder={{ label: "Sélectionner status", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Date de fabrication :</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setShowFilterDatePicker(true)}
        >
          <Text style={{ color: "#2f3640", textAlign: "center" }}>
            {filterDate ? filterDate.toLocaleDateString("fr-FR") : "Sélectionner date"}
          </Text>
        </TouchableOpacity>
        {showFilterDatePicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleFilterDateChange}
            minimumDate={new Date(2000, 0, 1)}
            maximumDate={new Date(2100, 11, 31)}
          />
        )}
      </View>

      {/* Tableau */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={styles.col}>CLIENT</Text>
            <Text style={styles.col}>DATE FAB</Text>
            <Text style={styles.col}>ARTICLE</Text>
            <Text style={styles.col}>QTE COMMANDE</Text>
            <Text style={styles.col}>MACHINE</Text>
            <Text style={styles.col}>SITE</Text>
            <Text style={styles.col}>QTE A FABRIQUER</Text>
            <Text style={styles.col}>QTE PRODUITE</Text>
            <Text style={styles.col}>STATUS</Text>
            <Text style={styles.col}>Temps écoulé</Text>
            <Text style={styles.col}>QTE RESTANTE</Text>
            <Text style={styles.col}>CASSE</Text>
          </View>

          <ScrollView style={{ maxHeight: 450 }}>
            {data.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.row,
                  styles.tableRow,
                  index % 2 === 0 && { backgroundColor: "#f9f9f9" },
                ]}
              >
                <Text style={styles.col}>{item.client}</Text>
                <TouchableOpacity
                  style={[styles.col, styles.dateCell]}
                  onPress={() => setShowDatePickerId(item.id)}
                >
                  <Text style={styles.dateText}>
                    {item.dateFab ? item.dateFab.toLocaleDateString("fr-FR") : "Sélectionner date"}
                  </Text>
                  {showDatePickerId === item.id && (
                    <DateTimePicker
                      value={item.dateFab || new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) =>
                        handleDateChange(event, selectedDate, item.id)
                      }
                      minimumDate={new Date(2000, 0, 1)}
                      maximumDate={new Date(2100, 11, 31)}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.col}>{item.article}</Text>
                <Text style={styles.col}>{item.qteCommande}</Text>
                <Text style={styles.col}>{item.machine}</Text>
                <Text style={styles.col}>{item.site}</Text>
                <Text style={styles.col}>{item.qteAFabriquer}</Text>
                <Text style={styles.col}>{item.qteProduite}</Text>
                <View style={[styles.col, { backgroundColor: statusColor(item.status), borderRadius: 6 }]}>
                  <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>{item.status}</Text>
                </View>
                <Text style={styles.col}>{new Date(item.tempsEcoule * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.col}>{item.qteRestante}</Text>
                <Text style={styles.col}>{item.casse}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  headerButtons: { flexDirection: "row", alignItems: "center" },
  buttonHeader: { backgroundColor: "#27ae60", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 10 },
  buttonHeaderText: { color: "#fff", fontWeight: "bold" },
  buttonRetour: { paddingHorizontal: 12, paddingVertical: 6 },
  buttonRetourText: { color: "#e84118", fontWeight: "bold", fontSize: 16 },

  filtres: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontWeight: "600", marginTop: 12, marginBottom: 6, fontSize: 14, color: "#333" },
  inputWrapper: { borderWidth: 1, borderColor: "#dcdde1", borderRadius: 10, paddingHorizontal: 10, backgroundColor: "#f5f6fa", justifyContent: "center", height: 45, marginBottom: 10 },

  tableContainer: { borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", paddingBottom: 10 },
  row: { flexDirection: "row", flexWrap: "nowrap", alignItems: "center" },
  tableHeader: { backgroundColor: "#dcdde1", paddingVertical: 10 },
  tableRow: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f1f2f6" },
  col: { width: 130, textAlign: "center", paddingHorizontal: 6 },
  dateCell: { backgroundColor: "#f5f6fa", borderRadius: 6, justifyContent: "center" },
  dateText: { color: "#2f3640", fontSize: 13 },
});

const pickerStyle = {
  inputIOS: { fontSize: 14, color: "#2f3640", textAlign: "center" },
  inputAndroid: { fontSize: 14, color: "#2f3640", textAlign: "center" },
};
