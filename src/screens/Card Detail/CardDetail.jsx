import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CardDetail({ route }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const details = useSelector((state) => state.detail);

  // const startDate = details.start.toString().slice(4, 15);
  // const startHour = details.start.toString().slice(16, 24);

   console.log("este es el detail:", details);

  return (
      <View style={styles.view}>
      
      
      {details.length ? (
        <View style={styles.view2}>
          <Text style={styles.title}>{details[0].title}</Text>
          <View style={{marginBottom:'20%'}}>
          <View>
            <Image style={styles.img} source={{ uri: `${details[0].photo}` }} />
          </View>
          <View style={{marginBottom:'15%'}} >
          <Text style={{ textAlign: "center",fontSize:20 }}>{details[0].description} </Text>
          </View>

          
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{ textAlign: "center" }}>${details[0].fee}</Text>
          <Text style={{ textAlign: "center" }}>{details[0].category}</Text>
          </View>

          <Text style={{ textAlign: "center" }}>{`El evento será el día ${details[0].start.toString().slice(4, 15)} a las ${details[0].start.toString().slice(16, 24)}`}</Text>
          
        </View>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
      </View>
    
  );
}
