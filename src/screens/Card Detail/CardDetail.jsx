import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CardDetail({ route }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const details = useSelector((state) => state.detail);

  // const startDate = details.start.toString().slice(4, 15);
  // const startHour = details.start.toString().slice(16, 24);

  // console.log("este es el detail:", details);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {details.length ? (
        <View>
          <Text style={{ textAlign: "center" }}>{details[0].title}</Text>
          <Text style={{ textAlign: "center" }}>{details[0].description}</Text>
          <Text style={{ textAlign: "center" }}>{details[0].fee}</Text>
          <View>
            <Image style={{ resizeMode: "contain", height: 300, width: "100%" }} source={{ uri: `${details[0].photo}` }} />
          </View>
          <Text style={{ textAlign: "center" }}>{details[0].category}</Text>
          <Text style={{ textAlign: "center" }}>{`El evento será el día ${details[0].start.toString().slice(4, 15)} a las ${details[0].start.toString().slice(16, 24)}`}</Text>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
