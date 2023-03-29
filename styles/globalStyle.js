import { StyleSheet } from "react-native";


export const globalSytles = StyleSheet.create({
    cardShadow: {
        marginTop: 10,
        width: 300,
        height: 35,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white'
    },

    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    button: {
        width: 300,
        backgroundColor: "#ffc300",
        padding: 7,
        borderRadius: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',   
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22, 
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})