import { View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
export default function Weather () {
    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row", marginRight: "20%", alignItems: "center"}}>
                <Icon name="temperature-half" color={"#FF637E"} size={20}/>
                <Text style= {[styles.text, {color: "#FF637E"}]}> 0</Text>
            </View>
            <View style={{flexDirection:"row", alignItems: "center"}}>
                <Icon name="droplet" color={"#51A2FF"} size={20}/>
                <Text style= {[styles.text, {color: "#51A2FF"}]}> 0</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: "8%"
    },
    text : {
        fontSize: 20, 
        fontWeight: "bold"
    }


})