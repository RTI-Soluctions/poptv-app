import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { contacts, IContact } from "../database/contacts_db";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const ContactItem: React.FC<{ contact: IContact }> = ({ contact }) => (
  <StyledView className="mb-3 p-4 rounded-lg bg-gray-700 shadow scroll-m-5 border-gray-600 border-b-2  border-r-2 w-full">
    <StyledText className="text-base font-bold mb-2 text-gray-100">
      {contact.department}
    </StyledText>
    <StyledText className="text-sm text-gray-100">{contact.email}</StyledText>
  </StyledView>
);

export const Contact = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-gray-900 p-4 mb-16 w-[90%]">
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
    </StyledSafeAreaView>
  );
};
