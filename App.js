import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, Alert } from 'react-native';
import { useEffect } from "react";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//import firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import useNetInfo to determine user's connectivity status
import { useNetInfo } from "@react-native-community/netinfo";

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

const App = () => {

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBh0zuVFwMcRUra8QTQYhs9YnZgzHvyHKE",
        authDomain: "shopping-list-demo-55e58.firebaseapp.com",
        projectId: "shopping-list-demo-55e58",
        storageBucket: "shopping-list-demo-55e58.appspot.com",
        messagingSenderId: "14472864734",
        appId: "1:14472864734:web:e7fbb8c794ce0e9f9db34f"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    //define a new state the represents connectivity status
    const connectionStatus = useNetInfo();

    //display an alert if connection is lost
    useEffect(() => {
        if (connectionStatus.isConnected === false) Alert.alert("Connection lost!")
    }, [connectionStatus.isConnected]);
    


    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator
            initialRouteName="Welcome"
            >
                <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                />
                <Stack.Screen
                name='ShoppingLists'
                >
                {props => <ShoppingLists db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;