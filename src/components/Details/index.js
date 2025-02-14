import React from "react";
import { View } from "react-native";
import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from "./styles";
// import { Container } from './styles';
import uberX from "../../assets/uberx.png";
const Details = () => {
  return (
    <Container>
      <TypeTitle>Popular</TypeTitle>
      <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>
      <TypeImage source={uberX} />
      <TypeTitle>UberX</TypeTitle>
      <TypeDescription>R$6,00</TypeDescription>

      <RequestButton onPress={() => {}}>
        <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
      </RequestButton>
    </Container>
  );
};

export default Details;
