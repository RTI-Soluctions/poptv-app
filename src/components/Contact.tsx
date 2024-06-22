import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { contacts, IContact } from "../database/contacts_db";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const ContactItem: React.FC<{ contact: IContact }> = ({ contact }) => (
  <StyledView className="mb-3 p-4 rounded-lg bg-gray-700 shadow scroll-m-5 border-gray-600 border-b-2  border-r-2 w-full">
    <StyledText className="text-lg font-bold mb-2 text-gray-100">
      {contact.department}
    </StyledText>
    <StyledText className="text-base mb-[1px] text-gray-100">
      Nome: {contact.name}
    </StyledText>
    <StyledText className="text-base mb-[1px] text-gray-100">
      Telefone: {contact.phone}
    </StyledText>
    <StyledText className="text-base text-gray-100">
      Email: {contact.email}
    </StyledText>
  </StyledView>
);

export const Contact = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-gray-800 p-4 mb-16 w-[348]">
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
    </StyledSafeAreaView>
  );
};
