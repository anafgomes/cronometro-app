import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

let timer = null;
let segundos = 0;
let minutos = 0;

export default function App() {
  const [tempo, setTempo] = useState("00:00");
  const [rodando, setRodando] = useState(false);
  const [ultimoTempo, setUltimoTempo] = useState(null);

  function iniciarPausar() {
    if (rodando) {
      clearInterval(timer);
      setRodando(false);
    } else {
      timer = setInterval(() => {
        segundos++;
        if (segundos === 60) {
          segundos = 0;
          minutos++;
        }

        const format =
          (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);
        setTempo(format);
      }, 1000);

      setRodando(true);
    }
  }

  function limparCronometro() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    setUltimoTempo(tempo);
    setTempo("00:00");
    segundos = 0;
    minutos = 0;
    setRodando(false);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../cronometro/assets/cronometro.png")} />
      <Text style={styles.timer}>{tempo}</Text>
      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={iniciarPausar}>
          <Text style={styles.textoBotao}>{rodando ? "Pausar" : "Iniciar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={limparCronometro}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltimoTempo}>
        <Text style={styles.textoUltimoTempo}>
          {ultimoTempo ? "Último tempo: " + ultimoTempo : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00aff2",
    alignItems: "center",
    justifyContent: "center",
  },

  timer: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: -140,
    fontSize: 35,
  },

  areaBotoes: {
    flexDirection: "row",
    marginTop: 130,
    height: 40,
  },

  botao: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    flex: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  textoBotao: {
    color: "#00aff2",
    fontSize: 20,
    fontWeight: "bold",
  },

  areaUltimoTempo: {
    marginTop: 100,
  },

  textoUltimoTempo: {
    color: "#ffffff",
    fontSize: 25,
  },

});
