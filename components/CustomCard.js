import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cardAdd, cardRemove } from "../redux/pokemonSlice";

export default function CustomCard({data}) {
    
    const [selected, setSelected] = useState(false);
    const { selectedCardList } = useSelector(state => state.pokemon);
    const dispatch = useDispatch();

    useEffect(() => {
        const index = selectedCardList.findIndex((card) => card.id === data.item.id);
        if(index > -1) {
            setSelected(true);
        } else {
            setSelected(false);
        }

    },[selectedCardList])

    const onPressHandler = () => {

        if(selected) {
            // remove from list
            dispatch(cardRemove({
                id: data.item.id,
                name: data.item.name,
                price: data.item.cardmarket.prices.averageSellPrice,
                number: data.item.number,
                photo: data.item.images.large
            }));
            setSelected(false);
        } else {
            // add to the list
            dispatch(cardAdd({
                id: data.item.id,
                name: data.item.name,
                price: data.item.cardmarket.prices.averageSellPrice,
                number: data.item.number,
                photo: data.item.images.large
            }));
            setSelected(true);
        }
    }

    return (
        <TouchableWithoutFeedback>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {data.item.name}
                </Text>

                <Text style={styles.raityText}>
                    {data.item.rarity}
                </Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                        ${data.item.cardmarket.prices.averageSellPrice}
                    </Text>

                    <Text style={styles.priceText}>
                        {data.item.number} left
                    </Text>
                </View>

                
            </View>

            <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={{
                uri:data.item.images.large
                }}
            />

            { !selected && <TouchableOpacity onPress={onPressHandler} style={[styles.button]}>
                <Text style={styles.buttonText}>Select card</Text>
            </TouchableOpacity>}

            { selected && <TouchableOpacity onPress={onPressHandler} style={[styles.buttonSelected]}>
                <Text style={styles.buttonSelectedText}>  Selected  </Text>
            </TouchableOpacity>}

        </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 380,
        overflow : 'hidden',
        alignItems : 'center',

    },
    imageStyle: {
        height: 250,
        width: 190,
        position: 'absolute',
        borderRadius : 15,
    },
    textContainer : {
        height: 150,
        width: 270,
        backgroundColor: 'white',
        alignItems : 'center',
        marginTop: 190,
        borderRadius : 15,
        paddingTop: 60,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    raityText: {
        fontSize: 12,
        color: 'indigo',
        fontWeight: 300,
    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    priceText: {
        color: 'brown',
        marginHorizontal: 20,
        fontWeight: 300,
    },
    button: {
        marginTop: 320,
        position: 'absolute',
        backgroundColor: "#ffc300",
        padding: 8,
        borderRadius: 20,
        paddingHorizontal: 70,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400'
    },
    buttonSelected: {
        marginTop: 320,
        position: 'absolute',
        backgroundColor: "black",
        padding: 8,
        borderRadius: 20,
        paddingHorizontal: 70,
    },
    buttonSelectedText: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white'
    }
})
