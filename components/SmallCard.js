import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { totalCardAdd, totalCardRemove, totalPriceAdd, totalPriceRemove } from "../redux/pokemonSlice";

export default function SmallCard({data}) {
    const [ count, setCount ] = useState(1);
    const [ price, setPrice ] = useState(data.item.price);
    const [ showCross, setShowCross ] = useState(true);
    const dispatch = useDispatch()

    const increment = () => {
        if((count+1) > 1) {
            setShowCross(false);
        } else {
            setShowCross(true);
        }
        setCount(count+1);
        setPrice(price + data.item.price);
        dispatch(totalCardAdd(1));
        dispatch(totalPriceAdd(data.item.price));

    }

    const decrement = () => {
        if((count-1) > 1) {
            setShowCross(false);
        } else {
            setShowCross(true);
        }
        setCount(count-1);
        setPrice(price - data.item.price);
        dispatch(totalCardRemove(1));
        dispatch(totalPriceRemove(data.item.price));

    }




    return (
        <View style={styles.container}>
            <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={{
                uri:data.item.photo
                }}
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.item.name}</Text>
                <Text>${data.item.price}<Text style={{ color: 'grey'}}> per card</Text></Text>

                <View style={{ marginTop: 40, alignContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={{color:'red', fontWeight: 'bold'}}>{data.item.number}</Text>
                    <Text style={{color:'grey', fontWeight: '400', fontSize: 14}}>  cards left</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Text style={styles.blueText}>
                    {count}
                    <View>
                        <MaterialIcons onPress={()=> {increment()}} name="keyboard-arrow-up" size={15} color="#0096ff" />
                       { !showCross && <MaterialIcons onPress={()=> {decrement()}} name="keyboard-arrow-down" size={15} color="#0096ff" />}
                       { showCross && <Entypo name="cross" size={15} color="red" /> }           
                    </View>
                </Text>
                <View style={{ marginTop: 30, alignContent: 'flex-end'}}>
                    <Text>price</Text>
                    <Text style={styles.blueText}>${price}</Text>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 130,
        overflow : 'hidden',
        flexDirection: 'row',
        marginBottom: 10
    },
    textContainer : {
        flex: 5,
        marginTop: 10,
        marginLeft: 10,
    },
    actions : {
        flex: 2,
        alignItems: 'flex-end',
        marginTop: 10,
    },
    imageStyle: {
        flex: 2,
        height: 130,
        width: 100,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    blueText: {
        color: '#0096ff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    unitPrice: {

    },
})