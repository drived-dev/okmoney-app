import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

// Create a keyboard dismiss context
const KeyboardDismissContext = React.createContext<() => void>(() => {});

export const KeyboardDismissProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardDismissContext.Provider value={dismissKeyboard}>
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <View style={{ flex: 1 }}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardDismissContext.Provider>
  );
};

export const useKeyboardDismiss = () =>
  React.useContext(KeyboardDismissContext);
