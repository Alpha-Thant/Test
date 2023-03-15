import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl, Image } from "react-native";
import Header from "../components/Header";
import { globalSytles } from "../styles/globalStyle";
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import CustomCard from "../components/CustomCard";
import CardModal from "../components/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCardList, fetchPokemon, showModalUpdate } from "../redux/pokemonSlice";
import { useEffect } from "react";
import PaidModal from "../components/PaidModal";


export default function Home({ navigation }) {
    const { pokemons, status, showModal } = useSelector(state => state.pokemon);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPokemon())
        dispatch(clearCardList())
    },[])

    const onPressHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.mainContainer}>
            <Header handlePress={onPressHandler}/>

            <View style={styles.container}>
                <View style={styles.firstRow}>
                    <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                        <View style={globalSytles.cardContainer}>
                            <TextInput style={globalSytles.input} placeholder="Type"></TextInput>
                        </View>
                    </View>
                </View>

                <View style={styles.secondRow}>
                    <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                        <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                            <TextInput style={globalSytles.input} placeholder="Type"></TextInput>
                            <AntDesign style={styles.iconStyle} name="down" size={16}></AntDesign>
                        </View>
                    </View>

                    <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                        <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                            <TextInput style={globalSytles.input} placeholder="Rarity"></TextInput>
                            <AntDesign style={styles.iconStyle} name="down" size={16}></AntDesign>
                        </View>
                    </View>

                    <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                        <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                            <TextInput style={globalSytles.input} placeholder="Set"></TextInput>
                            <AntDesign style={styles.iconStyle} name="down" size={16}></AntDesign>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={{marginBottom: 10}}>{status}</Text>
                    <ScrollView>
                            {
                                pokemons.slice(0, 10).map((item) => {
                                    return (
                                        <CustomCard key={item.id} data={{item}}/>
                                    )
                                })
                            }
                    </ScrollView>
                </View>

                <CardModal/>

                <PaidModal/>
            </View>

            <View style={styles.buttonContainer}>
               { !showModal && <TouchableOpacity
                    style={styles.buttonOpen}
                    onPress={() => dispatch(showModalUpdate(true))}>
                        <AntDesign name="shoppingcart" size={18} color="white" />
                        <Text style={styles.textStyle}>View cart</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 100,
    },
    secondRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
    },
    textInputWrapper: {
        flex:1,
        marginHorizontal: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconStyle: {
        marginTop: 12,
        marginRight: 20,
        color: 'lightgrey'
    },
    cardContainer: {
        marginTop: 60,
        marginBottom: 80,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonOpen: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 2,
        backgroundColor: '#0096ff',
        flexDirection: 'row',
    },
      
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 5,
    },
})
