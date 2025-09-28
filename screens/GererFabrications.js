import React, { useState, useEffect } from "react";
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

export default function GererFabrications({ navigation }) {
  const [client, setClient] = useState(null);
  const [commande, setCommande] = useState(null);
  const [machineFilter, setMachineFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  const initialData = [
    {
      id: 1,
      dateFab: null,
      article: "Article A",
      qteCommande: 100,
      machine: null,
      site: null,
      qteAFabriquer: 100,
      qteProduite: 0,
      status: "Nouveau",
      tempsEcoule: 0,
      qteRestante: 100,
      casse: 0,
    },
    {
      id: 2,
      dateFab: null,
      article: "Article B",
      qteCommande: 50,
      machine: null,
      site: null,
      qteAFabriquer: 50,
      qteProduite: 0,
      status: "Nouveau",
      tempsEcoule: 0,
      qteRestante: 50,
      casse: 0,
    },
  ];

  const [data, setData] = useState(initialData);
  const [showDatePicker, setShowDatePicker] = useState(null);

  // Chrono
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((row) =>
          row.status === "En cours"
            ? { ...row, tempsEcoule: row.tempsEcoule + 1 }
            : row
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Nouveau": return "#3498db";
      case "Terminé": return "#e74c3c";
      case "En cours": return "#2ecc71";
      case "Terminer avec reliquat": return "#9b59b6";
      case "Planifié": return "#f39c12";
      default: return "#000";
    }
  };

  const handleAction = (id, action) => {
    setData((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          let newStatus = row.status;
          if (action === "Lancer") newStatus = "En cours";
          else if (action === "En Attente") newStatus = "Planifié";
          else if (action === "Terminer") newStatus = "Terminé";
          return { ...row, status: newStatus };
        }
        return row;
      })
    );
  };

  const handleDateChange = (event, selectedDate, id) => {
    if (event.type === "dismissed") {
      setShowDatePicker(null);
      return;
    }
    const newDate = selectedDate || new Date();
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, dateFab: newDate } : row))
    );
    setShowDatePicker(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonRetour}
          onPress={() => navigation.goBack && navigation.goBack()}
        >
          <Text style={styles.buttonRetourText}>Retour Accueil</Text>
        </TouchableOpacity>
      </View>

      {/* Filtres */}
      <View style={styles.filtres}>
        <Text style={styles.label}>Client :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setClient}
            items={[
              { label: "Client A", value: "A" },
              { label: "Client B", value: "B" },
            ]}
            placeholder={{ label: "Sélectionner client", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Commande n° :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setCommande}
            items={[
              { label: "Commande 1", value: 1 },
              { label: "Commande 2", value: 2 },
            ]}
            placeholder={{ label: "Sélectionner commande", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Machine :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setMachineFilter}
            items={[
              { label: "M1", value: "M1" },
              { label: "M2", value: "M2" },
            ]}
            placeholder={{ label: "Sélectionner machine", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Statut :</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
            onValueChange={setStatusFilter}
            items={[
              { label: "Nouveau", value: "Nouveau" },
              { label: "En cours", value: "En cours" },
              { label: "Planifié", value: "Planifié" },
              { label: "Terminé", value: "Terminé" },
            ]}
            placeholder={{ label: "Sélectionner statut", value: null }}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Date de fabrication :</Text>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            onPress={() => setShowDatePicker("filter")}
          >
            <Text style={styles.dateText}>
              {dateFilter ? dateFilter.toLocaleDateString("fr-FR") : "Sélectionner date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker === "filter" && (
            <DateTimePicker
              value={dateFilter || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                if (event.type !== "dismissed") setDateFilter(date);
                setShowDatePicker(null);
              }}
              minimumDate={new Date(2000, 0, 1)}
              maximumDate={new Date(2100, 11, 31)}
            />
          )}
        </View>
      </View>

      {/* Tableau */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={[styles.row, styles.tableHeader]}>
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
            <Text style={styles.col}>ACTION</Text>
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
                <TouchableOpacity
                  style={[styles.col, styles.dateCell]}
                  onPress={() => setShowDatePicker(item.id)}
                >
                  <Text style={styles.dateText}>
                    {item.dateFab ? item.dateFab.toLocaleDateString("fr-FR") : "Sélectionner date"}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.col}>{item.article}</Text>
                <Text style={styles.col}>{item.qteCommande}</Text>

                <View style={styles.col}>
                  <View style={styles.inputWrapper}>
                    <RNPickerSelect
                      onValueChange={(value) =>
                        setData((prev) =>
                          prev.map((row) =>
                            row.id === item.id ? { ...row, machine: value } : row
                          )
                        )
                      }
                      items={[
                        { label: "M1", value: "M1" },
                        { label: "M2", value: "M2" },
                      ]}
                      placeholder={{ label: "Sélectionner machine", value: null }}
                      style={pickerStyle}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                </View>

                <View style={styles.col}>
                  <View style={styles.inputWrapper}>
                    <RNPickerSelect
                      onValueChange={(value) =>
                        setData((prev) =>
                          prev.map((row) =>
                            row.id === item.id ? { ...row, site: value } : row
                          )
                        )
                      }
                      items={[
                        { label: "Site 1", value: "Site 1" },
                        { label: "Site 2", value: "Site 2" },
                      ]}
                      placeholder={{ label: "Sélectionner site", value: null }}
                      style={pickerStyle}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                </View>

                <Text style={styles.col}>{item.qteAFabriquer}</Text>
                <Text style={styles.col}>{item.qteProduite}</Text>

                <View
                  style={[
                    styles.col,
                    { backgroundColor: statusColor(item.status), borderRadius: 6, justifyContent: "center" },
                  ]}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                    {item.status}
                  </Text>
                </View>

                <Text style={styles.col}>{new Date(item.tempsEcoule * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.col}>{item.qteRestante}</Text>
                <Text style={styles.col}>{item.casse}</Text>

                <View style={styles.col}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#28a745" }]}
                    onPress={() => handleAction(item.id, "Lancer")}
                  >
                    <Text style={styles.actionText}>Lancer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#f39c12" }]}
                    onPress={() => handleAction(item.id, "En Attente")}
                  >
                    <Text style={styles.actionText}>En Attente</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#e74c3c" }]}
                    onPress={() => handleAction(item.id, "Terminer")}
                  >
                    <Text style={styles.actionText}>Terminer</Text>
                  </TouchableOpacity>
                </View>

                {showDatePicker === item.id && (
                  <DateTimePicker
                    value={item.dateFab || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, date) => handleDateChange(event, date, item.id)}
                    minimumDate={new Date(2000, 0, 1)}
                    maximumDate={new Date(2100, 11, 31)}
                  />
                )}
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
  buttonRetour: { backgroundColor: "#e84118", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  buttonRetourText: { color: "#fff", fontWeight: "bold" },

  filtres: { marginBottom: 15, padding: 12, backgroundColor: "#fff", borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  label: { fontWeight: "600", marginTop: 12, marginBottom: 6, fontSize: 14, color: "#333" },

  inputWrapper: { borderWidth: 1, borderColor: "#dcdde1", borderRadius: 10, paddingHorizontal: 10, backgroundColor: "#f5f6fa", justifyContent: "center", height: 45, marginBottom: 10 },

  tableContainer: { borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", paddingBottom: 10 },
  row: { flexDirection: "row", flexWrap: "nowrap", alignItems: "center" },
  tableHeader: { backgroundColor: "#dcdde1", paddingVertical: 10 },
  tableRow: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f1f2f6" },
  col: { width: 140, textAlign: "center", paddingHorizontal: 6 },
  dateCell: { backgroundColor: "#f5f6fa", borderRadius: 6 },
  dateText: { color: "#2f3640", fontSize: 13 },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginVertical: 2 },
  actionText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});

const pickerStyle = {
  inputIOS: { fontSize: 14, color: "#2f3640", textAlign: "center" },
  inputAndroid: { fontSize: 14, color: "#2f3640", textAlign: "center" },
};
