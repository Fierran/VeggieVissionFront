import { View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
export default function Weather () {
    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row", marginRight: "20%", alignItems: "center"}}>
                <Icon name="temperature-half" color={"gray"} size={20}/>
                <Text style= {[styles.text, {color: "gray"}]}> 0°C</Text>
            </View>
            <View style={{flexDirection:"row", alignItems: "center"}}>
                <Icon name="droplet" color={"gray"} size={20}/>
                <Text style= {[styles.text, {color: "gray"}]}> 0%</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        flexDirection: 'row',
    },
    text : {
        fontSize: 20, 
        fontWeight: "bold"
    }


})