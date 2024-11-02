import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useNetInfo;
